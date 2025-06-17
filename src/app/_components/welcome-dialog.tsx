"use client";

import { useEffect } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Toolkits } from "@/toolkits/toolkits/shared";
import { ToolkitList } from "@/components/toolkit/toolkit-list";
import { HStack } from "@/components/ui/stack";
import { ArrowRight } from "lucide-react";
import { getClientToolkit } from "@/toolkits/toolkits/client";
import type { ClientToolkit } from "@/toolkits/types";
import { useChatContext } from "@/app/_contexts/chat-context";
import { usePathname, useRouter } from "next/navigation";

export function WelcomeDialog() {
  const { toolkits, addToolkit, removeToolkit } = useChatContext();
  const router = useRouter();
  const pathname = usePathname();

  // Set default toolkits when dialog opens
  useEffect(() => {
    if (toolkits.length === 0) {
      // Add the default toolkits from the original onboarding page
      const defaultToolkits = [
        {
          id: Toolkits.Image,
          toolkit: getClientToolkit(Toolkits.Image) as ClientToolkit,
          parameters: {
            model: "xai:grok-2-image",
          },
        },
        {
          id: Toolkits.Exa,
          toolkit: getClientToolkit(Toolkits.Exa) as ClientToolkit,
          parameters: {},
        },
        {
          id: Toolkits.E2B,
          toolkit: getClientToolkit(Toolkits.E2B) as ClientToolkit,
          parameters: {},
        },
        {
          id: Toolkits.Memory,
          toolkit: getClientToolkit(Toolkits.Memory) as ClientToolkit,
          parameters: {},
        },
      ];

      defaultToolkits.forEach((toolkit) => {
        addToolkit(toolkit);
      });
    }
  }, [toolkits.length, addToolkit]);

  return (
    <AlertDialog defaultOpen>
      <AlertDialogContent className="w-full sm:max-w-2xl">
        <HStack className="justify-between">
          <AlertDialogHeader className="gap-0">
            <AlertDialogTitle className="text-primary text-2xl font-bold">
              Start by Selecting Your Toolkits
            </AlertDialogTitle>
            <AlertDialogDescription className="text-muted-foreground text-sm">
              Toolkits enhance your chat experience with specialized tools.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogAction
            className="user-message shrink-0"
            onClick={() => {
              router.replace(pathname);
            }}
          >
            Continue to Chat <ArrowRight className="ml-2 size-4" />
          </AlertDialogAction>
        </HStack>

        <ToolkitList
          selectedToolkits={toolkits}
          onAddToolkit={addToolkit}
          onRemoveToolkit={removeToolkit}
        />

        <p className="text-muted-foreground text-center text-sm">
          Toolkits are collections of specialized tools that extend the
          AI&apos;s capabilities. You can add web search, code execution, image
          generation, and more to customize your experience.
        </p>
      </AlertDialogContent>
    </AlertDialog>
  );
}
