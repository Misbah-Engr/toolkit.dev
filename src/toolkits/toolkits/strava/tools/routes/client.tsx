import type { ClientToolConfig } from "@/toolkits/types";

import type { getRoutesBase } from "./base";
import { HStack, VStack } from "@/components/ui/stack";
import { Route } from "lucide-react";

export const getRoutesToolConfigClient: ClientToolConfig<
  typeof getRoutesBase.inputSchema.shape,
  typeof getRoutesBase.outputSchema.shape
> = {
  CallComponent: ({}) => (
    <HStack className="gap-2">
      <Route className="text-muted-foreground size-4" />
      <VStack className="items-start gap-0">
        <span className="text-muted-foreground/80 text-xs font-medium">
          Get Routes
        </span>
        <span className="text-sm">Premium feature</span>
      </VStack>
    </HStack>
  ),
  ResultComponent: ({ result: { routes } }) => (
    <div className="space-y-3">
      <h3 className="font-semibold">Routes ({routes.length})</h3>
      <div className="space-y-2">
        {routes.slice(0, 10).map((route) => (
          <div key={route.id} className="rounded-md border p-2">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="text-sm font-medium">{route.name}</h4>
                <p className="text-muted-foreground text-xs">
                  {route.distance ? (route.distance / 1000).toFixed(1) : "N/A"}
                  km • {route.elevation_gain || "N/A"}m elevation
                </p>
                {route.description && (
                  <p className="text-muted-foreground text-xs">
                    {route.description}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-1">
                {route.starred && <span className="text-yellow-500">⭐</span>}
                {route.private && <span className="text-gray-500">🔒</span>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
};
