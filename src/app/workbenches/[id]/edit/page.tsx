"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/trpc/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
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

interface EditWorkbenchPageProps {
  params: { id: string };
}

export default function EditWorkbenchPage({ params }: EditWorkbenchPageProps) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [systemPrompt, setSystemPrompt] = useState("");
  const [selectedToolkits, setSelectedToolkits] = useState<string[]>([]);

  const { data: workbench, isLoading } = api.workbenches.getWorkbench.useQuery(params.id);

  const updateMutation = api.workbenches.updateWorkbench.useMutation({
    onSuccess: () => {
      toast.success("Workbench updated successfully");
      router.push("/workbenches");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  useEffect(() => {
    if (workbench) {
      setName(workbench.name);
      setSystemPrompt(workbench.systemPrompt);
      setSelectedToolkits(workbench.toolkitIds);
    }
  }, [workbench]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Please enter a workbench name");
      return;
    }
    
    updateMutation.mutate({
      id: params.id,
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

  if (isLoading) {
    return (
      <div className="container mx-auto py-8">
        <div className="mb-8">
          <Skeleton className="h-6 w-32 mb-4" />
          <Skeleton className="h-10 w-64" />
        </div>
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-40" />
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-32 w-full" />
            </div>
            <div className="space-y-4">
              <Skeleton className="h-4 w-32" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {Array.from({ length: 8 }).map((_, i) => (
                  <Skeleton key={i} className="h-16 w-full" />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!workbench) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Workbench not found</h1>
          <Button asChild>
            <Link href="/workbenches">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Workbenches
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <Button variant="ghost" asChild className="mb-4">
          <Link href="/workbenches">
            <ArrowLeft className="w-4 h-4 mr-2" />
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
                onClick={() => router.push("/workbenches")}
                disabled={updateMutation.isPending}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={updateMutation.isPending || !name.trim()}
              >
                <Save className="w-4 h-4 mr-2" />
                {updateMutation.isPending ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}