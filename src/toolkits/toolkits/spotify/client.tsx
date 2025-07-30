import { SiSpotify } from "@icons-pack/react-simple-icons";

import { createClientToolkit } from "@/toolkits/create-toolkit";

import { SpotifyTools } from "./tools";
import { baseSpotifyToolkitConfig } from "./base";
import { getPlaylistsToolConfigClient } from "./tools/playlists/client";
import { getTracksToolConfigClient } from "./tools/tracks/client";
import { ToolkitGroups } from "@/toolkits/types";

import { SpotifyWrapper } from "./wrapper";
import { Link } from "../components/link";

export const spotifyClientToolkit = createClientToolkit(
  baseSpotifyToolkitConfig,
  {
    name: "Spotify",
    description: "Interact with your Spotify account and playlists.",
    icon: SiSpotify,
    form: null,
    Wrapper: SpotifyWrapper,
    type: ToolkitGroups.DataSource,
    envVars: [
      {
        type: "all",
        keys: ["AUTH_SPOTIFY_ID", "AUTH_SPOTIFY_SECRET"],
        description: (
          <span>
            Create a Spotify OAuth application{" "}
            <Link href="https://developer.spotify.com/dashboard">here</Link>
          </span>
        ),
      },
    ],
  },
  {
    [SpotifyTools.GetPlaylists]: getPlaylistsToolConfigClient,
    [SpotifyTools.GetTracks]: getTracksToolConfigClient,
  },
);
