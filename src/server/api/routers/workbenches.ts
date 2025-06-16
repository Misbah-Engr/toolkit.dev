import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";

// Helper functions to convert between string arrays and comma-separated strings
const stringArrayToCommaSeparated = (arr: string[]): string => arr.join(',');
const commaSeparatedToStringArray = (str: string): string[] => str ? str.split(',').filter(Boolean) : [];

export const workbenchesRouter = createTRPCRouter({
  getWorkbenches: protectedProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).default(10),
        cursor: z.string().nullish(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const { limit, cursor } = input;

      const items = await ctx.db.workbench.findMany({
        where: {
          userId,
        },
        orderBy: {
          createdAt: "desc",
        },
        take: limit + 1,
        cursor: cursor ? { id: cursor } : undefined,
        include: {
          _count: {
            select: {
              chats: true,
            },
          },
        },
      });

      const nextCursor =
        items.length > limit ? items[items.length - 1]?.id : undefined;
      const workbenches = items.slice(0, limit).map(item => ({
        ...item,
        toolkitIds: commaSeparatedToStringArray(item.toolkitIds),
      }));

      return {
        items: workbenches,
        hasMore: items.length > limit,
        nextCursor,
      };
    }),

  getWorkbench: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      
      const workbench = await ctx.db.workbench.findUnique({
        where: {
          id: input,
          userId,
        },
        include: {
          chats: {
            orderBy: {
              createdAt: "desc",
            },
            take: 10,
          },
          _count: {
            select: {
              chats: true,
            },
          },
        },
      });

      if (!workbench) return null;

      return {
        ...workbench,
        toolkitIds: commaSeparatedToStringArray(workbench.toolkitIds),
      };
    }),

  createWorkbench: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1).max(100),
        systemPrompt: z.string().max(10000),
        toolkitIds: z.array(z.string()),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      
      const workbench = await ctx.db.workbench.create({
        data: {
          name: input.name,
          systemPrompt: input.systemPrompt,
          toolkitIds: stringArrayToCommaSeparated(input.toolkitIds),
          userId,
        },
      });

      return {
        ...workbench,
        toolkitIds: commaSeparatedToStringArray(workbench.toolkitIds),
      };
    }),

  updateWorkbench: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().min(1).max(100),
        systemPrompt: z.string().max(10000),
        toolkitIds: z.array(z.string()),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      
      const workbench = await ctx.db.workbench.update({
        where: {
          id: input.id,
          userId,
        },
        data: {
          name: input.name,
          systemPrompt: input.systemPrompt,
          toolkitIds: stringArrayToCommaSeparated(input.toolkitIds),
        },
      });

      return {
        ...workbench,
        toolkitIds: commaSeparatedToStringArray(workbench.toolkitIds),
      };
    }),

  deleteWorkbench: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      
      return ctx.db.workbench.delete({
        where: {
          id: input,
          userId,
        },
      });
    }),

  createChatWithWorkbench: protectedProcedure
    .input(
      z.object({
        workbenchId: z.string(),
        title: z.string().min(1).max(100),
        visibility: z.enum(["public", "private"]).default("private"),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      
      // Verify workbench ownership
      const workbench = await ctx.db.workbench.findUnique({
        where: {
          id: input.workbenchId,
          userId,
        },
      });
      
      if (!workbench) {
        throw new Error("Workbench not found or access denied");
      }
      
      return ctx.db.chat.create({
        data: {
          title: input.title,
          userId,
          visibility: input.visibility,
          workbenchId: input.workbenchId,
        },
      });
    }),

  getWorkbenchChats: protectedProcedure
    .input(
      z.object({
        workbenchId: z.string(),
        limit: z.number().min(1).max(100).default(10),
        cursor: z.string().nullish(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const { workbenchId, limit, cursor } = input;

      // Verify workbench ownership
      const workbench = await ctx.db.workbench.findUnique({
        where: {
          id: workbenchId,
          userId,
        },
      });
      
      if (!workbench) {
        throw new Error("Workbench not found or access denied");
      }

      const items = await ctx.db.chat.findMany({
        where: {
          workbenchId,
          userId,
        },
        orderBy: {
          createdAt: "desc",
        },
        take: limit + 1,
        cursor: cursor ? { id: cursor } : undefined,
      });

      const nextCursor =
        items.length > limit ? items[items.length - 1]?.id : undefined;
      const chats = items.slice(0, limit);

      return {
        items: chats,
        hasMore: items.length > limit,
        nextCursor,
      };
    }),

  duplicateWorkbench: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      
      const originalWorkbench = await ctx.db.workbench.findUnique({
        where: {
          id: input,
          userId,
        },
      });
      
      if (!originalWorkbench) {
        throw new Error("Workbench not found or access denied");
      }
      
      const newWorkbench = await ctx.db.workbench.create({
        data: {
          name: `${originalWorkbench.name} (Copy)`,
          systemPrompt: originalWorkbench.systemPrompt,
          toolkitIds: originalWorkbench.toolkitIds,
          userId,
        },
      });

      return {
        ...newWorkbench,
        toolkitIds: commaSeparatedToStringArray(newWorkbench.toolkitIds),
      };
    }),
});