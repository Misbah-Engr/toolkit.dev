import { User } from "lucide-react";

import { HStack } from "@/components/ui/stack";

import type { ClientToolConfig } from "@/toolkits/types";
import type { getAthleteBase } from "./base";

export const getAthleteToolConfigClient: ClientToolConfig<
  typeof getAthleteBase.inputSchema.shape,
  typeof getAthleteBase.outputSchema.shape
> = {
  CallComponent: ({}) => (
    <HStack className="gap-2">
      <User className="text-muted-foreground size-4" />
      <span className="text-sm">Getting Athlete Profile</span>
    </HStack>
  ),
  ResultComponent: ({ result: { athlete } }) => (
    <div className="space-y-2">
      <h3 className="font-semibold">
        {athlete.firstname} {athlete.lastname}
      </h3>
      <div className="text-muted-foreground text-sm">
        {athlete.city && athlete.state && `${athlete.city}, ${athlete.state}`}
        {athlete.country && ` (${athlete.country})`}
      </div>
      <div className="flex items-center gap-4 text-sm">
        <span>Followers: {athlete.follower_count}</span>
        <span>Following: {athlete.friend_count}</span>
        {athlete.premium && <span className="text-orange-500">Premium</span>}
      </div>
    </div>
  ),
};
