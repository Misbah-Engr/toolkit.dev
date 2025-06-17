import { exaSearchToolConfigClient } from "@/toolkits/toolkits/exa/tools/search/client";

export const RecentAINewsCalling: React.FC = () => {
  return (
    <exaSearchToolConfigClient.CallComponent
      args={{ query: "recent ai news" }}
      isPartial={false}
    />
  );
};

export const RecentAINewsResult: React.FC = () => {
  return (
    <exaSearchToolConfigClient.ResultComponent
      result={{
        results: [
          {
            title: "Recent AI News",
            url: "https://www.google.com",
            content: "Recent AI News",
          },
          {
            title: "Recent AI News",
            url: "https://www.google.com",
            content: "Recent AI News",
          },
          {
            title: "Recent AI News",
            url: "https://www.google.com",
            content: "Recent AI News",
          },
        ],
      }}
      args={{ query: "recent ai news" }}
      append={() => void 0}
    />
  );
};
