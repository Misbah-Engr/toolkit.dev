import { createClientTool, createServerTool } from "./create-tool";

import type {
  BaseTool,
  ClientTool,
  ClientToolConfig,
  McpServerConfigBase,
  McpServerConfigClient,
  McpServerConfigParams,
  McpServerConfigServer,
  ServerTool,
  ServerToolConfig,
} from "./types";

export const createBaseServerConfig = <ToolNames extends string>(
  config: McpServerConfigParams<ToolNames>,
): McpServerConfigBase<ToolNames> => {
  const tools = Object.keys(config.tools).reduce(
    (acc, toolName) => {
      const tool = config.tools[toolName as ToolNames];
      acc[`mcp_${config.id}_${toolName}` as `mcp_${string}_${ToolNames}`] =
        tool;
      return acc;
    },
    {} as Record<`mcp_${string}_${ToolNames}`, BaseTool>,
  );

  console.log({
    message: "createBaseServerConfig",
    tools,
  });

  return {
    ...config,
    tools,
  };
};

export const createServerConfigServer = <ToolNames extends string>(
  config: McpServerConfigBase<ToolNames>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  toolConfigs: Record<ToolNames, ServerToolConfig<any, any>>,
): McpServerConfigServer<ToolNames> => {
  const tools = Object.keys(toolConfigs).reduce<
    Record<`mcp_${string}_${ToolNames}`, ServerTool>
  >(
    (acc, toolName) => {
      const baseToolConfig =
        config.tools[`mcp_${config.id}_${toolName as ToolNames}`];
      const serverToolConfig = toolConfigs[toolName as ToolNames];
      acc[`mcp_${config.id}_${toolName as ToolNames}`] = createServerTool(
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
  const tools = Object.keys(config.tools).reduce<Record<string, ClientTool>>(
    (acc, fullToolName) => {
      const baseToolConfig =
        config.tools[fullToolName as `mcp_${string}_${ToolNames}`];
      const toolName = fullToolName.split(":")[3] as ToolNames;
      const toolConfig = toolConfigs[toolName];
      acc[`mcp_${config.id}_${toolName}`] = createClientTool(
        baseToolConfig,
        toolConfig,
      );
      return acc;
    },
    {},
  );

  return {
    ...config,
    tools,
  };
};
