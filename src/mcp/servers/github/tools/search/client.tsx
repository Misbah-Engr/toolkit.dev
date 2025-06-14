import React from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Markdown } from "@/components/ui/markdown";

import type { 
  searchRepositoriesTool, 
  searchCodeTool, 
  searchUsersTool,
  baseSearchReposTool 
} from "./base";
import type { ClientToolConfig } from "@/mcp/types";
import { HStack, VStack } from "@/components/ui/stack";
import { GitFork, Search, Star, Code, User, Building2, MapPin } from "lucide-react";
import { GithubAvatar } from "../../components/user-avatar";

export const githubSearchRepositoriesToolConfigClient: ClientToolConfig<
  typeof searchRepositoriesTool.inputSchema.shape,
  typeof searchRepositoriesTool.outputSchema.shape
> = {
  CallComponent: ({ args }) => {
    return (
      <HStack className="gap-2">
        <Search className="text-muted-foreground size-4" />
        <VStack className="items-start gap-0">
          <span className="text-muted-foreground/80 text-xs font-medium">
            Search Repositories
          </span>
          <span className="text-sm">&quot;{args.query}&quot;</span>
        </VStack>
      </HStack>
    );
  },
  ResultComponent: ({ result }) => {
    if (!result.repositories.length) {
      return <div className="text-gray-500">No repositories found</div>;
    }

    return (
      <div className="">
        <h1 className="text-muted-foreground text-sm font-medium">
          Repository Search Results
        </h1>
        <div className="flex flex-col">
          {result.repositories.map((repo, index) => (
            <Dialog key={index}>
              <DialogTrigger asChild>
                <HStack className="group w-full cursor-pointer items-center border-b py-2 last:border-b-0 last:pb-0">
                  <div className="mt-1 size-6 shrink-0 overflow-hidden rounded-sm">
                    <GithubAvatar login={repo.full_name.split('/')[0]} className="size-full" />
                  </div>
                  <VStack className="group flex w-full cursor-pointer items-start gap-0">
                    <h3 className="line-clamp-2 transition-colors group-hover:text-blue-600">
                      {repo.full_name}
                    </h3>
                    <p className="text-muted-foreground text-xs">
                      {repo.description || "_No description_"}
                    </p>
                    {repo.updated && (
                      <p className="text-muted-foreground text-xs">
                        Updated: {repo.updated}
                      </p>
                    )}
                  </VStack>
                  <HStack className="items-center gap-4">
                    <HStack className="gap-1 text-sm">
                      <Star className="size-4 text-yellow-500" />
                      {repo.stars.toLocaleString()}
                    </HStack>
                    {repo.language && (
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                        {repo.language}
                      </span>
                    )}
                  </HStack>
                </HStack>
              </DialogTrigger>
              <DialogContent className="max-h-[80vh] max-w-3xl overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>{repo.full_name}</DialogTitle>
                </DialogHeader>
                <div className="mt-4 space-y-4">
                  <div className="text-sm text-gray-500">
                    {repo.stars.toLocaleString()} stars
                    {repo.language && ` • ${repo.language}`}
                  </div>
                  <Markdown>{repo.description || "_No description available_"}</Markdown>
                  <div className="pt-4">
                    <a
                      href={`https://github.com/${repo.full_name}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      View on GitHub
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

export const githubSearchCodeToolConfigClient: ClientToolConfig<
  typeof searchCodeTool.inputSchema.shape,
  typeof searchCodeTool.outputSchema.shape
> = {
  CallComponent: ({ args }) => {
    return (
      <HStack className="gap-2">
        <Code className="text-muted-foreground size-4" />
        <VStack className="items-start gap-0">
          <span className="text-muted-foreground/80 text-xs font-medium">
            Search Code
          </span>
          <span className="text-sm">&quot;{args.q}&quot;</span>
        </VStack>
      </HStack>
    );
  },
  ResultComponent: ({ result }) => {
    if (!result.results.length) {
      return <div className="text-gray-500">No code results found</div>;
    }

    return (
      <div className="">
        <h1 className="text-muted-foreground text-sm font-medium">
          Code Search Results
        </h1>
        <div className="flex flex-col">
          {result.results.map((item, index) => (
            <Dialog key={index}>
              <DialogTrigger asChild>
                <VStack className="group w-full cursor-pointer items-start border-b py-2 last:border-b-0 last:pb-0">
                  <HStack className="items-center gap-2">
                    <div className="size-4 shrink-0 overflow-hidden rounded-sm">
                      <GithubAvatar login={item.repository.split('/')[0]} className="size-full" />
                    </div>
                    <h3 className="line-clamp-1 transition-colors group-hover:text-blue-600 font-medium">
                      {item.repository}
                    </h3>
                    <span className="text-muted-foreground text-xs">
                      / {item.path}
                    </span>
                  </HStack>
                  {item.match && (
                    <pre className="text-xs bg-gray-50 p-2 rounded overflow-x-auto w-full">
                      <code>{item.match.trim()}</code>
                    </pre>
                  )}
                </VStack>
              </DialogTrigger>
              <DialogContent className="max-h-[80vh] max-w-4xl overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>{item.repository} / {item.path}</DialogTitle>
                </DialogHeader>
                <div className="mt-4 space-y-4">
                  {item.match && (
                    <div>
                      <h4 className="text-sm font-medium mb-2">Code Match:</h4>
                      <pre className="text-sm bg-gray-50 p-4 rounded overflow-x-auto">
                        <code>{item.match}</code>
                      </pre>
                    </div>
                  )}
                  <div className="pt-4 space-y-2">
                    <a
                      href={`https://github.com/${item.repository}/blob/main/${item.path}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 block"
                    >
                      View file on GitHub
                    </a>
                    <a
                      href={`https://github.com/${item.repository}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 block"
                    >
                      View repository on GitHub
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

export const githubSearchUsersToolConfigClient: ClientToolConfig<
  typeof searchUsersTool.inputSchema.shape,
  typeof searchUsersTool.outputSchema.shape
> = {
  CallComponent: ({ args }) => {
    return (
      <HStack className="gap-2">
        <User className="text-muted-foreground size-4" />
        <VStack className="items-start gap-0">
          <span className="text-muted-foreground/80 text-xs font-medium">
            Search Users
          </span>
          <span className="text-sm">&quot;{args.q}&quot;</span>
        </VStack>
      </HStack>
    );
  },
  ResultComponent: ({ result }) => {
    if (!result.users.length) {
      return <div className="text-gray-500">No users found</div>;
    }

    return (
      <div className="">
        <h1 className="text-muted-foreground text-sm font-medium">
          User Search Results
        </h1>
        <div className="flex flex-col">
          {result.users.map((user, index) => (
            <Dialog key={index}>
              <DialogTrigger asChild>
                <HStack className="group w-full cursor-pointer items-center border-b py-2 last:border-b-0 last:pb-0">
                  <div className="size-8 shrink-0 overflow-hidden rounded-full">
                    <GithubAvatar login={user.login} className="size-full" />
                  </div>
                  <VStack className="group flex w-full cursor-pointer items-start gap-0">
                    <HStack className="items-center gap-2">
                      <h3 className="line-clamp-1 transition-colors group-hover:text-blue-600 font-medium">
                        {user.login}
                      </h3>
                      {user.name && user.name !== user.login && (
                        <span className="text-muted-foreground text-sm">
                          ({user.name})
                        </span>
                      )}
                      {user.type === "Organization" && (
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          ORG
                        </span>
                      )}
                    </HStack>
                    {user.bio && (
                      <p className="text-muted-foreground text-xs italic">
                        {user.bio}
                      </p>
                    )}
                    <HStack className="items-center gap-3 text-xs text-muted-foreground">
                      {user.followers && (
                        <span>{user.followers.toLocaleString()} followers</span>
                      )}
                      {user.repos && (
                        <span>{user.repos} repos</span>
                      )}
                      {user.location && (
                        <span>{user.location}</span>
                      )}
                      {user.company && (
                        <span>{user.company}</span>
                      )}
                    </HStack>
                  </VStack>
                </HStack>
              </DialogTrigger>
              <DialogContent className="max-h-[80vh] max-w-3xl overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>
                    <HStack className="items-center gap-2">
                      <GithubAvatar login={user.login} className="size-8" />
                      {user.login}
                      {user.type === "Organization" && (
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          ORG
                        </span>
                      )}
                    </HStack>
                  </DialogTitle>
                </DialogHeader>
                <div className="mt-4 space-y-4">
                  {user.name && user.name !== user.login && (
                    <div>
                      <h4 className="text-sm font-medium">Name</h4>
                      <p className="text-sm">{user.name}</p>
                    </div>
                  )}
                  {user.bio && (
                    <div>
                      <h4 className="text-sm font-medium">Bio</h4>
                      <p className="text-sm">{user.bio}</p>
                    </div>
                  )}
                  <HStack className="items-start gap-6">
                    {user.location && (
                      <VStack className="items-start gap-1">
                        <HStack className="items-center gap-1">
                          <MapPin className="size-4" />
                          <span className="text-sm font-medium">Location</span>
                        </HStack>
                        <span className="text-sm">{user.location}</span>
                      </VStack>
                    )}
                    {user.company && (
                      <VStack className="items-start gap-1">
                        <HStack className="items-center gap-1">
                          <Building2 className="size-4" />
                          <span className="text-sm font-medium">Company</span>
                        </HStack>
                        <span className="text-sm">{user.company}</span>
                      </VStack>
                    )}
                  </HStack>
                  <HStack className="items-center gap-6">
                    {user.followers && (
                      <div className="text-sm">
                        <strong>{user.followers.toLocaleString()}</strong> followers
                      </div>
                    )}
                    {user.repos && (
                      <div className="text-sm">
                        <strong>{user.repos}</strong> public repos
                      </div>
                    )}
                  </HStack>
                  <div className="pt-4">
                    <a
                      href={`https://github.com/${user.login}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      View on GitHub
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

// Keep the old export for backwards compatibility
export const githubSearchReposToolConfigClient = githubSearchRepositoriesToolConfigClient;
