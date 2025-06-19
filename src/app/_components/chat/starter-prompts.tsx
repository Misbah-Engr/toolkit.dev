"use client";

import { motion } from "motion/react";
import { useChatContext } from "@/app/_contexts/chat-context";
import { Toolkits } from "@/toolkits/toolkits/shared";
import { useMemo } from "react";
import { ToolkitIcons } from "@/components/toolkit/toolkit-icons";
import { HStack } from "@/components/ui/stack";

// Dynamic starter prompts with toolkit associations
interface StarterPrompt {
  title: string;
  prompt: string;
  toolkitIds: Toolkits[];
  description?: string;
}

const DYNAMIC_STARTER_PROMPTS: StarterPrompt[] = [
  // Multi-toolkit prompts (4+ toolkits - highest priority)
  {
    title: "Full-Stack Architecture Analysis",
    prompt:
      "Search GitHub for repositories using my tech stack, analyze their code structure and patterns, generate an architecture diagram, execute sample code to understand implementation, and store architectural insights in memory",
    toolkitIds: [
      Toolkits.Github,
      Toolkits.E2B,
      Toolkits.Image,
      Toolkits.Memory,
    ],
    description:
      "Complete technical analysis: repository discovery, code execution, architecture visualization, and persistent learning",
  },
  {
    title: "Competitive Technical Intelligence",
    prompt:
      "Research competitors' technical approaches, analyze their GitHub repositories and commit patterns, generate comparison charts, and document findings with memory for future reference",
    toolkitIds: [
      Toolkits.Exa,
      Toolkits.Github,
      Toolkits.Image,
      Toolkits.Memory,
    ],
    description:
      "Technical competitive analysis with code review, visualization, and strategic insights",
  },
  {
    title: "Research-Driven Development Workflow",
    prompt:
      "Search for academic papers on my technical problem, find related GitHub implementations, test algorithms with Python execution, create comparison visualizations, and store key insights",
    toolkitIds: [
      Toolkits.Exa,
      Toolkits.Github,
      Toolkits.E2B,
      Toolkits.Image,
      Toolkits.Memory,
    ],
    description:
      "Complete research workflow: academic search, code discovery, algorithm testing, and knowledge retention",
  },
  {
    title: "Technical Documentation Generator",
    prompt:
      "Analyze my Notion project documentation, search for related GitHub examples, generate architecture diagrams, and create comprehensive technical specifications with memory of project context",
    toolkitIds: [
      Toolkits.Notion,
      Toolkits.Github,
      Toolkits.Image,
      Toolkits.Memory,
    ],
    description:
      "Documentation automation with code examples, visual diagrams, and contextual memory",
  },

  // Multi-toolkit prompts (3 toolkits)
  {
    title: "Algorithm Research & Implementation",
    prompt:
      "Search for research papers on specific algorithms, find GitHub implementations, and test performance with Python benchmarks",
    toolkitIds: [Toolkits.Exa, Toolkits.Github, Toolkits.E2B],
    description:
      "Research-to-implementation pipeline with performance analysis",
  },
  {
    title: "Codebase Architecture Visualization",
    prompt:
      "Analyze GitHub repositories for architectural patterns, execute code samples to understand data flow, and generate system architecture diagrams",
    toolkitIds: [Toolkits.Github, Toolkits.E2B, Toolkits.Image],
    description:
      "Code analysis with execution testing and visual architecture mapping",
  },
  {
    title: "Technical Knowledge Memory Bank",
    prompt:
      "Research emerging technologies and frameworks, analyze trending GitHub projects, and build a persistent knowledge base for future reference",
    toolkitIds: [Toolkits.Exa, Toolkits.Github, Toolkits.Memory],
    description:
      "Technology scouting with repository analysis and knowledge retention",
  },
  {
    title: "Performance Analysis Dashboard",
    prompt:
      "Extract performance metrics from my Notion project tracking, run statistical analysis with Python, and generate performance visualization charts",
    toolkitIds: [Toolkits.Notion, Toolkits.E2B, Toolkits.Image],
    description:
      "Data-driven performance analysis with computational processing and visualization",
  },
  {
    title: "Tech Stack Recommendation Engine",
    prompt:
      "Research current technology trends, analyze popular GitHub repositories in my domain, and create visual technology comparison charts",
    toolkitIds: [Toolkits.Exa, Toolkits.Github, Toolkits.Image],
    description:
      "Technology research with repository analysis and comparative visualization",
  },
  {
    title: "Code Pattern Recognition",
    prompt:
      "Analyze GitHub repositories for design patterns and best practices, execute code examples, and remember successful patterns for future projects",
    toolkitIds: [Toolkits.Github, Toolkits.E2B, Toolkits.Memory],
    description:
      "Pattern analysis with code execution and persistent learning",
  },
  {
    title: "Technical Project Documentation",
    prompt:
      "Search GitHub for similar projects and implementations, create technical documentation in Notion, and remember key architectural decisions",
    toolkitIds: [Toolkits.Github, Toolkits.Notion, Toolkits.Memory],
    description:
      "Project documentation with code research and decision tracking",
  },
  {
    title: "API & Framework Research",
    prompt:
      "Research latest API trends and frameworks, analyze their GitHub repositories, and document findings in my Notion knowledge base",
    toolkitIds: [Toolkits.Exa, Toolkits.Github, Toolkits.Notion],
    description:
      "API research with repository analysis and structured documentation",
  },

  // Two-toolkit prompts - High Value Technical Combinations
  {
    title: "GitHub Code Deep Dive",
    prompt:
      "Search for repositories implementing specific algorithms or patterns, then execute and analyze the code to understand implementation details",
    toolkitIds: [Toolkits.Github, Toolkits.E2B],
    description: "Repository discovery with hands-on code analysis and execution",
  },
  {
    title: "Technical Research Execution",
    prompt:
      "Find research papers on machine learning or systems topics, then implement and test the algorithms described using Python",
    toolkitIds: [Toolkits.Exa, Toolkits.E2B],
    description: "Academic research with practical implementation and testing",
  },
  {
    title: "Architecture Diagram Generator",
    prompt:
      "Analyze GitHub repository structure and dependencies, then generate clean architecture diagrams and system flow charts",
    toolkitIds: [Toolkits.Github, Toolkits.Image],
    description: "Code analysis with professional architecture visualization",
  },
  {
    title: "Technical Competitive Analysis",
    prompt:
      "Research competitors' technical approaches and tools, then analyze their open-source contributions and GitHub activity patterns",
    toolkitIds: [Toolkits.Exa, Toolkits.Github],
    description: "Market research combined with technical code analysis",
  },
  {
    title: "Data Science Pipeline Visualization",
    prompt:
      "Execute data analysis algorithms with Python and generate professional charts, graphs, and data visualization dashboards",
    toolkitIds: [Toolkits.E2B, Toolkits.Image],
    description: "Computational analysis with publication-ready visualizations",
  },
  {
    title: "Technical Memory Assistant",
    prompt:
      "Analyze GitHub repositories for best practices and coding patterns, storing key insights and learnings for future development projects",
    toolkitIds: [Toolkits.Github, Toolkits.Memory],
    description: "Code pattern learning with persistent knowledge retention",
  },
  {
    title: "Tech Trend Visualization",
    prompt:
      "Research emerging technologies and programming trends, then create comprehensive infographics and trend analysis charts",
    toolkitIds: [Toolkits.Exa, Toolkits.Image],
    description: "Technology research with professional visual trend analysis",
  },
  {
    title: "Engineering Knowledge Base",
    prompt:
      "Research technical topics and best practices, then organize findings systematically in my Notion engineering documentation",
    toolkitIds: [Toolkits.Exa, Toolkits.Notion],
    description: "Technical research with structured knowledge organization",
  },
  {
    title: "Project Analysis Dashboard",
    prompt:
      "Extract project data from my Notion workspace and perform statistical analysis to identify patterns, bottlenecks, and optimization opportunities",
    toolkitIds: [Toolkits.Notion, Toolkits.E2B],
    description: "Project data analysis with computational insights",
  },
  {
    title: "Technical Research Memory",
    prompt:
      "Research cutting-edge technologies and development practices, storing detailed insights and findings for future reference and decision-making",
    toolkitIds: [Toolkits.Exa, Toolkits.Memory],
    description: "Technology scouting with persistent strategic knowledge",
  },
  {
    title: "Notion Technical Documentation",
    prompt:
      "Analyze my Notion project pages and technical specifications, creating visual documentation and storing key architectural insights",
    toolkitIds: [Toolkits.Notion, Toolkits.Image],
    description: "Technical documentation with visual specification creation",
  },
  {
    title: "Engineering Context Memory",
    prompt:
      "Analyze my Notion engineering notes and project documentation, remembering key technical decisions and architectural context for future discussions",
    toolkitIds: [Toolkits.Notion, Toolkits.Memory],
    description: "Technical knowledge extraction with persistent context building",
  },

  // Single-toolkit prompts - Core Technical Tools
  {
    title: "Advanced GitHub Analysis",
    prompt:
      "Perform deep analysis of GitHub repositories, users, and code patterns - search for specific implementations, analyze commit patterns, and discover trending projects in my tech stack",
    toolkitIds: [Toolkits.Github],
    description: "Comprehensive repository analysis and developer intelligence",
  },
  {
    title: "Python Algorithm Development",
    prompt:
      "Execute Python code for algorithm development, data analysis, performance benchmarking, API testing, or mathematical computations with full execution environment",
    toolkitIds: [Toolkits.E2B],
    description: "Full Python development environment with code execution and testing",
  },
  {
    title: "Technical Research Intelligence",
    prompt:
      "Research emerging technologies, academic papers, technical blogs, competitor analysis, and industry trends with comprehensive web search capabilities",
    toolkitIds: [Toolkits.Exa],
    description: "Advanced technical research and competitive intelligence gathering",
  },
  {
    title: "Technical Visualization Studio",
    prompt:
      "Generate architecture diagrams, system flow charts, data visualizations, technical infographics, and professional presentation graphics",
    toolkitIds: [Toolkits.Image],
    description: "Professional technical visualization and diagram creation",
  },
  {
    title: "Engineering Knowledge System",
    prompt:
      "Store and retrieve technical insights, architectural decisions, code patterns, research findings, and engineering context across conversations",
    toolkitIds: [Toolkits.Memory],
    description: "Persistent technical knowledge management and context retention",
  },
  {
    title: "Notion Engineering Workspace",
    prompt:
      "Analyze Notion databases, technical documentation, project specifications, and engineering notes to extract insights and organize technical knowledge",
    toolkitIds: [Toolkits.Notion],
    description: "Technical workspace analysis and engineering documentation management",
  },

  // Generic prompts for technical audience
  {
    title: "System Architecture Design",
    prompt:
      "Design scalable system architecture for my application with microservices patterns, database design, API specifications, and deployment considerations",
    toolkitIds: [],
    description: "Complete system design with industry best practices and scalability patterns",
  },
  {
    title: "Algorithm Optimization Consultation",
    prompt:
      "Analyze algorithm complexity, suggest optimizations, review data structures, and provide performance improvement recommendations for my code",
    toolkitIds: [],
    description: "Algorithm analysis with performance optimization and complexity assessment",
  },
  {
    title: "Technical Code Review",
    prompt:
      "Comprehensive code review focusing on design patterns, performance, security, maintainability, and adherence to software engineering best practices",
    toolkitIds: [],
    description: "Professional code review with architectural and performance insights",
  },
  {
    title: "API Design & Documentation",
    prompt:
      "Design RESTful APIs, GraphQL schemas, or gRPC services with proper documentation, error handling, authentication, and versioning strategies",
    toolkitIds: [],
    description: "Complete API design with documentation and best practices",
  },
  {
    title: "Database Schema Design",
    prompt:
      "Design efficient database schemas, optimize queries, plan migrations, and recommend indexing strategies for optimal performance",
    toolkitIds: [],
    description: "Database architecture with performance optimization and scalability planning",
  },
  {
    title: "DevOps & Infrastructure Planning",
    prompt:
      "Plan CI/CD pipelines, containerization strategies, cloud infrastructure, monitoring, and deployment automation for production systems",
    toolkitIds: [],
    description: "Complete DevOps strategy with infrastructure and automation planning",
  },
];

