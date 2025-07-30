export enum StravaTools {
  GetAthleteProfile = "get-athlete-profile",
  GetAthleteActivities = "get-athlete-activities",
  GetActivityDetails = "get-activity-details",
  GetAthleteStats = "get-athlete-stats",
  ExploreSegments = "explore-segments",
  GetSegmentDetails = "get-segment-details",
  GetRoutes = "get-routes",
  GetAthleteZones = "get-athlete-zones",
}

export { getAthleteBase } from "./profile/base";
export { getActivitiesBase } from "./activities/base";
export { getActivityDetailsBase } from "./activity-details/base";
export { getAthleteStatsBase } from "./stats/base";
export { exploreSegmentsBase } from "./explore-segments/base";
export { getSegmentDetailsBase } from "./segment/base";
export { getRoutesBase } from "./routes/base";
export { getAthleteZonesBase } from "./zones/base";
