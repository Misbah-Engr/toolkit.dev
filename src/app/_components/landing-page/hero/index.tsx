import React from "react";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { HStack, VStack } from "@/components/ui/stack";
import { AnimatedLogo } from "@/components/ui/logo";

import { Section } from "../lib/section";
import { AuthModal } from "../lib/auth-modal";
import { SECTIONS } from "../sections";

export const HeroSection: React.FC = () => {
  return (
    <Section id={SECTIONS.Hero}>
      <div className="flex flex-col-reverse items-start gap-4 md:flex-row md:items-center md:justify-between md:gap-8">
        <VStack className="items-start gap-8">
          <VStack className="items-start gap-4">
            <VStack className="items-start gap-1">
              <h1 className="text-primary overflow-hidden text-5xl font-bold whitespace-nowrap md:text-6xl">
                Toolkit.dev
              </h1>
              <h2 className="text-xl font-semibold md:text-2xl">
                Get Paid to Build LLM Tools
              </h2>
            </VStack>
            <p className="max-w-sm text-sm md:text-base">
              Join an elite group of global developers building an AI platform
              for the usage-based economy.
            </p>
          </VStack>
          <HStack>
            <Link href="https://discord.gg/HkXwTaTV" target="_blank">
              <Button
                size="lg"
                className="user-message text-base font-semibold"
              >
                Join Us
              </Button>
            </Link>
            <AuthModal>
              <Button
                variant="outline"
                size="lg"
                className="text-base font-semibold"
              >
                Try the Playground
              </Button>
            </AuthModal>
          </HStack>
        </VStack>
        <AnimatedLogo className="size-32 md:size-48" />
      </div>
    </Section>
  );
};
