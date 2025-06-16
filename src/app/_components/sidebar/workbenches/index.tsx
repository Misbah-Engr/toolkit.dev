"use client";

import { Suspense, useState } from "react";

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

import { WorkbenchItem } from "./item";

import { api } from "@/trpc/react";
import { Button } from "@/components/ui/button";

export const NavWorkbenches = () => {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Workbenches</SidebarGroupLabel>
      <SidebarMenu>
        <Suspense fallback={<div>Loading...</div>}>
          <NavWorkbenchesBody />
        </Suspense>
      </SidebarMenu>
    </SidebarGroup>
  );
};

const NavWorkbenchesBody = () => {
  const { setOpenMobile } = useSidebar();

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const [workbenches, { fetchNextPage, hasNextPage, isFetchingNextPage }] =
    api.workbenches.getWorkbenches.useSuspenseInfiniteQuery(
      {
        limit: 10,
      },
      {
        getNextPageParam: (lastPage) =>
          lastPage.hasMore ? lastPage.nextCursor : undefined,
      },
    );

  const utils = api.useUtils();
  const { mutate: deleteWorkbench, isPending: isDeletingWorkbench } =
    api.workbenches.deleteWorkbench.useMutation();

  const handleDelete = () => {
    if (deleteId) {
      deleteWorkbench(deleteId);
      setShowDeleteDialog(false);
      void utils.workbenches.getWorkbenches.invalidate();
    }
  };

  if (workbenches.pages.flatMap((page) => page.items).length === 0) {
    return (
      <div className="text-muted-foreground overflow-hidden px-2 text-sm whitespace-nowrap group-data-[collapsible=icon]:hidden">
        No workbenches yet.
      </div>
    );
  }

  return (
    <>
      {workbenches.pages.flatMap((page) =>
        page.items.map((workbench) => (
          <WorkbenchItem
            key={workbench.id}
            workbench={workbench}
            isActive={false}
            onDelete={() => {
              setDeleteId(workbench.id);
              setShowDeleteDialog(true);
            }}
            setOpenMobile={setOpenMobile}
          />
        )),
      )}
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
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeletingWorkbench}
            >
              {isDeletingWorkbench ? "Deleting..." : "Continue"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
