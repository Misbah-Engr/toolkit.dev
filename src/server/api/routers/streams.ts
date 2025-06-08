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
      try {
        return await ctx.db.stream.create({
          data: {
            id: input.streamId,
            chatId: input.chatId,
            createdAt: new Date(),
          },
        });
      } catch (_) {
        throw new Error("Failed to create stream id");
      }
    }),

  getStreamIdsByChatId: protectedProcedure
    .input(
      z.object({
        chatId: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      try {
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
      } catch (error) {
        throw new Error("Failed to get stream ids by chat id");
      }
    }),
});
