import { z } from "zod";
import { createBaseTool } from "@/toolkits/create-tool";

export const repoInfoTool = createBaseTool({
  description: "Get information about a repository on GitHub",
  inputSchema: z.object({
    owner: z.string().describe("The owner of the repository"),
    name: z.string().describe("The name of the repository"),
  }),
  outputSchema: z.object({
    repo: z.object({
      owner: z.string().describe("The owner of the repository"),
      name: z.string().describe("The name of the repository"),
      description: z.string().describe("The description of the repository"),
      url: z.string().describe("The URL of the repository"),
      stars: z.number().describe("The number of stars the repository has"),
      forks: z.number().describe("The number of forks the repository has"),
      issues: z.number().describe("The number of issues the repository has"),
      prs: z
        .number()
        .describe("The number of pull requests the repository has"),
      commits: z
        .number()
        .describe("The total number of commits the repository has"),
      homepage: z.string().nullish().describe("The homepage of the repository"),
      language: z.string().nullish().describe("The language of the repository"),
    }),
    owner: z.object({
      twitter_username: z
        .string()
        .nullish()
        .describe("The Twitter username of the owner"),
      email: z.string().nullish().describe("The email of the owner"),
      company: z.string().nullish().describe("The company the owner works for"),
      location: z.string().nullish().describe("The location of the owner"),
    }),
    commits: z
      .array(
        z.object({
          date: z.string().describe("The date of the commit"),
          count: z.number().describe("The number of commits on that date"),
        }),
      )
      .describe(
        "The number of commits on each day since the repository was created",
      ),
    topContributors: z
      .array(
        z.object({
          login: z.string().describe("The login of the contributor"),
          commits: z
            .number()
            .describe("The number of commits the contributor has made"),
          prs: z
            .number()
            .describe("The number of pull requests the contributor has made"),
        }),
      )
      .describe("The top 5 contributors to the repository"),
  }),
});
