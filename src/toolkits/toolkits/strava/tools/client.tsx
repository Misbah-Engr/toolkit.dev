import { createClientTool } from "@/toolkits/create-tool";
import { getAthleteStatsTool } from "./get-athlete-stats";
import { searchSegmentsTool } from "./search-segments";
import { getSegmentDetailsTool } from "./get-segment-details";
import { getSegmentLeaderboardTool } from "./get-segment-leaderboard";
import { getRoutesTool } from "./get-routes";
import { getAthleteZonesTool } from "./get-athlete-zones";
import { BarChart3, Search, Route, Trophy, MapPin, Target } from "lucide-react";
import { HStack, VStack } from "@/components/ui/stack";

export const stravaGetAthleteStatsToolConfigClient = createClientTool(
  getAthleteStatsTool,
  {
    CallComponent: ({ args }) => (
      <HStack className="gap-2">
        <BarChart3 className="text-muted-foreground size-4" />
        <span className="text-sm">Get Athlete Statistics</span>
      </HStack>
    ),
    ResultComponent: ({ result }) => (
      <div className="space-y-4">
        <h3 className="font-semibold">Athlete Statistics</h3>
        <div className="grid grid-cols-1 gap-4">
          <div className="space-y-2">
            <h4 className="font-medium">Recent Totals (4 weeks)</h4>
            <div className="grid grid-cols-3 gap-2 text-sm">
              <div className="bg-muted rounded p-2">
                <div className="font-medium">Rides</div>
                <div>{result.recent_ride_totals.count} rides</div>
                <div>
                  {result.recent_ride_totals.distance
                    ? (result.recent_ride_totals.distance / 1000).toFixed(0)
                    : "N/A"}
                  km
                </div>
              </div>
              <div className="bg-muted rounded p-2">
                <div className="font-medium">Runs</div>
                <div>{result.recent_run_totals.count} runs</div>
                <div>
                  {result.recent_run_totals.distance
                    ? (result.recent_run_totals.distance / 1000).toFixed(0)
                    : "N/A"}
                  km
                </div>
              </div>
              <div className="bg-muted rounded p-2">
                <div className="font-medium">Swims</div>
                <div>{result.recent_swim_totals.count} swims</div>
                <div>
                  {result.recent_swim_totals.distance
                    ? (result.recent_swim_totals.distance / 1000).toFixed(0)
                    : "N/A"}
                  km
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
);

export const stravaSearchSegmentsToolConfigClient = createClientTool(
  searchSegmentsTool,
  {
    CallComponent: ({ args }) => (
      <HStack className="gap-2">
        <Search className="text-muted-foreground size-4" />
        <VStack className="items-start gap-0">
          <span className="text-muted-foreground/80 text-xs font-medium">
            Search Segments
          </span>
          <span className="text-sm">
            {args.activity_type
              ? `${args.activity_type} segments`
              : "All segments"}{" "}
            in bounds
          </span>
        </VStack>
      </HStack>
    ),
    ResultComponent: ({ result }) => (
      <div className="space-y-3">
        <h3 className="font-semibold">Segments ({result.segments.length})</h3>
        <div className="space-y-2">
          {result.segments.slice(0, 10).map((segment) => (
            <div key={segment.id} className="rounded-md border p-2">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-sm font-medium">{segment.name}</h4>
                  <p className="text-muted-foreground text-xs">
                    {segment.activity_type} •{" "}
                    {segment.distance
                      ? (segment.distance / 1000).toFixed(1)
                      : "N/A"}
                    km •{" "}
                    {segment.average_grade
                      ? segment.average_grade.toFixed(1)
                      : "N/A"}
                    % grade
                  </p>
                  <p className="text-muted-foreground text-xs">
                    {segment.city}, {segment.state}
                  </p>
                </div>
                {segment.starred && <span className="text-yellow-500">⭐</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
);

export const stravaGetSegmentDetailsToolConfigClient = createClientTool(
  getSegmentDetailsTool,
  {
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
    ResultComponent: ({ result }) => (
      <div className="space-y-3">
        <div>
          <h3 className="font-semibold">{result.name}</h3>
          <p className="text-muted-foreground text-sm">
            {result.city}, {result.state} • {result.activity_type}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium">Distance:</span>{" "}
            {result.distance ? (result.distance / 1000).toFixed(1) : "N/A"}km
          </div>
          <div>
            <span className="font-medium">Avg Grade:</span>{" "}
            {result.average_grade ? result.average_grade.toFixed(1) : "N/A"}%
          </div>
          <div>
            <span className="font-medium">Elevation:</span>{" "}
            {result.total_elevation_gain}m
          </div>
          <div>
            <span className="font-medium">Efforts:</span> {result.effort_count}
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <span>⭐ {result.star_count} stars</span>
          <span>👥 {result.athlete_count} athletes</span>
        </div>
      </div>
    ),
  },
);

export const stravaGetSegmentLeaderboardToolConfigClient = createClientTool(
  getSegmentLeaderboardTool,
  {
    CallComponent: ({ args }) => (
      <HStack className="gap-2">
        <Trophy className="text-muted-foreground size-4" />
        <VStack className="items-start gap-0">
          <span className="text-muted-foreground/80 text-xs font-medium">
            Segment Leaderboard
          </span>
          <span className="text-sm">Segment ID: {args.id}</span>
        </VStack>
      </HStack>
    ),
    ResultComponent: ({ result }) => (
      <div className="space-y-3">
        <h3 className="font-semibold">
          Leaderboard ({result.effort_count} total efforts)
        </h3>
        <div className="space-y-2">
          {result.entries.slice(0, 10).map((entry) => (
            <div key={entry.effort_id} className="rounded-md border p-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold">#{entry.rank}</span>
                  <div>
                    <h4 className="text-sm font-medium">
                      {entry.athlete_name}
                    </h4>
                    <p className="text-muted-foreground text-xs">
                      {Math.floor(entry.elapsed_time / 60)}:
                      {(entry.elapsed_time % 60).toString().padStart(2, "0")}
                    </p>
                  </div>
                </div>
                <div className="text-muted-foreground text-xs">
                  {new Date(entry.start_date_local).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
);

export const stravaGetRoutesToolConfigClient = createClientTool(getRoutesTool, {
  CallComponent: ({ args }) => (
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
  ResultComponent: ({ result }) => (
    <div className="space-y-3">
      <h3 className="font-semibold">Routes ({result.routes.length})</h3>
      <div className="space-y-2">
        {result.routes.slice(0, 10).map((route) => (
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
});

export const stravaGetAthleteZonesToolConfigClient = createClientTool(
  getAthleteZonesTool,
  {
    CallComponent: ({ args }) => (
      <HStack className="gap-2">
        <Target className="text-muted-foreground size-4" />
        <span className="text-sm">Get Training Zones</span>
      </HStack>
    ),
    ResultComponent: ({ result }) => (
      <div className="space-y-4">
        <h3 className="font-semibold">Training Zones</h3>
        <div className="space-y-3">
          {result.heart_rate && (
            <div>
              <h4 className="text-sm font-medium">Heart Rate Zones</h4>
              <div className="mt-2 grid grid-cols-1 gap-1">
                {result.heart_rate.zones.map((zone, index) => (
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
              {result.heart_rate.custom_zones && (
                <p className="text-muted-foreground mt-1 text-xs">
                  Custom zones configured
                </p>
              )}
            </div>
          )}
          {result.power && (
            <div>
              <h4 className="text-sm font-medium">Power Zones</h4>
              <div className="mt-2 grid grid-cols-1 gap-1">
                {result.power.zones.map((zone, index) => (
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
  },
);
