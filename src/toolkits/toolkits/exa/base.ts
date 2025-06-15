import type { ToolkitConfig } from "@/toolkits/types";
import { baseSearchTool } from "./tools/search/base";
import { baseResearchPaperSearchTool } from "./tools/research_paper_search/base";
import { baseCompanyResearchTool } from "./tools/company_research/base";
import { baseCrawlingTool } from "./tools/crawling/base";
import { baseCompetitorFinderTool } from "./tools/competitor_finder/base";
import { baseLinkedinSearchTool } from "./tools/linkedin_search/base";
import { baseWikipediaSearchTool } from "./tools/wikipedia_search/base";
import { baseGithubSearchTool } from "./tools/github_search/base";
import { ExaTools } from "./tools/tools";
import { z } from "zod";

export const exaParameters = z.object({});

export const baseExaToolkitConfig: ToolkitConfig<
  ExaTools,
  typeof exaParameters.shape
> = {
  tools: {
    [ExaTools.Search]: baseSearchTool,
    [ExaTools.ResearchPaperSearch]: baseResearchPaperSearchTool,
    [ExaTools.CompanyResearch]: baseCompanyResearchTool,
    [ExaTools.Crawling]: baseCrawlingTool,
    [ExaTools.CompetitorFinder]: baseCompetitorFinderTool,
    [ExaTools.LinkedinSearch]: baseLinkedinSearchTool,
    [ExaTools.WikipediaSearch]: baseWikipediaSearchTool,
    [ExaTools.GithubSearch]: baseGithubSearchTool,
  },
  parameters: exaParameters,
};
