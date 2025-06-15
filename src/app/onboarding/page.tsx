"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Plus, Info } from "lucide-react";
import { HStack } from "@/components/ui/stack";
import { clientToolkits } from "@/toolkits/toolkits/client";
import type { ClientToolkit } from "@/toolkits/types";
import type { Servers, ServerToolParameters } from "@/toolkits/toolkits/shared";
import { localStorageUtils } from "@/lib/local-storage";
import type z from "zod";

export default function OnboardingPage() {
  const router = useRouter();
  const [selectedToolkits, setSelectedToolkits] = useState<
    Array<{
      id: string;
      toolkit: ClientToolkit;
      parameters: z.infer<ClientToolkit["parameters"]>;
    }>
  >([]);

  const addToolkit = (
    id: string,
    toolkit: ClientToolkit,
    parameters: z.infer<ClientToolkit["parameters"]>,
  ) => {
    setSelectedToolkits(prev => [
      ...prev.filter((t) => t.id !== id),
      { id, toolkit, parameters },
    ]);
  };

  const removeToolkit = (id: string) => {
    setSelectedToolkits(prev => prev.filter((t) => t.id !== id));
  };

  const handleContinueToChat = () => {
    // Save selected toolkits to local storage
    localStorageUtils.setToolkits(selectedToolkits);
    
    // Redirect to the main chat page
    router.push("/");
  };

  const addToolkitButtons = (
    id: Servers,
    toolkit: ClientToolkit,
    isSelected: boolean,
    needsConfiguration: boolean,
  ) =>
    isSelected ? (
      <Button
        variant="primaryOutline"
        size="sm"
        onClick={() => removeToolkit(id)}
      >
        Selected
      </Button>
    ) : needsConfiguration ? (
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm">
            <Plus className="size-4" />
            Add
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <ClientToolkitConfigure
            toolkit={toolkit}
            id={id}
            schema={toolkit.parameters}
            onAdd={addToolkit}
          />
        </PopoverContent>
      </Popover>
    ) : (
      <Button
        variant="outline"
        size="sm"
        onClick={() => addToolkit(id, toolkit, {})}
      >
        <Plus className="size-4" />
        Add
      </Button>
    );

  return (
    <div className="min-h-screen bg-muted/50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Welcome to the App!</CardTitle>
          <CardDescription className="text-lg">
            Choose your toolkits to enhance your chat experience
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              Toolkits are collections of specialized tools that extend the AI&apos;s capabilities. 
              You can add web search, code execution, image generation, and more to customize your experience.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-lg">Available Toolkits</h3>
              {selectedToolkits.length > 0 && (
                <span className="text-sm text-muted-foreground">
                  {selectedToolkits.length} selected
                </span>
              )}
            </div>
            
            <TooltipProvider>
              <div className="space-y-3">
                {Object.entries(clientToolkits).map(([id, toolkit]) => {
                  const isSelected = selectedToolkits.some((t) => t.id === id);
                  const needsConfiguration =
                    Object.keys(toolkit.parameters.shape).length > 0;

                  return (
                    <div
                      key={id}
                      className="flex items-center justify-between gap-4 p-4 border rounded-lg"
                    >
                      <div className="flex flex-col flex-1">
                        <HStack className="gap-3">
                          <toolkit.icon className="size-5" />
                          <h4 className="font-medium">{toolkit.name}</h4>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Info className="text-muted-foreground size-4 cursor-pointer" />
                            </TooltipTrigger>
                            <TooltipContent side="right" className="max-w-64">
                              <div className="space-y-2">
                                <p className="text-sm font-medium">
                                  Available Tools
                                </p>
                                <ul className="space-y-1">
                                  {Object.entries(toolkit.tools).map(
                                    ([name, tool]) => (
                                      <li
                                        key={name}
                                        className="flex items-start gap-2"
                                      >
                                        <div className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-current" />
                                        <p className="text-xs">
                                          {tool.description}
                                        </p>
                                      </li>
                                    ),
                                  )}
                                </ul>
                              </div>
                            </TooltipContent>
                          </Tooltip>
                        </HStack>
                        <p className="text-muted-foreground text-sm mt-1">
                          {toolkit.description}
                        </p>
                      </div>

                      <div className="flex justify-end">
                        {toolkit.addToolkitWrapper ? (
                          <toolkit.addToolkitWrapper>
                            {addToolkitButtons(
                              id as Servers,
                              toolkit as ClientToolkit,
                              isSelected,
                              needsConfiguration,
                            )}
                          </toolkit.addToolkitWrapper>
                        ) : (
                          addToolkitButtons(
                            id as Servers,
                            toolkit as ClientToolkit,
                            isSelected,
                            needsConfiguration,
                          )
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </TooltipProvider>
          </div>

          <div className="flex justify-center pt-4">
            <Button 
              onClick={handleContinueToChat}
              size="lg"
              className="min-w-48"
            >
              Continue to Chat
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

const ClientToolkitConfigure: React.FC<{
  toolkit: ClientToolkit;
  id: Servers;
  schema: z.ZodObject<z.ZodRawShape>;
  onAdd: (
    id: string,
    toolkit: ClientToolkit,
    parameters: z.infer<ClientToolkit["parameters"]>,
  ) => void;
}> = ({ toolkit, id, schema, onAdd }) => {
  const [parameters, setParameters] = useState<ServerToolParameters[typeof id]>(
    {} as ServerToolParameters[typeof id],
  );

  const handleSubmit = () => {
    onAdd(id, toolkit, parameters);
  };

  return (
    <div className="space-y-4">
      <div>
        <h4 className="font-medium">{toolkit.name}</h4>
      </div>

      <div className="space-y-4">
        {toolkit.form && (
          <toolkit.form parameters={parameters} setParameters={setParameters} />
        )}
      </div>

      <Button
        onClick={handleSubmit}
        disabled={!schema.safeParse(parameters).success}
        className="w-full"
      >
        <Plus className="mr-2 size-4" />
        Add {toolkit.name}
      </Button>
    </div>
  );
};