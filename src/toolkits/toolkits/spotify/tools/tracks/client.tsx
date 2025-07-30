import React from "react";

import { Music } from "lucide-react";

import { ToolCallDisplay } from "../../components/tool-call-display";

import type { ClientToolConfig } from "@/toolkits/types";
import type { getTracksBase } from "@/toolkits/toolkits/spotify/tools/tracks/base";

export const getTracksToolConfigClient: ClientToolConfig<
  typeof getTracksBase.inputSchema.shape,
  typeof getTracksBase.outputSchema.shape
> = {
  CallComponent: ({ args }) => {
    const limit = args.limit ?? 20;
    const offset = args.offset ?? 0;

    return (
      <ToolCallDisplay
        icon={Music}
        label="Get Tracks"
        value={`Fetching ${limit} tracks (offset: ${offset})...`}
      />
    );
  },
  ResultComponent: ({ result, append }) => {
    if (!result.tracks.length) {
      return <div className="text-muted-foreground">No tracks found</div>;
    }

    return (
      <div className="">
        <h1 className="text-muted-foreground text-sm font-medium">
          Your Saved Tracks
        </h1>
        <div className="mt-2 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {result.tracks.map((track) => (
            <div
              key={track.track.id}
              className="hover:bg-muted/50 cursor-pointer rounded-lg border p-4 transition-colors"
            >
              <div className="flex items-center space-x-3">
                {track.track.album.images?.[0]?.url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={track.track.album.images[0].url}
                    alt={track.track.album.name}
                    className="h-12 w-12 rounded-md object-cover"
                  />
                ) : (
                  <div className="bg-muted flex h-12 w-12 items-center justify-center rounded-md">
                    <Music className="text-muted-foreground h-6 w-6" />
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-sm font-medium">
                    {track.track.name}
                  </h3>
                  <a
                    href={track.track.external_urls.spotify}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary text-xs transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Open in Spotify
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  },
};
