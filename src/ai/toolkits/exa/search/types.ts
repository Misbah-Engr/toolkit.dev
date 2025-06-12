import { type z } from "zod";

export type ExaSearchParams = z.ZodObject<{
  query: z.ZodString;
}>;

export type ExaSearchResult = {
  title: string | null;
  url: string;
  content: string;
  publishedDate?: string;
};
