import { mkdirSync, copyFileSync, existsSync } from "node:fs";

mkdirSync("dist", { recursive: true });

for (const file of ["index.html", "manifest.json", "icon.svg", "api-config.js"]) {
  copyFileSync(file, `dist/${file}`);
}
