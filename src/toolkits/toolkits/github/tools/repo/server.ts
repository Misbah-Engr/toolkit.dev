import { type repoInfoTool } from "./base";
import { type Octokit } from "octokit";
import type { ServerToolConfig } from "@/toolkits/types";
import { getAllCommits, getTotalCommits } from "../../lib/commits";
import { getTotalPrs } from "../../lib/prs";

export const githubRepoInfoToolConfigServer = (
  octokit: Octokit,
): ServerToolConfig<
  typeof repoInfoTool.inputSchema.shape,
  typeof repoInfoTool.outputSchema.shape
> => {
  return {
    callback: async ({ owner, name }) => {
      const [
        { data: repo },
        commits,
        totalCommits,
        totalPrs,
        { data: ownerData },
      ] = await Promise.all([
        octokit.rest.repos.get({
          owner,
          repo: name,
        }),
        getAllCommits(octokit, owner, name),
        getTotalCommits(octokit, owner, name),
        getTotalPrs(octokit, `repo:${owner}/${name}`),
        octokit.rest.users.getByUsername({
          username: owner,
        }),
      ]);

      if (!repo) {
        throw new Error("Repository not found");
      }

      const numBuckets = 96;
      const now = new Date();
      const startDate = new Date(repo.created_at);
      const totalTime = now.getTime() - startDate.getTime();
      const bucketSize = totalTime / numBuckets;
      const buckets = Array.from({ length: numBuckets }, () => 0);

      commits.forEach((commit) => {
        if (!commit.commit?.author?.date) return;

        const commitDate = new Date(commit.commit.author.date);
        const diff = commitDate.getTime() - startDate.getTime();
        const bucketIndex = Math.floor(diff / bucketSize);

        if (bucketIndex >= 0 && bucketIndex < numBuckets) {
          buckets[bucketIndex]!++;
        }
      });

      const contributorCounts = commits
        .map((commit) => commit.author?.login)
        .filter((login): login is string => login !== null)
        .reduce(
          (acc, login) => {
            acc[login] = (acc[login] ?? 0) + 1;
            return acc;
          },
          {} as Record<string, number>,
        );

      const topContributors = Object.entries(contributorCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([login, commits]) => ({
          login,
          commits,
        }));

      const topContributorsWithPrs = await Promise.all(
        topContributors.map(async (contributor) => {
          const prs = await getTotalPrs(
            octokit,
            `repo:${owner}/${name} author:${contributor.login}`,
          ).catch(() => 0);
          return {
            ...contributor,
            prs,
          };
        }),
      );

      return {
        repo: {
          owner: repo.owner?.login ?? "",
          name: repo.name,
          description: repo.description ?? "",
          url: repo.html_url,
          stars: repo.stargazers_count,
          forks: repo.forks_count,
          issues: repo.open_issues_count,
          website: repo.homepage ?? "",
          language: repo.language ?? "",
          prs: totalPrs,
          commits: totalCommits,
          homepage: repo.homepage ?? "",
        },
        owner: {
          twitter_username: ownerData.twitter_username,
          email: ownerData.email,
          company: ownerData.company,
          location: ownerData.location,
        },
        commits: buckets.map((count, index) => ({
          date: new Date(
            startDate.getTime() + index * bucketSize,
          ).toISOString(),
          count,
        })),
        topContributors: topContributorsWithPrs,
      };
    },
    message:
      "The user is shown all of the data in the UI. Do not reiterate it. Give a 1-2 sentence summary of the results and ask the user what they would like to do next.",
  };
};
