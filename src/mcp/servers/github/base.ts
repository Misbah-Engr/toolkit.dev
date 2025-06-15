import type { ToolkitConfig } from "@/mcp/types";
import { z } from "zod";
import { GithubTools } from "./tools";
import {
  searchRepositoriesTool,
  repoInfoTool,
  searchCodeTool,
  searchUsersTool,
} from "./tools";

export const githubParameters = z.object({});

export const baseGithubToolkitConfig: ToolkitConfig<
  GithubTools,
  typeof githubParameters.shape
> = {
  tools: {
    [GithubTools.SearchRepos]: searchRepositoriesTool,
    [GithubTools.RepoInfo]: repoInfoTool,
    [GithubTools.SearchCode]: searchCodeTool,
    [GithubTools.SearchUsers]: searchUsersTool,
  },
  parameters: githubParameters,
};
