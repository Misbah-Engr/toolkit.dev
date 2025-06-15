import {
  type searchRepositoriesTool,
  type searchCodeTool,
  type searchUsersTool,
} from "./base";
import { type Octokit } from "octokit";
import type { ServerToolConfig } from "@/toolkits/types";

export const githubSearchRepositoriesToolConfigServer = (
  octokit: Octokit,
): ServerToolConfig<
  typeof searchRepositoriesTool.inputSchema.shape,
  typeof searchRepositoriesTool.outputSchema.shape
> => {
  return {
    callback: async ({ query, per_page = 10, page = 1 }) => {
      try {
        const response = await octokit.rest.search.repos({
          q: query,
          per_page,
          page,
        });

        // Extract only essential information
        const repositories = response.data.items.map((repo) => ({
          full_name: repo.full_name,
          description: repo.description
            ? repo.description.slice(0, 150) +
              (repo.description.length > 150 ? "..." : "")
            : null,
          stars: repo.stargazers_count,
          language: repo.language,
        }));

        return { repositories };
      } catch (e: unknown) {
        console.error(e);
        throw new Error(`GitHub API error`);
      }
    },
    message:
      "The user is shown a list of repositories matching their search query. Do not reiterate them in your next message. Give a 1-2 sentence summary of the repositories as whole.",
  };
};

export const githubSearchCodeToolConfigServer = (
  octokit: Octokit,
): ServerToolConfig<
  typeof searchCodeTool.inputSchema.shape,
  typeof searchCodeTool.outputSchema.shape
> => {
  return {
    callback: async ({ q, sort, order, per_page = 10, page = 1 }) => {
      try {
        const response = await octokit.rest.search.code({
          q,
          sort,
          order,
          per_page,
          page,
          mediaType: {
            format: "text-match",
          },
        });

        // Extract only essential information including text matches
        const results = response.data.items.map((item) => ({
          repository: item.repository.full_name,
          path: item.path,
          // Only include the first match fragment for conciseness
          match: item.text_matches?.[0]?.fragment?.slice(0, 200) ?? null,
        }));

        return { results };
      } catch (e: unknown) {
        console.error(e);
        throw new Error(`GitHub API error`);
      }
    },
    message:
      "The user is shown a list of code matches in GitHub repositories. Do not reiterate them in your next message. Give a 1-2 sentence summary of the code matches as whole.",
  };
};

export const githubSearchUsersToolConfigServer = (
  octokit: Octokit,
): ServerToolConfig<
  typeof searchUsersTool.inputSchema.shape,
  typeof searchUsersTool.outputSchema.shape
> => {
  return {
    callback: async ({ q, sort, order, per_page, page }) => {
      try {
        const response = await octokit.rest.search.users({
          q,
          sort,
          order,
          per_page,
          page,
        });

        const users = await Promise.all(
          response.data.items.map(async (user) => {
            const repos = await octokit.rest.users.getByUsername({
              username: user.login,
            });

            return {
              login: user.login,
              type: user.type,
              name: repos.data.name,
              bio: repos.data.bio,
              location: repos.data.location,
              company: repos.data.company,
              repos: repos.data.public_repos,
              followers: repos.data.followers,
            };
          }),
        );

        return { users };
      } catch (e) {
        console.error(e);
        throw new Error(`GitHub API error`);
      }
    },
    message:
      "The user is shown a list of users matching their search query. Do not reiterate them in your next message. Give a 1-2 sentence summary of the users as whole.",
  };
};

// Keep the old export for backwards compatibility
export const githubSearchReposToolConfigServer =
  githubSearchRepositoriesToolConfigServer;
