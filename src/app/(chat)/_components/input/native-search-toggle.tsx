import { LanguageModelCapability } from "@/ai/types";
import { useChatContext } from "@/app/(chat)/_contexts/chat-context";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Globe } from "lucide-react";

export const NativeSearchToggle = () => {
  const { useNativeSearch, setUseNativeSearch, selectedChatModel } =
    useChatContext();

  if (
    !selectedChatModel?.capabilities?.includes(
      LanguageModelCapability.WebSearch,
    )
  ) {
    return null;
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant={useNativeSearch ? "primaryOutline" : "outline"}
          size="icon"
          onClick={(event) => {
            event.preventDefault();
            setUseNativeSearch(!useNativeSearch);
          }}
          className="bg-transparent"
          type="button"
        >
          <Globe className="size-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        {useNativeSearch ? (
          <p>Native search enabled</p>
        ) : (
          <p>Native search disabled</p>
        )}
      </TooltipContent>
    </Tooltip>
  );
};
