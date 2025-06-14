import { 
  searchRepositoriesTool, 
  searchCodeTool, 
  searchUsersTool,
  baseSearchReposTool 
} from "./base";
import { type Octokit } from "octokit";
import type { ServerToolConfig } from "@/mcp/types";

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
        const repositories = response.data.items.map((repo: any) => ({
          full_name: repo.full_name,
          description: repo.description
            ? repo.description.slice(0, 150) + 
              (repo.description.length > 150 ? "..." : "")
            : null,
          stars: repo.stargazers_count,
          language: repo.language,
          // Only include updated_at if it's recent (within last year)
          ...(new Date(repo.updated_at).getTime() >
          Date.now() - 365 * 24 * 60 * 60 * 1000
            ? { updated: new Date(repo.updated_at).toISOString().split("T")[0] }
            : {}),
        }));

        return { repositories };
      } catch (e: any) {
        throw new Error(`GitHub API error: ${e.message}`);
      }
    },
    message: "Found repositories matching your search. You can click on any repository to see more details or ask me to search for something else.",
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
        const results = response.data.items.map((item: any) => ({
          repository: item.repository.full_name,
          path: item.path,
          // Only include the first match fragment for conciseness
          match: item.text_matches?.[0]?.fragment?.slice(0, 200) || null,
        }));

        return { results };
      } catch (e: any) {
        throw new Error(`GitHub API error: ${e.message}`);
      }
    },
    message: "Found code matches in GitHub repositories. You can click on any result to see more details or ask me to search for different code patterns.",
  };
};

export const githubSearchUsersToolConfigServer = (
  octokit: Octokit,
): ServerToolConfig<
  typeof searchUsersTool.inputSchema.shape,
  typeof searchUsersTool.outputSchema.shape
> => {
  return {
    callback: async ({ q, sort, order, per_page = 10, page = 1 }) => {
      try {
        const response = await octokit.rest.search.users({
          q,
          sort,
          order,
          per_page,
          page,
        });

        // Extract only essential information
        const users = response.data.items.map((user: any) => ({
          login: user.login,
          type: user.type,
          // Only include name if it exists and is different from login
          ...(user.name && user.name !== user.login ? { name: user.name } : {}),
          // Include bio if it exists (truncated)
          ...(user.bio
            ? {
                bio: user.bio.slice(0, 100) + (user.bio.length > 100 ? "..." : ""),
              }
            : {}),
          // Include location if it exists
          ...(user.location ? { location: user.location } : {}),
          // Include company if it exists
          ...(user.company ? { company: user.company } : {}),
          // Include public repos if > 0
          ...(user.public_repos && user.public_repos > 0
            ? { repos: user.public_repos }
            : {}),
          // Only include followers if > 0
          ...(user.followers && user.followers > 0
            ? { followers: user.followers }
            : {}),
        }));

        return { users };
      } catch (e: any) {
        throw new Error(`GitHub API error: ${e.message}`);
      }
    },
    message: "Found GitHub users matching your search criteria. You can click on any user to see more details or ask me to search for different users.",
  };
};

// Keep the old export for backwards compatibility
export const githubSearchReposToolConfigServer = githubSearchRepositoriesToolConfigServer;
