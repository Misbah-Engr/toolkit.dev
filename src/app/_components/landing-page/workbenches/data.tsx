import { Toolkits } from "@/toolkits/toolkits/shared";
import type { WorkbenchExample } from "./types";
import { BarChart3, Code, Briefcase } from "lucide-react";

export const workbenchExamples: WorkbenchExample[] = [
  {
    title: "Research Assistant",
    description: "Comprehensive research and documentation workbench",
    systemPrompt:
      "You are a research assistant that helps users gather, analyze, and document information from multiple sources.",
    toolkits: [
      Toolkits.Exa,
      Toolkits.Github,
      Toolkits.Image,
      Toolkits.Notion,
      Toolkits.Memory,
    ],
    icon: <BarChart3 className="h-5 w-5" />,
    color: "blue",
  },
  {
    title: "Data Analyst",
    description: "Data processing and visualization workbench",
    systemPrompt:
      "You are a data analyst specializing in extracting insights from various data sources and creating compelling visualizations.",
    toolkits: [
      Toolkits.Notion,
      Toolkits.GoogleDrive,
      Toolkits.E2B,
      Toolkits.Image,
    ],
    icon: <Code className="h-5 w-5" />,
    color: "green",
  },
  {
    title: "Project Manager",
    description: "Team coordination and project management workbench",
    systemPrompt:
      "You are a project manager focused on coordinating teams, scheduling meetings, and tracking project progress.",
    toolkits: [
      Toolkits.GoogleCalendar,
      Toolkits.Notion,
      Toolkits.GoogleDrive,
      Toolkits.Memory,
    ],
    icon: <Briefcase className="h-5 w-5" />,
    color: "purple",
  },
];
