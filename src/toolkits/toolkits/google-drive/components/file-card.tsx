import React from "react";
import { HStack, VStack } from "@/components/ui/stack";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  File, 
  FileText, 
  FileImage, 
  FileVideo, 
  FileAudio, 
  Archive,
  Sheet,
  Presentation,
  ExternalLink,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface FileCardProps {
  file: {
    id: string;
    name: string;
    mimeType: string;
    size?: string;
    modifiedTime?: string;
    createdTime?: string;
    webViewLink?: string;
    iconLink?: string;
    owners?: Array<{
      displayName?: string;
      emailAddress?: string;
    }>;
    parents?: string[];
  };
}

const getFileIcon = (mimeType: string) => {
  if (mimeType.startsWith('image/')) return FileImage;
  if (mimeType.startsWith('video/')) return FileVideo;
  if (mimeType.startsWith('audio/')) return FileAudio;
  if (mimeType.includes('pdf')) return FileText;
  if (mimeType === 'application/vnd.google-apps.document') return FileText;
  if (mimeType === 'application/vnd.google-apps.spreadsheet') return Sheet;
  if (mimeType === 'application/vnd.google-apps.presentation') return Presentation;
  if (mimeType.includes('zip') || mimeType.includes('archive')) return Archive;
  return File;
};

const formatFileSize = (sizeString?: string) => {
  if (!sizeString) return undefined;
  const size = parseInt(sizeString);
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
  if (size < 1024 * 1024 * 1024) return `${(size / (1024 * 1024)).toFixed(1)} MB`;
  return `${(size / (1024 * 1024 * 1024)).toFixed(1)} GB`;
};

const getMimeTypeLabel = (mimeType: string) => {
  const mimeTypeLabels: Record<string, string> = {
    'application/vnd.google-apps.document': 'Google Doc',
    'application/vnd.google-apps.spreadsheet': 'Google Sheet',
    'application/vnd.google-apps.presentation': 'Google Slides',
    'application/vnd.google-apps.folder': 'Folder',
    'application/pdf': 'PDF',
    'text/plain': 'Text',
    'image/jpeg': 'JPEG',
    'image/png': 'PNG',
    'image/gif': 'GIF',
    'video/mp4': 'MP4',
    'audio/mp3': 'MP3',
  };
  
  return mimeTypeLabels[mimeType] ?? mimeType.split('/')[1]?.toUpperCase() ?? 'File';
};

export const FileCard: React.FC<FileCardProps> = ({ file }) => {
  const FileIcon = getFileIcon(file.mimeType);
  const formattedSize = formatFileSize(file.size);
  const mimeTypeLabel = getMimeTypeLabel(file.mimeType);

  return (
    <Card className="w-full">
      <CardContent className="p-3">
        <HStack className="items-start justify-between gap-3">
          <HStack className="flex-1 gap-3">
            <FileIcon className="text-muted-foreground size-5 flex-shrink-0" />
            <VStack className="flex-1 items-start gap-1">
              <HStack className="items-center gap-2">
                <span className="text-sm font-medium truncate">
                  {file.name}
                </span>
                {file.webViewLink && (
                  <a
                    href={file.webViewLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <ExternalLink className="size-3" />
                  </a>
                )}
              </HStack>
              
              <HStack className="gap-2 flex-wrap">
                <Badge variant="secondary" className="text-xs">
                  {mimeTypeLabel}
                </Badge>
                {formattedSize && (
                  <Badge variant="outline" className="text-xs">
                    {formattedSize}
                  </Badge>
                )}
              </HStack>

              {(file.modifiedTime ?? file.owners) && (
                <VStack className="items-start gap-1">
                  {file.modifiedTime && (
                    <span className="text-muted-foreground text-xs">
                      Modified {formatDistanceToNow(new Date(file.modifiedTime), { addSuffix: true })}
                    </span>
                  )}
                  {file.owners && file.owners.length > 0 && (
                    <span className="text-muted-foreground text-xs">
                      Owner: {file.owners[0]?.displayName ?? file.owners[0]?.emailAddress}
                    </span>
                  )}
                </VStack>
              )}
            </VStack>
          </HStack>
        </HStack>
      </CardContent>
    </Card>
  );
};