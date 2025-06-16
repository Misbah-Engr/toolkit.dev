"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/trpc/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { VStack, HStack } from "@/components/ui/stack";
import { ToolkitList } from "@/components/toolkit/toolkit-list";
import type { SelectedToolkit } from "@/components/toolkit/types";
import type { Toolkits } from "@/toolkits/toolkits/shared";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";

export default function NewWorkbenchPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [systemPrompt, setSystemPrompt] = useState("");
  const [selectedToolkits, setSelectedToolkits] = useState<SelectedToolkit[]>(
    [],
  );

  const createMutation = api.workbenches.createWorkbench.useMutation({
    onSuccess: (workbench) => {
      toast.success("Workbench created successfully");
      router.push(`/workbench/${workbench.id}`);
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
    <div className="mx-auto max-w-4xl p-6">
      <VStack className="gap-6">
        <HStack className="items-start justify-between">
          <VStack className="gap-2">
            <HStack className="items-center gap-2">
              <Link href="/workbenches">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="size-4" />
                  Back to Workbenches
                </Button>
              </Link>
            </HStack>
            <div>
              <h1 className="text-3xl font-bold">Create New Workbench</h1>
              <p className="text-muted-foreground">
                Create a custom AI workbench with specific toolkits and system
                prompts.
              </p>
            </div>
          </VStack>
        </HStack>

        <form onSubmit={handleSubmit} className="space-y-8">
          <VStack className="gap-6">
            {/* Name Field */}
            <VStack className="gap-2">
              <Label htmlFor="name" className="text-base font-semibold">
                Workbench Name
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter workbench name..."
                required
                maxLength={100}
              />
              <p className="text-muted-foreground text-sm">
                Give your workbench a descriptive name (1-100 characters).
              </p>
            </VStack>

            {/* System Prompt Field */}
            <VStack className="gap-2">
              <Label htmlFor="systemPrompt" className="text-base font-semibold">
                System Prompt
              </Label>
              <Textarea
                id="systemPrompt"
                value={systemPrompt}
                onChange={(e) => setSystemPrompt(e.target.value)}
                placeholder="Enter system prompt to define the AI's behavior and role..."
                rows={8}
                className="resize-none"
                maxLength={10000}
              />
              <p className="text-muted-foreground text-sm">
                This prompt will instruct the AI on how to behave in this
                workbench (max 10,000 characters).
              </p>
            </VStack>

            {/* Toolkit Selection */}
            <VStack className="gap-2">
              <Label className="text-base font-semibold">
                Available Toolkits
              </Label>
              <p className="text-muted-foreground text-sm">
                Select the toolkits that will be available in this workbench.
              </p>
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
            </VStack>
          </VStack>

          {/* Form Actions */}
          <div className="flex justify-end space-x-3 border-t pt-6">
            <Link href="/workbenches">
              <Button
                type="button"
                variant="outline"
                disabled={createMutation.isPending}
              >
                Cancel
              </Button>
            </Link>
            <Button
              type="submit"
              disabled={createMutation.isPending || !name.trim()}
            >
              {createMutation.isPending ? "Creating..." : "Create Workbench"}
            </Button>
          </div>
        </form>
      </VStack>
    </div>
  );
}
