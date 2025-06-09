"use client";

import { useEffect } from "react";

import { api } from "@/trpc/react";

import { Button } from "@/components/ui/button";
import { ModelProviderIcon } from "@/components/ui/model-icon";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import type { Model } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronsUpDown, X } from "lucide-react";

interface Props {
  selectedChatModel: Model | undefined;
  setSelectedChatModel: (model: Model) => void;
}

export const ModelSelect: React.FC<Props> = ({
  selectedChatModel,
  setSelectedChatModel,
}) => {
  const { data: models, isLoading } = api.models.getModels.useQuery();

  useEffect(() => {
    const firstModel = models?.[0];

    if (firstModel) {
      setSelectedChatModel(firstModel);
    }
  }, [models, setSelectedChatModel]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="justify-start bg-transparent">
          {isLoading ? (
            <>
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-20" />
            </>
          ) : selectedChatModel ? (
            <>
              <ModelProviderIcon
                provider={selectedChatModel.provider}
                className="size-4"
              />
              {selectedChatModel.name}
              <ChevronsUpDown className="size-4" />
            </>
          ) : (
            <>
              <X className="size-4" />
              Select a model
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="max-h-48">
        {models?.map((model) => (
          <DropdownMenuItem
            key={model.modelId}
            onClick={() => setSelectedChatModel(model)}
          >
            <ModelProviderIcon provider={model.provider} className="size-4" />
            {model.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
