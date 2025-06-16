"use client";

import { api } from "@/trpc/react";
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
import { toast } from "sonner";

interface DeleteWorkbenchDialogProps {
  workbenchId: string | null;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export function DeleteWorkbenchDialog({
  workbenchId,
  onOpenChange,
  onSuccess,
}: DeleteWorkbenchDialogProps) {
  const deleteMutation = api.workbenches.deleteWorkbench.useMutation({
    onSuccess: () => {
      toast.success("Workbench deleted successfully");
      onSuccess();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleDelete = () => {
    if (workbenchId) {
      deleteMutation.mutate(workbenchId);
    }
  };

  return (
    <AlertDialog open={!!workbenchId} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Workbench</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this workbench? This action cannot be undone.
            All associated chats will be unlinked from this workbench but will not be deleted.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={deleteMutation.isPending}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={deleteMutation.isPending}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {deleteMutation.isPending ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}