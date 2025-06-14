import Image from "next/image";

import { ExaTools } from "./tools/tools";
import { createClientToolkit } from "@/toolkits/create-toolkit";
import { exaSearchToolConfigClient } from "./tools/search/client";
import { baseExaToolkitConfig } from "./base";

export const exaClientToolkit = createClientToolkit(
  baseExaToolkitConfig,
  {
    name: "Exa Search",
    description:
      "Exa is a tool that can search the web for up-to-date information",
    icon: ({ className }) => (
      <Image
        src="/icons/exa.png"
        alt="Exa"
        className={className}
        width={24}
        height={24}
      />
    ),
    form: null,
  },
  {
    [ExaTools.Search]: exaSearchToolConfigClient,
  },
);
