"use client";

import { motion } from "motion/react";
import { useChatContext } from "../_contexts/chat-context";
import { Servers } from "@/toolkits/toolkits/shared";
import { useMemo } from "react";

// Dynamic starter prompts with toolkit associations
interface StarterPrompt {
  content: string;
  toolkitIds: Servers[];
  description?: string;
}

const DYNAMIC_STARTER_PROMPTS: StarterPrompt[] = [
  // Multi-toolkit prompts (highest priority when multiple tools match)
  {
    content: "Research my competitors and create a comprehensive analysis with visual charts",
    toolkitIds: [Servers.Exa, Servers.Image, Servers.Memory],
    description: "Uses web search, image generation, and memory for comprehensive competitor analysis"
  },
  {
    content: "Analyze this GitHub repository and create a visual architecture diagram",
    toolkitIds: [Servers.Github, Servers.Image, Servers.E2B],
    description: "Combines GitHub analysis, code execution, and visual diagram generation"
  },
  {
    content: "Find research papers on AI, summarize key findings, and remember important insights for future conversations",
    toolkitIds: [Servers.Exa, Servers.Memory, Servers.E2B],
    description: "Research papers with data analysis and persistent memory storage"
  },
  {
    content: "Schedule a meeting based on my calendar availability and create a preparation document from my Drive files",
    toolkitIds: [Servers.GoogleCalendar, Servers.GoogleDrive, Servers.Memory],
    description: "Calendar integration with document analysis and context memory"
  },
  {
    content: "Build a data visualization dashboard by analyzing my Google Drive spreadsheets with Python",
    toolkitIds: [Servers.GoogleDrive, Servers.E2B, Servers.Image],
    description: "Data processing with visual output generation"
  },
  {
    content: "Research industry trends, generate infographics, and remember key insights for future reference",
    toolkitIds: [Servers.Exa, Servers.Image, Servers.Memory],
    description: "Market research with visual content creation and memory storage"
  },
  {
    content: "Find GitHub repositories for my project idea and create a technical roadmap visualization",
    toolkitIds: [Servers.Github, Servers.Exa, Servers.Image],
    description: "Repository discovery with comprehensive visual planning"
  },

  // Two-toolkit prompts
  {
    content: "Analyze my calendar patterns and create a time management visualization",
    toolkitIds: [Servers.GoogleCalendar, Servers.Image],
    description: "Calendar analysis with visual insights"
  },
  {
    content: "Search for machine learning papers and execute code examples to test concepts",
    toolkitIds: [Servers.Exa, Servers.E2B],
    description: "Research with hands-on code experimentation"
  },
  {
    content: "Find competitors in my industry and remember their key strategies",
    toolkitIds: [Servers.Exa, Servers.Memory],
    description: "Competitive intelligence with persistent insights"
  },
  {
    content: "Analyze my GitHub contributions and generate a portfolio showcase image",
    toolkitIds: [Servers.Github, Servers.Image],
    description: "Code portfolio visualization"
  },
  {
    content: "Search my Google Drive for project files and run analysis scripts on the data",
    toolkitIds: [Servers.GoogleDrive, Servers.E2B],
    description: "Document analysis with computational processing"
  },
  {
    content: "Remember my meeting preferences and schedule optimization based on calendar analysis",
    toolkitIds: [Servers.GoogleCalendar, Servers.Memory],
    description: "Smart scheduling with learning preferences"
  },
  {
    content: "Create stunning visualizations of research data and trends",
    toolkitIds: [Servers.Exa, Servers.Image],
    description: "Research visualization and infographic creation"
  },
  {
    content: "Analyze GitHub repositories and remember coding patterns for future projects",
    toolkitIds: [Servers.Github, Servers.Memory],
    description: "Code analysis with pattern recognition and memory"
  },

  // Single-toolkit prompts (fallback options)
  {
    content: "Search for the latest developments in artificial intelligence and machine learning",
    toolkitIds: [Servers.Exa],
    description: "Comprehensive web research and information gathering"
  },
  {
    content: "Generate a beautiful infographic or chart for my presentation",
    toolkitIds: [Servers.Image],
    description: "Custom visual content creation"
  },
  {
    content: "Find and analyze interesting GitHub repositories in my field",
    toolkitIds: [Servers.Github],
    description: "Repository discovery and code analysis"
  },
  {
    content: "Help me organize and optimize my calendar schedule",
    toolkitIds: [Servers.GoogleCalendar],
    description: "Smart calendar management and scheduling"
  },
  {
    content: "Search and analyze documents in my Google Drive",
    toolkitIds: [Servers.GoogleDrive],
    description: "Document discovery and content analysis"
  },
  {
    content: "Remember important information from our conversation for future reference",
    toolkitIds: [Servers.Memory],
    description: "Persistent memory and context management"
  },
  {
    content: "Execute Python code to analyze data, create visualizations, or solve complex problems",
    toolkitIds: [Servers.E2B],
    description: "Secure code execution and data processing"
  },

  // Fallback generic prompts (no specific toolkits required)
  {
    content: "Help me brainstorm creative ideas for my project",
    toolkitIds: [],
    description: "General creative assistance and ideation"
  },
  {
    content: "Explain a complex topic in simple terms",
    toolkitIds: [],
    description: "Educational content and concept explanation"
  },
  {
    content: "Review and improve my writing or code",
    toolkitIds: [],
    description: "Content review and optimization"
  },
  {
    content: "Create a strategic plan or roadmap for my goals",
    toolkitIds: [],
    description: "Strategic planning and goal setting"
  }
];

