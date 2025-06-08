import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { Chat } from "./_components/chat";

import { auth } from "@/server/auth";

import { generateUUID } from "@/lib/utils";

export default async function Page() {
  const session = await auth();

  if (!session) {
    redirect("/api/auth/guest");
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
    />
  );
}
