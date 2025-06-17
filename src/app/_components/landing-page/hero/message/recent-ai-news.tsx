import { exaSearchToolConfigClient } from "@/toolkits/toolkits/exa/tools/search/client";

export const SearchCalling: React.FC = () => {
  return (
    <exaSearchToolConfigClient.CallComponent
      args={{ query: "vercel ai toolkit tutorial for building chatbot" }}
      isPartial={false}
    />
  );
};

export const SearchResult: React.FC = () => {
  return (
    <exaSearchToolConfigClient.ResultComponent
      result={{
        results: [
          {
            url: "https://vercel.com/guides/nextjs-langchain-vercel-ai",
            image:
              "https://vercel.com/api/dynamic-og?title=Building%20an%20AI%20chatbot%20with%20Next.js%2C%20Langchain%2C%20and%20OpenAI&format=guides",
            score: 0.3954988420009613,
            title: "Building an AI chatbot with Next.js, Langchain, and OpenAI",
            author: "Steven Tey",
            content:
              "Dive into the world of LangChain.js and Next.js with our detailed guide. Learn how to set up a chatbot, structure outputs, integrate agents, and more. Perfect for developers looking to harness the power of AI in their web applications.\n\nLast updated on September 7, 2023\n\nAI\n\n* * *\n\nIn today's day and age, it's become increasingly important to integrate AI experiences into your web application. [LangChain](https://www.langchain.com/), when combined with the power of Next.js, offers a seamless way to bring AI-driven functionalities to your applications.\n\n[Langchain](https://sdk.vercel.ai/docs/guides/providers/langchain) is a powerful toolkit designed to simplify the interaction and chaining of multiple large language models (LLMs), such as those from [OpenAI](https://vercel.com/docs/integrations/openai), [Cohere](https://sdk.vercel.ai/docs/guides/providers/cohere), [HuggingFace](https://sdk.vercel.ai/docs/guides/providers/hugging-face), and more. It is an open-source project that provide",
            favicon:
              "https://assets.vercel.com/image/upload/q_auto/front/favicon/vercel/favicon.ico",
            publishedDate: "2023-09-07T00:00:00.000Z",
          },
          {
            url: "https://vercel.com/templates/next.js/nextjs-ai-chatbot",
            image:
              "https://vercel.com/api/templates/og?title=Next.js+AI+Chatbot&description=A+full-featured%2C+hackable+Next.js+AI+chatbot+built+by+Vercel&framework=Next.js&image=https%3A%2F%2Fimages.ctfassets.net%2Fe5382hct74si%2F4cmiDM859wtut7XeG0iFYq%2F953f071e4556b8a07bcab042f3a08db3%2FUntitled_design__17_.png%3Ffm%3Dpng",
            score: 0.3781320750713348,
            title: "Next.js AI Chatbot",
            author: "",
            content:
              "### Features\n\n- [Next.js](https://nextjs.org) App Router\n - Advanced routing for seamless navigation and performance\n - React Server Components (RSCs) and Server Actions for server-side rendering and increased performance\n- [AI SDK](https://sdk.vercel.ai/docs)\n - Unified API for generating text, structured objects, and tool calls with LLMs\n - Hooks for building dynamic chat and generative user interfaces\n - Supports xAI (default), OpenAI, Fireworks, and other model providers\n- [shadcn/ui](https://ui.shadcn.com)\n - Styling with [Tailwind CSS](https://tailwindcss.com)\n - Component primitives from [Radix UI](https://radix-ui.com) for accessibility and flexibility\n- Data Persistence\n - [Neon Serverless Postgres](https://vercel.com/marketplace/neon) for saving chat history and user data\n - [Vercel Blob](https://vercel.com/storage/blob) for efficient file storage\n- [Auth.js](https://authjs.dev)\n - Simple and secure authentication\n\n### Model Providers\n\nThis template ships with [xAI](https://x",
            favicon:
              "https://assets.vercel.com/image/upload/front/favicon/vercel/apple-touch-icon-57x57.png",
            publishedDate: "2023-06-16T22:16:25.000Z",
          },
          {
            url: "https://vercel.com/docs/ai",
            image:
              "https://vercel.com/api/dynamic-og?title=Build%20with%20AI%20on%20Vercel&format=docs",
            score: 0.3640448451042175,
            title: "Build with AI on Vercel",
            author: "Vercel",
            content:
              "AI services and models help enhance and automate the building and deployment of applications for various use cases:\n\n- Chatbots and virtual assistants improve customer interactions.\n- AI-powered content generation automates and optimizes digital content.\n- Recommendation systems deliver personalized experiences.\n- Natural language processing (NLP) enables advanced text analysis and translation.\n- Retrieval-augmented generation (RAG) enhances documentation with context-aware responses.\n- AI-driven image and media services optimize visual content.\n\nWith Vercel AI integrations, you can build and deploy these AI-powered applications efficiently. Through the Vercel Marketplace, you can research which AI service fits your needs with example use cases. Then, you can install and manage two types of AI integrations:\n\n- Native integrations: Built-in solutions that work seamlessly with Vercel and include resources with built-in billing and account provisioning.\n- Connectable accounts: Third-party",
            favicon:
              "https://assets.vercel.com/image/upload/q_auto/front/favicon/vercel/favicon.ico",
            publishedDate: "2025-06-02T13:59:48.000Z",
          },
        ],
      }}
      args={{ query: "vercel ai toolkit tutorial for building chatbot" }}
      append={() => void 0}
    />
  );
};
