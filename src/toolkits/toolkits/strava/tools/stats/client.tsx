import React from "react";

import { HStack } from "@/components/ui/stack";

import { BarChart3 } from "lucide-react";

import type { ClientToolConfig } from "@/toolkits/types";
import type { getAthleteStatsBase } from "./base";

export const getAthleteStatsToolConfigClient: ClientToolConfig<
  typeof getAthleteStatsBase.inputSchema.shape,
  typeof getAthleteStatsBase.outputSchema.shape
> = {
  CallComponent: ({}) => (
    <HStack className="gap-2">
      <BarChart3 className="text-muted-foreground size-4" />
      <span className="text-sm">Get Athlete Statistics</span>
    </HStack>
  ),
  ResultComponent: ({ result: { stats } }) => (
    <div className="space-y-4">
      <h3 className="font-semibold">Athlete Statistics</h3>
      <div className="grid grid-cols-1 gap-4">
        <div className="space-y-2">
          <h4 className="font-medium">Recent Totals (4 weeks)</h4>
          <div className="grid grid-cols-3 gap-2 text-sm">
            <div className="bg-muted rounded p-2">
              <div className="font-medium">Rides</div>
              <div>{stats.recent_ride_totals.count} rides</div>
              <div>
                {stats.recent_ride_totals.distance
                  ? (stats.recent_ride_totals.distance / 1000).toFixed(0)
                  : "N/A"}
                km
              </div>
            </div>
            <div className="bg-muted rounded p-2">
              <div className="font-medium">Runs</div>
              <div>{stats.recent_run_totals.count} runs</div>
              <div>
                {stats.recent_run_totals.distance
                  ? (stats.recent_run_totals.distance / 1000).toFixed(0)
                  : "N/A"}
                km
              </div>
            </div>
            <div className="bg-muted rounded p-2">
              <div className="font-medium">Swims</div>
              <div>{stats.recent_swim_totals.count} swims</div>
              <div>
                {stats.recent_swim_totals.distance
                  ? (stats.recent_swim_totals.distance / 1000).toFixed(0)
                  : "N/A"}
                km
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};
