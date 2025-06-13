import { serverConfigs } from "@/mcp/servers/server";
import type { Servers } from "@/mcp/servers/shared";
import { createMcpHandler } from "@vercel/mcp-adapter";
import { auth } from "@/server/auth";
import { createCaller } from "@/server/api/root";
import { createTRPCContext } from "@/server/api/trpc";

// Create a wrapper function that can access Next.js route parameters
async function createHandlerWithParams(
  request: Request,
  { params }: { params: Promise<{ server: Servers }> },
) {
  const { server } = await params;

  // Get the authenticated session
  const session = await auth();

  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  // Create authenticated tRPC context and caller
  const trpcContext = await createTRPCContext({
    headers: request.headers,
  });

  // Override the session in the context with the current session
  const authenticatedContext = {
    ...trpcContext,
    session,
  };

  const authenticatedCaller = createCaller(() =>
    Promise.resolve(authenticatedContext),
  );

  const handler = createMcpHandler(
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
            // Pass the authenticated caller to the callback if it needs it
            const result = await callback(args, { api: authenticatedCaller });
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
  );

  // Call the MCP handler
  return await handler(request);
}

export { createHandlerWithParams as GET, createHandlerWithParams as POST };
