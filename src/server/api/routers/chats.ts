import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";

export const chatsRouter = createTRPCRouter({
  getChats: protectedProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).default(10),
        cursor: z.string().nullish(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const { limit, cursor } = input;

      const items = await ctx.db.chat.findMany({
        where: {
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

  getChat: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      return ctx.db.chat.findUnique({
        where: {
          id: input,
        },
      });
    }),

  createChat: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        visibility: z.enum(["public", "private"]),
        userId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.chat.create({
        data: input,
      });
    }),

  updateChatVisibility: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        visibility: z.enum(["public", "private"]),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.chat.update({
        where: {
          id: input.id,
          userId: ctx.session.user.id,
        },
        data: { visibility: input.visibility },
      });
    }),

  deleteChat: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      return ctx.db.chat.delete({
        where: { id: input },
      });
    }),
});
