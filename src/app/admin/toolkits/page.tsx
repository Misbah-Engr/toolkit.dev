import { clientToolkits } from "@/toolkits/toolkits/client";
import { StatsOverview } from "./_components/stats-overview";
import { ToolkitCard } from "./_components/toolkit-card";
import type { ClientToolkit } from "@/toolkits/types";

export default function AdminToolkitsPage() {
  return (
    <div className="mx-auto w-full space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Toolkit Management</h1>
          <p className="text-muted-foreground">
            Manage and monitor toolkit usage and performance
          </p>
        </div>
      </div>

      <StatsOverview />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Object.entries(clientToolkits).map(([toolkitId, toolkit]) => (
          <ToolkitCard
            key={toolkitId}
            toolkitId={toolkitId}
            toolkit={toolkit as ClientToolkit}
          />
        ))}
      </div>
    </div>
  );
}
