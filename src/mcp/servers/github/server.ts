import { createServerToolkit } from "@/mcp/create-toolkit";
import { baseGithubToolkitConfig } from "./base";
import {
  githubSearchReposToolConfigServer,
  githubRepoInfoToolConfigServer,
} from "./tools/server";
import { GithubTools } from "./tools";
import { api } from "@/trpc/server";
import { Octokit } from "octokit";

export const githubToolkitServer = createServerToolkit(
  baseGithubToolkitConfig,
  async () => {
    const account = await api.accounts.getAccountByProvider("github");

    if (!account) {
      throw new Error("No account found");
    }

    const octokit = new Octokit({
      auth: account.access_token,
    });

    return {
      [GithubTools.SearchRepos]: githubSearchReposToolConfigServer(octokit),
      [GithubTools.RepoInfo]: githubRepoInfoToolConfigServer(octokit),
    };
  },
);
