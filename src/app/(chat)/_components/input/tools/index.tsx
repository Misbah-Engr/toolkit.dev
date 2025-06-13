import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Wrench } from "lucide-react";
import { SearchSelect } from "./search";
import { ImageGenerationSelect } from "./image-generation";

export const ToolsSelect = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="bg-transparent">
          <Wrench />
          <span>Tools</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent side="bottom" align="start">
        <SearchSelect />
        <ImageGenerationSelect />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
