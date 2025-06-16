import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { Chat } from "./_components/chat";

import { auth } from "@/server/auth";
import { api } from "@/trpc/server";

import { generateUUID } from "@/lib/utils";

export default async function Page() {
  const session = await auth();

  if (!session) {
    return null;
  }

  // Check if this is a new user by looking at their chat history
  const chatHistory = await api.chats.getChats({ limit: 1 });
  
  // If user has no chat history, redirect to onboarding
  if (chatHistory.items.length === 0) {
    redirect("/onboarding");
  }

  const id = generateUUID();

  const cookieStore = await cookies();
  const modelIdFromCookie = cookieStore.get("chat-model");

  return (
    <Chat
      key={id}
      id={id}
      initialMessages={[]}
      initialChatModel={modelIdFromCookie?.value ?? "gpt-4o"}
      initialVisibilityType="private"
      isReadonly={false}
      session={session}
      autoResume={false}
      hasInitialMessages={false}
    />
  );
}
