import { Loader2, Save } from "lucide-react";

import { useRouter } from "next/navigation";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { ToolkitList } from "@/components/toolkit/toolkit-list";

import { api } from "@/trpc/react";

import { useIsMobile } from "@/hooks/use-mobile";

import { cn } from "@/lib/utils";

import type { Workbench } from "@prisma/client";
import type { SelectedToolkit } from "./types";
import type { Toolkits } from "@/toolkits/toolkits/shared";

interface Props {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
  toolkits: SelectedToolkit[];
  addToolkit: (toolkit: SelectedToolkit) => void;
  removeToolkit: (id: Toolkits) => void;
  workbench?: Workbench | undefined;
}

export const ToolkitSelect: React.FC<Props> = ({
  isOpen,
  onOpenChange,
  workbench,
  toolkits,
  addToolkit,
  removeToolkit,
  children,
}) => {
  const isMobile = useIsMobile();

  const content = (
    <div className={cn("w-full max-w-full")}>
      <ToolkitList
        selectedToolkits={toolkits}
        onAddToolkit={addToolkit}
        onRemoveToolkit={removeToolkit}
        gradientClassName="md:from-popover"
      />
      {workbench !== undefined && (
        <WorkbenchSaveButton
          workbench={workbench}
          toolkits={toolkits}
          setIsOpen={onOpenChange}
        />
      )}
    </div>
  );

  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={onOpenChange}>
        <DrawerTrigger asChild>{children}</DrawerTrigger>
        <DrawerContent className="p-0">
          <DrawerHeader className="items-start px-3 pb-3">
            <DrawerTitle className="text-lg">Toolkit Selector</DrawerTitle>
            <DrawerDescription>
              Add tools to give the model more capabilities
            </DrawerDescription>
          </DrawerHeader>
          {content}
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Popover open={isOpen} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        className="w-xs overflow-hidden p-0 md:w-lg"
        align="start"
        sideOffset={8}
      >
        {content}
      </PopoverContent>
    </Popover>
  );
};

interface WorkbenchSaveButtonProps {
  workbench: Workbench;
  toolkits: SelectedToolkit[];
  setIsOpen: (open: boolean) => void;
}

const WorkbenchSaveButton: React.FC<WorkbenchSaveButtonProps> = ({
  workbench,
  toolkits,
  setIsOpen,
}) => {
  const router = useRouter();

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

  return (
    <div className="flex flex-col items-center gap-1 border-t p-2 text-center">
      <Button
        variant={"outline"}
        className="w-full bg-transparent"
        onClick={handleSave}
        disabled={isPending}
      >
        {isPending ? <Loader2 className="animate-spin" /> : <Save />}
        Update Workbench
      </Button>
      <p className="text-muted-foreground text-xs">
        You can proceed without saving if you do not want to change the default
        workbench configuration.
      </p>
    </div>
  );
};
