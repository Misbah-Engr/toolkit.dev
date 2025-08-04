import { z } from "zod";
import {
  adminProcedure,
  createTRPCRouter,
  publicProcedure,
} from "@/server/api/trpc";
import { clientToolkits } from "@/toolkits/toolkits/client";

export const toolkitsRouter = createTRPCRouter({
  // Get all toolkits
  getAllToolkits: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.toolkit.findMany({
      include: {
        tools: {
          select: {
            id: true,
            usageCount: true,
          },
        },
      },
      orderBy: {
        id: "asc",
      },
    });
  }),

  // Get toolkit by ID
  getToolkitById: publicProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      return ctx.db.toolkit.findUnique({
        where: { id: input },
        include: {
          tools: {
            orderBy: {
              usageCount: "desc",
            },
          },
        },
      });
    }),

  // Get toolkit by name
  getToolkitByName: publicProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      return ctx.db.toolkit.findFirst({
        where: { id: input },
        include: {
          tools: {
            orderBy: {
              usageCount: "desc",
            },
          },
        },
      });
    }),

  // Create toolkit
  createToolkit: adminProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.toolkit.create({
        data: {
          id: input.id,
        },
      });
    }),

  // Delete toolkit
  deleteToolkit: adminProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      return ctx.db.toolkit.delete({
        where: { id: input },
      });
    }),

  // Get top toolkits by total usage
  getTopToolkits: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).default(10),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { limit } = input;

      const toolkits = await ctx.db.toolkit.findMany({
        include: {
          tools: {
            select: {
              usageCount: true,
            },
          },
        },
      });

      // Calculate total usage for each toolkit
      const toolkitUsage = toolkits.map((toolkit) => ({
        id: toolkit.id,
        totalUsage: toolkit.tools.reduce(
          (sum, tool) => sum + tool.usageCount,
          0,
        ),
        toolCount: toolkit.tools.length,
      }));

      // Sort by total usage and return top N
      return toolkitUsage
        .sort((a, b) => b.totalUsage - a.totalUsage)
        .slice(0, limit);
    }),

  // Get toolkit usage statistics
  getToolkitStats: publicProcedure
    .input(
      z.object({
        toolkitId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { toolkitId } = input;

      const toolkit = await ctx.db.toolkit.findUnique({
        where: { id: toolkitId },
        include: {
          tools: {
            orderBy: {
              usageCount: "desc",
            },
          },
        },
      });

      if (!toolkit) {
        throw new Error("Toolkit not found");
      }

      const totalUsage = toolkit.tools.reduce(
        (sum, tool) => sum + tool.usageCount,
        0,
      );
      const topTools = toolkit.tools.slice(0, 5);

      return {
        id: toolkit.id,
        totalUsage,
        toolCount: toolkit.tools.length,
        topTools,
      };
    }),

  // Get overall toolkit statistics
  getOverallStats: publicProcedure.query(async ({ ctx }) => {
    const toolkits = await ctx.db.toolkit.findMany({
      include: {
        tools: {
          select: {
            usageCount: true,
          },
        },
      },
    });

    const totalUsage = toolkits.reduce(
      (sum, toolkit) =>
        sum +
        toolkit.tools.reduce((toolSum, tool) => toolSum + tool.usageCount, 0),
      0,
    );

    const toolkitCount = toolkits.length;
    const toolCount = toolkits.reduce(
      (sum, toolkit) => sum + toolkit.tools.length,
      0,
    );

    const topToolkits = toolkits
      .map((toolkit) => ({
        id: toolkit.id,
        totalUsage: toolkit.tools.reduce(
          (sum, tool) => sum + tool.usageCount,
          0,
        ),
      }))
      .sort((a, b) => b.totalUsage - a.totalUsage)
      .slice(0, 5);

    return {
      totalUsage,
      toolkitCount,
      toolCount,
      topToolkits,
    };
  }),

  // Sync toolkits with client toolkits
  syncToolkits: adminProcedure.mutation(async ({ ctx }) => {
    const created: string[] = [];
    const updated: string[] = [];
    const errors: string[] = [];

    try {
      // Get all existing toolkits
      const existingToolkits = await ctx.db.toolkit.findMany({
        include: {
          tools: true,
        },
      });

      const existingToolkitMap = new Map(
        existingToolkits.map((tk) => [tk.id, tk]),
      );

      // Process each client toolkit
      for (const [toolkitId, toolkit] of Object.entries(clientToolkits)) {
        try {
          const existingToolkit = existingToolkitMap.get(toolkitId);
          const tools = Object.keys(toolkit.tools);

          if (!existingToolkit) {
            // Create new toolkit
            await ctx.db.toolkit.create({
              data: {
                id: toolkitId,
              },
            });
            created.push(toolkitId);

            // Create tools for this toolkit
            const toolData = tools.map((toolName) => ({
              id: toolName,
              toolkitId: toolkitId,
            }));

            await ctx.db.tool.createMany({
              data: toolData,
            });
          } else {
            // Toolkit exists, check for missing tools
            const existingToolIds = new Set(
              existingToolkit.tools.map((tool) => tool.id),
            );
            const missingTools = tools.filter(
              (toolId) => !existingToolIds.has(toolId),
            );

            if (missingTools.length > 0) {
              const toolData = missingTools.map((toolName) => ({
                id: toolName,
                toolkitId: toolkitId,
              }));

              await ctx.db.tool.createMany({
                data: toolData,
              });
              updated.push(toolkitId);
            }
          }
        } catch (error) {
          errors.push(
            `Failed to sync toolkit ${toolkitId}: ${error instanceof Error ? error.message : "Unknown error"}`,
          );
        }
      }

      return {
        created: created.length,
        updated: updated.length,
        errors,
      };
    } catch (error) {
      errors.push(
        `Sync failed: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
      return {
        created: created.length,
        updated: updated.length,
        errors,
      };
    }
  }),
});
