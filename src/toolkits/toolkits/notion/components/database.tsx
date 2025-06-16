import { HStack, VStack } from "@/components/ui/stack";
import type { DatabaseObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { NotionPageIcon } from "./icon";
import { Database } from "lucide-react";

export const NotionDatabase: React.FC<{
  database: DatabaseObjectResponse;
  onClick?: () => void;
}> = ({ database, onClick }) => {
  return (
    <HStack
      key={database.id}
      className="group w-full cursor-pointer justify-between border-b py-2 last:border-b-0 last:pb-0"
      onClick={() => {
        onClick?.();
      }}
    >
      <HStack>
        <NotionPageIcon
          icon={database.icon}
          defaultIcon={<Database className="size-4 shrink-0" />}
        />
        <VStack className="group flex w-full cursor-pointer items-start gap-0">
          <h3 className="group-hover:text-primary line-clamp-2 transition-colors">
            {database.title?.[0]?.plain_text ?? "Untitled Database"}
          </h3>
          {database.description?.[0]?.plain_text && (
            <p className="text-muted-foreground text-xs">
              {database.description?.[0]?.plain_text ?? "No description"}
            </p>
          )}
        </VStack>
      </HStack>
      <p className="text-muted-foreground/60 text-xs">
        Updated {new Date(database.last_edited_time).toLocaleDateString()}
      </p>
    </HStack>
  );
};
