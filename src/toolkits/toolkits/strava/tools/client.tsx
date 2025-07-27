import { createClientTool } from "@/toolkits/create-tool";
import { getAthleteProfileTool } from "./get-athlete-profile";
import { User } from "lucide-react";
import { HStack, VStack } from "@/components/ui/stack";

export const stravaGetAthleteProfileToolConfigClient = createClientTool(
  getAthleteProfileTool,
  {
    CallComponent: ({ args }) => (
      <HStack className="gap-2">
        <User className="text-muted-foreground size-4" />
        <span className="text-sm">Get Athlete Profile</span>
      </HStack>
    ),
    ResultComponent: ({ result }) => (
      <div className="space-y-2">
        <h3 className="font-semibold">
          {result.firstname} {result.lastname}
        </h3>
        <div className="text-sm text-muted-foreground">
          {result.city && result.state && `${result.city}, ${result.state}`}
          {result.country && ` (${result.country})`}
        </div>
        <div className="flex items-center gap-4 text-sm">
          <span>Followers: {result.follower_count}</span>
          <span>Following: {result.friend_count}</span>
          {result.premium && <span className="text-orange-500">Premium</span>}
        </div>
      </div>
    ),
  }
); 