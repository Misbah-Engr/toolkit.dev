import type { ToolkitConfig } from "@/mcp/types";
import { z } from "zod";
import { GithubTools } from "./tools";
import { baseSearchReposTool, repoInfoTool } from "./tools";

export const githubParameters = z.object({});

export const baseGithubToolkitConfig: ToolkitConfig<
  GithubTools,
  typeof githubParameters.shape
> = {
  tools: {
    [GithubTools.SearchRepos]: baseSearchReposTool,
    [GithubTools.RepoInfo]: repoInfoTool,
  },
  parameters: githubParameters,
};
