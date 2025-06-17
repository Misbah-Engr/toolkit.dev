import { githubRepoInfoToolConfigClient } from "@/toolkits/toolkits/github/tools/client";

export const RepositoryCalling: React.FC = () => {
  return (
    <githubRepoInfoToolConfigClient.CallComponent
      args={{ owner: "vercel", name: "next.js" }}
      isPartial={false}
    />
  );
};

export const RepositoryResult: React.FC = () => {
  return (
    <githubRepoInfoToolConfigClient.ResultComponent
      result={{
        owner: {
          twitter_username: "vercel",
          email: "hello@vercel.com",
          company: "Vercel",
          location: "San Francisco, CA",
        },
        repo: {
          issues: 100,
          stars: 1000,
          forks: 100,
          url: "https://www.google.com",
          description: "The React Framework for the Web",
          owner: "vercel",
          name: "next.js",
          prs: 50,
          commits: 5000,
        },
        commits: [
          {
            date: "2021-01-01",
            count: 100,
          },
        ],
        topContributors: [
          {
            login: "vercel",
            prs: 100,
            commits: 1000,
          },
        ],
      }}
      args={{ owner: "vercel", name: "next.js" }}
      append={() => void 0}
    />
  );
};
