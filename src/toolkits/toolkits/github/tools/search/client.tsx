import React from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Markdown } from "@/components/ui/markdown";

import type { baseSearchReposTool } from "./base";
import type { ClientToolConfig } from "@/toolkits/types";
import { HStack, VStack } from "@/components/ui/stack";
import { GitFork, Search, Star } from "lucide-react";
import { GithubAvatar } from "../../components/user-avatar";

export const githubSearchReposToolConfigClient: ClientToolConfig<
  typeof baseSearchReposTool.inputSchema.shape,
  typeof baseSearchReposTool.outputSchema.shape
> = {
  CallComponent: ({ args }) => {
    return (
      <HStack className="gap-2">
        <Search className="text-muted-foreground size-4" />
        <VStack className="items-start gap-0">
          <span className="text-muted-foreground/80 text-xs font-medium">
            Search Query
          </span>
          <span className="text-sm">&quot;{args.query}&quot;</span>
        </VStack>
      </HStack>
    );
  },
  ResultComponent: ({ result }) => {
    if (!result.repos.length) {
      return <div className="text-gray-500">No repos found</div>;
    }

    return (
      <div className="">
        <h1 className="text-muted-foreground text-sm font-medium">
          Search Results
        </h1>
        <div className="flex flex-col">
          {result.repos.map((repo, index) => (
            <Dialog key={index}>
              <DialogTrigger asChild>
                <HStack className="group w-full cursor-pointer items-center border-b py-2 last:border-b-0 last:pb-0">
                  <div className="mt-1 size-6 shrink-0 overflow-hidden rounded-sm">
                    <GithubAvatar login={repo.owner} className="size-full" />
                  </div>
                  <VStack className="group flex w-full cursor-pointer items-start gap-0">
                    <h3 className="line-clamp-2 transition-colors group-hover:text-blue-600">
                      {repo.name}
                    </h3>
                    <p className="text-muted-foreground text-xs">
                      {repo.description}
                    </p>
                  </VStack>
                  <HStack className="items-center gap-4">
                    <HStack className="gap-1 text-sm">
                      <Star className="size-4 text-yellow-500" />
                      {repo.stars.toLocaleString()}
                    </HStack>
                    <HStack className="gap-1 text-sm">
                      <GitFork className="size-4" />
                      {repo.forks.toLocaleString()}
                    </HStack>
                  </HStack>
                </HStack>
              </DialogTrigger>
              <DialogContent className="max-h-[80vh] max-w-3xl overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>{repo.name}</DialogTitle>
                </DialogHeader>
                <div className="mt-4 space-y-4">
                  <div className="text-sm text-gray-500">
                    {repo.stars} stars
                  </div>
                  <Markdown>{repo.description}</Markdown>
                  <div className="pt-4">
                    <a
                      href={repo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      See on GitHub
                    </a>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    );
  },
};
