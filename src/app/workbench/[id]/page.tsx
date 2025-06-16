import { notFound, redirect } from "next/navigation";

import { auth } from "@/server/auth";
import { Chat } from "../../(chat)/_components/chat";
import { api } from "@/trpc/server";
import { WorkbenchHeader } from "@/components/workbench/workbench-header";
import { generateUUID } from "@/lib/utils";

export default async function WorkbenchPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const { id } = params;

  const session = await auth();

  try {
    const workbench = await api.workbenches.getWorkbench(id);

    if (!workbench) {
      notFound();
    }

    if (!session?.user?.id) {
      redirect("/api/auth/guest");
    }

    const chatId = generateUUID();

    return (
      <div className="flex h-full flex-col">
        <WorkbenchHeader workbench={workbench} />
        <div className="flex-1 overflow-hidden">
          <Chat
            id={chatId}
            isReadonly={false}
            initialMessages={[]}
            initialVisibilityType="private"
            autoResume={true}
            hasInitialMessages={false}
            workbench={workbench}
            session={session}
          />
        </div>
      </div>
    );
  } catch (error) {
    console.error(error);
    notFound();
  }
}
