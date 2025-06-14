import { after } from "next/server";

import {
  appendClientMessage,
  appendResponseMessages,
  convertToCoreMessages,
  createDataStream,
  smoothStream,
  tool,
} from "ai";

import { createResumableStreamContext } from "resumable-stream";

import { differenceInSeconds } from "date-fns";

import { auth } from "@/server/auth";
import { api } from "@/trpc/server";

import { postRequestBodySchema, type PostRequestBody } from "./schema";

import { generateText, streamText } from "@/ai/generate";
import { generateUUID } from "@/lib/utils";

import { ChatSDKError } from "@/lib/errors";

import type { ResumableStreamContext } from "resumable-stream";
import type {
  CoreAssistantMessage,
  CoreToolMessage,
  Tool,
  UIMessage,
} from "ai";
import type { Chat } from "@prisma/client";
import { type providers } from "@/ai/registry";
import { openai } from "@ai-sdk/openai";
import { getServerToolkit } from "@/mcp/servers/server";

export const maxDuration = 60;

let globalStreamContext: ResumableStreamContext | null = null;

function getStreamContext() {
  if (!globalStreamContext) {
    try {
      globalStreamContext = createResumableStreamContext({
        waitUntil: after,
      });
    } catch (error: unknown) {
      if (error instanceof Error && error.message.includes("REDIS_URL")) {
        console.log(
          " > Resumable streams are disabled due to missing REDIS_URL",
        );
      } else {
        console.error(error);
      }
    }
  }

  return globalStreamContext;
}

export async function POST(request: Request) {
  let requestBody: PostRequestBody;

  try {
    requestBody = postRequestBodySchema.parse(await request.json());
  } catch (error) {
    console.error(error);
    return new ChatSDKError("bad_request:api").toResponse();
  }

  try {
    const {
      id,
      message,
      selectedVisibilityType,
      selectedChatModel,
      useNativeSearch,
      toolkits,
    } = requestBody;

    const session = await auth();

    if (!session?.user) {
      return new ChatSDKError("unauthorized:chat").toResponse();
    }

    const messageCount = await api.messages.getMessageCountByUserId();

    if (messageCount > 100) {
      return new ChatSDKError("rate_limit:chat").toResponse();
    }

    const chat = await api.chats.getChat(id);

    if (!chat) {
      const title = await generateTitleFromUserMessage(message);

      await api.chats.createChat({
        id,
        userId: session.user.id,
        title,
        visibility: selectedVisibilityType,
      });
    } else {
      if (chat.userId !== session.user.id) {
        return new ChatSDKError("forbidden:chat").toResponse();
      }
    }

    const previousMessages = await api.messages.getMessagesForChat({
      chatId: id,
    });

    const messages = appendClientMessage({
      // @ts-expect-error: todo add type conversion from DBMessage[] to UIMessage[]
      messages: previousMessages,
      message,
    });

    await api.messages.createMessage({
      chatId: id,
      id: message.id,
      role: "user",
      parts: message.parts,
      attachments:
        message.experimental_attachments?.map((attachment) => ({
          url: attachment.url,
          name: attachment.name,
          contentType: attachment.contentType,
        })) ?? [],
    });

    const streamId = generateUUID();
    await api.streams.createStreamId({ streamId, chatId: id });

    const toolkitTools = await Promise.all(
      toolkits.map(async ({ id, parameters }) => {
        const toolkit = getServerToolkit(id);
        const tools = await toolkit.tools(parameters);
        return Object.keys(tools).reduce(
          (acc, toolName) => {
            const serverTool = tools[toolName as keyof typeof tools];
            acc[`${id}_${toolName}`] = tool({
              description: serverTool.description,
              parameters: serverTool.inputSchema,
              execute: async (args) => {
                const result = await serverTool.callback(args);
                return result;
              },
            });
            return acc;
          },
          {} as Record<string, Tool>,
        );
      }),
    );

    const tools = toolkitTools.reduce(
      (acc, toolkitTools) => {
        return {
          ...acc,
          ...toolkitTools,
        };
      },
      {} as Record<string, Tool>,
    );

    // const tools = toolkits.reduce(
    //   async (acc, toolkit) => {
    //     const
    //     return Object.keys(serverToolkits[toolkit.id].tools(toolkit.parameters)).reduce(
    //       (acc, toolName) => {
    //         const serverTool
    //         acc[toolName] = tool({
    //           description: serverTool.description,
    //           parameters: serverTool.inputSchema,
    //           execute: async (args) => {
    //             const result = await serverTool.callback(args);
    //             return result;
    //           },
    //         });
    //         return acc;
    //       },
    //       acc,
    //     );
    //   },
    //   {} as Record<string, Tool>,
    // );

    // const mcpTools = await Promise.all(
    //   mcpServers?.map(async (server) => {
    //     const mcp = await experimental_createMCPClient({
    //       transport: {
    //         type: "sse",
    //         url: `${env.APP_URL}/mcp/${server}/sse`,
    //         headers: {
    //           Cookie: request.headers.get("cookie") ?? "",
    //         },
    //       },
    //     });

    //     const tools = await mcp.tools();

    //     return tools;
    //   }),
    // );

    const isOpenAi = selectedChatModel.startsWith("openai");

    const stream = createDataStream({
      execute: (dataStream) => {
        const result = streamText(
          getModelId(selectedChatModel, useNativeSearch),
          {
            system: "You are a helpful assistant.",
            messages: convertToCoreMessages(messages),
            maxSteps: 5,
            experimental_transform: smoothStream({ chunking: "word" }),
            experimental_generateMessageId: generateUUID,
            onError: (error) => {
              console.error(error);
            },
            onFinish: async ({ response }) => {
              if (session.user?.id) {
                try {
                  const assistantId = getTrailingMessageId({
                    messages: response.messages.filter(
                      (message) => message.role === "assistant",
                    ),
                  });

                  if (!assistantId) {
                    throw new Error("No assistant message found!");
                  }

                  const [, assistantMessage] = appendResponseMessages({
                    messages: [message],
                    responseMessages: response.messages,
                  });

                  if (!assistantMessage) {
                    throw new Error("No assistant message found!");
                  }

                  await api.messages.createMessage({
                    chatId: id,
                    id: assistantId,
                    role: "assistant",
                    parts: assistantMessage.parts ?? [],
                    attachments:
                      assistantMessage.experimental_attachments?.map(
                        (attachment) => ({
                          url: attachment.url,
                          name: attachment.name ?? "",
                          contentType: attachment.contentType as
                            | "image/png"
                            | "image/jpg"
                            | "image/jpeg",
                        }),
                      ) ?? [],
                  });
                } catch (error) {
                  console.error(error);
                }
              }
            },
            tools: {
              ...tools,
              ...(isOpenAi && useNativeSearch
                ? { web_search_preview: openai.tools.webSearchPreview() }
                : {}),
            },
          },
        );

        void result.consumeStream();

        result.mergeIntoDataStream(dataStream, {
          sendReasoning: true,
        });
      },
      onError: (error) => {
        console.error(error);
        throw new ChatSDKError("bad_request:api");
      },
    });

    const streamContext = getStreamContext();

    if (streamContext) {
      return new Response(
        await streamContext.resumableStream(streamId, () => stream),
      );
    } else {
      return new Response(stream);
    }
  } catch (error) {
    if (error instanceof ChatSDKError) {
      return error.toResponse();
    }
    console.error("Unexpected error in chat route:", error);
    return new ChatSDKError("bad_request:api").toResponse();
  }
}

