"use client";

import { useState } from "react";
import { api } from "@/trpc/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus, Settings, MessageSquare, Copy, Trash2 } from "lucide-react";
import Link from "next/link";
import { CreateWorkbenchDialog } from "@/components/workbench/create-workbench-dialog";
import { DeleteWorkbenchDialog } from "@/components/workbench/delete-workbench-dialog";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";

export default function WorkbenchesPage() {
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [deleteWorkbenchId, setDeleteWorkbenchId] = useState<string | null>(null);

  const { data: workbenches, isLoading, refetch } = api.workbenches.getWorkbenches.useQuery({
    limit: 50,
  });

  const duplicateMutation = api.workbenches.duplicateWorkbench.useMutation({
    onSuccess: () => {
      toast.success("Workbench duplicated successfully");
      void refetch();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleDuplicate = (workbenchId: string) => {
    duplicateMutation.mutate(workbenchId);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-8">
        <div className="mb-8">
          <Skeleton className="h-10 w-48 mb-2" />
          <Skeleton className="h-6 w-96" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-20 w-full mb-4" />
                <div className="flex justify-between items-center">
                  <Skeleton className="h-6 w-20" />
                  <div className="flex gap-2">
                    <Skeleton className="h-8 w-8" />
                    <Skeleton className="h-8 w-8" />
                    <Skeleton className="h-8 w-8" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Workbenches</h1>
          <p className="text-muted-foreground mt-2">
            Create and manage your AI workbenches with custom toolkits and prompts.
          </p>
        </div>
        <Button onClick={() => setCreateDialogOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Create Workbench
        </Button>
      </div>

      {workbenches?.items.length === 0 ? (
        <div className="text-center py-12">
          <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
            <Settings className="w-12 h-12 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold mb-2">No workbenches yet</h3>
          <p className="text-muted-foreground mb-6">
            Create your first workbench to get started with custom AI configurations.
          </p>
          <Button onClick={() => setCreateDialogOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Create Your First Workbench
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workbenches?.items.map((workbench) => (
            <Card key={workbench.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{workbench.name}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      Created {formatDistanceToNow(new Date(workbench.createdAt))} ago
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {workbench.systemPrompt || "No system prompt configured"}
                    </p>
                  </div>
                  
                  <div className="flex flex-wrap gap-1">
                    {workbench.toolkitIds.slice(0, 3).map((toolkitId) => (
                      <Badge key={toolkitId} variant="secondary" className="text-xs">
                        {toolkitId}
                      </Badge>
                    ))}
                    {workbench.toolkitIds.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{workbench.toolkitIds.length - 3} more
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MessageSquare className="w-4 h-4" />
                      {workbench._count.chats} chats
                    </div>
                    
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDuplicate(workbench.id)}
                        disabled={duplicateMutation.isPending}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        asChild
                      >
                        <Link href={`/workbenches/${workbench.id}/edit`}>
                          <Settings className="w-4 h-4" />
                        </Link>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setDeleteWorkbenchId(workbench.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <Button asChild className="w-full">
                    <Link href={`/workbench/${workbench.id}`}>
                      Open Workbench
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <CreateWorkbenchDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        onSuccess={() => {
          setCreateDialogOpen(false);
          void refetch();
        }}
      />

      <DeleteWorkbenchDialog
        workbenchId={deleteWorkbenchId}
        onOpenChange={(open) => !open && setDeleteWorkbenchId(null)}
        onSuccess={() => {
          setDeleteWorkbenchId(null);
          void refetch();
        }}
      />
    </div>
  );
}