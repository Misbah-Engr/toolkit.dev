import { Search } from "lucide-react";

import { ExaTools } from "./tools/tools";
import { createClientToolkit } from "@/toolkits/create-toolkit";
import { exaSearchToolConfigClient } from "./tools/search/client";
import { exaResearchPaperSearchToolConfigClient } from "./tools/research_paper_search/client";
import { exaCompanyResearchToolConfigClient } from "./tools/company_research/client";
import { exaCrawlingToolConfigClient } from "./tools/crawling/client";
import { exaCompetitorFinderToolConfigClient } from "./tools/competitor_finder/client";
import { exaLinkedinSearchToolConfigClient } from "./tools/linkedin_search/client";
import { exaWikipediaSearchToolConfigClient } from "./tools/wikipedia_search/client";
import { exaGithubSearchToolConfigClient } from "./tools/github_search/client";
import { baseExaToolkitConfig } from "./base";
import { ToolkitGroups } from "@/toolkits/types";

export const exaClientToolkit = createClientToolkit(
  baseExaToolkitConfig,
  {
    name: "Web Search",
    description: "Find articles, research papers, companies, and more",
    icon: Search,
    form: null,
    type: ToolkitGroups.DataSource,
    envVars: ["EXA_API_KEY"],
  },
  {
    [ExaTools.Search]: exaSearchToolConfigClient,
    [ExaTools.ResearchPaperSearch]: exaResearchPaperSearchToolConfigClient,
    [ExaTools.CompanyResearch]: exaCompanyResearchToolConfigClient,
    [ExaTools.Crawling]: exaCrawlingToolConfigClient,
    [ExaTools.CompetitorFinder]: exaCompetitorFinderToolConfigClient,
    [ExaTools.LinkedinSearch]: exaLinkedinSearchToolConfigClient,
    [ExaTools.WikipediaSearch]: exaWikipediaSearchToolConfigClient,
    [ExaTools.GithubSearch]: exaGithubSearchToolConfigClient,
  },
);
