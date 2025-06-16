"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/trpc/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { getClientToolkit } from "@/toolkits/toolkits/client";
import { ToolkitList } from "@/components/toolkit/toolkit-list";
import type { Toolkits } from "@/toolkits/toolkits/shared";
import type { SelectedToolkit } from "@/components/toolkit/types";
import type { Workbench } from "@prisma/client";

interface EditWorkbenchFormProps {
  workbench: Workbench;
}

export function EditWorkbenchForm({ workbench }: EditWorkbenchFormProps) {
  const router = useRouter();
  const [name, setName] = useState(workbench.name);
  const [systemPrompt, setSystemPrompt] = useState(workbench.systemPrompt);
  const [selectedToolkits, setSelectedToolkits] = useState<SelectedToolkit[]>(
    workbench.toolkitIds.map((id) => {
      const typedId = id as Toolkits;
      const toolkit = getClientToolkit(typedId);
      return {
        id: typedId,
        toolkit,
        parameters: {},
      };
    }),
  );

  const updateMutation = api.workbenches.updateWorkbench.useMutation({
    onSuccess: () => {
      toast.success("Workbench updated successfully");
      router.push("/workbenches");
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

    updateMutation.mutate({
      id: workbench.id,
      name: name.trim(),
      systemPrompt: systemPrompt.trim(),
      toolkitIds: selectedToolkits.map((toolkit) => toolkit.id),
    });
  };

  const handleAddToolkit = (toolkit: SelectedToolkit) => {
    setSelectedToolkits([...selectedToolkits, toolkit]);
  };

  const handleRemoveToolkit = (id: Toolkits) => {
    setSelectedToolkits(
      selectedToolkits.filter((toolkit) => toolkit.id !== id),
    );
  };

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <Button variant="ghost" asChild className="mb-4">
          <Link href="/workbenches">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Workbenches
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Edit Workbench</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Workbench Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter workbench name..."
                required
                maxLength={100}
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
                maxLength={10000}
              />
              <p className="text-muted-foreground text-sm">
                This prompt will be used to instruct the AI on how to behave in
                this workbench.
              </p>
            </div>

            <div className="space-y-4">
              <Label>Available Toolkits</Label>
              <div className="bg-muted/30 rounded-lg border p-4">
                <ToolkitList
                  selectedToolkits={selectedToolkits}
                  onAddToolkit={handleAddToolkit}
                  onRemoveToolkit={handleRemoveToolkit}
                />
              </div>
              {selectedToolkits.length > 0 && (
                <p className="text-muted-foreground text-sm">
                  {selectedToolkits.length} toolkit
                  {selectedToolkits.length !== 1 ? "s" : ""} selected
                </p>
              )}
            </div>

            <div className="flex justify-end space-x-2 border-t pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/workbenches")}
                disabled={updateMutation.isPending}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={updateMutation.isPending || !name.trim()}
              >
                <Save className="mr-2 h-4 w-4" />
                {updateMutation.isPending ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
