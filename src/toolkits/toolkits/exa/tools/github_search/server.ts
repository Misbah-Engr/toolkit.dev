import { type baseGithubSearchTool } from "./base";
import { env } from "@/env";
import { Exa } from "exa-js";
import type { ServerToolConfig } from "@/toolkits/types";

export const exaGithubSearchToolConfigServer: ServerToolConfig<
  typeof baseGithubSearchTool.inputSchema.shape,
  typeof baseGithubSearchTool.outputSchema.shape
> = {
  callback: async ({ query }) => {
    if (!env.EXA_API_KEY) {
      throw new Error("EXA_API_KEY is not set");
    }

    const exa = new Exa(env.EXA_API_KEY);

    const { results } = await exa.searchAndContents(query, {
      livecrawl: "always",
      numResults: 5,
      includeDomains: ["github.com"],
    });

    return {
      results: results.map((result) => ({
        title: result.title,
        url: result.url,
        content: result.text.slice(0, 1000),
        publishedDate: result.publishedDate,
        image: result.image,
        favicon: result.favicon,
        score: result.score,
        author: result.author,
      })),
    };
  },
  message:
    "The user is shown GitHub repositories and accounts. Provide a summary of the development projects and code found.",
};
