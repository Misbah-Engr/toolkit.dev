"use server";

import { writeFile, readFile } from "fs/promises";
import { existsSync } from "fs";
import { join } from "path";
import { z } from "zod";
import { IS_DEVELOPMENT } from "@/lib/constants";

const setEnvVarSchema = z.array(
  z.object({
    key: z.string().min(1, "Environment variable key is required"),
    value: z.string(),
  }),
);

export async function setEnvVar(input: z.infer<typeof setEnvVarSchema>) {
  if (!IS_DEVELOPMENT) {
    return {
      success: false,
      message: "This action is only available in development mode",
    };
  }

  try {
    const envVars = setEnvVarSchema.parse(input);

    // Get the path to .env.local
    const envPath = join(process.cwd(), ".env.local");

    // Read existing content or create empty string if file doesn't exist
    let content = "";
    if (existsSync(envPath)) {
      content = await readFile(envPath, "utf-8");
    }

    // Split content into lines
    const lines = content.split("\n");

    // Process each environment variable
    for (const { key, value } of envVars) {
      // Find if the key already exists (commented or uncommented)
      let keyExists = false;
      let keyIndex = -1;

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i]?.trim();

        // Skip empty lines
        if (!line) continue;

        // Check for uncommented key
        if (line.startsWith(`${key}=`)) {
          keyExists = true;
          keyIndex = i;
          break;
        }

        // Check for commented key
        if (line.startsWith(`# ${key}=`)) {
          keyExists = true;
          keyIndex = i;
          break;
        }
      }

      // Create the new line
      const newLine = `${key}=${value}`;

      if (keyExists && keyIndex >= 0 && keyIndex < lines.length) {
        // Update existing line
        lines[keyIndex] = newLine;
      } else {
        // Add new line at the end
        // Add a newline if the file doesn't end with one
        if (lines.length > 0 && lines[lines.length - 1] !== "") {
          lines.push("");
        }
        lines.push(newLine);
      }
    }

    // Write back to file
    await writeFile(envPath, lines.join("\n"), "utf-8");

    return {
      success: true,
      message: `Environment variables have been set successfully`,
    };
  } catch (error) {
    console.error("Error setting environment variables:", error);
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to set environment variables",
    };
  }
}
