export enum StravaTools {
  GetAthleteProfile = "get-athlete-profile",
  GetAthleteActivities = "get-athlete-activities",
  GetActivityDetails = "get-activity-details",
  GetAthleteStats = "get-athlete-stats",
  SearchSegments = "search-segments",
  GetSegmentDetails = "get-segment-details",
  GetSegmentLeaderboard = "get-segment-leaderboard",
  GetRoutes = "get-routes",
  GetAthleteZones = "get-athlete-zones",
}

export { getAthleteBase } from "./profile/base";
export { getAthleteActivitiesBase } from "./get-athlete-activities-base";
export { getActivityDetailsBase } from "./activity-details/base";
export { getAthleteStatsBase } from "./get-athlete-stats-base";
export { searchSegmentsBase } from "./search-segments-base";
export { getSegmentDetailsBase } from "./get-segment-details-base";
export { getSegmentLeaderboardBase } from "./get-segment-leaderboard-base";
export { getRoutesBase } from "./get-routes-base";
export { getAthleteZonesBase } from "./get-athlete-zones-base";
