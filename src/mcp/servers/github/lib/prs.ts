import { type Octokit } from "octokit";

export const getTotalPrs = async (octokit: Octokit, query: string) => {
  const {
    data: { total_count },
  } = await octokit.rest.search.issuesAndPullRequests({
    q: query,
    per_page: 1,
  });

  return total_count;
};
