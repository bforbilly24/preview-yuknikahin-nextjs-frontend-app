import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TemplatePreviewShell } from "@/components/template-preview-shell";
import {
  getWeddingTemplateBySlug,
  getWeddingTemplates,
} from "@/lib/wedding-templates";

export async function generateStaticParams() {
  const templates = await getWeddingTemplates();

  return templates.map((template) => ({ slug: template.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const template = await getWeddingTemplateBySlug(slug);

  return {
    title: template ? `${template.title} Demo | YukNikahin` : "Demo | YukNikahin",
  };
}

export default async function PreviewPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const template = await getWeddingTemplateBySlug(slug);

  if (!template) {
    notFound();
  }

  return <TemplatePreviewShell template={template} />;
}
