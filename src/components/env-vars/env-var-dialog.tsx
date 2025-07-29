import React from "react";

import { AlertTriangle } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

import { EnvVarForm } from "./env-var-form";

import type { EnvVars } from "@/toolkits/types";

interface Props {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  resourceName: string;
  onSuccess: () => void;
  envVars: EnvVars;
}

export const EnvVarDialog: React.FC<Props> = ({
  isOpen,
  onOpenChange,
  resourceName,
  envVars,
  onSuccess,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="gap-4" showCloseButton={false}>
        <DialogHeader className="">
          <DialogTitle className="flex justify-between">
            Insufficient Env Vars
            <Badge className="size-fit gap-2" variant="warning">
              <AlertTriangle className="size-4" />
              Dev Mode
            </Badge>
          </DialogTitle>
          <DialogDescription>
            In order to use {resourceName}, you will need the following
            environment variables:
          </DialogDescription>
        </DialogHeader>
        <EnvVarForm
          envVars={envVars}
          onSuccess={() => {
            onOpenChange(false);
            onSuccess();
          }}
          resourceName={resourceName}
        />
      </DialogContent>
    </Dialog>
  );
};
