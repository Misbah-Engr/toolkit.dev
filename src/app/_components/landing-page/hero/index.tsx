import React from "react";

import Link from "next/link";

import { SiGithub } from "@icons-pack/react-simple-icons";

import { Button } from "@/components/ui/button";
import { HStack, VStack } from "@/components/ui/stack";

import { Section } from "../section";
import { AuthModal } from "../auth-modal";

import { AnimatedLogo } from "./animated-logo";

export const HeroSection: React.FC = () => {
  return (
    <Section id="banner">
      <div className="flex flex-col-reverse items-start gap-4 md:flex-row md:items-center md:justify-between md:gap-8">
        <VStack className="items-start gap-8">
          <VStack className="items-start gap-4">
            <VStack className="items-start gap-1">
              <h1 className="text-primary overflow-hidden text-5xl font-bold whitespace-nowrap md:text-6xl">
                Toolkit.dev
              </h1>
              <h2 className="text-xl font-semibold md:text-2xl">
                The Playground for LLM Tool Developers
              </h2>
            </VStack>
            <p className="max-w-sm text-sm md:text-base">
              Mix and match hundreds of tools in a highly-configurable chat
              interface
            </p>
          </VStack>
          <HStack>
            <AuthModal>
              <Button
                size="lg"
                className="user-message text-base font-semibold"
              >
                Get Started
              </Button>
            </AuthModal>
            <Link
              href="https://github.com/jasonhedman/toolkit.dev"
              target="_blank"
            >
              <Button
                variant="outline"
                size="lg"
                className="text-base font-semibold"
              >
                <SiGithub />
                Contribute
              </Button>
            </Link>
          </HStack>
        </VStack>
        <AnimatedLogo className="size-32 md:size-48" />
      </div>
    </Section>
  );
};
