import { type baseCompetitorFinderTool } from "./base";
import { env } from "@/env";
import { Exa } from "exa-js";
import type { ServerToolConfig } from "@/toolkits/types";

export const exaCompetitorFinderToolConfigServer: ServerToolConfig<
  typeof baseCompetitorFinderTool.inputSchema.shape,
  typeof baseCompetitorFinderTool.outputSchema.shape
> = {
  callback: async ({ company }) => {
    if (!env.EXA_API_KEY) {
      throw new Error("EXA_API_KEY is not set");
    }

    const exa = new Exa(env.EXA_API_KEY);

    const { results } = await exa.searchAndContents(
      `${company} competitors alternative companies similar services`,
      {
        livecrawl: "always",
        numResults: 5,
        type: "neural",
        useAutoprompt: true,
      },
    );

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
    "The user is shown competitor analysis results. Provide a summary of the main competitors found and their key differentiators.",
};
