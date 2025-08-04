"use client";

import { Code } from "@/components/ui/code";

import { parsePartialMarkdownCodeBlock } from "@llm-ui/code";

import type { LLMOutputComponent } from "@llm-ui/react";
import type { BundledLanguage } from "@/components/ui/code/shiki.bundle";

export const LLMCodeBlock: LLMOutputComponent = ({ blockMatch }) => {
  const { code, language } = parsePartialMarkdownCodeBlock(blockMatch.output);

  if (!code || !language) {
    return null;
  }

  return <Code value={code} lang={language as BundledLanguage} />;
};
