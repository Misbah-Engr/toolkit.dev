import { type baseSearchReposTool } from "./base";
import { type Octokit } from "octokit";
import type { ServerToolConfig } from "@/mcp/types";

export const githubSearchReposToolConfigServer = (
  octokit: Octokit,
): ServerToolConfig<
  typeof baseSearchReposTool.inputSchema.shape,
  typeof baseSearchReposTool.outputSchema.shape
> => {
  return {
    callback: async ({ query, page, per_page }) => {
      console.log("query", query);

      const { data: repos } = await octokit.rest.search.repos({
        q: query,
        sort: "stars",
        order: "desc",
        per_page,
        page,
      });

      return {
        repos: repos.items.map((repo) => ({
          owner: repo.owner?.login ?? "",
          name: repo.name,
          description: repo.description ?? "",
          url: repo.html_url,
          stars: repo.stargazers_count,
          forks: repo.forks_count,
          issues: repo.open_issues_count,
        })),
      };
    },
    message:
      "The user is shown all repositories in the UI. Do not reiterate them. Give a 1-2 sentence summary of the results and ask the user what they would like to do next.",
  };
};
