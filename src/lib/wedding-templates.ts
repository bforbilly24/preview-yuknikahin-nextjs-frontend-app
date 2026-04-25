import { cacheLife, cacheTag } from "next/cache";
import { templateCatalog } from "@/data/template-catalog";
import type { TemplateCatalogItem } from "@/data/template-catalog";

export async function getWeddingTemplates(): Promise<TemplateCatalogItem[]> {
  "use cache";
  cacheLife("days");
  cacheTag("wedding-templates");

  return templateCatalog;
}

export async function getWeddingTemplateBySlug(
  slug: string,
): Promise<TemplateCatalogItem | undefined> {
  "use cache";
  cacheLife("days");
  cacheTag("wedding-templates");

  return templateCatalog.find((template) => template.slug === slug);
}

export async function getPreviewStats() {
  "use cache";
  cacheLife("hours");
  cacheTag("preview-stats");

  return [
    { label: "Template", value: "01" },
    { label: "Section", value: "09" },
    { label: "Asset", value: "40+" },
  ];
}
