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
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

// Available toolkit IDs - in a real app, this would come from an API
const AVAILABLE_TOOLKITS = [
  { id: "web-search", name: "Web Search", description: "Search the web for information" },
  { id: "code-interpreter", name: "Code Interpreter", description: "Execute Python code" },
  { id: "file-manager", name: "File Manager", description: "Manage files and documents" },
  { id: "calendar", name: "Calendar", description: "Calendar integration" },
  { id: "email", name: "Email", description: "Email management" },
  { id: "notion", name: "Notion", description: "Notion workspace integration" },
  { id: "github", name: "GitHub", description: "GitHub repository management" },
  { id: "slack", name: "Slack", description: "Slack communication" },
];

interface CreateWorkbenchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export function CreateWorkbenchDialog({
  open,
  onOpenChange,
  onSuccess,
}: CreateWorkbenchDialogProps) {
  const [name, setName] = useState("");
  const [systemPrompt, setSystemPrompt] = useState("");
  const [selectedToolkits, setSelectedToolkits] = useState<string[]>([]);

  const createMutation = api.workbenches.createWorkbench.useMutation({
    onSuccess: () => {
      toast.success("Workbench created successfully");
      setName("");
      setSystemPrompt("");
      setSelectedToolkits([]);
      onSuccess();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Please enter a workbench name");
      return;
    }
    
    createMutation.mutate({
      name: name.trim(),
      systemPrompt: systemPrompt.trim(),
      toolkitIds: selectedToolkits,
    });
  };

  const handleToolkitChange = (toolkitId: string, checked: boolean) => {
    if (checked) {
      setSelectedToolkits([...selectedToolkits, toolkitId]);
    } else {
      setSelectedToolkits(selectedToolkits.filter(id => id !== toolkitId));
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Workbench</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter workbench name..."
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="systemPrompt">System Prompt</Label>
            <Textarea
              id="systemPrompt"
              value={systemPrompt}
              onChange={(e) => setSystemPrompt(e.target.value)}
              placeholder="Enter system prompt to define the AI's behavior and role..."
              rows={6}
              className="resize-none"
            />
            <p className="text-sm text-muted-foreground">
              This prompt will be used to instruct the AI on how to behave in this workbench.
            </p>
          </div>

          <div className="space-y-4">
            <Label>Available Toolkits</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {AVAILABLE_TOOLKITS.map((toolkit) => (
                <div
                  key={toolkit.id}
                  className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <Checkbox
                    id={toolkit.id}
                    checked={selectedToolkits.includes(toolkit.id)}
                    onCheckedChange={(checked) =>
                      handleToolkitChange(toolkit.id, checked === true)
                    }
                  />
                  <div className="flex-1 min-w-0">
                    <Label
                      htmlFor={toolkit.id}
                      className="text-sm font-medium cursor-pointer"
                    >
                      {toolkit.name}
                    </Label>
                    <p className="text-xs text-muted-foreground mt-1">
                      {toolkit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            {selectedToolkits.length > 0 && (
              <p className="text-sm text-muted-foreground">
                {selectedToolkits.length} toolkit{selectedToolkits.length !== 1 ? 's' : ''} selected
              </p>
            )}
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
              disabled={createMutation.isPending || !name.trim()}
            >
              {createMutation.isPending ? "Creating..." : "Create Workbench"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}