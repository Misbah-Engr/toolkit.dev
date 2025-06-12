"use client";

import { ChevronsUpDown, SearchX } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useChatContext } from "../../../_contexts/chat-context";
import { useMemo, useState } from "react";
import { SearchTypeIcon } from "@/components/ui/search-type-icon";
import { ModelCapability, SearchOptions } from "@/ai/types";

export const SearchSelect: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { searchOption, setSearchOption, selectedChatModel } = useChatContext();

  const searchOptions = useMemo(() => {
    const options = [];
    if (selectedChatModel?.capabilities?.includes(ModelCapability.WebSearch)) {
      options.push(SearchOptions.Native);
    }
    if (selectedChatModel?.provider === "openai") {
      options.push(SearchOptions.OpenAiResponses);
    }
    if (
      selectedChatModel?.capabilities?.includes(ModelCapability.ToolCalling)
    ) {
      options.push(SearchOptions.Exa);
    }
    return options;
  }, [selectedChatModel]);

  if (!selectedChatModel) {
    return null;
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="justify-start bg-transparent">
          {searchOption ? (
            <>
              <SearchTypeIcon searchOption={searchOption} />
              <span className="flex-1 truncate text-left">{searchOption}</span>
            </>
          ) : (
            <>
              <SearchX className="size-4" />
              No Search
            </>
          )}
          <ChevronsUpDown className="size-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-fit p-0" align="start" sideOffset={8}>
        {searchOptions.map((option) => (
          <DropdownMenuItem
            key={option}
            onClick={() => setSearchOption(option)}
          >
            <SearchTypeIcon searchOption={option} />
            {option}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => setSearchOption(undefined)}>
          <SearchX className="size-4" />
          No Search
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
