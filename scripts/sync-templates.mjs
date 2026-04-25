import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const sourceTemplates = path.join(root, "src", "templates");
const publicTemplates = path.join(root, "public", "templates");
const publicCatalog = path.join(root, "public", "wedding", "catalog");

const scrollbarStyle =
  '<style id="preview-scrollbar-lock">html,body{scrollbar-width:none;-ms-overflow-style:none}html::-webkit-scrollbar,body::-webkit-scrollbar,*::-webkit-scrollbar{width:0!important;height:0!important;display:none!important}</style>';

const thumbnails = [
  [
    "premium/tradition/cit-jawa-01/assets/decorations/jawa-01-preview.webp",
    "premium-tradition-cit-jawa-01.webp",
  ],
  [
    "premium/tradition/cit-jawa-02/assets/decorations/jawa-02-preview.webp",
    "premium-tradition-cit-jawa-02.webp",
  ],
  [
    "premium/special-photo/cit-special-01/assets/images/special-01-background-main.webp",
    "premium-special-photo-cit-special-01.webp",
  ],
  [
    "premium/special-photo/cit-special-02/assets/images/special-02-hero-1.webp",
    "premium-special-photo-cit-special-02.webp",
  ],
  [
    "premium/special-photo/cit-special-03/assets/decorations/special-03-preview.webp",
    "premium-special-photo-cit-special-03.webp",
  ],
  [
    "premium/vintage/cit-vintage-01/assets/images/vintage-01-gallery-01.webp",
    "premium-vintage-cit-vintage-01.webp",
  ],
  [
    "premium/vintage/cit-vintage-02/assets/images/vintage-02-gallery-01.webp",
    "premium-vintage-cit-vintage-02.webp",
  ],
  [
    "exclusive/tradition/cit-jawa-01/assets/images/jawa-01-gallery-02.webp",
    "exclusive-tradition-cit-jawa-01.webp",
  ],
];

function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const current = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(current) : [current];
  });
}

if (!existsSync(sourceTemplates)) {
  throw new Error(`Missing source templates: ${sourceTemplates}`);
}

rmSync(publicTemplates, { force: true, recursive: true });
mkdirSync(path.dirname(publicTemplates), { recursive: true });
cpSync(sourceTemplates, publicTemplates, { recursive: true });

for (const file of walk(publicTemplates)) {
  if (!file.endsWith("index.html")) continue;

  const html = readFileSync(file, "utf8");
  if (html.includes('id="preview-scrollbar-lock"')) continue;

  writeFileSync(file, html.replace(/<head>/i, `<head>\n\t${scrollbarStyle}`));
}

mkdirSync(publicCatalog, { recursive: true });

for (const [from, to] of thumbnails) {
  const source = path.join(sourceTemplates, from);
  if (!existsSync(source)) {
    throw new Error(`Missing thumbnail source: ${source}`);
  }

  cpSync(source, path.join(publicCatalog, to));
}

console.log("Templates synced to public/templates and public/wedding/catalog");
