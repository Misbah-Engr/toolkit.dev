import { createClientTool, createServerTool } from "./create-tool";

import type {
  ClientTool,
  ClientToolConfig,
  McpServerConfigBase,
  McpServerConfigClient,
  McpServerConfigServer,
  ServerTool,
  ServerToolConfig,
} from "./types";

export const createServerConfigServer = <ToolNames extends string>(
  config: McpServerConfigBase<ToolNames>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  toolConfigs: Record<ToolNames, ServerToolConfig<any, any>>,
): McpServerConfigServer<ToolNames> => {
  const tools = Object.keys(toolConfigs).reduce(
    (acc, toolName) => {
      const typedToolName = toolName as ToolNames;
      const baseToolConfig = config.tools[typedToolName];
      const serverToolConfig = toolConfigs[typedToolName];
      acc[`mcp_${config.id}_${typedToolName}`] = createServerTool(
        baseToolConfig,
        serverToolConfig,
      );
      return acc;
    },
    {} as Record<`mcp_${string}_${ToolNames}`, ServerTool>,
  );

  return {
    ...config,
    tools,
  };
};

export const createServerConfigClient = <ToolNames extends string>(
  config: McpServerConfigBase<ToolNames>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  toolConfigs: Record<ToolNames, ClientToolConfig<any, any>>,
): McpServerConfigClient<ToolNames> => {
  const tools = Object.keys(toolConfigs).reduce(
    (acc, toolName) => {
      const typedToolName = toolName as ToolNames;
      const baseToolConfig = config.tools[typedToolName];
      const toolConfig = toolConfigs[typedToolName];
      acc[typedToolName] = createClientTool(baseToolConfig, toolConfig);
      return acc;
    },
    {} as Record<ToolNames, ClientTool>,
  );

  return {
    ...config,
    tools,
  };
};