export const StarterPrompts = () => {
  const { append, toolkits } = useChatContext();

  // Get currently selected toolkit IDs
  const selectedToolkitIds = useMemo(() => {
    return new Set(toolkits.map(t => t.id as Servers));
  }, [toolkits]);

  // Filter and sort prompts based on selected toolkits
  const relevantPrompts = useMemo(() => {
    if (selectedToolkitIds.size === 0) {
      // If no toolkits selected, show generic prompts
      return DYNAMIC_STARTER_PROMPTS
        .filter(prompt => prompt.toolkitIds.length === 0)
        .slice(0, 4);
    }

    // Score prompts based on how many of their required toolkits are selected
    const scoredPrompts = DYNAMIC_STARTER_PROMPTS
      .map(prompt => {
        const matchingToolkits = prompt.toolkitIds.filter(id => 
          selectedToolkitIds.has(id)
        ).length;
        
        const totalRequired = prompt.toolkitIds.length;
        
        // Only include prompts where ALL required toolkits are available
        if (totalRequired === 0 || matchingToolkits === totalRequired) {
          return {
            ...prompt,
            score: matchingToolkits, // Higher score for more toolkit usage
            matchingToolkits
          };
        }
        
        return null;
      })
      .filter(Boolean) as Array<StarterPrompt & { score: number; matchingToolkits: number }>;

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
    <div className="mx-auto grid max-w-2xl grid-cols-1 gap-2 sm:grid-cols-2">
      {relevantPrompts.map((prompt, index) => (
        <motion.button
          key={`${prompt.content}-${selectedToolkitIds.size}`} // Key includes toolkit state for proper re-animation
          initial={{ opacity: 0, y: 10, height: "auto" }}
          animate={{ opacity: 1, y: 0, height: "auto" }}
          exit={{ opacity: 0, y: 10, height: 0 }}
          transition={{
            enter: { delay: 0.1 + index * 0.1 },
            exit: { delay: 0, duration: 0.1 },
          }}
          onClick={() => handlePromptClick(prompt.content)}
          className="bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground rounded-xl border p-3 text-left text-sm transition-colors relative group"
          title={prompt.description}
        >
          <div className="space-y-1">
            <p className="text-sm leading-relaxed">{prompt.content}</p>
            {prompt.toolkitIds.length > 0 && (
              <div className="flex flex-wrap gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                {prompt.toolkitIds.map(toolkitId => (
                  <span
                    key={toolkitId}
                    className="text-xs px-1.5 py-0.5 bg-primary/10 text-primary rounded"
                  >
                    {toolkitId}
                  </span>
                ))}
              </div>
            )}
          </div>
        </motion.button>
      ))}
    </div>
  );
};