export const StarterPrompts = () => {
  const { append, toolkits } = useChatContext();

  // Get currently selected toolkit IDs
  const selectedToolkitIds = useMemo(() => {
    return new Set(toolkits.map((t) => t.id));
  }, [toolkits]);

  // Filter and sort prompts based on selected toolkits
  const relevantPrompts = useMemo(() => {
    if (selectedToolkitIds.size === 0) {
      // If no toolkits selected, show generic prompts
      return DYNAMIC_STARTER_PROMPTS.filter(
        (prompt) => prompt.toolkitIds.length === 0,
      ).slice(0, 4);
    }

    // Score prompts based on how many of their required toolkits are selected
    const scoredPrompts = DYNAMIC_STARTER_PROMPTS.map((prompt) => {
      const matchingToolkits = prompt.toolkitIds.filter((id) =>
        selectedToolkitIds.has(id),
      ).length;

      const totalRequired = prompt.toolkitIds.length;

      // Only include prompts where ALL required toolkits are available
      if (totalRequired === 0 || matchingToolkits === totalRequired) {
        return {
          ...prompt,
          score: matchingToolkits, // Higher score for more toolkit usage
          matchingToolkits,
        };
      }

      return null;
    }).filter(Boolean) as Array<
      StarterPrompt & { score: number; matchingToolkits: number }
    >;

    // Sort by score (descending) - prompts using more toolkits come first
    scoredPrompts.sort((a, b) => b.score - a.score);

    // Take top 4-6 prompts, ensuring variety
    const selectedPrompts = [];
    const usedScores = new Set<number>();

    for (const prompt of scoredPrompts) {
      if (selectedPrompts.length >= 6) break;

      // Try to include prompts with different scores for variety
      if (!usedScores.has(prompt.score) || selectedPrompts.length < 4) {
        selectedPrompts.push(prompt);
        usedScores.add(prompt.score);
      }
    }

    return selectedPrompts.slice(0, 4);
  }, [selectedToolkitIds]);

  const handlePromptClick = (prompt: string) => {
    void append({
      role: "user",
      content: prompt,
    });
  };

  if (relevantPrompts.length === 0) {
    return null;
  }

  return (
    <div className="relative">
      <div className="from-background absolute top-0 left-0 z-10 hidden h-full w-4 bg-gradient-to-r to-transparent md:block" />
      <div className="no-scrollbar flex max-w-full flex-col gap-2 overflow-x-auto px-4 md:flex-row">
        {relevantPrompts.map((prompt, index) => (
          <motion.button
            key={`${prompt.title}-${selectedToolkitIds.size}`} // Key includes toolkit state for proper re-animation
            initial={{ opacity: 0, height: "auto" }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{
              enter: { delay: 0.1 + index * 0.1 },
              exit: { delay: 0, duration: 0.1 },
            }}
            onClick={() => handlePromptClick(prompt.prompt)}
            className="hover:bg-muted/80 text-muted-foreground hover:text-foreground group relative cursor-pointer rounded-xl border p-2 text-left text-sm transition-colors"
            title={prompt.description}
          >
            <HStack className="gap-2 overflow-hidden">
              <ToolkitIcons toolkits={prompt.toolkitIds} />
              <p className="flex-1 truncate text-sm leading-relaxed whitespace-nowrap">
                {prompt.title}
              </p>
            </HStack>
          </motion.button>
        ))}
      </div>
      <div className="from-background absolute top-0 right-0 z-10 hidden h-full w-4 bg-gradient-to-l to-transparent md:block" />
    </div>
  );
};
