import { Chat } from "@/app/_components/chat/chat";

import { auth } from "@/server/auth";

import { generateUUID } from "@/lib/utils";
import LandingPage from "./_components/landing-page";

export default async function Page() {
  const session = await auth();

  if (!session) {
    return <LandingPage />;
  }

  const id = generateUUID();

  return (
    <Chat
      key={id}
      id={id}
      initialMessages={[]}
      initialVisibilityType="private"
      isReadonly={false}
      autoResume={false}
      hasInitialMessages={false}
    />
  );
}
