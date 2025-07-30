import type { SpotifyApi } from "@spotify/web-api-ts-sdk";

import type { ServerToolConfig } from "@/toolkits/types";
import type { getTracksBase } from "@/toolkits/toolkits/spotify/tools/tracks/base";

export const getTracksToolConfigServer = (
  spotify: SpotifyApi,
): ServerToolConfig<
  typeof getTracksBase.inputSchema.shape,
  typeof getTracksBase.outputSchema.shape
> => {
  return {
    callback: async ({ offset = 0 }) => {
      try {
        const { items } = await spotify.currentUser.tracks.savedTracks(
          10,
          offset,
        );
        return {
          tracks: items,
        };
      } catch (error) {
        console.log("Spotify API error:", error);
        throw new Error("Failed to fetch tracks from Spotify");
      }
    },
    message:
      "Successfully retrieved playlists from your Spotify account. The user is shown the responses in the UI. Do not reiterate them. If you called this tool because the user asked a question, answer the question.",
  };
};
