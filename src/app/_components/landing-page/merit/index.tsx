"use client";

import React, { useRef } from "react";

import { HStack, VStack } from "@/components/ui/stack";
import { Section } from "../section";
import { AnimatedBeam, Circle } from "@/components/magicui/animated-beam";
import { DollarSign, GitPullRequest } from "lucide-react";
import { MeritLogo } from "@/components/ui/merit-logo";
import { Card } from "@/components/ui/card";
import { Heading } from "../heading";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SiDiscord } from "@icons-pack/react-simple-icons";

export const MeritSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const dollarRef = useRef<HTMLDivElement>(null);
  const meritRef = useRef<HTMLDivElement>(null);
  const pr1Ref = useRef<HTMLDivElement>(null);
  const pr2Ref = useRef<HTMLDivElement>(null);
  const pr3Ref = useRef<HTMLDivElement>(null);

  return (
    <Section id="merit">
      <Heading
        title={["Merge a PR", "Get Paid on Merit Systems"]}
        description="Toolkit will become the first autonomous repository by distributing all revenue directly to its contributors."
        className="mb-8"
        buttons={[
          <Link
            href="https://terminal.merit.systems/jasonhedman/toolkit.dev"
            key="terminal"
          >
            <Button className="user-message">Start Earning</Button>
          </Link>,
          <Link href="https://discord.com" key="discord">
            <Button variant="outline">
              <SiDiscord />
              Join Discord
            </Button>
          </Link>,
        ]}
      />
      <div
        ref={containerRef}
        className="relative flex items-center justify-between gap-4 md:flex-row"
      >
        <Card ref={dollarRef} className="z-10 aspect-square p-2 md:p-4">
          <DollarSign className="size-6 md:size-10" />
        </Card>
        <Card
          ref={meritRef}
          className="z-10 size-14 shrink-0 flex-col items-center gap-2 p-2 md:size-fit md:flex-row md:gap-4 md:p-4"
        >
          <MeritLogo className="size-10 md:size-12" />
          <VStack className="hidden items-start gap-0 md:flex">
            <h1 className="text-2xl font-bold">Merit Systems</h1>
            <p className="text-sm font-light opacity-60">
              Assigns an impact score to each PR
            </p>
          </VStack>
        </Card>
        <div className="flex flex-col gap-2">
          <PrCard
            title="Add chat UI with rate limiting"
            number={3}
            additions={3611}
            deletions={28}
            mergedAt={new Date("2025-06-08")}
            dollars={428.79}
            ref={pr1Ref}
          />
          <PrCard
            title="Implement workbench system"
            number={53}
            additions={1677}
            deletions={404}
            mergedAt={new Date("2025-06-16")}
            dollars={343.18}
            ref={pr2Ref}
          />
          <PrCard
            title="Serve Toolkits as MCP Servers"
            number={23}
            additions={1248}
            deletions={236}
            mergedAt={new Date("2025-06-13")}
            dollars={228.08}
            ref={pr3Ref}
          />
        </div>
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={dollarRef}
          toRef={meritRef}
          duration={4}
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={meritRef}
          toRef={pr1Ref}
          duration={4}
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={meritRef}
          toRef={pr2Ref}
          duration={4}
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={meritRef}
          toRef={pr3Ref}
          duration={4}
        />
      </div>
    </Section>
  );
};

interface PrCardProps {
  title: string;
  number: number;
  additions: number;
  deletions: number;
  mergedAt: Date;
  dollars: number;
}

const PrCard = React.forwardRef<HTMLDivElement, PrCardProps>(
  ({ title, number, additions, deletions, mergedAt, dollars }, ref) => {
    return (
      <Card className="md:flew-row relative z-10 flex flex-col items-center justify-between gap-2 p-2 md:gap-4">
        <div ref={ref} className="absolute top-0 bottom-0 left-0 z-0 w-8" />
        <VStack className="items-start gap-1">
          <HStack className="w-full justify-between text-sm font-bold md:text-lg">
            <HStack className="gap-1 md:gap-2">
              <GitPullRequest className="text-primary size-4 md:size-5" />
              <p className="font-bold">PR #{number}</p>
            </HStack>
            <p className="text-primary font-bold">${dollars}</p>
          </HStack>
          <h3 className="text-xs font-medium opacity-80 md:text-base">
            {title}
          </h3>
          <HStack className="hidden w-full justify-between text-sm font-light opacity-60 md:flex">
            <p>{mergedAt.toLocaleDateString()}</p>
            <HStack className="gap-1">
              <p className="text-green-500">+{additions.toLocaleString()}</p>
              <p className="text-red-500">-{deletions.toLocaleString()}</p>
            </HStack>
          </HStack>
        </VStack>
      </Card>
    );
  },
);
PrCard.displayName = "PrCard";
