"use client";

import { useState } from "react";
import { api } from "@/trpc/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, MessageSquare, Plus, Settings, Bot } from "lucide-react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { CreateChatDialog } from "@/components/workbench/create-chat-dialog";

interface WorkbenchPageProps {
  params: { id: string };
}

export default function WorkbenchPage({ params }: WorkbenchPageProps) {
  const [createChatOpen, setCreateChatOpen] = useState(false);

  const { data: workbench, isLoading: workbenchLoading } = api.workbenches.getWorkbench.useQuery(params.id);
  const { data: chats, isLoading: chatsLoading, refetch: refetchChats } = api.workbenches.getWorkbenchChats.useQuery({
    workbenchId: params.id,
    limit: 20,
  });

  if (workbenchLoading) {
    return (
      <div className="container mx-auto py-8">
        <div className="mb-8">
          <Skeleton className="h-6 w-32 mb-4" />
          <Skeleton className="h-10 w-64 mb-2" />
          <Skeleton className="h-6 w-96" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-40" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-32 w-full" />
              </CardContent>
            </Card>
          </div>
          <div>
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-32" />
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Skeleton key={i} className="h-16 w-full" />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
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
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <Bot className="w-8 h-8" />
              {workbench.name}
            </h1>
            <p className="text-muted-foreground mt-2">
              Created {formatDistanceToNow(new Date(workbench.createdAt))} ago
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link href={`/workbenches/${workbench.id}/edit`}>
                <Settings className="w-4 h-4 mr-2" />
                Edit
              </Link>
            </Button>
            <Button onClick={() => setCreateChatOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              New Chat
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="chats">Chats ({chats?.items.length ?? 0})</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>System Prompt</CardTitle>
                </CardHeader>
                <CardContent>
                  {workbench.systemPrompt ? (
                    <div className="prose prose-sm max-w-none">
                      <pre className="whitespace-pre-wrap text-sm bg-muted p-4 rounded-lg">
                        {workbench.systemPrompt}
                      </pre>
                    </div>
                  ) : (
                    <p className="text-muted-foreground italic">
                      No system prompt configured for this workbench.
                    </p>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Enabled Toolkits ({workbench.toolkitIds.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  {workbench.toolkitIds.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {workbench.toolkitIds.map((toolkitId) => (
                        <Badge key={toolkitId} variant="secondary">
                          {toolkitId}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground italic">
                      No toolkits enabled for this workbench.
                    </p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="chats" className="space-y-4">
              {chatsLoading ? (
                <div className="space-y-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Card key={i}>
                      <CardContent className="p-4">
                        <Skeleton className="h-5 w-3/4 mb-2" />
                        <Skeleton className="h-4 w-1/2" />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : chats?.items.length === 0 ? (
                <div className="text-center py-12 border-2 border-dashed rounded-lg">
                  <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No chats yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Start your first conversation with this workbench.
                  </p>
                  <Button onClick={() => setCreateChatOpen(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Start First Chat
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {chats?.items.map((chat) => (
                    <Card key={chat.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h3 className="font-medium mb-1">{chat.title}</h3>
                            <p className="text-sm text-muted-foreground">
                              {formatDistanceToNow(new Date(chat.createdAt))} ago
                            </p>
                          </div>
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/c/${chat.id}`}>
                              Open Chat
                            </Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Total Chats</span>
                <span className="font-medium">{workbench._count.chats}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Enabled Toolkits</span>
                <span className="font-medium">{workbench.toolkitIds.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Created</span>
                <span className="font-medium">
                  {formatDistanceToNow(new Date(workbench.createdAt))} ago
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                className="w-full justify-start" 
                onClick={() => setCreateChatOpen(true)}
              >
                <Plus className="w-4 h-4 mr-2" />
                New Chat
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href={`/workbenches/${workbench.id}/edit`}>
                  <Settings className="w-4 h-4 mr-2" />
                  Edit Workbench
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <CreateChatDialog
        workbenchId={params.id}
        open={createChatOpen}
        onOpenChange={setCreateChatOpen}
        onSuccess={(chatId) => {
          setCreateChatOpen(false);
          void refetchChats();
          // Navigate to the new chat
          window.location.href = `/c/${chatId}`;
        }}
      />
    </div>
  );
}