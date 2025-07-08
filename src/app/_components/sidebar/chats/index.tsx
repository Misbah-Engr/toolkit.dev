"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";

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
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  useSidebar,
} from "@/components/ui/sidebar";

import { VStack } from "@/components/ui/stack";
import { ChatItem } from "./item";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { useDeleteChat } from "@/app/_hooks/use-delete-chat";
import { useStarChat } from "@/app/_hooks/use-star-chat";

export const NavChats = () => {
  return (
    <VStack>
      <NavChatsBody />
    </VStack>
  );
};

const NavChatsBody = () => {
  const pathname = usePathname();
  const [, type, resourceId] = pathname.split("/");
  const workbenchId =
    type === "workbench" && resourceId !== "new" ? resourceId : undefined;

  const { setOpenMobile } = useSidebar();

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const {
    data: chats,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = api.chats.getChats.useInfiniteQuery(
    {
      limit: 10,
      workbenchId: workbenchId ?? null,
    },
    {
      getNextPageParam: (lastPage) =>
        lastPage.hasMore ? lastPage.nextCursor : undefined,
    },
  );

  const deleteChat = useDeleteChat();
  const starChat = useStarChat();

  const handleDelete = () => {
    if (deleteId) {
      deleteChat.mutate(deleteId);
      setShowDeleteDialog(false);
    }
  };

  const handleStar = (chatId: string, currentStarred: boolean) => {
    starChat.mutate({
      id: chatId,
      starred: !currentStarred,
    });
  };

  if (isLoading || !chats) return null;

  const allChats = chats.pages.flatMap((page) => page.items) ?? [];

  if (allChats.length === 0) {
    return (
      <SidebarGroup>
        <SidebarGroupLabel>Chats</SidebarGroupLabel>
        <SidebarMenu>
          <div className="text-muted-foreground px-3 py-2 text-xs">
            No chats yet.
          </div>
        </SidebarMenu>
      </SidebarGroup>
    );
  }

  const starredChats = allChats.filter((chat) => chat.starred);
  const regularChats = allChats.filter((chat) => !chat.starred);

  return (
    <>
      {starredChats.length > 0 && (
        <SidebarGroup>
          <SidebarGroupLabel>Starred</SidebarGroupLabel>
          <SidebarMenu>
            {starredChats.map((chat) => (
              <ChatItem
                key={chat.id}
                chat={chat}
                isActive={pathname.endsWith(chat.id)}
                onDelete={(id) => {
                  setDeleteId(id);
                  setShowDeleteDialog(true);
                }}
                onStar={() => handleStar(chat.id, chat.starred)}
                setOpenMobile={setOpenMobile}
              />
            ))}
          </SidebarMenu>
        </SidebarGroup>
      )}

      {regularChats.length > 0 && (
        <SidebarGroup>
          <SidebarGroupLabel>Chats</SidebarGroupLabel>
          <SidebarMenu>
            {regularChats.map((chat) => (
              <ChatItem
                key={chat.id}
                chat={chat}
                isActive={pathname.endsWith(chat.id)}
                onDelete={(id) => {
                  setDeleteId(id);
                  setShowDeleteDialog(true);
                }}
                onStar={() => handleStar(chat.id, chat.starred)}
                setOpenMobile={setOpenMobile}
              />
            ))}
            {hasNextPage && (
              <Button
                onClick={() => void fetchNextPage()}
                variant="ghost"
                size="xs"
                className="text-accent-foreground/40 w-full justify-start"
              >
                {isFetchingNextPage ? "Loading..." : "Load more"}
              </Button>
            )}
          </SidebarMenu>
        </SidebarGroup>
      )}

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              chat and remove it from our servers.
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
  );
};
