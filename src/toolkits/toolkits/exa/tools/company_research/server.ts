import { type baseCompanyResearchTool } from "./base";
import { env } from "@/env";
import { Exa } from "exa-js";
import type { ServerToolConfig } from "@/toolkits/types";

export const exaCompanyResearchToolConfigServer: ServerToolConfig<
  typeof baseCompanyResearchTool.inputSchema.shape,
  typeof baseCompanyResearchTool.outputSchema.shape
> = {
  callback: async ({ company }) => {
    if (!env.EXA_API_KEY) {
      throw new Error("EXA_API_KEY is not set");
    }

    const exa = new Exa(env.EXA_API_KEY);

    const { results } = await exa.searchAndContents(
      `${company} company profile business information`,
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
    "The user is shown comprehensive company research results. Provide a summary of the key business information found and ask if they need more specific details.",
};