async function generateTitleFromUserMessage(message: UIMessage) {
  const { text: title } = await generateText("openai:gpt-4o-mini", {
    system: `\n
      - you will generate a short title based on the first message a user begins a conversation with
      - ensure it is not more than 80 characters long
      - the title should be a summary of the user's message
      - do not use quotes or colons`,
    prompt: JSON.stringify(message),
  });

  return title;
}

type ResponseMessageWithoutId = CoreToolMessage | CoreAssistantMessage;
type ResponseMessage = ResponseMessageWithoutId & { id: string };
function getTrailingMessageId({
  messages,
}: {
  messages: Array<ResponseMessage>;
}): string | null {
  const trailingMessage = messages.at(-1);

  if (!trailingMessage) return null;

  return trailingMessage.id;
}

const getModelId = (
  model: `${keyof typeof providers}:${string}`,
  useNativeSearch: boolean | undefined,
): `${keyof typeof providers}:${string}` => {
  // no need for dynamic mdoel config
  if (!useNativeSearch) return model;

  const [provider, modelId] = model.split(":");

  if (provider === "google") {
    return `${provider}:${modelId}-search`;
  }

  return model;
};

export async function GET(request: Request) {
  const streamContext = getStreamContext();
  const resumeRequestedAt = new Date();

  if (!streamContext) {
    return new Response(null, { status: 204 });
  }

  const { searchParams } = new URL(request.url);
  const chatId = searchParams.get("chatId");

  if (!chatId) {
    return new ChatSDKError("bad_request:api").toResponse();
  }

  const session = await auth();

  if (!session?.user) {
    return new ChatSDKError("unauthorized:chat").toResponse();
  }

  let chat: Chat;

  try {
    const dbChat = await api.chats.getChat(chatId);

    if (!dbChat) {
      return new ChatSDKError("not_found:chat").toResponse();
    }

    chat = dbChat;
  } catch {
    return new ChatSDKError("not_found:chat").toResponse();
  }

  if (!chat) {
    return new ChatSDKError("not_found:chat").toResponse();
  }

  if (chat.visibility === "private" && chat.userId !== session.user.id) {
    return new ChatSDKError("forbidden:chat").toResponse();
  }

  const streamIds = await api.streams.getStreamIdsByChatId({ chatId });

  if (!streamIds.length) {
    return new ChatSDKError("not_found:stream").toResponse();
  }

  const recentStreamId = streamIds.at(-1);

  if (!recentStreamId) {
    return new ChatSDKError("not_found:stream").toResponse();
  }

  const emptyDataStream = createDataStream({
    execute: () => {
      return;
    },
  });

  const stream = await streamContext.resumableStream(
    recentStreamId,
    () => emptyDataStream,
  );

  /*
   * For when the generation is streaming during SSR
   * but the resumable stream has concluded at this point.
   */
  if (!stream) {
    const messages = await api.messages.getMessagesForChat({ chatId });
    const mostRecentMessage = messages.at(-1);

    if (!mostRecentMessage) {
      return new Response(emptyDataStream, { status: 200 });
    }

    if (mostRecentMessage.role !== "assistant") {
      return new Response(emptyDataStream, { status: 200 });
    }

    const messageCreatedAt = new Date(mostRecentMessage.createdAt);

    if (differenceInSeconds(resumeRequestedAt, messageCreatedAt) > 15) {
      return new Response(emptyDataStream, { status: 200 });
    }

    const restoredStream = createDataStream({
      execute: (buffer) => {
        buffer.writeData({
          type: "append-message",
          message: JSON.stringify(mostRecentMessage),
        });
      },
    });

    return new Response(restoredStream, { status: 200 });
  }

  return new Response(stream, { status: 200 });
}
