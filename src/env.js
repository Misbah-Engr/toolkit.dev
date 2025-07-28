import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

const createAuthSchema = () => {
  const authSchema = {};

  if (process.env.AUTH_DISCORD_ID || process.env.AUTH_DISCORD_SECRET) {
    authSchema.AUTH_DISCORD_ID = z.string();
    authSchema.AUTH_DISCORD_SECRET = z.string();
  }

  if (process.env.AUTH_GOOGLE_ID || process.env.AUTH_GOOGLE_SECRET) {
    authSchema.AUTH_GOOGLE_ID = z.string();
    authSchema.AUTH_GOOGLE_SECRET = z.string();
  }

  if (process.env.AUTH_GITHUB_ID || process.env.AUTH_GITHUB_SECRET) {
    authSchema.AUTH_GITHUB_ID = z.string();
    authSchema.AUTH_GITHUB_SECRET = z.string();
  }

  if (process.env.AUTH_TWITTER_ID || process.env.AUTH_TWITTER_SECRET) {
    authSchema.AUTH_TWITTER_ID = z.string();
    authSchema.AUTH_TWITTER_SECRET = z.string();
  }

  if (process.env.AUTH_NOTION_ID || process.env.AUTH_NOTION_SECRET) {
    authSchema.AUTH_NOTION_ID = z.string();
    authSchema.AUTH_NOTION_SECRET = z.string();
  }

  return authSchema;
};

const authRuntimeEnv = () => {
  const object = {};

  if (process.env.AUTH_DISCORD_ID || process.env.AUTH_DISCORD_SECRET) {
    object.AUTH_DISCORD_ID = process.env.AUTH_DISCORD_ID;
    object.AUTH_DISCORD_SECRET = process.env.AUTH_DISCORD_SECRET;
  }

  if (process.env.AUTH_GOOGLE_ID || process.env.AUTH_GOOGLE_SECRET) {
    object.AUTH_GOOGLE_ID = process.env.AUTH_GOOGLE_ID;
    object.AUTH_GOOGLE_SECRET = process.env.AUTH_GOOGLE_SECRET;
  }

  if (process.env.AUTH_GITHUB_ID || process.env.AUTH_GITHUB_SECRET) {
    object.AUTH_GITHUB_ID = process.env.AUTH_GITHUB_ID;
    object.AUTH_GITHUB_SECRET = process.env.AUTH_GITHUB_SECRET;
  }

  if (process.env.AUTH_TWITTER_ID || process.env.AUTH_TWITTER_SECRET) {
    object.AUTH_TWITTER_ID = process.env.AUTH_TWITTER_ID;
    object.AUTH_TWITTER_SECRET = process.env.AUTH_TWITTER_SECRET;
  }

  if (process.env.AUTH_NOTION_ID || process.env.AUTH_NOTION_SECRET) {
    object.AUTH_NOTION_ID = process.env.AUTH_NOTION_ID;
    object.AUTH_NOTION_SECRET = process.env.AUTH_NOTION_SECRET;
  }

  if (process.env.AUTH_NOTION_ID || process.env.AUTH_NOTION_SECRET) {
    object.AUTH_NOTION_ID = process.env.AUTH_NOTION_ID;
    object.AUTH_NOTION_SECRET = process.env.AUTH_NOTION_SECRET;
  }

  return object;
};

const createImageModelSchema = () => {
  const imageModelSchema = {};

  if (process.env.OPENAI_API_KEY) {
    imageModelSchema.OPENAI_API_KEY = z.string();
  }

  if (process.env.XAI_API_KEY) {
    imageModelSchema.XAI_API_KEY = z.string();
  }

  if (process.env.FAL_API_KEY) {
    imageModelSchema.FAL_API_KEY = z.string();
  }

  if (process.env.FIREWORKS_API_KEY) {
    imageModelSchema.FIREWORKS_API_KEY = z.string();
  }

  if (process.env.LUMA_API_KEY) {
    imageModelSchema.LUMA_API_KEY = z.string();
  }

  return imageModelSchema;
};

const imageModelRuntimeEnv = () => {
  const object = {};

  if (process.env.OPENAI_API_KEY) {
    object.OPENAI_API_KEY = process.env.OPENAI_API_KEY;
  }

  if (process.env.XAI_API_KEY) {
    object.XAI_API_KEY = process.env.XAI_API_KEY;
  }

  if (process.env.FAL_API_KEY) {
    object.FAL_API_KEY = process.env.FAL_API_KEY;
  }

  if (process.env.FIREWORKS_API_KEY) {
    object.FIREWORKS_API_KEY = process.env.FIREWORKS_API_KEY;
  }

  if (process.env.LUMA_API_KEY) {
    object.LUMA_API_KEY = process.env.LUMA_API_KEY;
  }

  return object;
};

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    NEXTAUTH_URL: z.string().url(),
    AUTH_SECRET:
      process.env.NODE_ENV === "production"
        ? z.string()
        : z.string().optional(),
    DATABASE_URL: z.string().url(),
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
    PRISMA_LOG_QUERIES: z.string().optional(),
    OPENROUTER_API_KEY: z.string(),
    EXA_API_KEY: z.string().optional(),
    MEM0_API_KEY: z.string().optional(),
    E2B_API_KEY: z.string().optional(),
    GITHUB_TOKEN: z.string().optional(),
    ...createAuthSchema(),
    ...createImageModelSchema(),
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {
    // NEXT_PUBLIC_CLIENTVAR: z.string(),
  },

  experimental__runtimeEnv: {},
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
   * useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  /**
   * Makes it so that empty strings are treated as undefined. `SOME_VAR: z.string()` and
   * `SOME_VAR=''` will throw an error.
   */
  emptyStringAsUndefined: true,
});
