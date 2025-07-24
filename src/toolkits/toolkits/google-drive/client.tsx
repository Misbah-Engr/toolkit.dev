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

export const googleDriveClientToolkit = createClientToolkit(
  baseGoogleDriveToolkitConfig,
  {
    name: "Google Drive",
    description: "Search and read files from your Google Drive.",
    icon: SiGoogledrive,
    form: null,
    Wrapper: GoogleDriveWrapper,
    type: ToolkitGroups.DataSource,
  },
  {
    [GoogleDriveTools.SearchFiles]: googleDriveSearchFilesToolConfigClient,
    [GoogleDriveTools.ReadFile]: googleDriveReadFileToolConfigClient,
  },
);
