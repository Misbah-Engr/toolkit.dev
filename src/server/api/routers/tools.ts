import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

export const toolsRouter = createTRPCRouter({
  // Get all tools
  getAllTools: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.tool.findMany({
      include: {
        toolkit: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        usageCount: "desc",
      },
    });
  }),

  // Get tool by ID
  getToolById: publicProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      return ctx.db.tool.findUnique({
        where: { id: input },
        include: {
          toolkit: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });
    }),

  // Get tools by toolkit ID
  getToolsByToolkitId: publicProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      return ctx.db.tool.findMany({
        where: { toolkitId: input },
        orderBy: {
          usageCount: "desc",
        },
      });
    }),

  // Get tool by name and toolkit
  getToolByNameAndToolkit: publicProcedure
    .input(
      z.object({
        name: z.string(),
        toolkitName: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return ctx.db.tool.findFirst({
        where: {
          name: input.name,
          toolkit: {
            name: input.toolkitName,
          },
        },
        include: {
          toolkit: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });
    }),

  // Create tool
  createTool: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        toolkitId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.tool.create({
        data: {
          name: input.name,
          toolkitId: input.toolkitId,
        },
      });
    }),

  // Update tool
  updateTool: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.tool.update({
        where: { id: input.id },
        data: {
          name: input.name,
        },
      });
    }),

  // Delete tool
  deleteTool: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      return ctx.db.tool.delete({
        where: { id: input },
      });
    }),

  // Increment tool usage
  incrementToolUsage: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      return ctx.db.tool.update({
        where: { id: input },
        data: {
          usageCount: {
            increment: 1,
          },
        },
      });
    }),

  // Get top tools
  getTopTools: protectedProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).default(10),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { limit } = input;

      return ctx.db.tool.findMany({
        include: {
          toolkit: {
            select: {
              id: true,
              name: true,
            },
          },
        },
        orderBy: {
          usageCount: "desc",
        },
        take: limit,
      });
    }),

  // Get tool usage statistics
  getToolStats: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const tool = await ctx.db.tool.findUnique({
        where: { id: input },
        include: {
          toolkit: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });

      if (!tool) {
        throw new Error("Tool not found");
      }

      return {
        id: tool.id,
        name: tool.name,
        usageCount: tool.usageCount,
        toolkit: tool.toolkit,
      };
    }),

  // Get overall tool statistics
  getOverallStats: protectedProcedure.query(async ({ ctx }) => {
    const [totalUsage, toolCount, topTools] = await Promise.all([
      ctx.db.tool.aggregate({
        _sum: {
          usageCount: true,
        },
      }),
      ctx.db.tool.count(),
      ctx.db.tool.findMany({
        include: {
          toolkit: {
            select: {
              id: true,
              name: true,
            },
          },
        },
        orderBy: {
          usageCount: "desc",
        },
        take: 10,
      }),
    ]);

    return {
      totalUsage: totalUsage._sum.usageCount ?? 0,
      toolCount,
      topTools,
    };
  }),

  // Get tools with zero usage
  getZeroUsageTools: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.tool.findMany({
      where: {
        usageCount: 0,
      },
      include: {
        toolkit: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        name: "asc",
      },
    });
  }),

  getTopToolkits: publicProcedure.query(async ({ ctx }) => {
    // Aggregate total usageCount per toolkit by grouping tools
    const toolkitsWithUsage = await ctx.db.tool.groupBy({
      by: ["toolkitId"],
      _sum: {
        usageCount: true,
      },
      orderBy: {
        _sum: {
          usageCount: "desc",
        },
      },
      take: 10,
    });

    // Fetch toolkit details for the top toolkits
    const toolkitIds = toolkitsWithUsage.map((t) => t.toolkitId);
    const toolkitDetails = await ctx.db.toolkit.findMany({
      where: { id: { in: toolkitIds } },
      select: { id: true, name: true },
    });

    // Merge usage info with toolkit details
    const result = toolkitsWithUsage.map((tu) => {
      const toolkit = toolkitDetails.find((td) => td.id === tu.toolkitId);
      return {
        id: toolkit?.id,
        name: toolkit?.name,
        totalUsage: tu._sum.usageCount ?? 0,
      };
    });

    return result;
  }),
});
