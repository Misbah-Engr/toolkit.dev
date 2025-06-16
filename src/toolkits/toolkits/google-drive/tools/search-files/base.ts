import { z } from "zod";
import { createBaseTool } from "@/toolkits/create-tool";

export const searchFilesTool = createBaseTool({
  description: "Search for files in Google Drive using query terms",
  inputSchema: z.object({
    query: z.string().describe("Search query to find files"),
    pageToken: z
      .string()
      .describe(
        "Token for the next page of results (leave blank for first page)",
      ),
    pageSize: z
      .number()
      .describe("Number of results per page (max 100, default: 10)"),
    mimeType: z
      .string()
      .describe(
        "Filter by MIME type (e.g., 'application/pdf', 'image/jpeg') (leave blank for all types)",
      ),
  }),
  outputSchema: z.object({
    files: z.array(
      z.object({
        id: z.string().describe("File ID"),
        name: z.string().describe("File name"),
        mimeType: z.string().describe("File MIME type"),
        size: z.string().optional().describe("File size in bytes"),
        modifiedTime: z.string().optional().describe("Last modification time"),
        createdTime: z.string().optional().describe("File creation time"),
        webViewLink: z.string().optional().describe("Link to view the file"),
        iconLink: z.string().optional().describe("Link to file icon"),
        owners: z
          .array(
            z.object({
              displayName: z.string().optional(),
              emailAddress: z.string().optional(),
            }),
          )
          .optional()
          .describe("File owners"),
        parents: z.array(z.string()).optional().describe("Parent folder IDs"),
      }),
    ),
    nextPageToken: z
      .string()
      .optional()
      .describe("Token for the next page of results"),
    incompleteSearch: z
      .boolean()
      .optional()
      .describe("Whether the search was incomplete due to limitations"),
  }),
});
