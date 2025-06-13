import { AnimatedShinyText } from "@/components/magicui/animated-shiny-text";
import { Card } from "@/components/ui/card";
import { HStack } from "@/components/ui/stack";
import { getServerConfig } from "@/mcp/servers/client";
import type { Servers, ServerToolNames } from "@/mcp/servers/shared";
import type { McpToolResult } from "@/mcp/types";
import type { ToolInvocation } from "ai";
import { Loader2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import React, { useState } from "react";
import type z from "zod";

interface Props {
  toolInvocation: ToolInvocation;
}

const MessageToolComponent: React.FC<Props> = ({ toolInvocation }) => {
  const [completeOnFirstMount, setCompleteOnFirstMount] = useState(
    toolInvocation.state === "result",
  );

  const isMcp = toolInvocation.toolName.startsWith("mcp_");

  if (!isMcp) {
    return (
      <pre className="w-full max-w-full whitespace-pre-wrap">
        {JSON.stringify(toolInvocation, null, 2)}
      </pre>
    );
  }

  const { toolName } = toolInvocation;

  const [, server, tool] = toolName.split("_");

  if (!server || !tool) {
    return (
      <pre className="w-full max-w-full whitespace-pre-wrap">
        {JSON.stringify(toolInvocation, null, 2)}
      </pre>
    );
  }

  const typedServer = server as Servers;

  const mcpServerConfig = getServerConfig(typedServer);

  if (!mcpServerConfig) {
    return (
      <pre className="w-full max-w-full whitespace-pre-wrap">
        {JSON.stringify(toolInvocation, null, 2)}
      </pre>
    );
  }

  const typedTool = tool as ServerToolNames[typeof typedServer];
  const toolConfig = mcpServerConfig.tools[typedTool];

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: completeOnFirstMount ? 0 : 20,
        scale: completeOnFirstMount ? 1 : 0.95,
      }}
      animate={{
        opacity: 1,
        y: completeOnFirstMount ? 0 : 0,
        scale: completeOnFirstMount ? 1 : 0.95,
      }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      layout
    >
      <Card className="gap-0 overflow-hidden p-0">
        <HStack className="border-b p-2">
          <mcpServerConfig.icon className="size-4" />
          <AnimatePresence mode="wait">
            {toolInvocation.state === "result" ? (
              <motion.span
                key="completed"
                initial={{ opacity: 0, y: completeOnFirstMount ? 0 : -5 }}
                animate={{ opacity: 1, y: completeOnFirstMount ? 0 : 0 }}
                exit={{ opacity: 0, y: completeOnFirstMount ? 0 : 5 }}
                transition={{ duration: 0.2 }}
                className="text-lg font-medium"
              >
                {mcpServerConfig.name} MCP
              </motion.span>
            ) : (
              <motion.div
                key="loading"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                transition={{ duration: 0.2 }}
              >
                <AnimatedShinyText className="text-lg font-medium">
                  {mcpServerConfig.name} MCP
                </AnimatedShinyText>
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {(toolInvocation.state === "call" ||
              toolInvocation.state === "partial-call") && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
              >
                <Loader2 className="size-4 animate-spin opacity-60" />
              </motion.div>
            )}
          </AnimatePresence>
        </HStack>
        <motion.div
          className="p-2"
          layout
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <AnimatePresence mode="wait">
            {toolInvocation.state === "call" ||
            toolInvocation.state === "partial-call" ? (
              <motion.div
                key="call"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{
                  duration: 0.3,
                  ease: "easeOut",
                  height: { duration: 0.4, ease: "easeInOut" },
                }}
                style={{ overflow: "hidden" }}
              >
                <toolConfig.CallComponent
                  args={
                    toolInvocation.args as z.infer<
                      typeof toolConfig.inputSchema
                    >
                  }
                />
              </motion.div>
            ) : toolConfig && toolInvocation.state === "result" ? (
              (() => {
                const result = toolInvocation.result as McpToolResult<
                  typeof toolConfig.outputSchema.shape
                >;

                if (result.isError) {
                  return (
                    <motion.div
                      key="error"
                      initial={{
                        opacity: completeOnFirstMount ? 1 : 0,
                        height: completeOnFirstMount ? "auto" : 0,
                      }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{
                        opacity: 0,
                        height: completeOnFirstMount ? "auto" : 0,
                      }}
                      transition={{
                        duration: 0.3,
                        ease: "easeOut",
                        height: { duration: 0.4, ease: "easeInOut" },
                      }}
                      style={{ overflow: "hidden" }}
                    >
                      <p>There was an error</p>
                      <p>{result.content[0]?.text}</p>
                    </motion.div>
                  );
                }

                return (
                  <motion.div
                    key="result"
                    initial={{
                      opacity: completeOnFirstMount ? 1 : 0,
                      height: completeOnFirstMount ? "auto" : 0,
                    }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{
                      opacity: 0,
                      height: completeOnFirstMount ? "auto" : 0,
                    }}
                    transition={{
                      duration: 0.3,
                      ease: "easeOut",
                      height: { duration: 0.4, ease: "easeInOut" },
                    }}
                    style={{ overflow: "hidden" }}
                  >
                    <toolConfig.ResultComponent
                      result={
                        (
                          toolInvocation.result as {
                            structuredContent: z.infer<
                              typeof toolConfig.outputSchema
                            >;
                          }
                        ).structuredContent
                      }
                    />
                  </motion.div>
                );
              })()
            ) : (
              <motion.div
                key="fallback"
                initial={{
                  opacity: completeOnFirstMount ? 1 : 0,
                  height: completeOnFirstMount ? "auto" : 0,
                }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{
                  opacity: 0,
                  height: completeOnFirstMount ? "auto" : 0,
                }}
                transition={{
                  duration: 0.3,
                  ease: "easeOut",
                  height: { duration: 0.4, ease: "easeInOut" },
                }}
                style={{ overflow: "hidden" }}
              >
                <pre className="w-full max-w-full whitespace-pre-wrap">
                  {JSON.stringify(toolInvocation, null, 2)}
                </pre>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </Card>
    </motion.div>
  );
};

const areEqual = (prevProps: Props, nextProps: Props): boolean => {
  const { toolInvocation: prev } = prevProps;
  const { toolInvocation: next } = nextProps;

  // Compare all relevant fields of toolInvocation
  if (prev.toolCallId !== next.toolCallId) return false;
  if (prev.toolName !== next.toolName) return false;
  if (prev.state !== next.state) return false;

  // Deep compare args object
  if (JSON.stringify(prev.args) !== JSON.stringify(next.args)) return false;

  // Deep compare result object (only exists when state is "result")
  if (prev.state === "result" && next.state === "result") {
    // Both have result property, compare them
    if (JSON.stringify(prev.result) !== JSON.stringify(next.result))
      return false;
  } else if (prev.state === "result" || next.state === "result") {
    // Only one has result property, they're different
    return false;
  }

  return true;
};

export const MessageTool = React.memo(MessageToolComponent, areEqual);
