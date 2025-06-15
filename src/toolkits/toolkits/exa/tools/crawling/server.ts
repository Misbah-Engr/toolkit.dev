import { type baseCrawlingTool } from "./base";
import { env } from "@/env";
import { Exa } from "exa-js";
import type { ServerToolConfig } from "@/toolkits/types";

export const exaCrawlingToolConfigServer: ServerToolConfig<
  typeof baseCrawlingTool.inputSchema.shape,
  typeof baseCrawlingTool.outputSchema.shape
> = {
  callback: async ({ urls }) => {
    if (!env.EXA_API_KEY) {
      throw new Error("EXA_API_KEY is not set");
    }

    const exa = new Exa(env.EXA_API_KEY);

    const { results } = await exa.getContents(urls);

    return {
      results: results.map((result) => ({
        title: result.title,
        url: result.url,
        content: result.text,
        publishedDate: result.publishedDate,
        image: result.image,
        favicon: result.favicon,
        score: result.score,
        author: result.author,
      })),
    };
  },
  message:
    "The user is shown the extracted content from the URL. Provide a brief summary of what was found.",
};
