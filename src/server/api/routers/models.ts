import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

import { imageModels, languageModels } from "@/ai/models";

export const modelsRouter = createTRPCRouter({
  getLanguageModels: protectedProcedure.query(async ({}) => languageModels),
  getImageModels: protectedProcedure.query(async ({}) => imageModels),
});
