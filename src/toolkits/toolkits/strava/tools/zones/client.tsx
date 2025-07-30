import { Target } from "lucide-react";

import { HStack } from "@/components/ui/stack";

import type { ClientToolConfig } from "@/toolkits/types";
import type { getAthleteZonesBase } from "./base";

export const getAthleteZonesToolConfigClient: ClientToolConfig<
  typeof getAthleteZonesBase.inputSchema.shape,
  typeof getAthleteZonesBase.outputSchema.shape
> = {
  CallComponent: () => (
    <HStack className="gap-2">
      <Target className="text-muted-foreground size-4" />
      <span className="text-sm">Get Training Zones</span>
    </HStack>
  ),
  ResultComponent: ({ result: { zones } }) => (
    <div className="space-y-4">
      <h3 className="font-semibold">Training Zones</h3>
      <div className="space-y-3">
        {zones.heart_rate && (
          <div>
            <h4 className="text-sm font-medium">Heart Rate Zones</h4>
            <div className="mt-2 grid grid-cols-1 gap-1">
              {zones.heart_rate.zones.map((zone, index) => (
                <div
                  key={index}
                  className="bg-muted flex justify-between rounded p-2 text-sm"
                >
                  <span>Zone {index + 1}</span>
                  <span>
                    {zone.min} - {zone.max} bpm
                  </span>
                </div>
              ))}
            </div>
            {zones.heart_rate.custom_zones && (
              <p className="text-muted-foreground mt-1 text-xs">
                Custom zones configured
              </p>
            )}
          </div>
        )}
        {zones.power && (
          <div>
            <h4 className="text-sm font-medium">Power Zones</h4>
            <div className="mt-2 grid grid-cols-1 gap-1">
              {zones.power.zones.map((zone, index) => (
                <div
                  key={index}
                  className="bg-muted flex justify-between rounded p-2 text-sm"
                >
                  <span>Zone {index + 1}</span>
                  <span>
                    {zone.min} - {zone.max} watts
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  ),
};
