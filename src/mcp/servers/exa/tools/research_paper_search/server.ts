import { type baseResearchPaperSearchTool } from "./base";
import { env } from "@/env";
import { Exa } from "exa-js";
import type { ServerToolConfig } from "@/mcp/types";

export const exaResearchPaperSearchToolConfigServer: ServerToolConfig<
  typeof baseResearchPaperSearchTool.inputSchema.shape,
  typeof baseResearchPaperSearchTool.outputSchema.shape
> = {
  callback: async ({ query }) => {
    if (!env.EXA_API_KEY) {
      throw new Error("EXA_API_KEY is not set");
    }

    const exa = new Exa(env.EXA_API_KEY);

    const { results } = await exa.searchAndContents(query, {
      livecrawl: "always",
      numResults: 3,
      includeDomains: ["arxiv.org", "scholar.google.com", "pubmed.ncbi.nlm.nih.gov", "researchgate.net", "ieee.org", "acm.org"],
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
    "The user is shown research papers in three cards. Do not list the sources again. Just give a 1-2 sentence summary response to their question and ask what else they would like to know.",
};