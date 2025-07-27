import { z } from "zod";
import { createBaseTool } from "@/toolkits/create-tool";

export const getAthleteProfileTool = createBaseTool({
  description: "Get the authenticated athlete's profile information from Strava",
  inputSchema: z.object({}),
  outputSchema: z.object({
    id: z.number(),
    firstname: z.string(),
    lastname: z.string(),
    profile_medium: z.string(),
    profile: z.string(),
    city: z.string().nullable(),
    state: z.string().nullable(),
    country: z.string().nullable(),
    sex: z.string().nullable(),
    premium: z.boolean(),
    summit: z.boolean(),
    created_at: z.string(),
    updated_at: z.string(),
    follower_count: z.number(),
    friend_count: z.number(),
    mutual_friend_count: z.number(),
    athlete_type: z.number(),
    date_preference: z.string(),
    measurement_preference: z.string(),
    weight: z.number().nullable(),
  }),
}); 