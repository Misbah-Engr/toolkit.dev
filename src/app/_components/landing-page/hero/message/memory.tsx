import { mem0AddMemoryToolConfigClient } from "@/toolkits/toolkits/mem0/tools/add_memory/client";

export const MemoryCalling: React.FC = () => {
  return (
    <mem0AddMemoryToolConfigClient.CallComponent
      args={{
        content:
          "User is building an AI chatbot and wants to learn how to use the vercel/ai toolkit.",
      }}
      isPartial={false}
    />
  );
};

export const MemoryResult: React.FC = () => {
  return (
    <mem0AddMemoryToolConfigClient.ResultComponent
      result={{
        content:
          "User is building an AI chatbot and wants to learn how to use the vercel/ai toolkit.",
        success: true,
      }}
      args={{
        content:
          "User is building an AI chatbot and wants to learn how to use the vercel/ai toolkit.",
      }}
      append={() => void 0}
    />
  );
};
