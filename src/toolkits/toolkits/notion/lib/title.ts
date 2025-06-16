import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

export const getTitle = (page: PageObjectResponse) => {
  if (
    "title" in page.properties &&
    page.properties.title?.type === "title" &&
    page.properties.title.title?.[0]?.plain_text
  ) {
    return page.properties.title.title[0].plain_text;
  }

  const urlTitle =
    page.url.split("/").pop()?.split("-").slice(0, -1).join(" ") ?? "";

  if (urlTitle) {
    return urlTitle;
  }

  return "Untitled Page";
};
