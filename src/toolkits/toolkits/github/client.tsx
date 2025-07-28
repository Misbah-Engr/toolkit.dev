import { SiGithub } from "@icons-pack/react-simple-icons";

import { createClientToolkit } from "@/toolkits/create-toolkit";

import { baseGithubToolkitConfig } from "./base";
import { GithubTools } from "./tools";
import {
  githubSearchReposToolConfigClient,
  githubRepoInfoToolConfigClient,
  githubSearchCodeToolConfigClient,
  githubSearchUsersToolConfigClient,
} from "./tools/client";

import { ToolkitGroups } from "@/toolkits/types";

import { GithubWrapper } from "./wrapper";

export const githubClientToolkit = createClientToolkit(
  baseGithubToolkitConfig,
  {
    name: "GitHub",
    description: "Find and analyze repositories, users, and organizations",
    icon: SiGithub,
    form: null,
    Wrapper: GithubWrapper,
    type: ToolkitGroups.DataSource,
  },
  {
    [GithubTools.SearchRepos]: githubSearchReposToolConfigClient,
    [GithubTools.RepoInfo]: githubRepoInfoToolConfigClient,
    [GithubTools.SearchCode]: githubSearchCodeToolConfigClient,
    [GithubTools.SearchUsers]: githubSearchUsersToolConfigClient,
  },
);
