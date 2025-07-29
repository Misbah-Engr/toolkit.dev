import { z } from "zod";
import { createBaseTool } from "@/toolkits/create-tool";

export const searchRepositoriesTool = createBaseTool({
  description:
    "Search for GitHub repositories. Returns a concise list with essential information. Use 'get_repository' for detailed information about a specific repository.",
  inputSchema: z.object({
    query: z
      .string()
      .describe(
        "Search query. Examples: 'language:typescript stars:>1000', 'org:facebook react', 'machine learning in:description', 'user:octocat', 'created:>2023-01-01', 'license:mit', 'topic:javascript', 'is:public archived:false'",
      ),
    per_page: z.number().describe("Results per page (max 100), default to 5"),
    page: z.number().describe("Page number"),
  }),
  outputSchema: z.object({
    repositories: z.array(
      z.object({
        full_name: z.string(),
        description: z.string().nullable(),
        stars: z.number(),
        language: z.string().nullable(),
        updated: z.string().optional(),
      }),
    ),
  }),
});

export const searchCodeTool = createBaseTool({
  description:
    "Search for code across GitHub repositories. Returns a concise list with file paths and repositories. Use 'get_file_contents' for full file content.",
  inputSchema: z.object({
    q: z
      .string()
      .describe(
        "Search query using GitHub code search syntax. Examples: 'addClass in:file language:js', 'repo:owner/name path:src/ extension:py', 'org:github extension:js', 'filename:test.py', 'user:octocat extension:rb', 'TODO in:comments'",
      ),
    sort: z.enum(["indexed"]).describe("Sort field ('indexed' only)"),
    order: z.enum(["asc", "desc"]).describe("Sort order"),
    per_page: z.number().describe("Results per page (max 100), default to 5"),
    page: z.number().describe("Page number"),
  }),
  outputSchema: z.object({
    results: z.array(
      z.object({
        repository: z.string(),
        path: z.string(),
        match: z.string().nullable(),
      }),
    ),
  }),
});

export const searchUsersTool = createBaseTool({
  description: "Search for GitHub users.",
  inputSchema: z.object({
    q: z
      .string()
      .describe(
        "Search query using GitHub users search syntax. Examples: 'location:\"San Francisco\" followers:>100', 'language:python repos:>50', 'fullname:\"John Doe\"', 'type:user', 'type:org', 'created:>2020-01-01', 'in:email example.com'",
      ),
    sort: z
      .enum(["followers", "repositories", "joined"])
      .describe("Sort field by category"),
    order: z.enum(["asc", "desc"]).describe("Sort order"),
    per_page: z.number().describe("Results per page (max 100), default to 5"),
    page: z.number().describe("Page number"),
  }),
  outputSchema: z.object({
    users: z.array(
      z.object({
        login: z.string(),
        type: z.string(),
        name: z.string().nullish(),
        bio: z.string().nullish(),
        location: z.string().nullish(),
        company: z.string().nullish(),
        repos: z.number().nullish(),
        followers: z.number().nullish(),
      }),
    ),
  }),
});

// Keep the old export for backwards compatibility
export const baseSearchReposTool = searchRepositoriesTool;
