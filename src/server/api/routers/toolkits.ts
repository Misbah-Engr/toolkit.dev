import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

export const toolkitsRouter = createTRPCRouter({
  // Get all toolkits
  getAllToolkits: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.toolkit.findMany({
      include: {
        toolkits: {
          select: {
            id: true,
            name: true,
            usageCount: true,
          },
        },
      },
      orderBy: {
        name: "asc",
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
          toolkits: {
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
        where: { name: input },
        include: {
          toolkits: {
            orderBy: {
              usageCount: "desc",
            },
          },
        },
      });
    }),

  // Create toolkit
  createToolkit: protectedProcedure
    .input(
      z.object({
        name: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.toolkit.create({
        data: {
          name: input.name,
        },
      });
    }),

  // Update toolkit
  updateToolkit: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.toolkit.update({
        where: { id: input.id },
        data: {
          name: input.name,
        },
      });
    }),

  // Delete toolkit
  deleteToolkit: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      return ctx.db.toolkit.delete({
        where: { id: input },
      });
    }),

  // Get top toolkits by total usage
  getTopToolkits: protectedProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).default(10),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { limit } = input;

      const toolkits = await ctx.db.toolkit.findMany({
        include: {
          toolkits: {
            select: {
              usageCount: true,
            },
          },
        },
      });

      // Calculate total usage for each toolkit
      const toolkitUsage = toolkits.map((toolkit) => ({
        id: toolkit.id,
        name: toolkit.name,
        totalUsage: toolkit.toolkits.reduce(
          (sum, tool) => sum + tool.usageCount,
          0,
        ),
        toolCount: toolkit.toolkits.length,
      }));

      // Sort by total usage and return top N
      return toolkitUsage
        .sort((a, b) => b.totalUsage - a.totalUsage)
        .slice(0, limit);
    }),

  // Get toolkit usage statistics
  getToolkitStats: protectedProcedure
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
          toolkits: {
            orderBy: {
              usageCount: "desc",
            },
          },
        },
      });

      if (!toolkit) {
        throw new Error("Toolkit not found");
      }

      const totalUsage = toolkit.toolkits.reduce(
        (sum, tool) => sum + tool.usageCount,
        0,
      );
      const topTools = toolkit.toolkits.slice(0, 5);

      return {
        id: toolkit.id,
        name: toolkit.name,
        totalUsage,
        toolCount: toolkit.toolkits.length,
        topTools,
      };
    }),

  // Get overall toolkit statistics
  getOverallStats: protectedProcedure.query(async ({ ctx }) => {
    const toolkits = await ctx.db.toolkit.findMany({
      include: {
        toolkits: {
          select: {
            usageCount: true,
          },
        },
      },
    });

    const totalUsage = toolkits.reduce(
      (sum, toolkit) =>
        sum +
        toolkit.toolkits.reduce(
          (toolSum, tool) => toolSum + tool.usageCount,
          0,
        ),
      0,
    );

    const toolkitCount = toolkits.length;
    const toolCount = toolkits.reduce(
      (sum, toolkit) => sum + toolkit.toolkits.length,
      0,
    );

    const topToolkits = toolkits
      .map((toolkit) => ({
        id: toolkit.id,
        name: toolkit.name,
        totalUsage: toolkit.toolkits.reduce(
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
});
