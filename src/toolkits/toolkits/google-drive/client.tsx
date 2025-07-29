import { createClientToolkit } from "@/toolkits/create-toolkit";

import { baseGoogleDriveToolkitConfig } from "./base";
import {
  googleDriveSearchFilesToolConfigClient,
  googleDriveReadFileToolConfigClient,
} from "./tools/client";
import { GoogleDriveTools } from "./tools";

import { SiGoogledrive } from "@icons-pack/react-simple-icons";
import { GoogleDriveWrapper } from "./wrapper";
import { ToolkitGroups } from "@/toolkits/types";
import { Link } from "../components/link";

export const googleDriveClientToolkit = createClientToolkit(
  baseGoogleDriveToolkitConfig,
  {
    name: "Google Drive",
    description: "Search and read files from your Google Drive.",
    icon: SiGoogledrive,
    form: null,
    Wrapper: GoogleDriveWrapper,
    type: ToolkitGroups.DataSource,
    envVars: [
      {
        type: "all",
        keys: ["AUTH_GOOGLE_ID", "AUTH_GOOGLE_SECRET"],
        description: (
          <span>
            Get an Auth Client ID and Secret from{" "}
            <Link href="https://console.cloud.google.com/apis/credentials">
              here
            </Link>
          </span>
        ),
      },
    ],
  },
  {
    [GoogleDriveTools.SearchFiles]: googleDriveSearchFilesToolConfigClient,
    [GoogleDriveTools.ReadFile]: googleDriveReadFileToolConfigClient,
  },
);
