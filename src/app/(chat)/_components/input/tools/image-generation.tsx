"use client";

import { Image as ImageIcon } from "lucide-react";

import {
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuItem,
  DropdownMenuPortal,
} from "@/components/ui/dropdown-menu";

import { useChatContext } from "../../../_contexts/chat-context";
import { api } from "@/trpc/react";
import { ModelProviderIcon } from "@/components/ui/model-icon";

export const ImageGenerationSelect: React.FC = () => {
  const { imageGenerationModel, setImageGenerationModel, selectedChatModel } =
    useChatContext();

  const { data: models } = api.models.getImageModels.useQuery();

  if (!selectedChatModel) {
    return null;
  }

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger className="flex cursor-pointer items-center gap-2">
        {imageGenerationModel ? (
          <>
            <ModelProviderIcon
              provider={imageGenerationModel.provider}
              className="size-4"
            />
            <span className="flex-1 truncate text-left">
              {imageGenerationModel.name}
            </span>
          </>
        ) : (
          <>
            <ImageIcon className="size-4" />
            <span className="flex-1 truncate text-left">Image Generation</span>
          </>
        )}
      </DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <DropdownMenuSubContent className="w-fit p-0" sideOffset={8}>
          {models?.map((model) => (
            <DropdownMenuItem
              key={model.modelId}
              onClick={() => setImageGenerationModel(model)}
            >
              <ModelProviderIcon provider={model.provider} className="size-4" />
              {model.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  );
};
