import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const streamsRouter = createTRPCRouter({
  createStreamId: protectedProcedure
    .input(
      z.object({
        streamId: z.string(),
        chatId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.stream.create({
        data: {
          id: input.streamId,
          chatId: input.chatId,
          createdAt: new Date(),
        },
      });
    }),

  getStreamIdsByChatId: protectedProcedure
    .input(
      z.object({
        chatId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const streams = await ctx.db.stream.findMany({
        where: {
          chatId: input.chatId,
        },
        orderBy: {
          createdAt: "asc",
        },
        select: {
          id: true,
        },
      });

      return streams.map((stream) => stream.id);
    }),
});
