import type { ClientToolConfig } from "@/toolkits/types";

import type { getSegmentDetailsBase } from "./base";

import { HStack, VStack } from "@/components/ui/stack";
import { MapPin } from "lucide-react";

export const getSegmentDetailsToolConfigClient: ClientToolConfig<
  typeof getSegmentDetailsBase.inputSchema.shape,
  typeof getSegmentDetailsBase.outputSchema.shape
> = {
  CallComponent: ({ args }) => (
    <HStack className="gap-2">
      <MapPin className="text-muted-foreground size-4" />
      <VStack className="items-start gap-0">
        <span className="text-muted-foreground/80 text-xs font-medium">
          Segment Details
        </span>
        <span className="text-sm">Segment ID: {args.id}</span>
      </VStack>
    </HStack>
  ),
  ResultComponent: ({ result: { segment } }) => (
    <div className="space-y-3">
      <div>
        <h3 className="font-semibold">{segment.name}</h3>
        <p className="text-muted-foreground text-sm">
          {segment.city}, {segment.state} • {segment.activity_type}
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <span className="font-medium">Distance:</span>{" "}
          {segment.distance ? (segment.distance / 1000).toFixed(1) : "N/A"}km
        </div>
        <div>
          <span className="font-medium">Avg Grade:</span>{" "}
          {segment.average_grade ? segment.average_grade.toFixed(1) : "N/A"}%
        </div>
        <div>
          <span className="font-medium">Elevation:</span>{" "}
          {segment.total_elevation_gain}m
        </div>
        <div>
          <span className="font-medium">Efforts:</span> {segment.effort_count}
        </div>
      </div>
      <div className="flex items-center gap-4 text-sm">
        <span>⭐ {segment.star_count} stars</span>
        <span>👥 {segment.athlete_count} athletes</span>
      </div>
    </div>
  ),
};
