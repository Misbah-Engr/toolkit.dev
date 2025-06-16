"use client";

import { useState } from "react";
import { api } from "@/trpc/react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface CreateChatDialogProps {
  workbenchId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: (chatId: string) => void;
}

export function CreateChatDialog({
  workbenchId,
  open,
  onOpenChange,
  onSuccess,
}: CreateChatDialogProps) {
  const [title, setTitle] = useState("");
  const [visibility, setVisibility] = useState<"private" | "public">("private");

  const createMutation = api.workbenches.createChatWithWorkbench.useMutation({
    onSuccess: (chat) => {
      toast.success("Chat created successfully");
      setTitle("");
      setVisibility("private");
      onSuccess(chat.id);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error("Please enter a chat title");
      return;
    }
    
    createMutation.mutate({
      workbenchId,
      title: title.trim(),
      visibility,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Chat</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Chat Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter chat title..."
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="visibility">Visibility</Label>
            <select
              id="visibility"
              value={visibility}
              onChange={(e) => setVisibility(e.target.value as "private" | "public")}
              className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="private">Private - Only you can see this chat</option>
              <option value="public">Public - Anyone with the link can view this chat</option>
            </select>
          </div>

          <div className="flex justify-end space-x-2 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={createMutation.isPending}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={createMutation.isPending || !title.trim()}
            >
              {createMutation.isPending ? "Creating..." : "Create Chat"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}