import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { ToolkitDemoList } from "./toolkit-demo-list";
import { SiGithub } from "@icons-pack/react-simple-icons";
import { Badge } from "@/components/ui/badge";
import { VStack } from "@/components/ui/stack";
import { MotionContainer } from "./motion-container";
import { AuthModal } from "../auth-modal";

export const HeroSection: React.FC = () => {
  return (
    <section className="relative flex h-[calc(100vh-53px)] items-center overflow-hidden border-b">
      <div className="container mx-auto flex h-full flex-col items-center md:flex-row">
        <div className="w-1/2 p-16">
          <MotionContainer
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center gap-6 md:items-end"
          >
            <VStack className="items-end">
              <Badge variant="primary">T3 Cloneathon Project</Badge>
              <h1 className="from-foreground to-foreground/80 bg-gradient-to-r bg-clip-text text-right text-4xl leading-tight font-bold text-transparent md:text-6xl">
                Open Source
                <br />
                <span className="from-primary to-primary/70 bg-gradient-to-r bg-clip-text text-transparent">
                  Generative UI Chatbot
                </span>
              </h1>
            </VStack>

            <p className="text-muted-foreground max-w-lg text-right text-lg leading-relaxed md:text-xl">
              Write workflows in normal async code and we&apos;ll handle the
              rest, from queues to elastic scaling. No timeouts, retries,
              observability, and zero infrastructure to manage.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Button
                variant="outline"
                size="lg"
                className="text-base font-semibold"
              >
                <span className="flex items-center gap-2">
                  <SiGithub />
                  Contribute
                </span>
              </Button>
              <AuthModal>
                <Button
                  size="lg"
                  className="user-message text-base font-semibold"
                >
                  Try it Out
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </AuthModal>
            </div>
          </MotionContainer>
        </div>

        {/* Right Column - Toolkit Demo */}
        <div className="relative h-full w-1/2 overflow-hidden">
          <MotionContainer
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex h-full flex-1 items-center justify-center"
          >
            <div className="size-full w-full overflow-y-hidden rounded-none border-l py-16 pl-14">
              <ToolkitDemoList />
            </div>
          </MotionContainer>
        </div>
      </div>
    </section>
  );
};
