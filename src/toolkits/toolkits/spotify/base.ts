// src/toolkits/toolkits/spotify/base.ts
import type { ToolkitConfig } from "@/toolkits/types";
import { getTracksBase, SpotifyTools } from "./tools";
import { z } from "zod";
import { getPlaylistsBase } from "./tools/playlists/base";

export const spotifyParameters = z.object({});

export const baseSpotifyToolkitConfig: ToolkitConfig<
  SpotifyTools,
  typeof spotifyParameters.shape
> = {
  tools: {
    [SpotifyTools.GetPlaylists]: getPlaylistsBase,
    [SpotifyTools.GetTracks]: getTracksBase,
  },
  parameters: spotifyParameters,
};
