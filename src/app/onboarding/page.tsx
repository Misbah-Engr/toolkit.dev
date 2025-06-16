"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plus } from "lucide-react";
import type { ClientToolkit } from "@/toolkits/types";
import type { Servers, ServerToolParameters } from "@/toolkits/toolkits/shared";
import { localStorageUtils } from "@/lib/local-storage";
import type z from "zod";
import { ToolkitList } from "@/components/toolkit/toolkit-list";
import type { SelectedToolkit } from "@/components/toolkit/types";
import { VStack } from "@/components/ui/stack";
import { Logo } from "@/components/ui/logo";

export default function OnboardingPage() {
  const router = useRouter();
  const [selectedToolkits, setSelectedToolkits] = useState<SelectedToolkit[]>(
    [],
  );

  const addToolkit = ({ id, toolkit, parameters }: SelectedToolkit) => {
    setSelectedToolkits((prev) => [
      ...prev.filter((t) => t.id !== id),
      { id, toolkit, parameters },
    ]);
  };

  const removeToolkit = (id: string) => {
    setSelectedToolkits((prev) => prev.filter((t) => t.id !== id));
  };

  const handleContinueToChat = () => {
    // Save selected toolkits to local storage
    localStorageUtils.setToolkits(selectedToolkits);

    // Redirect to the main chat page
    router.push("/");
  };

  return (
    <div className="bg-muted/50 flex min-h-screen flex-col items-center justify-center p-4">
      <VStack className="max-w-2xl gap-4">
        <VStack className="gap-4">
          <Logo className="size-16" />
          <VStack className="gap-1">
            <h1 className="text-2xl font-bold">Let&apos;s Get Started</h1>
            <p className="text-muted-foreground text-sm">
              Toolkits enhance your chat experience with specialized tools.
            </p>
          </VStack>
        </VStack>
        <Card className="flex w-full max-w-2xl flex-col items-center gap-4 p-4">
          <h2 className="text-primary text-center text-xl font-semibold">
            Select your Toolkits
          </h2>
          <ToolkitList
            selectedToolkits={selectedToolkits}
            onAddToolkit={addToolkit}
            onRemoveToolkit={removeToolkit}
          />

          <Button onClick={handleContinueToChat} size="lg" className="w-full">
            Continue to Chat
          </Button>
        </Card>
        <p className="text-muted-foreground text-center text-sm">
          Toolkits are collections of specialized tools that extend the
          AI&apos;s capabilities. You can add web search, code execution, image
          generation, and more to customize your experience.
        </p>
      </VStack>
    </div>
  );
}
