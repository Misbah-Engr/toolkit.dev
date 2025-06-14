import { GithubTools } from "./tools";
import { createClientToolkit } from "@/mcp/create-toolkit";
import { baseGithubToolkitConfig } from "./base";
import {
  githubSearchReposToolConfigClient,
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
    [GithubTools.SearchRepos]: githubSearchReposToolConfigClient,
    [GithubTools.RepoInfo]: githubRepoInfoToolConfigClient,
  },
);
