import React from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { VStack } from "@/components/ui/stack";
import { EnvVarForm } from "@/components/env-vars/env-var-form";
import { toast } from "sonner";

export const KeyModal = () => {
  return (
    <Dialog open>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Welcome, Toolkit Developer!</DialogTitle>
          <DialogDescription>
            You will need to set an OpenRouter API key to use the chat.
          </DialogDescription>
        </DialogHeader>
        <VStack>
          <Button className="user-message w-full">
            Create an OpenRouter Key
          </Button>
          <p className="text-center">or</p>
          <div className="bg-muted/50 w-full rounded-md">
            <h2 className="border-b p-2 font-medium">Use an existing key</h2>
            <div className="p-2">
              <EnvVarForm
                envVars={[
                  {
                    type: "all",
                    keys: ["OPENROUTER_API_KEY"],
                    description: "Input your OpenRouter API key.",
                  },
                ]}
                resourceName="the chat"
                onSuccess={() => {
                  toast.success("OpenRouter API key has been set.");
                }}
              />
            </div>
          </div>
        </VStack>
      </DialogContent>
    </Dialog>
  );
};
