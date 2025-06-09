import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

import { models } from "@/lib/ai/models";

export const modelsRouter = createTRPCRouter({
  getModels: protectedProcedure.query(async ({}) => models),
});
