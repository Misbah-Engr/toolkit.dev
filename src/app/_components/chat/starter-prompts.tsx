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
    title: "Comprehensive Project Analysis Dashboard",
    prompt:
      "Analyze my Notion project database, find related GitHub repositories, generate a visual project overview chart, and store key insights in memory for future reference",
    toolkitIds: [
      Toolkits.Notion,
      Toolkits.Github,
      Toolkits.Image,
      Toolkits.Memory,
    ],
    description:
      "Complete project analysis combining workspace data, code discovery, visualization, and persistent insights",
  },
  {
    title: "Market Research & Competitive Analysis",
    prompt:
      "Research my industry competitors using web search, analyze their GitHub presence, create a competitive landscape infographic, document findings in Notion, and remember key insights",
    toolkitIds: [
      Toolkits.Exa,
      Toolkits.Github,
      Toolkits.Image,
      Toolkits.Notion,
      Toolkits.Memory,
    ],
    description:
      "Complete competitive intelligence workflow with research, code analysis, visualization, documentation, and memory",
  },
  {
    title: "Meeting Intelligence & Documentation",
    prompt:
      "Analyze my calendar events, read related documents from Google Drive, create meeting summaries in Notion, and remember key discussion points",
    toolkitIds: [
      Toolkits.GoogleCalendar,
      Toolkits.GoogleDrive,
      Toolkits.Notion,
      Toolkits.Memory,
    ],
    description:
      "Intelligent meeting analysis with document integration and persistent memory",
  },
  {
    title: "Data-Driven Productivity Insights",
    prompt:
      "Query my Notion task database, analyze patterns with Python, create productivity visualizations, and identify calendar optimization opportunities",
    toolkitIds: [
      Toolkits.Notion,
      Toolkits.E2B,
      Toolkits.Image,
      Toolkits.GoogleCalendar,
    ],
    description:
      "Data-driven productivity analysis with computational insights and visual reporting",
  },

  // Multi-toolkit prompts (3 toolkits)
  {
    title: "Research Paper Analysis with Memory",
    prompt:
      "Search for recent AI research papers, create a visual summary of key findings, and store important insights in memory",
    toolkitIds: [Toolkits.Exa, Toolkits.Image, Toolkits.Memory],
    description:
      "Academic research with visual summaries and persistent knowledge storage",
  },
  {
    title: "GitHub Repository Deep Dive",
    prompt:
      "Search for repositories in my tech stack, analyze their code structure, and create an architecture visualization diagram",
    toolkitIds: [Toolkits.Github, Toolkits.Image, Toolkits.E2B],
    description:
      "Repository discovery with code analysis and visual architecture mapping",
  },
  {
    title: "Company Research & Intelligence",
    prompt:
      "Research a target company comprehensively, analyze their GitHub projects, and remember key strategic insights for future reference",
    toolkitIds: [Toolkits.Exa, Toolkits.Github, Toolkits.Memory],
    description:
      "Company intelligence gathering with technical analysis and memory storage",
  },
  {
    title: "Notion Knowledge Visualization",
    prompt:
      "Query my Notion pages for project information, create visual knowledge maps, and store key insights in memory",
    toolkitIds: [Toolkits.Notion, Toolkits.Image, Toolkits.Memory],
    description:
      "Knowledge base visualization with intelligent summarization and memory",
  },
  {
    title: "Document Analysis Dashboard",
    prompt:
      "Search my Google Drive for project documents, perform data analysis with Python, and create visual insights charts",
    toolkitIds: [Toolkits.GoogleDrive, Toolkits.E2B, Toolkits.Image],
    description:
      "Document processing with computational analysis and visual reporting",
  },
  {
    title: "Industry Trend Visualization",
    prompt:
      "Research current industry trends, generate comprehensive infographics, and organize findings in my Notion workspace",
    toolkitIds: [Toolkits.Exa, Toolkits.Image, Toolkits.Notion],
    description:
      "Market research with visual content creation and organized documentation",
  },
  {
    title: "Technical Stack Documentation",
    prompt:
      "Search GitHub for repositories matching my technology stack, create a visual tech roadmap, and document in Notion",
    toolkitIds: [Toolkits.Github, Toolkits.Image, Toolkits.Notion],
    description:
      "Technology research with visual planning and comprehensive documentation",
  },
  {
    title: "Calendar Pattern Analysis",
    prompt:
      "Analyze my calendar events and meeting patterns, research productivity techniques, and create a time optimization visualization",
    toolkitIds: [Toolkits.GoogleCalendar, Toolkits.Exa, Toolkits.Image],
    description:
      "Calendar intelligence with research-backed productivity optimization",
  },
  {
    title: "Project Documentation Analysis",
    prompt:
      "Search my Google Drive for project files, analyze content with Python for insights, and remember key findings",
    toolkitIds: [Toolkits.GoogleDrive, Toolkits.E2B, Toolkits.Memory],
    description:
      "Document analysis with computational processing and insight retention",
  },

  // Two-toolkit prompts
  {
    title: "Notion Database Visualization",
    prompt:
      "Query my Notion database and create beautiful charts and visual reports from the data",
    toolkitIds: [Toolkits.Notion, Toolkits.Image],
    description: "Database visualization with custom chart generation",
  },
  {
    title: "Notion Data Science Analysis",
    prompt:
      "Extract data from my Notion workspace and perform statistical analysis with Python",
    toolkitIds: [Toolkits.Notion, Toolkits.E2B],
    description: "Notion data processing with computational analysis",
  },
  {
    title: "Notion Knowledge Memory",
    prompt:
      "Search my Notion pages for important information and store key insights in memory for future conversations",
    toolkitIds: [Toolkits.Notion, Toolkits.Memory],
    description: "Knowledge extraction with persistent memory storage",
  },
  {
    title: "Calendar Pattern Insights",
    prompt:
      "Analyze my calendar events and meeting patterns, then create a visual time management dashboard",
    toolkitIds: [Toolkits.GoogleCalendar, Toolkits.Image],
    description: "Calendar analysis with visual time management insights",
  },
  {
    title: "Research with Code Examples",
    prompt:
      "Search for machine learning tutorials and research, then test code examples with Python execution",
    toolkitIds: [Toolkits.Exa, Toolkits.E2B],
    description: "Research with hands-on code experimentation and testing",
  },
  {
    title: "Competitive Intelligence Memory",
    prompt: "Research competitors in my industry and store their key strategies and insights in memory",
    toolkitIds: [Toolkits.Exa, Toolkits.Memory],
    description: "Competitive research with persistent strategic insights",
  },
  {
    title: "GitHub Portfolio Visualization",
    prompt:
      "Analyze GitHub repositories and user profiles, then generate a visual portfolio showcase",
    toolkitIds: [Toolkits.Github, Toolkits.Image],
    description: "Code portfolio analysis with visual presentation",
  },
  {
    title: "Document Content Analysis",
    prompt:
      "Search my Google Drive for specific documents and analyze their content with Python for insights",
    toolkitIds: [Toolkits.GoogleDrive, Toolkits.E2B],
    description: "Document analysis with computational text processing",
  },
  {
    title: "Calendar Memory Learning",
    prompt:
      "Analyze my calendar patterns and meeting preferences, storing insights in memory for future optimization",
    toolkitIds: [Toolkits.GoogleCalendar, Toolkits.Memory],
    description: "Calendar intelligence with learning preferences",
  },
  {
    title: "Research Trend Visualization",
    prompt: "Research latest trends in my field and create compelling infographics and visual summaries",
    toolkitIds: [Toolkits.Exa, Toolkits.Image],
    description: "Industry research with professional visualization",
  },
  {
    title: "GitHub Learning Memory",
    prompt:
      "Analyze interesting GitHub repositories and remember coding patterns and best practices for future projects",
    toolkitIds: [Toolkits.Github, Toolkits.Memory],
    description: "Code analysis with pattern recognition and persistent learning",
  },
  {
    title: "Drive to Notion Organization",
    prompt:
      "Search my Google Drive for project documents and create organized summaries in my Notion workspace",
    toolkitIds: [Toolkits.GoogleDrive, Toolkits.Notion],
    description: "Document organization with structured knowledge management",
  },
  {
    title: "Calendar and Notion Integration",
    prompt:
      "Analyze my calendar events and create corresponding project updates in my Notion database",
    toolkitIds: [Toolkits.GoogleCalendar, Toolkits.Notion],
    description: "Calendar insights with project management integration",
  },
  {
    title: "GitHub Research Documentation",
    prompt:
      "Search GitHub for projects in my domain and create comprehensive documentation in Notion",
    toolkitIds: [Toolkits.Github, Toolkits.Notion],
    description: "Technical research with organized documentation",
  },
  {
    title: "Industry Intelligence Organization",
    prompt:
      "Research industry insights and competitors, then organize findings systematically in my Notion workspace",
    toolkitIds: [Toolkits.Exa, Toolkits.Notion],
    description: "Market research with structured knowledge organization",
  },

  // Single-toolkit prompts (ensure at least one per toolkit)
  {
    title: "AI & Tech Research",
    prompt:
      "Search for the latest developments in AI, machine learning, and emerging technologies with detailed analysis",
    toolkitIds: [Toolkits.Exa],
    description: "Comprehensive web research and industry intelligence",
  },
  {
    title: "Custom Data Visualization",
    prompt:
      "Generate a custom infographic, data chart, or professional visualization for my presentation or report",
    toolkitIds: [Toolkits.Image],
    description:
      "Professional visual content creation with AI-powered design",
  },
  {
    title: "GitHub Code Discovery",
    prompt:
      "Search and analyze GitHub repositories, users, and code patterns in my technology stack or field of interest",
    toolkitIds: [Toolkits.Github],
    description: "Repository discovery with detailed code analysis and insights",
  },
  {
    title: "Calendar Intelligence",
    prompt:
      "Analyze my calendar events, meeting patterns, and time allocation to identify optimization opportunities",
    toolkitIds: [Toolkits.GoogleCalendar],
    description: "Smart calendar analysis with productivity insights",
  },
  {
    title: "Document Intelligence",
    prompt:
      "Search and analyze documents in my Google Drive with intelligent content extraction and summarization",
    toolkitIds: [Toolkits.GoogleDrive],
    description: "Document discovery with AI-powered content analysis",
  },
  {
    title: "Conversation Memory",
    prompt:
      "Store important information from our conversation in memory for future reference and context building",
    toolkitIds: [Toolkits.Memory],
    description: "Persistent memory storage with intelligent context management",
  },
  {
    title: "Notion Workspace Intelligence",
    prompt:
      "Analyze my Notion databases, pages, and blocks to extract insights and identify patterns in my knowledge base",
    toolkitIds: [Toolkits.Notion],
    description:
      "Comprehensive workspace analysis with knowledge extraction",
  },
  {
    title: "Python Code Execution",
    prompt:
      "Execute Python code to analyze data, create calculations, test algorithms, or solve computational problems",
    toolkitIds: [Toolkits.E2B],
    description:
      "Secure code execution with data analysis and algorithmic solutions",
  },

  // Fallback generic prompts (no specific toolkits required)
  {
    title: "Creative Problem Solving",
    prompt:
      "Help me brainstorm innovative solutions for my project challenge with creative approaches and actionable ideas",
    toolkitIds: [],
    description: "Creative ideation with structured problem-solving methodology",
  },
  {
    title: "Technical Concept Explanation",
    prompt:
      "Explain a complex technical concept in simple terms with practical examples and clear analogies",
    toolkitIds: [],
    description: "Educational content with technical clarity and practical context",
  },
  {
    title: "Strategic Project Planning",
    prompt:
      "Create a detailed strategic plan for my project with milestones, deliverables, and actionable steps",
    toolkitIds: [],
    description: "Strategic planning with detailed execution roadmaps",
  },
  {
    title: "Code & Content Review",
    prompt:
      "Review and provide detailed feedback on my code, writing, or presentation with specific improvement suggestions",
    toolkitIds: [],
    description: "Professional review with constructive feedback and optimization",
  },
  {
    title: "Architecture Design Consultation",
    prompt:
      "Help me design the architecture for my software project with best practices and scalability considerations",
    toolkitIds: [],
    description:
      "Technical architecture guidance with industry best practices",
  },
  {
    title: "Business Strategy Analysis",
    prompt: "Analyze my business idea and provide strategic advice with market positioning and growth opportunities",
    toolkitIds: [],
    description: "Business analysis with strategic market insights",
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
