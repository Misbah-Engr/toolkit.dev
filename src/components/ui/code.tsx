import { createHighlighterCore } from "shiki/core";

import githubLight from "shiki/themes/github-light.mjs";
import githubDark from "shiki/themes/github-dark.mjs";

export const Code = ({ children }: { children: string }) => {
  return <pre>{children}</pre>;
};
