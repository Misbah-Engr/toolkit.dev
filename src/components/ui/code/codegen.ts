import { codegen } from "shiki-codegen";

import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const { code } = await codegen({
  langs: ["typescript", "javascript", "vue"],
  themes: ["light-plus", "dark-plus"],
  engine: "javascript",
  typescript: true,
});

const outputPath = path.join(__dirname, "shiki.bundle.ts");
fs.writeFileSync(outputPath, code);
