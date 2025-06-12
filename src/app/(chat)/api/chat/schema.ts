import { z } from "zod";

import { models } from "@/ai/models";

import type { providers } from "@/ai/registry";
import { SearchOptions } from "@/ai/types";

const textPartSchema = z.object({
  text: z.string().min(1).max(2000),
  type: z.enum(["text"]),
});

export const postRequestBodySchema = z.object({
  id: z.string().uuid(),
  message: z.object({
    id: z.string().uuid(),
    createdAt: z.coerce.date(),
    role: z.enum(["user"]),
    content: z.string().min(1).max(2000),
    parts: z.array(textPartSchema),
    experimental_attachments: z
      .array(
        z.object({
          url: z.string().url(),
          name: z.string().min(1).max(2000),
          contentType: z.enum([
            "image/png",
            "image/jpg",
            "image/jpeg",
            "application/pdf",
          ]),
        }),
      )
      .optional(),
  }),
  selectedChatModel: z.enum(
    models.map((model) => `${model.provider}:${model.modelId}`) as [
      `${keyof typeof providers}:${string}`,
      ...`${keyof typeof providers}:${string}`[],
    ],
  ),
  selectedVisibilityType: z.enum(["public", "private"]),
  searchOption: z.nativeEnum(SearchOptions).optional(),
});

export type PostRequestBody = z.infer<typeof postRequestBodySchema>;
