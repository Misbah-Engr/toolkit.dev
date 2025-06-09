import { z } from "zod";

import { models } from "@/lib/ai/models";

import type { providers } from "@/lib/ai/registry";

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
          contentType: z.enum(["image/png", "image/jpg", "image/jpeg"]),
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
});

export type PostRequestBody = z.infer<typeof postRequestBodySchema>;
