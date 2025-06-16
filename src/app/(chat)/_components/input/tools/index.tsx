import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Wrench } from "lucide-react";
import { useChatContext } from "@/app/(chat)/_contexts/chat-context";
import { useState } from "react";
import { ToolkitList } from "@/components/toolkit/toolkit-list";

export const ToolsSelect = () => {
  const { toolkits, addToolkit, removeToolkit } = useChatContext();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <TooltipProvider>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant={"outline"} className="bg-transparent">
            {toolkits.length > 0 ? (
              <div className="flex items-center">
                {toolkits.map((toolkit) => (
                  <div
                    className="bg-muted -ml-2 rounded-full border p-1"
                    key={toolkit.id}
                  >
                    <toolkit.toolkit.icon className="text-primary size-4" />
                  </div>
                ))}
              </div>
            ) : (
              <Wrench />
            )}
            <span>
              {toolkits.length > 0
                ? `${toolkits.length} Toolkit${toolkits.length > 1 ? "s" : ""}`
                : "Add Toolkits"}
            </span>
          </Button>
        </DialogTrigger>

        <DialogContent className="max-h-[80vh] max-w-2xl gap-6 overflow-hidden">
          <DialogHeader className="gap-0">
            <DialogTitle className="text-xl">Manage Toolkits</DialogTitle>
            <DialogDescription>
              Add or remove tools to enhance your chat experience
            </DialogDescription>
          </DialogHeader>

          <ToolkitList
            selectedToolkits={toolkits}
            onAddToolkit={addToolkit}
            onRemoveToolkit={removeToolkit}
          />
        </DialogContent>
      </Dialog>
    </TooltipProvider>
  );
};
