import { LoaderIcon } from "lucide-react";

import type { Attachment } from "ai";

interface Props {
  attachment: Attachment;
  isUploading?: boolean;
}

export const PreviewAttachment: React.FC<Props> = ({
  attachment,
  isUploading = false,
}) => {
  const { name, url, contentType } = attachment;

  return (
    <div data-testid="input-attachment-preview" className="flex flex-col gap-2">
      <div className="bg-muted relative flex aspect-video h-16 w-20 flex-col items-center justify-center rounded-md">
        {contentType ? (
          contentType.startsWith("image") ? (
            // NOTE: it is recommended to use next/image for images
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={url}
              src={url}
              alt={name ?? "An image attachment"}
              className="size-full rounded-md object-cover"
            />
          ) : (
            <div className="" />
          )
        ) : (
          <div className="" />
        )}

        {isUploading && (
          <div
            data-testid="input-attachment-loader"
            className="absolute animate-spin text-zinc-500"
          >
            <LoaderIcon />
          </div>
        )}
      </div>
      <div className="max-w-16 truncate text-xs text-zinc-500">{name}</div>
    </div>
  );
};
