import React, { useEffect, useMemo, useState } from "react";

import { useTheme } from "next-themes";

interface Props {
  value: string;
}

export const CodeBlock: React.FC<Props> = ({ value }) => {
  const [highlighted, setHighlighted] = useState<string>("");
  const { theme, systemTheme } = useTheme();
  const selectedTheme = useMemo(() => {
    const currentTheme = theme === "system" ? systemTheme : theme;
    return currentTheme === "dark" ? "github-dark" : "github-light";
  }, [theme, systemTheme]);

  useEffect(() => {
    async function highlightCode() {
      try {
        const { codeToHtml } = await import("shiki");

        const highlighted = await codeToHtml(value, {
          lang: "typescript",
          theme: selectedTheme,
        });

        setHighlighted(highlighted);
      } catch (error) {
        console.error("Error highlighting code:", error);
        setHighlighted(`<pre>${value}</pre>`);
      }
    }
    void highlightCode();
  }, [value, selectedTheme]);

  return (
    <>
      <style>{`
        .shiki {
          padding: 1rem;
          overflow-x: auto;
          background-color: var(--card) !important;
          scrollbar-width: none;
          -ms-overflow-style: none;
          &::-webkit-scrollbar {
            display: none;
          }
        }

        @media (max-width: 768px) {
          .shiki {
            padding: 0.5rem;
            font-size: 12px;
          }
        }
      `}</style>
      <div dangerouslySetInnerHTML={{ __html: highlighted }} />
    </>
  );
};
