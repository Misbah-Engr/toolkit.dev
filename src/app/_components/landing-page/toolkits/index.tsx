import { api } from "@/trpc/server";

import { Section } from "../section";

import { ToolkitCard } from "./toolkit-card";

import type { Toolkits as ToolkitNames } from "@/toolkits/toolkits/shared";
import { Heading } from "../heading";

export const Toolkits = async () => {
  const topToolkits = await api.tools.getTopToolkits();

  return (
    <Section id="toolkits" className="px-0 pb-0 md:px-0 md:pb-0">
      <Heading
        title={["Top Toolkits", "Top Toolkits"]}
        description="The most used toolkits"
        className="mb-8 px-4 md:px-16"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {topToolkits.slice(0, 6).map((toolkit) => (
          <ToolkitCard
            key={toolkit.id}
            toolkit={toolkit.name as ToolkitNames}
            count={toolkit.totalUsage}
          />
        ))}
      </div>
    </Section>
  );
};
