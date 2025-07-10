"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  ChevronDown,
  Share,
  Globe,
  Trash,
  Check,
  Lock,
  Star,
  Menu,
} from "lucide-react";

import { useDataContext } from "@/app/_contexts/data-context";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { HStack } from "@/components/ui/stack";

import { useUpdateChatVisibility } from "@/app/_hooks/use-chat-visibility";
import { useDeleteChat } from "@/app/_hooks/use-delete-chat";
import { useStarChat } from "@/app/_hooks/use-star-chat";

export default function Topbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { activeChat: chat, setActiveChat } = useDataContext();

  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const updateChatVisibility = useUpdateChatVisibility();
  const deleteChat = useDeleteChat();
  const starChat = useStarChat();

  const handleDelete = () => {
    if (deleteId) {
      deleteChat.mutate(deleteId, {
        onSuccess: () => {
          setActiveChat(null);
          setShowDeleteDialog(false);
          router.push("/");
        },
      });
    }
  };

  const handleStar = (chatId: string, currentStarred: boolean) => {
    starChat.mutate({
      id: chatId,
      starred: !currentStarred,
    });
  };

  if (pathname === "/") return null;

  return (
    <div className="bg-background/80 shadow-background border-border/50 sticky top-0 z-20 flex h-12 w-full justify-between border-b px-2 py-3 shadow-lg backdrop-blur-md max-sm:text-sm lg:px-4">
      {!chat ? (
        <div className="text-muted-foreground italic max-sm:text-sm lg:px-4">
          No chat selected
        </div>
      ) : (
        <>
          <DropdownMenu>
            <HStack>
              <HStack className="hidden max-sm:block">
                <SidebarTrigger className="hover:bg-accent/50 mr-2 rounded-lg p-2">
                  <Menu size={20} />
                </SidebarTrigger>
              </HStack>
              <DropdownMenuTrigger asChild>
                <button className="hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground flex min-w-0 cursor-pointer items-center gap-2 rounded-md p-1 focus:outline-none focus-visible:ring-0 max-sm:max-w-[200px] max-sm:gap-1">
                  <span className="truncate">{chat.title}</span>
                  <ChevronDown size={20} />
                </button>
              </DropdownMenuTrigger>
            </HStack>
            <DropdownMenuContent side="bottom" align="end">
              <DropdownMenuItem
                className="text-foreground cursor-pointer"
                onClick={() => handleStar(chat.id, chat.starred)}
              >
                <Star className="text-foreground size-4" />
                <span>{chat.starred ? "Unstar" : "Star"}</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-destructive focus:bg-destructive/15 focus:text-destructive cursor-pointer"
                onClick={() => {
                  setDeleteId(chat.id);
                  setShowDeleteDialog(true);
                }}
              >
                <Trash className="text-destructive size-4" />
                <span>Delete</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground flex min-w-0 cursor-pointer items-center gap-2 rounded-md px-2 py-1 focus:outline-none focus-visible:ring-0">
                <Share className="size-4 max-sm:size-3" /> <span>Share</span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="bottom" align="end">
              <DropdownMenuItem
                className="cursor-pointer flex-row justify-between"
                onSelect={() => {
                  updateChatVisibility.mutate({
                    id: chat.id,
                    visibility: "private",
                  });
                }}
              >
                <div className="flex flex-row items-center gap-2">
                  <Lock size={12} />
                  <span>Private</span>
                </div>
                {chat.visibility === "private" ? (
                  <Check className="size-4" />
                ) : null}
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer flex-row justify-between"
                onClick={() => {
                  updateChatVisibility.mutate({
                    id: chat.id,
                    visibility: "public",
                  });
                }}
              >
                <div className="flex flex-row items-center gap-2">
                  <Globe />
                  <span>Public</span>
                </div>
                {chat.visibility === "public" ? (
                  <Check className="size-4" />
                ) : null}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <AlertDialog
            open={showDeleteDialog}
            onOpenChange={setShowDeleteDialog}
          >
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your chat and remove it from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
      )}
    </div>
  );
}
