export type ExaSearchParams = {
  query: string;
};

export type ExaSearchResult = {
  title: string | null;
  url: string;
  content: string;
  publishedDate?: string;
};
