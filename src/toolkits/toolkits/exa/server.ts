import { createServerToolkit } from "@/toolkits/create-toolkit";
import { baseExaToolkitConfig } from "./base";
import { exaSearchToolConfigServer } from "./tools/search/server";
import { exaResearchPaperSearchToolConfigServer } from "./tools/research_paper_search/server";
import { exaCompanyResearchToolConfigServer } from "./tools/company_research/server";
import { exaCrawlingToolConfigServer } from "./tools/crawling/server";
import { exaCompetitorFinderToolConfigServer } from "./tools/competitor_finder/server";
import { exaLinkedinSearchToolConfigServer } from "./tools/linkedin_search/server";
import { exaWikipediaSearchToolConfigServer } from "./tools/wikipedia_search/server";
import { exaGithubSearchToolConfigServer } from "./tools/github_search/server";
import { ExaTools } from "./tools/tools";

export const exaToolkitServer = createServerToolkit(
  baseExaToolkitConfig,
  async () => {
    return {
      [ExaTools.Search]: exaSearchToolConfigServer,
      [ExaTools.ResearchPaperSearch]: exaResearchPaperSearchToolConfigServer,
      [ExaTools.CompanyResearch]: exaCompanyResearchToolConfigServer,
      [ExaTools.Crawling]: exaCrawlingToolConfigServer,
      [ExaTools.CompetitorFinder]: exaCompetitorFinderToolConfigServer,
      [ExaTools.LinkedinSearch]: exaLinkedinSearchToolConfigServer,
      [ExaTools.WikipediaSearch]: exaWikipediaSearchToolConfigServer,
      [ExaTools.GithubSearch]: exaGithubSearchToolConfigServer,
    };
  },
);
