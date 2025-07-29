import { SiDiscord } from "@icons-pack/react-simple-icons";

import { createClientToolkit } from "@/toolkits/create-toolkit";

import { baseDiscordToolkitConfig } from "./base";
import { DiscordTools } from "./tools";
import {
  listServersToolConfigClient,
  getUserInfoToolConfigClient,
} from "./tools/client";

import { ToolkitGroups } from "@/toolkits/types";

export const discordClientToolkit = createClientToolkit(
  baseDiscordToolkitConfig,
  {
    name: "Discord",
    description: "Explore your Discord servers and account information",
    icon: SiDiscord,
    form: null,
    type: ToolkitGroups.DataSource,
  },
  {
    [DiscordTools.ListServers]: listServersToolConfigClient,
    [DiscordTools.GetUserInfo]: getUserInfoToolConfigClient,
  },
); 