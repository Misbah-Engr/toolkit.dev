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
import { useState } from "react";
import { SearchTypeIcon } from "@/components/ui/search-type-icon";
import { SearchOptions } from "@/lib/ai/types";

export const SearchSelect: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { searchOption, setSearchOption, selectedChatModel } = useChatContext();

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
      <DropdownMenuContent
        className="w-[300px] p-0"
        align="start"
        sideOffset={8}
      >
        {Object.values(SearchOptions).map((option) => (
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
