import { SiSpotify } from "@icons-pack/react-simple-icons";

import { createClientToolkit } from "@/toolkits/create-toolkit";

import { SpotifyTools } from "./tools";
import { baseSpotifyToolkitConfig } from "./base";
import { getPlaylistsToolConfigClient } from "./tools/playlists/client";
import { ToolkitGroups } from "@/toolkits/types";

import { SpotifyWrapper } from "./wrapper";

export const spotifyClientToolkit = createClientToolkit(
  baseSpotifyToolkitConfig,
  {
    name: "Spotify",
    description: "Interact with your Spotify account and playlists.",
    icon: SiSpotify,
    form: null,
    Wrapper: SpotifyWrapper,
    type: ToolkitGroups.DataSource,
  },
  {
    [SpotifyTools.GetPlaylists]: getPlaylistsToolConfigClient,
  },
);