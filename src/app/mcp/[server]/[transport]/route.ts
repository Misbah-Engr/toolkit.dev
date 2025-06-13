import { serverConfigs } from "@/mcp/servers/server";
import type { Servers } from "@/mcp/servers/shared";
import {
  createMcpHandler,
  experimental_withMcpAuth,
} from "@vercel/mcp-adapter";

// Create a wrapper function that can access Next.js route parameters
async function createHandlerWithParams(
  request: Request,
  { params }: { params: Promise<{ server: Servers }> },
) {
  const { server } = await params;

  const handler = experimental_withMcpAuth(
    createMcpHandler(
      (mcpServer) => {
        const serverConfig = serverConfigs[server];

        // You can now use the server parameter here
        Object.entries(serverConfig.tools).forEach(([toolName, tool]) => {
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
        maxDuration: 120,
        verboseLogs: true,
      },
    ),
    (req, bearerToken) => {
      console.log(req, bearerToken);
      return {
        userId: "123",
      };
    },
  );

  // Call the MCP handler
  return await handler(request);
}

export { createHandlerWithParams as GET, createHandlerWithParams as POST };
