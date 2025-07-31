import React from "react";

import { Activity } from "lucide-react";

import { HStack, VStack } from "@/components/ui/stack";

import type { ClientToolConfig } from "@/toolkits/types";
import type { getActivitiesBase } from "./base";

export const getActivitiesToolConfigClient: ClientToolConfig<
  typeof getActivitiesBase.inputSchema.shape,
  typeof getActivitiesBase.outputSchema.shape
> = {
  CallComponent: ({ args }) => (
    <HStack className="gap-2">
      <Activity className="text-muted-foreground size-4" />
      <VStack className="items-start gap-0">
        <span className="text-muted-foreground/80 text-xs font-medium">
          Get Activities
        </span>
        <span className="text-sm">
          {args.per_page ? `${args.per_page} activities` : "Recent activities"}
          {args.page && args.page > 1 && ` (page ${args.page})`}
        </span>
      </VStack>
    </HStack>
  ),
  ResultComponent: ({ result }) => (
    <div className="space-y-3">
      <h3 className="font-semibold">Activities ({result.activities.length})</h3>
      <div className="space-y-2">
        {result.activities.slice(0, 10).map((activity) => (
          <div key={activity.id} className="rounded-md border p-2">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="text-sm font-medium">{activity.name}</h4>
                <p className="text-muted-foreground text-xs">
                  {activity.type} •{" "}
                  {activity.distance
                    ? (activity.distance / 1000).toFixed(1)
                    : "N/A"}
                  km •{" "}
                  {activity.moving_time
                    ? Math.floor(activity.moving_time / 60)
                    : "N/A"}
                  min
                </p>
              </div>
              <span className="text-muted-foreground text-xs">
                {new Date(activity.start_date_local).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
};
