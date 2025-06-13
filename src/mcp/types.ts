import type { z, ZodObject, ZodRawShape } from "zod";
import type { AppRouter, createCaller } from "@/server/api/root";

export type BaseTool<
  Args extends ZodRawShape = ZodRawShape,
  Result extends ZodRawShape = ZodRawShape,
> = {
  description: string;
  inputSchema: ZodObject<Args>;
  outputSchema: ZodObject<Result>;
};

export type ServerToolConfig<
  Args extends ZodRawShape = ZodRawShape,
  Result extends ZodRawShape = ZodRawShape,
> = {
  callback: (
    args: z.infer<ZodObject<Args>>,
    context: {
      api: ReturnType<typeof createCaller>;
    },
  ) => Promise<z.infer<ZodObject<Result>>>;
  message?: string | ((result: Result) => string);
};

export type ServerTool<
  Args extends ZodRawShape = ZodRawShape,
  Result extends ZodRawShape = ZodRawShape,
> = ServerToolConfig<Args, Result> & BaseTool<Args, Result>;

export type ClientToolConfig<
  Args extends ZodRawShape = ZodRawShape,
  Result extends ZodRawShape = ZodRawShape,
> = {
  CallComponent: React.ComponentType<{ args: z.infer<ZodObject<Args>> }>;
  ResultComponent: React.ComponentType<{ result: z.infer<ZodObject<Result>> }>;
};

export type ClientTool<
  Args extends ZodRawShape = ZodRawShape,
  Result extends ZodRawShape = ZodRawShape,
> = ClientToolConfig<Args, Result> & BaseTool<Args, Result>;

export type McpServerConfigBase<
  ToolNames extends string,
  Tool extends BaseTool = BaseTool,
> = {
  id: string;
  name: string;
  description: string;
  tools: Record<ToolNames, Tool>;
};

export type McpServerConfigServer<ToolNames extends string> =
  McpServerConfigBase<`mcp_${string}_${ToolNames}`, ServerTool>;

export type McpServerConfigClient<ToolNames extends string> =
  McpServerConfigBase<ToolNames, ClientTool>;

export type McpToolResult<Result extends ZodRawShape = ZodRawShape> =
  | {
      isError: true;
      content: Array<{
        type: "text";
        text: string;
      }>;
    }
  | {
      isError: false;
      content: Array<{
        type: "text";
        text: string;
      }>;
      structuredContent: z.infer<ZodObject<Result>>;
    };

export type ToolResponseSuccess = {
  isError: false;
};
