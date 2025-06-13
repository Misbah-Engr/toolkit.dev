import { api } from "@/trpc/server";

import { DataTableDemo } from "./table";

export const Attachments = async () => {
  const attachments = await api.files.getUserFiles({
    limit: 100,
  });

  return <DataTableDemo attachments={attachments} />;
};
