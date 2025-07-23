import React from "react";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { HStack, VStack } from "@/components/ui/stack";

import { Section } from "../lib/section";
import { AuthModal } from "../lib/auth-modal";
import { SECTIONS } from "../sections";

import { HeroGraph } from "./graph";
import { Badge } from "@/components/ui/badge";
import { MeritLogo } from "@/components/ui/merit-logo";
import { Graphic } from "./graphic";

export const HeroSection: React.FC = () => {
  return (
    <Section id={SECTIONS.Hero}>
      <div className="flex flex-col items-center gap-8">
        <VStack className="gap-8">
          <VStack className="gap-4 text-center">
            <Badge variant="glass" className="gap-1">
              <MeritLogo className="size-4" />
              <span>A Merit Systems Experiment</span>
            </Badge>
            <VStack className="gap-1">
              <h1 className="text-primary overflow-hidden text-5xl font-bold whitespace-nowrap md:text-6xl">
                Toolkit.dev
              </h1>
              <h2 className="text-xl font-semibold md:text-2xl">
                Get Paid to Build LLM Tools
              </h2>
            </VStack>
            <p className="text-foreground/80 max-w-md text-sm font-light md:text-base">
              An open-source project that{" "}
              <strong className="text-foreground font-bold">
                pays every merged PR
              </strong>
              . <br /> Join us in building a{" "}
              <strong className="text-foreground font-bold">
                self-sustaining AI app
              </strong>{" "}
              for the usage-based economy.
            </p>
          </VStack>
          <HStack className="w-full">
            <Link
              href="https://discord.gg/HkXwTaTV"
              target="_blank"
              className="flex-1 shrink-0"
            >
              <Button
                size="lg"
                className="user-message w-full text-base font-semibold"
              >
                Join Us
              </Button>
            </Link>
            <div className="flex-1 shrink-0">
              <AuthModal>
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full text-base font-semibold"
                >
                  Playground
                </Button>
              </AuthModal>
            </div>
          </HStack>
        </VStack>
        <div className="w-full max-w-2xl">
          <Graphic />
        </div>
      </div>
    </Section>
  );
};
