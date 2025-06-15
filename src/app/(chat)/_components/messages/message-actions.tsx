import { memo } from "react";

import { toast } from "sonner";

import { useCopyToClipboard } from "usehooks-ts";

import { Copy, Share } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";

import type { Message } from "ai";

interface Props {
  message: Message;
  isLoading: boolean;
  chatId: string;
}

export const PureMessageActions: React.FC<Props> = ({ message, isLoading, chatId }) => {
  const [, copyToClipboard] = useCopyToClipboard();
  const router = useRouter();
  const branchChatMutation = api.chats.branchChat.useMutation({
    onSuccess: (newChat) => {
      toast.success("Chat branched successfully!");
      router.push(`/chat/${newChat.id}`);
    },
    onError: (error) => {
      toast.error(`Failed to branch chat: ${error.message}`);
    },
  });

  if (isLoading) return null;
  if (message.role === "user") return null;

  const handleBranch = () => {
    const textFromParts = message.parts
      ?.filter((part) => part.type === "text")
      .map((part) => part.text)
      .join(" ")
      .trim();

    const branchTitle = textFromParts
      ? `Branch: ${textFromParts.slice(0, 50)}${textFromParts.length > 50 ? "..." : ""}`
      : "Branched Chat";

    branchChatMutation.mutate({
      originalChatId: chatId,
      messageId: message.id,
      title: branchTitle,
    });
  };

  return (
    <TooltipProvider delayDuration={0}>
      <div className="flex flex-row gap-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              className="text-muted-foreground h-fit px-2 py-1"
              variant="outline"
              onClick={async () => {
                const textFromParts = message.parts
                  ?.filter((part) => part.type === "text")
                  .map((part) => part.text)
                  .join("\n")
                  .trim();

                if (!textFromParts) {
                  toast.error("There's no text to copy!");
                  return;
                }

                await copyToClipboard(textFromParts);
                toast.success("Copied to clipboard!");
              }}
            >
              <Copy />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Copy</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              className="text-muted-foreground h-fit px-2 py-1"
              variant="outline"
              onClick={handleBranch}
              disabled={branchChatMutation.isPending}
            >
              <Share />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Branch chat from here</TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
};

export const MessageActions = memo(
  PureMessageActions,
  (prevProps, nextProps) => {
    if (prevProps.isLoading !== nextProps.isLoading) return false;

    return true;
  },
);
