import { HStack } from "@/components/ui/stack";
import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { getTitle } from "../lib/title";
import { NotionPageIcon } from "./icon";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

export const NotionPage: React.FC<{
  page: PageObjectResponse;
  onClick?: () => void;
}> = ({ page, onClick }) => {
  return (
    <HStack
      className="group w-full cursor-pointer justify-between border-b py-2 last:border-b-0 last:pb-0"
      onClick={onClick}
    >
      <HStack>
        <NotionPageIcon icon={page.icon} />
        <HStack>
          <h3 className="group-hover:text-primary line-clamp-2 transition-colors">
            {getTitle(page)}
          </h3>
          <Link
            href={page.url}
            target="_blank"
            className="text-xs"
            onClick={(e) => e.stopPropagation()}
          >
            <ExternalLink className="hover:text-primary size-3" />
          </Link>
        </HStack>
      </HStack>

      <span className="text-muted-foreground/60 text-xs">
        Created {new Date(page.created_time).toLocaleDateString()}
      </span>
    </HStack>
  );
};
