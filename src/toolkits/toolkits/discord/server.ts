import { createServerToolkit } from "@/toolkits/create-toolkit";
import { baseDiscordToolkitConfig } from "./base";
import { DiscordTools } from "./tools";
import {
  listServersToolConfigServer,
  getUserInfoToolConfigServer,
} from "./tools/server";

export const discordToolkitServer = createServerToolkit(
  baseDiscordToolkitConfig,
  `You have access to the Discord toolkit for exploring your Discord account and servers. This toolkit provides:

- **List Servers**: Get a list of all Discord servers you are a member of
- **Get User Info**: Retrieve information about your Discord account

**Tool Sequencing Strategies:**
1. **Server Discovery**: Start with List Servers to see all your servers
2. **Profile Analysis**: Use Get User Info to understand your account status and permissions

**Best Practices:**
- Use List Servers to understand your server landscape
- Check your user info to understand your account capabilities
- Note: Discord doesn't provide a global search API, so message search is limited to individual channels`,
  async (params) => {
    return {
      [DiscordTools.ListServers]: listServersToolConfigServer(),
      [DiscordTools.GetUserInfo]: getUserInfoToolConfigServer(),
    };
  },
); 