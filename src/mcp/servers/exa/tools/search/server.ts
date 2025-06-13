import { type baseSearchTool } from "./base";
import { env } from "@/env";
import { Exa } from "exa-js";
import type { ServerToolConfig } from "@/mcp/types";

export const exaSearchToolConfigServer: ServerToolConfig<
  typeof baseSearchTool.inputSchema.shape,
  typeof baseSearchTool.outputSchema.shape
> = {
  callback: async ({ query }) => {
    if (!env.EXA_API_KEY) {
      throw new Error("EXA_API_KEY is not set");
    }

    const exa = new Exa(env.EXA_API_KEY);

    const { results } = await exa.searchAndContents(query, {
      livecrawl: "always",
      numResults: 3,
    });

    return {
      results: results.map((result) => ({
        title: result.title,
        url: result.url,
        content: result.text.slice(0, 1000),
        publishedDate: result.publishedDate,
      })),
    };
  },
};
