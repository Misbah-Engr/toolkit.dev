import { Chat } from "./_components/chat";

import { auth } from "@/server/auth";

import { generateUUID } from "@/lib/utils";

export default async function Page() {
  const session = await auth();

  if (!session) {
    return null;
  }

  const id = generateUUID();

  return (
    <Chat
      key={id}
      id={id}
      initialMessages={[]}
      initialVisibilityType="private"
      isReadonly={false}
      session={session}
      autoResume={false}
      hasInitialMessages={false}
    />
  );
}
