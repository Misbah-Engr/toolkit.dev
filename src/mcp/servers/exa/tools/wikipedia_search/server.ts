import { type baseWikipediaSearchTool } from "./base";
import { env } from "@/env";
import { Exa } from "exa-js";
import type { ServerToolConfig } from "@/mcp/types";

export const exaWikipediaSearchToolConfigServer: ServerToolConfig<
  typeof baseWikipediaSearchTool.inputSchema.shape,
  typeof baseWikipediaSearchTool.outputSchema.shape
> = {
  callback: async ({ query }) => {
    if (!env.EXA_API_KEY) {
      throw new Error("EXA_API_KEY is not set");
    }

    const exa = new Exa(env.EXA_API_KEY);

    const { results } = await exa.searchAndContents(query, {
      livecrawl: "always",
      numResults: 3,
      includeDomains: ["wikipedia.org"],
    });

    return {
      results: results.map((result) => ({
        title: result.title,
        url: result.url,
        content: result.text.slice(0, 1500),
        publishedDate: result.publishedDate,
        image: result.image,
        favicon: result.favicon,
        score: result.score,
        author: result.author,
      })),
    };
  },
  message:
    "The user is shown Wikipedia articles. Provide a concise summary of the encyclopedia information found.",
};