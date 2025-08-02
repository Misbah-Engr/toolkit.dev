"use client";

import { memo, useState } from "react";
import type { CodeToHtmlOptions } from "@llm-ui/code";
import {
  loadHighlighter,
  useCodeBlockToHtml,
  allLangs,
  allLangsAlias,
  parseCompleteMarkdownCodeBlock,
} from "@llm-ui/code";
import { type LLMOutputComponent } from "@llm-ui/react";
import parseHtml from "html-react-parser";
import { getHighlighter } from "shiki";
import { bundledLanguagesInfo } from "shiki/langs";
import githubLight from "shiki/themes/github-light.mjs";
import githubDark from "shiki/themes/github-dark.mjs";
import { Check, Copy } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useCopyToClipboard } from "usehooks-ts";
import { markdownLanguages } from "./code-block";

const highlighter = loadHighlighter(
  getHighlighter({
    langs: allLangs(bundledLanguagesInfo),
    langAlias: allLangsAlias(bundledLanguagesInfo),
    themes: [githubLight, githubDark],
  }),
);

const codeToHtmlOptions: CodeToHtmlOptions = {
  theme: "github-light",
};

const codeToHtmlOptionsDark: CodeToHtmlOptions = {
  theme: "github-dark",
};


export const LLMCodeBlock: LLMOutputComponent = memo(({ blockMatch }) => {
  const [isCopied, setIsCopied] = useState(false);
  const [, copyToClipboard] = useCopyToClipboard();

 
  const parsed = parseCompleteMarkdownCodeBlock(blockMatch.output);
  const language = parsed?.language || "text";
  const code = parsed?.code || blockMatch.output;
  console.log("Parsed code block:", { language, code });
  console.log("Block match output:", blockMatch.output);
  console.log(parsed)

  const { html: lightHtml } = useCodeBlockToHtml({
    markdownCodeBlock: blockMatch.output,
    highlighter,
    codeToHtmlOptions,
  });

  const { html: darkHtml } = useCodeBlockToHtml({
    markdownCodeBlock: blockMatch.output,
    highlighter,
    codeToHtmlOptions: codeToHtmlOptionsDark,
  });

  const onCopy = async () => {
    if (isCopied) return;
    const success = await copyToClipboard(code);
    if (success) {
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    }
  };

  if (!lightHtml || !darkHtml) {

    const codeLines = code.split('\n');
    
    return (
      <Card className="codeblock relative w-full max-w-full gap-0 overflow-hidden rounded-md py-0 font-sans">
        <div className="bg-primary/10 flex w-full items-center justify-between py-1 pr-2 pl-4">
          <span className="text-xs font-semibold">
            {markdownLanguages[language] || language}
          </span>
          <div className="flex items-center gap-2">
            <span
              className="h-fit w-fit cursor-pointer rounded-md p-2 text-xs transition-colors duration-200 hover:bg-neutral-200 focus-visible:ring-offset-0 dark:hover:bg-neutral-600"
              onClick={onCopy}
            >
              {isCopied ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
              <span className="sr-only">Copy code</span>
            </span>
          </div>
        </div>
        <div className="overflow-x-auto">
          <pre className="flex p-4 text-sm">
            <div className="flex flex-col pr-4 text-right text-xs text-muted-foreground select-none">
              {codeLines.map((_, index) => (
                <span key={index} className="leading-6">
                  {index + 1}
                </span>
              ))}
            </div>
            <code className="font-mono flex-1 overflow-x-auto">
              {codeLines.map((line, index) => (
                <div key={index} className="leading-6 whitespace-pre">
                  {line}
                </div>
              ))}
            </code>
          </pre>
        </div>
      </Card>
    );
  }

  
  const codeLines = code.split('\n');

  return (
    <Card className="codeblock relative w-full max-w-full gap-0 overflow-hidden rounded-md py-0 font-sans">
      <div className="bg-primary/10 flex w-full items-center justify-between py-1 pr-2 pl-4">
        <span className="text-xs font-semibold">
          {markdownLanguages[language] || language}
        </span>
        <div className="flex items-center gap-2">
          <span
            className="h-fit w-fit cursor-pointer rounded-md p-2 text-xs transition-colors duration-200 hover:bg-neutral-200 focus-visible:ring-offset-0 dark:hover:bg-neutral-600"
            onClick={onCopy}
          >
            {isCopied ? (
              <Check className="h-4 w-4" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
            <span className="sr-only">Copy code</span>
          </span>
        </div>
      </div>
      <div className="overflow-x-auto">
        <div className="flex p-4 text-sm">
          <div className="flex flex-col pr-4 text-right text-xs text-muted-foreground select-none">
            {codeLines.map((_, index) => (
              <span key={index} className="leading-6">
                {index + 1}
              </span>
            ))}
          </div>

          <div className="flex-1 overflow-x-auto">
            {/* Light theme */}
            <div className="dark:hidden [&_pre]:!p-0 [&_pre]:!m-0 [&_pre]:!bg-transparent [&_pre]:!leading-6 [&_code]:!leading-6 [&_span]:!leading-6">
              {parseHtml(lightHtml)}
            </div>
            {/* Dark theme */}
            <div className="hidden dark:block [&_pre]:!p-0 [&_pre]:!m-0 [&_pre]:!bg-transparent [&_pre]:!leading-6 [&_code]:!leading-6 [&_span]:!leading-6">
              {parseHtml(darkHtml)}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
});

LLMCodeBlock.displayName = "LLMCodeBlock";
