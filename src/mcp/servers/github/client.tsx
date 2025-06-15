import { GithubTools } from "./tools";
import { createClientToolkit } from "@/mcp/create-toolkit";
import { baseGithubToolkitConfig } from "./base";
import {
  githubSearchRepositoriesToolConfigClient,
  githubSearchCodeToolConfigClient,
  githubSearchUsersToolConfigClient,
  githubRepoInfoToolConfigClient,
} from "./tools/client";
import { SiGithub } from "@icons-pack/react-simple-icons";

export const githubClientToolkit = createClientToolkit(
  baseGithubToolkitConfig,
  {
    name: "GitHub",
    description: "Read data from the GitHub API",
    icon: SiGithub,
    form: null,
  },
  {
    [GithubTools.SearchRepos]: githubSearchRepositoriesToolConfigClient,
    [GithubTools.SearchCode]: githubSearchCodeToolConfigClient,
    [GithubTools.SearchUsers]: githubSearchUsersToolConfigClient,
    [GithubTools.RepoInfo]: githubRepoInfoToolConfigClient,
  },
);
