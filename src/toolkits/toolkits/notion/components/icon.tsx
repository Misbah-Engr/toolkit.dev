import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { FileText } from "lucide-react";

interface Props {
  icon: PageObjectResponse["icon"];
  defaultIcon?: React.ReactNode;
}

export const NotionPageIcon: React.FC<Props> = ({
  icon,
  defaultIcon = <FileText className="size-4" />,
}) => {
  if (!icon) return defaultIcon;

  if (icon.type === "external") {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={icon.external.url} alt={icon.external.url} className="size-4" />
    );
  }

  if (icon.type === "file") {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={icon.file.url} alt={icon.file.url} className="size-4" />;
  }

  if (icon.type === "emoji") {
    return <span className="size-4 text-sm">{icon.emoji}</span>;
  }

  if (icon.type === "custom_emoji") {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={icon.custom_emoji.url}
        alt={icon.custom_emoji.url}
        className="size-4"
      />
    );
  }

  return null;
};
