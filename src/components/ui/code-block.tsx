"use client";

import { memo, useState } from "react";

import { Check, Copy } from "lucide-react";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  vs,
  vscDarkPlus,
} from "react-syntax-highlighter/dist/cjs/styles/prism";

import { Card } from "@/components/ui/card";

import { cn } from "@/lib/utils";

import { useCopyToClipboard } from "usehooks-ts";

interface Props {
  language: string;
  value: string;
  heading?: string;
  showLineNumbers?: boolean;
  allowCopy?: boolean;
  headerClassName?: string;
  headingClassName?: string;
}

type LanguageMap = Record<ProgrammingLanguages, string | undefined>;

export const programmingLanguages: LanguageMap = {
  javascript: ".js",
  python: ".py",
  java: ".java",
  c: ".c",
  cpp: ".cpp",
  "c#": ".cs",
  ruby: ".rb",
  php: ".php",
  swift: ".swift",
  "objective-c": ".m",
  kotlin: ".kt",
  typescript: ".ts",
  go: ".go",
  perl: ".pl",
  rust: ".rs",
  scala: ".scala",
  haskell: ".hs",
  lua: ".lua",
  shell: ".sh",
  sql: ".sql",
  html: ".html",
  css: ".css",
  json: ".json",
  less: ".less",
  lezer: ".lezer",
  markdown: ".md",
  sass: ".sass",
  xml: ".xml",
  clj: ".clj",
};

export const markdownLanguages: Record<string, string> = {
  js: "JavaScript",
  jsx: "JavaScript React",
  ts: "TypeScript",
  tsx: "TypeScript React",
  py: "Python",
  java: "Java",
  c: "C",
  cpp: "C++",
  cs: "C#",
  rb: "Ruby",
  php: "PHP",
  swift: "Swift",
  go: "Go",
  rs: "Rust",
  scala: "Scala",
  kt: "Kotlin",
  perl: "Perl",
  lua: "Lua",
  sh: "Shell",
  sql: "SQL",
  html: "HTML",
  css: "CSS",
  scss: "SCSS",
  sass: "Sass",
  less: "Less",
  json: "JSON",
  xml: "XML",
  yaml: "YAML",
  md: "Markdown",
  graphql: "GraphQL",
  dockerfile: "Dockerfile",
  bash: "Bash",
  powershell: "PowerShell",
  r: "R",
  matlab: "MATLAB",
  clj: "Clojure",
  fs: "F#",
  elm: "Elm",
  erlang: "Erlang",
  haskell: "Haskell",
  ocaml: "OCaml",
};

export const generateRandomString = (length: number, lowercase = false) => {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXY3456789"; // excluding similar looking characters like Z, 2, I, 1, O, 0
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return lowercase ? result.toLowerCase() : result;
};

export const CodeBlock: React.FC<Props> = memo(
  ({
    language,
    value,
    heading,
    showLineNumbers = true,
    allowCopy = true,
    headerClassName,
    headingClassName,
  }: Props) => {
    const [isCopied, setIsCopied] = useState(false);
    const [, copyToClipboard] = useCopyToClipboard();

    const onCopy = async () => {
      if (isCopied) return;
      const success = await copyToClipboard(value);
      if (success) {
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 2000);
      }
    };

    return (
      <Card
        className={cn(
          "codeblock relative w-full max-w-full gap-0 overflow-hidden overflow-x-auto rounded-md py-0 font-sans",
        )}
      >
        <div
          className={cn(
            "bg-primary/10 flex w-full items-center justify-between py-1 pr-2 pl-4",
            headerClassName,
          )}
        >
          <span className={cn("text-xs font-semibold", headingClassName)}>
            {heading ?? markdownLanguages[language] ?? language}
          </span>
          <div className="flex items-center gap-2">
            {allowCopy && (
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
            )}
          </div>
        </div>
        <div className="dark:hidden">
          <SyntaxHighlighter
            language={language}
            style={vs}
            PreTag="div"
            showLineNumbers={showLineNumbers}
            customStyle={{
              margin: 0,
              width: "100%",
              background: "transparent",
              padding: "1rem 1rem",
              border: "none",
            }}
            lineNumberStyle={{
              userSelect: "none",
            }}
            codeTagProps={{
              style: {
                fontSize: "0.9rem",
                fontFamily: "var(--font-mono)",
              },
            }}
            className="rounded-b-md border-0 p-0"
          >
            {value}
          </SyntaxHighlighter>
        </div>
        <div className="hidden dark:block">
          <SyntaxHighlighter
            language={language}
            style={vscDarkPlus}
            PreTag="div"
            showLineNumbers={showLineNumbers}
            customStyle={{
              margin: 0,
              width: "100%",
              background: "transparent",
              padding: "0.5rem 0.5rem",
              border: "none",
            }}
            lineNumberStyle={{
              userSelect: "none",
            }}
            codeTagProps={{
              style: {
                fontSize: "0.9rem",
                fontFamily: "var(--font-mono)",
              },
            }}
            className="rounded-b-md border-0"
          >
            {value}
          </SyntaxHighlighter>
        </div>
      </Card>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.value === nextProps.value &&
      prevProps.language === nextProps.language
    );
  },
);

CodeBlock.displayName = "CodeBlock";

enum ProgrammingLanguages {
  JAVASCRIPT = "javascript",
  PYTHON = "python",
  JAVA = "java",
  C = "c",
  CPP = "cpp",
  CSHARP = "c#",
  RUBY = "ruby",
  PHP = "php",
  SWIFT = "swift",
  OBJECTIVE_C = "objective-c",
  KOTLIN = "kotlin",
  TYPESCRIPT = "typescript",
  GO = "go",
  PERL = "perl",
  RUST = "rust",
  SCALA = "scala",
  HASKELL = "haskell",
  LUA = "lua",
  SHELL = "shell",
  SQL = "sql",
  HTML = "html",
  CSS = "css",
  JSON = "json",
  LESS = "less",
  LEZER = "lezer",
  MARKDOWN = "markdown",
  SASS = "sass",
  XML = "xml",
  CLJ = "clj",
}
