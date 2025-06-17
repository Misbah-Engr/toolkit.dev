import React, { memo } from "react";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

import { CodeBlock } from "./code-block";

import { cn } from "@/lib/utils";
import Link from "next/link";

interface Props {
  children: string;
  headingClassName?: string;
  asSpan?: boolean;
}

const NonMemoizedMarkdown = ({ children, headingClassName, asSpan }: Props) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm, remarkMath]}
      rehypePlugins={[rehypeKatex]}
      components={{
        h1({ children }) {
          return (
            <h1
              className={cn("text-xl font-bold md:text-2xl", headingClassName)}
            >
              {children}
            </h1>
          );
        },
        h2({ children }) {
          return (
            <h2
              className={cn("text-lg font-bold md:text-xl", headingClassName)}
            >
              {children}
            </h2>
          );
        },
        h3({ children }) {
          return (
            <h3
              className={cn("text-md font-bold md:text-lg", headingClassName)}
            >
              {children}
            </h3>
          );
        },
        h4({ children }) {
          return (
            <h4
              className={cn("md:text-md text-sm font-bold", headingClassName)}
            >
              {children}
            </h4>
          );
        },
        h5({ children }) {
          return (
            <h5
              className={cn("text-xs font-bold md:text-sm", headingClassName)}
            >
              {children}
            </h5>
          );
        },
        h6({ children }) {
          return (
            <h6 className={cn("text-xs font-bold", headingClassName)}>
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

          if (asSpan) {
            return <span>{children}</span>;
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
          const match = /language-(\w+)/.exec(className ?? "");

          if (!match) {
            return (
              <code
                className={cn("w-full max-w-full overflow-x-auto", className)}
              >
                {children}
              </code>
            );
          }

          const content = Array.isArray(children)
            ? children.join("")
            : typeof children === "string"
              ? children
              : "";

          return (
            <div className="w-full max-w-full overflow-hidden">
              <CodeBlock
                language={match[1] ?? "Plain Text"}
                value={content.replace(/\n$/, "")}
              />
            </div>
          );
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

          // eslint-disable-next-line @next/next/no-img-element
          return <img src={src} alt={alt} className="mx-auto" />;
        },
        pre({ children }) {
          return (
            <div className="w-full max-w-full overflow-hidden">{children}</div>
          );
        },
      }}
    >
      {children}
    </ReactMarkdown>
  );
};

export const Markdown = memo(
  NonMemoizedMarkdown,
  (prevProps, nextProps) => prevProps.children === nextProps.children,
);
