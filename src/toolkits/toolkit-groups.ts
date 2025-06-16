import { Logo } from "@/components/ui/logo";
import { ToolkitGroups, type ToolkitGroup } from "./types";
import { BookCopy, Database } from "lucide-react";

export const toolkitGroups: ToolkitGroup[] = [
  {
    id: ToolkitGroups.Native,
    name: "Native Tools",
    icon: Logo,
  },
  {
    id: ToolkitGroups.DataSource,
    name: "Data Sources",
    icon: Database,
  },
  {
    id: ToolkitGroups.KnowledgeBase,
    name: "Knowledge Base",
    icon: BookCopy,
  },
];
