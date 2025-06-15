import { GithubTools } from "./tools";
import { createClientToolkit } from "@/toolkits/create-toolkit";
import { baseGithubToolkitConfig } from "./base";
import {
  githubSearchReposToolConfigClient,
  githubRepoInfoToolConfigClient,
} from "./tools/client";
import { SiGithub } from "@icons-pack/react-simple-icons";
import { api } from "@/trpc/react";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { Loader2 } from "lucide-react";

export const githubClientToolkit = createClientToolkit(
  baseGithubToolkitConfig,
  {
    name: "GitHub",
    description: "Read data from the GitHub API",
    icon: SiGithub,
    form: null,
    addToolkitWrapper: ({ children }) => {
      const { data: hasAccount, isLoading } =
        api.accounts.hasProviderAccount.useQuery("github");

      if (isLoading) {
        return (
          <Button variant="outline" size="sm" disabled>
            <Loader2 className="size-4 animate-spin" />
          </Button>
        );
      }

      if (!hasAccount) {
        return (
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              void signIn("github", {
                callbackUrl: window.location.href,
              });
            }}
          >
            <SiGithub className="size-4" />
            Connect
          </Button>
        );
      }

      return children;
    },
  },
  {
    [GithubTools.SearchRepos]: githubSearchReposToolConfigClient,
    [GithubTools.RepoInfo]: githubRepoInfoToolConfigClient,
  },
);
