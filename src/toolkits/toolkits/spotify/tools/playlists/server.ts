// src/toolkits/toolkits/spotify/tools/get-playlists/server.ts
//TODO: Implement the actual server tool for the GetPlaylists tool
import type { SpotifyApi } from "@spotify/web-api-ts-sdk";
import type { ServerToolConfig } from "@/toolkits/types";
import type { getPlaylistsBase } from "@/toolkits/toolkits/spotify/tools/playlists/base";

export const getPlaylistsToolConfigServer = (
  spotify: SpotifyApi,
): ServerToolConfig<
  typeof getPlaylistsBase.inputSchema.shape,
  typeof getPlaylistsBase.outputSchema.shape
> => {
  return {
    callback: async ({ offset = 0 }) => {
      try {
        const { items } = await spotify.currentUser.playlists.playlists(
          10,
          offset,
        );
        return {
          playlists: items,
        };
      } catch (error) {
        console.error("Spotify API error:", error);
        throw new Error("Failed to fetch playlists from Spotify");
      }
    },
    message:
      "Successfully retrieved playlists from your Spotify account. The user is shown the responses in the UI. Do not reiterate them. If you called this tool because the user asked a question, answer the question.",
  };
};
