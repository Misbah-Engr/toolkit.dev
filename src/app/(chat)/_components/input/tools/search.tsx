"use client";

import { Search, SearchX } from "lucide-react";

import {
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuItem,
  DropdownMenuPortal,
} from "@/components/ui/dropdown-menu";

import { useChatContext } from "../../../_contexts/chat-context";
import { useMemo } from "react";
import { SearchTypeIcon } from "@/components/ui/search-type-icon";
import { LanguageModelCapability, SearchOptions } from "@/ai/types";

export const SearchSelect: React.FC = () => {
  const { searchOption, setSearchOption, selectedChatModel } = useChatContext();

  const searchOptions = useMemo(() => {
    const options = [];
    if (
      selectedChatModel?.capabilities?.includes(
        LanguageModelCapability.WebSearch,
      )
    ) {
      options.push(SearchOptions.Native);
    }
    if (selectedChatModel?.provider === "openai") {
      options.push(SearchOptions.OpenAiResponses);
    }
    if (
      selectedChatModel?.capabilities?.includes(
        LanguageModelCapability.ToolCalling,
      )
    ) {
      options.push(SearchOptions.Exa);
    }
    return options;
  }, [selectedChatModel]);

  if (!selectedChatModel) {
    return null;
  }

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger className="flex cursor-pointer items-center gap-2">
        {searchOption ? (
          <>
            <SearchTypeIcon searchOption={searchOption} />
            <span className="flex-1 truncate text-left">{searchOption}</span>
          </>
        ) : (
          <>
            <Search className="size-4" />
            <span className="flex-1 truncate text-left">Search</span>
          </>
        )}
      </DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <DropdownMenuSubContent className="w-fit p-0" sideOffset={8}>
          {searchOptions.map((option) => (
            <DropdownMenuItem
              key={option}
              onClick={() => setSearchOption(option)}
            >
              <SearchTypeIcon searchOption={option} />
              {option}
            </DropdownMenuItem>
          ))}
          <DropdownMenuItem onClick={() => setSearchOption(undefined)}>
            <SearchX className="size-4" />
            No Search
          </DropdownMenuItem>
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  );
};
