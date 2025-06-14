import { z } from "zod";
import { createBaseTool } from "@/mcp/create-tool";

export const baseSearchReposTool = createBaseTool({
  description: "Search for repositories on GitHub",
  inputSchema: z.object({
    query: z.string().describe("The query to search for"),
    page: z.number().describe("The page number to search for (default: 1)"),
    per_page: z
      .number()
      .describe("The number of results per page (default: 5)"),
  }),
  outputSchema: z.object({
    repos: z.array(
      z.object({
        owner: z.string().describe("The owner of the repository"),
        name: z.string().describe("The name of the repository"),
        description: z.string().describe("The description of the repository"),
        url: z.string().describe("The URL of the repository"),
        stars: z.number().describe("The number of stars the repository has"),
        forks: z.number().describe("The number of forks the repository has"),
        issues: z.number().describe("The number of issues the repository has"),
      }),
    ),
  }),
});
