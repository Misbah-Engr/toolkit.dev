import { githubSearchReposToolConfigClient } from "@/toolkits/toolkits/github/tools/client";

export const TopRepositoriesCalling: React.FC = () => {
  return (
    <githubSearchReposToolConfigClient.CallComponent
      args={{
        query: "org:vercel ai in:name,description,topics",
        per_page: 5,
        page: 1,
      }}
      isPartial={false}
    />
  );
};

export const TopRepositoriesResult: React.FC = () => {
  return (
    <githubSearchReposToolConfigClient.ResultComponent
      result={{
        repositories: [
          {
            stars: 14997,
            language: "TypeScript",
            full_name: "vercel/ai",
            description:
              "The AI Toolkit for TypeScript. From the creators of Next.js, the AI SDK is a free open-source library for building AI-powered applications and agents ",
          },
          {
            stars: 16639,
            language: "TypeScript",
            full_name: "vercel/ai-chatbot",
            description:
              "A full-featured, hackable Next.js AI chatbot built by Vercel",
          },
          {
            stars: 1280,
            language: "TypeScript",
            full_name: "vercel/modelfusion",
            description: "The TypeScript library for building AI applications.",
          },
        ],
      }}
      args={{ query: "org:vercel", per_page: 5, page: 1 }}
      append={() => void 0}
    />
  );
};
