"use client";

import React, { memo } from "react";
import dynamic from "next/dynamic";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import {
  useLLMOutput,
  type LLMOutputComponent,
} from "@llm-ui/react";
import { markdownLookBack } from "@llm-ui/markdown";
import {
  codeBlockLookBack,
  findCompleteCodeBlock,
  findPartialCodeBlock,
} from "@llm-ui/code";

import { LLMCodeBlock } from "./llm-code-block";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface Props {
  children: string;
  headingClassName?: string;
  asSpan?: boolean;
  isStreamFinished?: boolean;
}

const MarkdownComponent: LLMOutputComponent = ({ blockMatch }) => {
  const markdown = blockMatch.output;
  
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm, remarkMath]}
      rehypePlugins={[rehypeKatex]}
      components={{
        h1({ children }) {
          return (
            <h1 className="text-xl font-bold md:text-2xl">
              {children}
            </h1>
          );
        },
        h2({ children }) {
          return (
            <h2 className="text-lg font-bold md:text-xl">
              {children}
            </h2>
          );
        },
        h3({ children }) {
          return (
            <h3 className="text-md font-bold md:text-lg">
              {children}
            </h3>
          );
        },
        h4({ children }) {
          return (
            <h4 className="md:text-md text-sm font-bold">
              {children}
            </h4>
          );
        },
        h5({ children }) {
          return (
            <h5 className="text-xs font-bold md:text-sm">
              {children}
            </h5>
          );
        },
        h6({ children }) {
          return (
            <h6 className="text-xs font-bold">
              {children}
            </h6>
          );
        },
        p({ children, node }) {
          const hasBlockElements = node?.children?.some(
            (child) =>
              "type" in child &&
              child.type === "element" &&
              "tagName" in child &&
              ["div", "p", "blockquote", "form"].includes(child.tagName),
          );

          if (hasBlockElements) {
            return <div className="text-sm md:text-base">{children}</div>;
          }

          return <p className="text-sm md:text-base">{children}</p>;
        },
        a({ href, children }) {
          return (
            <Link
              href={href ?? ""}
              className="text-primary underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {children}
            </Link>
          );
        },
        code({ className, children }) {

          return (
            <code
              className={cn(
                "rounded bg-muted px-1.5 py-0.5 text-sm font-mono",
                className,
              )}
            >
              {children}
            </code>
          );
        },
        
        pre({ children }) {
          return <div>{children}</div>;
        },
        ol({ children }) {
          return (
            <ol className="flex list-decimal flex-col gap-2 pl-4 text-sm md:text-base">
              {children}
            </ol>
          );
        },
        ul({ children }) {
          return (
            <ul className="flex list-disc flex-col gap-2 pl-4 text-sm md:text-base">
              {children}
            </ul>
          );
        },
        li({ children }) {
          return (
            <li className="ml-2 space-y-2 pl-2 text-sm md:text-base">
              {children}
            </li>
          );
        },
        img({ src, alt }) {
          if (!src) {
            return null;
          }

      
          return <img src={src} alt={alt} className="mx-auto" />;
        },
        table({ children }) {
          return (
            <div className="my-4 w-full overflow-x-auto">
              <table className="border-border w-full border-collapse border text-sm">
                {children}
              </table>
            </div>
          );
        },
        thead({ children }) {
          return <thead className="bg-muted/50">{children}</thead>;
        },
        tbody({ children }) {
          return <tbody>{children}</tbody>;
        },
        tr({ children }) {
          return (
            <tr className="border-border hover:bg-muted/25 border-b transition-colors">
              {children}
            </tr>
          );
        },
        th({ children }) {
          return (
            <th className="border-border border px-3 py-2 text-left font-semibold">
              {children}
            </th>
          );
        },
        td({ children }) {
          return <td className="border-border border px-3 py-2">{children}</td>;
        },
        blockquote({ children }) {
          return (
            <blockquote className="border-l-4 border-muted-foreground/20 pl-4 italic text-muted-foreground">
              {children}
            </blockquote>
          );
        },
      }}
    >
      {markdown}
    </ReactMarkdown>
  );
};

const NonMemoizedLLMMarkdown = ({ 
  children, 
  headingClassName, 
  asSpan, 
  isStreamFinished = true 
}: Props) => {
  const { blockMatches } = useLLMOutput({
    llmOutput: children,
    fallbackBlock: {
      component: MarkdownComponent,
      lookBack: markdownLookBack(),
    },
    blocks: [
      {
        component: LLMCodeBlock,
        findCompleteMatch: findCompleteCodeBlock(),
        findPartialMatch: findPartialCodeBlock(),
        lookBack: codeBlockLookBack(),
      },
    ],
    isStreamFinished,
  });

  return (
    <div className={cn("space-y-2", asSpan && "inline")}>
      {blockMatches.map((blockMatch, index) => {
        const Component = blockMatch.block.component;
        return <Component key={index} blockMatch={blockMatch} />;
      })}
    </div>
  );
};

export const LLMMarkdown = memo(
  NonMemoizedLLMMarkdown,
  (prevProps, nextProps) => 
    prevProps.children === nextProps.children && 
    prevProps.isStreamFinished === nextProps.isStreamFinished,
);
