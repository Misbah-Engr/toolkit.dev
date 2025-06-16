import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";

import { auth } from "@/server/auth";
import { Chat } from "../../(chat)/_components/chat";
import { api } from "@/trpc/server";
import { WorkbenchHeader } from "@/components/workbench/workbench-header";

import type { Message } from "@prisma/client";
import type { Attachment, UIMessage } from "ai";
import { languageModels } from "@/ai/models";

type WorkbenchData = {
  id: string;
  name: string;
  systemPrompt: string;
  toolkitIds: string[];
  userId: string;
  createdAt: Date;
  updatedAt: Date;
};

export default async function WorkbenchPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const { id } = params;

  const session = await auth();

  if (!session?.user?.id) {
    redirect("/api/auth/guest");
  }

  try {
    const workbench = (await api.workbenches.getWorkbench(id)) as WorkbenchData | null;

    if (!workbench) {
      notFound();
    }

    // Check if user owns this workbench
    if (session.user.id !== workbench.userId) {
      notFound();
    }

    // Create a new chat ID for this workbench session
    const chatId = `workbench-${id}-${Date.now()}`;

    const cookieStore = await cookies();
    const chatModelFromCookie = cookieStore.get("chat-model");

    return (
      <div className="h-full flex flex-col">
        <WorkbenchHeader workbench={workbench} />
        <div className="flex-1 overflow-hidden">
          <Chat
            id={chatId}
            initialMessages={[]}
            initialChatModel={chatModelFromCookie?.value ?? "gpt-4o"}
            initialVisibilityType="private"
            isReadonly={false}
            session={session}
            autoResume={false}
            hasInitialMessages={false}
            workbench={workbench}
          />
        </div>
      </div>
    );
  } catch (error) {
    notFound();
  }
}