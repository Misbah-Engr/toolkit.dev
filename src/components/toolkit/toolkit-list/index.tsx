import React, { useEffect, useState } from "react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList,
} from "@/components/ui/command";

import { ToolkitItem } from "./item";

import { clientToolkits } from "@/toolkits/toolkits/client";

import type { ClientToolkit } from "@/toolkits/types";
import type { Toolkits } from "@/toolkits/toolkits/shared";
import type { SelectedToolkit } from "../types";

interface ToolkitListProps {
  selectedToolkits: SelectedToolkit[];
  onAddToolkit: (toolkit: SelectedToolkit) => void;
  onRemoveToolkit: (id: Toolkits) => void;
}

const toolkitItemHeight = 48;
const numToolkitsToShow = 5;

export const ToolkitList: React.FC<ToolkitListProps> = ({
  selectedToolkits,
  onAddToolkit,
  onRemoveToolkit,
}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const updatedToolkits = Object.entries(clientToolkits).filter(([id]) => {
      return (
        searchParams.get(id) === "true" &&
        !selectedToolkits.some((t) => t.id === (id as Toolkits))
      );
    });

    if (updatedToolkits.length > 0) {
      updatedToolkits.forEach(([id, toolkit]) => {
        onAddToolkit({
          id: id as Toolkits,
          parameters: {},
          toolkit: toolkit as ClientToolkit,
        });
      });
      window.history.replaceState({}, "", pathname);
    }
  }, [searchParams, onAddToolkit, selectedToolkits, router, pathname]);

  return (
    <Command className="bg-transparent">
      <CommandInput
        placeholder="Search toolkits..."
        value={searchQuery}
        onValueChange={setSearchQuery}
      />
      <CommandList
        style={{
          height: `${toolkitItemHeight * (numToolkitsToShow + 0.5)}px`,
        }}
      >
        <CommandEmpty>No toolkits match your search</CommandEmpty>
        <CommandGroup className="p-0" heading="Enabled">
          {selectedToolkits.map((toolkit) => (
            <ToolkitItem
              key={toolkit.id}
              id={toolkit.id}
              toolkit={toolkit.toolkit}
              isSelected={true}
              addToolkit={onAddToolkit}
              removeToolkit={onRemoveToolkit}
            />
          ))}
        </CommandGroup>
        <CommandGroup className="p-0" heading="Available">
          {Object.entries(clientToolkits)
            .filter(
              ([id]) =>
                !selectedToolkits.some((t) => t.id === (id as Toolkits)),
            )
            .map(([id, toolkit]) => {
              const typedId = id as Toolkits;
              return (
                <ToolkitItem
                  key={typedId}
                  id={typedId}
                  toolkit={toolkit as ClientToolkit}
                  isSelected={selectedToolkits.some((t) => t.id === typedId)}
                  addToolkit={onAddToolkit}
                  removeToolkit={onRemoveToolkit}
                />
              );
            })}
        </CommandGroup>
      </CommandList>
    </Command>
  );
};
