"use client";

import React, { useRef } from "react";

import Link from "next/link";

import {
  DollarSign,
  Handshake,
  MessageSquareShare,
  type LucideIcon,
} from "lucide-react";
import { SiDiscord } from "@icons-pack/react-simple-icons";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { HStack, VStack } from "@/components/ui/stack";
import { AnimatedBeam } from "@/components/magicui/animated-beam";
import { MeritLogo } from "@/components/ui/merit-logo";

import { Section } from "../lib/section";
import { Heading } from "../lib/heading";

import { SECTIONS } from "../sections";

export const MeritSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const revenueRef = useRef<HTMLDivElement>(null);
  const sponsorshipRef = useRef<HTMLDivElement>(null);
  const referralRef = useRef<HTMLDivElement>(null);
  const meritLeftRef = useRef<HTMLDivElement>(null);
  const meritRightRef = useRef<HTMLDivElement>(null);
  const pr1Ref = useRef<HTMLDivElement>(null);
  const pr2Ref = useRef<HTMLDivElement>(null);
  const pr3Ref = useRef<HTMLDivElement>(null);

  return (
    <Section id={SECTIONS.Merit}>
      <Heading
        title={["Merge a PR", "Get Paid on Merit Systems"]}
        description="Toolkit will become the first autonomous repository by distributing all revenue directly to its contributors."
        className="mb-8"
        buttons={[
          <Link
            href="https://terminal.merit.systems/jasonhedman/toolkit.dev"
            key="terminal"
            target="_blank"
          >
            <Button className="user-message">Start Earning</Button>
          </Link>,
          <Link
            href="https://discord.gg/cnNBsSfY"
            key="discord"
            target="_blank"
          >
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
        <VStack className="items-start gap-2">
          <SourceCard Icon={DollarSign} title="Revenue" ref={revenueRef} />
          <SourceCard Icon={Handshake} title="Sponsors" ref={sponsorshipRef} />
          <SourceCard
            Icon={MessageSquareShare}
            title="Referrals"
            ref={referralRef}
          />
        </VStack>
        <Card className="relative z-10 size-14 shrink-0 flex-col items-center gap-2 p-2 md:size-fit md:flex-row md:gap-4 md:p-4">
          <div
            ref={meritLeftRef}
            className="absolute top-0 bottom-0 left-0 z-0 w-8"
          />
          <MeritLogo className="size-10 md:size-12" />
          <VStack className="hidden items-start gap-0 md:flex">
            <h1 className="text-2xl font-bold">Merit Systems</h1>
            <p className="text-sm font-light opacity-60">
              Assigns an impact score to each PR
            </p>
          </VStack>
          <div
            ref={meritRightRef}
            className="absolute top-0 right-0 bottom-0 z-0 w-8"
          />
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
          fromRef={meritLeftRef}
          toRef={revenueRef}
          duration={6}
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={meritLeftRef}
          toRef={sponsorshipRef}
          duration={6}
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={meritLeftRef}
          toRef={referralRef}
          duration={6}
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={meritRightRef}
          toRef={pr1Ref}
          duration={6}
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={meritRightRef}
          toRef={pr2Ref}
          duration={6}
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={meritRightRef}
          toRef={pr3Ref}
          duration={6}
        />
      </div>
    </Section>
  );
};

interface SourceCardProps {
  Icon: LucideIcon;
  title: string;
}

const SourceCard = React.forwardRef<HTMLDivElement, SourceCardProps>(
  ({ Icon, title }, ref) => {
    return (
      <Card className="relative z-10 w-full items-center gap-0 p-2">
        <Icon className="size-6 md:size-8" />
        <p className="text-xs font-bold md:text-sm">{title}</p>
        <div className="absolute top-0 right-0 bottom-0 z-0 w-4" ref={ref} />
      </Card>
    );
  },
);
SourceCard.displayName = "SourceCard";

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
            <p className="font-bold">PR #{number}</p>
            <p className="text-primary font-bold">${dollars}</p>
          </HStack>
          <h3 className="text-[10px] font-medium opacity-80 md:text-base">
            {title}
          </h3>
          <HStack className="hidden w-full justify-between text-xs font-light opacity-60 md:flex">
            <p>{mergedAt.toLocaleDateString()}</p>
            <HStack className="gap-1 font-mono">
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
