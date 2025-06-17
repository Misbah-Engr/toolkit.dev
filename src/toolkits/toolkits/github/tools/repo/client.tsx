import React from "react";

import Link from "next/link";

import { Badge } from "@/components/ui/badge";

import type { repoInfoTool } from "./base";
import type { ClientToolConfig } from "@/toolkits/types";
import { HStack, VStack } from "@/components/ui/stack";
import { GitCommit, GitPullRequest, Globe, Search, Star } from "lucide-react";
import { GithubAvatar } from "../../components/user-avatar";
import { ActivityChart } from "../../components/activity-chart";
import { SiGithub, SiX } from "@icons-pack/react-simple-icons";
import { Button } from "@/components/ui/button";

export const githubRepoInfoToolConfigClient: ClientToolConfig<
  typeof repoInfoTool.inputSchema.shape,
  typeof repoInfoTool.outputSchema.shape
> = {
  CallComponent: ({ args }) => {
    return (
      <HStack className="gap-2">
        <Search className="text-muted-foreground size-4" />
        <VStack className="items-start gap-0">
          <span className="text-muted-foreground/80 text-xs font-medium">
            Fetching Repository Info
          </span>
          <span className="text-sm">
            {`${args.owner}${args.name ? `/${args.name}` : ""}`}
          </span>
        </VStack>
      </HStack>
    );
  },
  ResultComponent: ({ result: { repo, commits, topContributors, owner } }) => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 md:flex-row">
          <VStack className="flex-1 items-start">
            <HStack className="flex-1">
              <GithubAvatar login={repo.owner} className="size-10" />
              <VStack className="items-start gap-0">
                <HStack className="items-center gap-2">
                  <h3 className="text-xl font-bold md:text-2xl">
                    {repo.owner}/{repo.name}
                  </h3>
                  {repo.language && (
                    <Badge variant={"primary"} className="text-xs">
                      <span className="text-xs">{repo.language}</span>
                    </Badge>
                  )}
                </HStack>
                <p className="text-muted-foreground text-xs">
                  {repo.description}
                </p>
              </VStack>
            </HStack>
            <HStack className="flex-wrap">
              <Link
                href={`https://github.com/${repo.owner}/${repo.name}`}
                target="_blank"
              >
                <Button variant={"outline"} size={"sm"}>
                  <SiGithub className="size-4" />
                  <span>Source Code</span>
                </Button>
              </Link>

              {repo.homepage && (
                <Link href={repo.homepage} target="_blank">
                  <Button variant={"outline"} size={"sm"}>
                    <Globe className="size-4" />
                    <span>Website</span>
                  </Button>
                </Link>
              )}

              {owner?.twitter_username && (
                <Link
                  href={`https://twitter.com/${owner.twitter_username}`}
                  target="_blank"
                >
                  <Button variant={"outline"} size={"sm"}>
                    <SiX className="size-4" />
                    <span>Twitter</span>
                  </Button>
                </Link>
              )}
            </HStack>
          </VStack>
          <div className="grid grid-cols-3 gap-0 rounded-lg p-0 md:grid-cols-1 md:gap-2 md:p-2">
            {[
              {
                icon: GitCommit,
                label: "Commits",
                value: repo.commits,
              },
              {
                icon: GitPullRequest,
                label: "PRs",
                value: repo.prs,
              },
              {
                icon: Star,
                label: "Stars",
                value: repo.stars,
              },
            ].map((item) => (
              <HStack
                key={item.label}
                className="flex-1 items-center justify-between gap-4"
              >
                <p className="text-muted-foreground hidden text-xs md:block">
                  {item.label}
                </p>
                <HStack key={item.label} className="gap-1 font-medium">
                  <item.icon className="size-4" />
                  {item.value.toLocaleString()}
                </HStack>
              </HStack>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <ActivityChart
            data={commits.map((commit) => ({
              timestamp: commit.date,
              count: commit.count,
            }))}
          />
        </div>
        <div className="flex flex-col">
          {topContributors.map((contributor, index) => (
            <HStack
              key={index}
              className="group w-full cursor-pointer items-center justify-between border-b py-2 last:border-b-0 last:pb-0"
            >
              <HStack>
                <div className="size-6 shrink-0 overflow-hidden rounded-sm">
                  <GithubAvatar
                    login={contributor.login}
                    className="size-full"
                  />
                </div>
                <h3 className="group-hover:text-primary transition-colors">
                  {contributor.login}
                </h3>
              </HStack>
              <HStack className="items-center gap-4">
                <HStack className="gap-1 text-sm">
                  <GitPullRequest className="text-primary size-4" />
                  {contributor.prs}
                </HStack>
                <HStack className="gap-1 text-sm">
                  <GitCommit className="text-primary size-4" />
                  {contributor.commits}
                </HStack>
              </HStack>
            </HStack>
          ))}
        </div>
      </div>
    );
  },
};
