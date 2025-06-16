import { createServerToolkit } from "@/toolkits/create-toolkit";
import { baseGoogleDriveToolkitConfig } from "./base";
import {
  googleDriveSearchFilesToolConfigServer,
  googleDriveReadFileToolConfigServer,
} from "./tools/server";
import { GoogleDriveTools } from "./tools";
import { api } from "@/trpc/server";

export const googleDriveToolkitServer = createServerToolkit(
  baseGoogleDriveToolkitConfig,
  async () => {
    const account = await api.accounts.getAccountByProvider("google");

    if (!account?.access_token) {
      throw new Error("No Google account found or access token missing");
    }

    if (!account.scope?.includes("drive.readonly")) {
      throw new Error("Google account does not have drive.readonly scope");
    }

    return {
      [GoogleDriveTools.SearchFiles]: googleDriveSearchFilesToolConfigServer(
        account.access_token,
      ),
      [GoogleDriveTools.ReadFile]: googleDriveReadFileToolConfigServer(
        account.access_token,
      ),
    };
  },
);
