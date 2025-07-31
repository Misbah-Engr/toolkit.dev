import { Activity } from "lucide-react";

import { HStack, VStack } from "@/components/ui/stack";

import type { ClientToolConfig } from "@/toolkits/types";
import type { getActivityDetailsBase } from "./base";

export const getActivityDetailsToolConfigClient: ClientToolConfig<
  typeof getActivityDetailsBase.inputSchema.shape,
  typeof getActivityDetailsBase.outputSchema.shape
> = {
  CallComponent: ({ args }) => (
    <HStack className="gap-2">
      <Activity className="text-muted-foreground size-4" />
      <VStack className="items-start gap-0">
        <span className="text-muted-foreground/80 text-xs font-medium">
          Activity Details
        </span>
        <span className="text-sm">Activity ID: {args.id}</span>
      </VStack>
    </HStack>
  ),
  ResultComponent: ({ result: { activity } }) => (
    <div className="space-y-3">
      <div>
        <h3 className="font-semibold">{activity.name}</h3>
        <p className="text-muted-foreground text-sm">{activity.type}</p>
      </div>
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <span className="font-medium">Distance:</span>{" "}
          {activity.distance ? (activity.distance / 1000).toFixed(1) : "N/A"}km
        </div>
        <div>
          <span className="font-medium">Time:</span>{" "}
          {activity.moving_time ? Math.floor(activity.moving_time / 60) : "N/A"}
          min
        </div>
        <div>
          <span className="font-medium">Elevation:</span>{" "}
          {activity.total_elevation_gain || "N/A"}m
        </div>
        <div>
          <span className="font-medium">Avg Speed:</span>{" "}
          {activity.average_speed
            ? (activity.average_speed * 3.6).toFixed(1)
            : "N/A"}
          km/h
        </div>
      </div>
      {activity.description && (
        <p className="bg-muted rounded p-2 text-sm">{activity.description}</p>
      )}
    </div>
  ),
};
