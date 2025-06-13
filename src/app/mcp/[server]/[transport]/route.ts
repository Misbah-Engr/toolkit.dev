import { serverConfigs } from "@/mcp/servers/server";
import type { Servers } from "@/mcp/servers/shared";
import { createMcpHandler } from "@vercel/mcp-adapter";

// Create a wrapper function that can access Next.js route parameters
async function createHandlerWithParams(
  request: Request,
  { params }: { params: Promise<{ server: Servers }> },
) {
  const { server } = await params;

  const handler = createMcpHandler(
    (mcpServer) => {
      const serverConfig = serverConfigs[server as Servers];

      // You can now use the server parameter here
      Object.keys(serverConfig.tools).forEach((toolName) => {
        const tool =
          serverConfig.tools[toolName as keyof typeof serverConfig.tools]!;
        const { description, inputSchema, callback, message } = tool;
        mcpServer.tool(
          toolName,
          description,
          inputSchema.shape,
          async (args) => {
            const result = await callback(args);
            return {
              content: [
                {
                  type: "text",
                  text: message
                    ? typeof message === "function"
                      ? message(result)
                      : message
                    : JSON.stringify(result, null, 2),
                },
              ],
              structuredContent: result,
            };
          },
        );
      });
    },
    {
      // Optional server options
    },
    {
      redisUrl: process.env.REDIS_URL,
      basePath: `/mcp/${server}`,
      sseEndpoint: "/sse",
      maxDuration: 60,
      verboseLogs: true,
    },
  );

  // Call the MCP handler
  return await handler(request);
}

export { createHandlerWithParams as GET, createHandlerWithParams as POST };
