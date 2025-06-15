import { z } from "zod";
import { createBaseTool } from "@/toolkits/create-tool";

export const readFileTool = createBaseTool({
  description: "Read the contents of a file from Google Drive",
  inputSchema: z.object({
    fileId: z.string().describe("ID of the file to read"),
    exportFormat: z
      .string()
      .optional()
      .describe("Export format for Google Workspace files (e.g., 'text/plain', 'text/csv', 'text/markdown')")
  }),
  outputSchema: z.object({
    content: z.string().describe("File content as text"),
    mimeType: z.string().describe("MIME type of the content"),
    fileName: z.string().describe("Name of the file"),
    size: z.number().optional().describe("Size of the content in bytes"),
    encoding: z.string().optional().describe("Content encoding used"),
  }),
});