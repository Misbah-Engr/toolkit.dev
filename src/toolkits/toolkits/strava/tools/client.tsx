import { createClientTool } from "@/toolkits/create-tool";
import { searchSegmentsTool } from "./search-segments";
import { getSegmentLeaderboardTool } from "./get-segment-leaderboard";

import { Search, Trophy } from "lucide-react";

import { HStack, VStack } from "@/components/ui/stack";

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
