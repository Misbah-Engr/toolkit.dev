import { useEffect, useState } from "react";

import { Loader2, Save, Wrench } from "lucide-react";

import { useRouter, useSearchParams } from "next/navigation";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  TooltipContent,
  TooltipTrigger,
  Tooltip,
  TooltipProvider,
} from "@/components/ui/tooltip";

import { ToolkitList } from "@/components/toolkit/toolkit-list";
import { ToolkitIcons } from "@/components/toolkit/toolkit-icons";

import { useChatContext } from "@/app/_contexts/chat-context";

import { api } from "@/trpc/react";

import { clientToolkits } from "@/toolkits/toolkits/client";

import { LanguageModelCapability } from "@/ai/types";

import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";
import type { SelectedToolkit } from "@/components/toolkit/types";
import type { Workbench } from "@prisma/client";
import type { Toolkits } from "@/toolkits/toolkits/shared";
import { VStack } from "@/components/ui/stack";

// Shared content component for both dropdown and drawer
const ToolkitSelectContent: React.FC<{
  toolkits: SelectedToolkit[];
  addToolkit: (toolkit: SelectedToolkit) => void;
  removeToolkit: (id: Toolkits) => void;
  workbench: (Workbench & { toolkitIds: string[] }) | undefined;
  handleSave: () => void;
  isPending: boolean;
  isMobile?: boolean;
}> = ({
  toolkits,
  addToolkit,
  removeToolkit,
  workbench,
  handleSave,
  isPending,
  isMobile = false,
}) => (
  <>
    <div
      className={cn(
        "bg-background border-b",
        isMobile ? "p-4" : "sticky top-0 z-10 p-2",
      )}
    >
      <h2 className={cn("mb-1 font-bold", isMobile ? "text-lg" : "text-sm")}>
        Toolkit Selector
      </h2>
      <div
        className={cn(
          "text-muted-foreground",
          isMobile ? "text-base" : "text-sm",
        )}
      >
        Add or remove tools to enhance your chat experience
      </div>
    </div>
    <div
      className={cn(
        "w-full max-w-full overflow-x-hidden overflow-y-auto px-2 py-2",
        isMobile ? "max-h-[50vh] pb-4" : "max-h-56 pr-1 pl-2 md:max-h-80",
      )}
    >
      <ToolkitList
        selectedToolkits={toolkits}
        onAddToolkit={addToolkit}
        onRemoveToolkit={removeToolkit}
      />
      {workbench !== undefined && (
        <div className="border-t p-2">
          <Button
            variant={"outline"}
            className="w-full bg-transparent"
            onClick={handleSave}
            disabled={isPending}
          >
            {isPending ? <Loader2 className="animate-spin" /> : <Save />}
            Save
          </Button>
        </div>
      )}
    </div>
  </>
);

export const ToolsSelect = () => {
  const { toolkits, addToolkit, removeToolkit, workbench, selectedChatModel } =
    useChatContext();
  const searchParams = useSearchParams();
  const isMobile = useIsMobile();

  const [isOpen, setIsOpen] = useState(
    Object.keys(clientToolkits).some((toolkit) => searchParams.get(toolkit)),
  );
  const router = useRouter();

  useEffect(() => {
    if (
      !isOpen &&
      Object.keys(clientToolkits).some((toolkit) => searchParams.get(toolkit))
    ) {
      setIsOpen(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { mutate: updateWorkbench, isPending } =
    api.workbenches.updateWorkbench.useMutation({
      onSuccess: () => {
        toast.success("Workbench updated successfully");
        router.refresh();
        setIsOpen(false);
      },
    });

  const handleSave = () => {
    if (workbench) {
      updateWorkbench({
        id: workbench.id,
        name: workbench.name,
        systemPrompt: workbench.systemPrompt,
        toolkitIds: toolkits.map((toolkit) => toolkit.id),
      });
    }
  };

  if (
    selectedChatModel &&
    !selectedChatModel.capabilities?.includes(
      LanguageModelCapability.ToolCalling,
    )
  ) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={"outline"}
              className="w-fit cursor-not-allowed justify-start bg-transparent opacity-50 md:w-auto md:px-2"
            >
              <Wrench />
              <span className="hidden md:block">Add Toolkits</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>This model does not support tool calling</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  const triggerButton = (
    <Button
      variant={"outline"}
      className={cn(
        "w-fit justify-center bg-transparent md:w-auto md:px-2",
        toolkits.length === 0 && "size-9 md:w-auto",
      )}
      disabled={
        !selectedChatModel?.capabilities?.includes(
          LanguageModelCapability.ToolCalling,
        )
      }
    >
      {toolkits.length > 0 ? (
        <ToolkitIcons toolkits={toolkits.map((toolkit) => toolkit.id)} />
      ) : (
        <Wrench />
      )}
      <span className="hidden md:block">
        {toolkits.length > 0
          ? `${toolkits.length} Toolkit${toolkits.length > 1 ? "s" : ""}`
          : "Add Toolkits"}
      </span>
    </Button>
  );

  const contentProps = {
    toolkits,
    addToolkit,
    removeToolkit,
    workbench,
    handleSave,
    isPending,
  };

  return (
    <TooltipProvider>
      {isMobile ? (
        <Drawer open={isOpen} onOpenChange={setIsOpen}>
          <DrawerTrigger asChild>{triggerButton}</DrawerTrigger>
          <DrawerContent>
            <DrawerHeader className="sr-only">
              <DrawerTitle>Toolkit Selector</DrawerTitle>
            </DrawerHeader>
            <ToolkitSelectContent {...contentProps} isMobile={true} />
          </DrawerContent>
        </Drawer>
      ) : (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>{triggerButton}</PopoverTrigger>

          <PopoverContent
            className="h-96 w-xs overflow-hidden p-0 md:w-lg"
            align="start"
            sideOffset={8}
          >
            <div className="flex h-full max-h-full flex-col overflow-hidden">
              <VStack className="items-start gap-0 p-2 pb-0">
                <h2 className="mb-1 font-bold">Toolkit Selector</h2>
                <p className="text-muted-foreground text-sm">
                  Add or remove tools to augment your chat experience
                </p>
              </VStack>
              <div className="h-0 flex-1 overflow-hidden">
                <ToolkitList
                  selectedToolkits={toolkits}
                  onAddToolkit={addToolkit}
                  onRemoveToolkit={removeToolkit}
                />
              </div>
              {workbench !== undefined && (
                <div className="border-t p-2">
                  <Button
                    variant={"outline"}
                    className="w-full bg-transparent"
                    onClick={handleSave}
                    disabled={isPending}
                  >
                    {isPending ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      <Save />
                    )}
                    Save
                  </Button>
                </div>
              )}
            </div>
          </PopoverContent>
        </Popover>
      )}
    </TooltipProvider>
  );
};
