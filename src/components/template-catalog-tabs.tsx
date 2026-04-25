"use client";

import Image from "next/image";
import { useState } from "react";
import type { TemplateCatalogItem } from "@/data/template-catalog";

const packageOrder = ["Basic", "Premium", "Exclusive"] as const;
const categoryOrder = ["Tradition", "Special Photo", "Vintage"] as const;

type PackageName = (typeof packageOrder)[number];
type CategoryName = (typeof categoryOrder)[number];

export function TemplateCatalogTabs({
  templates,
}: {
  templates: TemplateCatalogItem[];
}) {
  const [activePackage, setActivePackage] = useState<PackageName>("Premium");
  const [activeCategory, setActiveCategory] =
    useState<CategoryName>("Tradition");

  const packageTemplates = templates.filter(
    (template) => template.package === activePackage,
  );
  const visibleTemplates = packageTemplates.filter(
    (template) => template.category === activeCategory,
  );

  return (
    <div className="mx-auto max-w-7xl">
      <div className="border-b border-black pb-5">
        <p className="font-mono text-[11px] uppercase tracking-[0.6px] text-black/50">
          Package
        </p>
        <div
          className="mt-3 flex gap-2 overflow-x-auto pb-1"
          role="tablist"
          aria-label="Package template"
        >
          {packageOrder.map((packageName) => {
            const count = templates.filter(
              (template) => template.package === packageName,
            ).length;
            const isActive = activePackage === packageName;

            return (
              <button
                key={packageName}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`shrink-0 rounded-full border px-5 py-3 text-sm transition-colors duration-200 ${
                  isActive
                    ? "border-black bg-black text-white"
                    : "border-black/15 bg-white text-black hover:border-black"
                }`}
                onClick={() => setActivePackage(packageName)}
              >
                {packageName} <span className="opacity-60">({count})</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div
          className="flex gap-2 overflow-x-auto pb-1"
          role="tablist"
          aria-label="Kategori template"
        >
          {categoryOrder.map((category) => {
            const count = packageTemplates.filter(
              (template) => template.category === category,
            ).length;
            const isActive = activeCategory === category;

            return (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`shrink-0 rounded-full border px-4 py-2 text-sm transition-colors duration-200 ${
                  isActive
                    ? "border-black bg-black text-white"
                    : "border-black/15 bg-white text-black hover:border-black"
                }`}
                onClick={() => setActiveCategory(category)}
              >
                {category} <span className="opacity-60">({count})</span>
              </button>
            );
          })}
        </div>

        <p className="text-sm text-black/55">
          {visibleTemplates.length} template ditampilkan
        </p>
      </div>

      {visibleTemplates.length === 0 ? (
        <div className="mt-8 rounded-[20px] border border-dashed border-black/20 p-8 text-sm text-black/50">
          Belum ada template untuk {activePackage} / {activeCategory}.
        </div>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visibleTemplates.map((template, index) => (
            <TemplateCard
              key={template.slug}
              template={template}
              priority={index === 0}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function TemplateCard({
  template,
  priority,
}: {
  template: TemplateCatalogItem;
  priority: boolean;
}) {
  return (
    <article className="group overflow-hidden rounded-[24px] border border-black/10 bg-white transition-colors duration-200 hover:border-black">
      <a
        href={`/preview/${template.slug}`}
        className="block"
        aria-label={`Buka demo ${template.title}`}
      >
        <div className="relative aspect-[4/5] bg-[#f6f6f6] p-4">
          <div className="relative h-full overflow-hidden rounded-[16px] border border-black/10 bg-white shadow-sm">
            <Image
              src={template.previewImage}
              alt={`Preview template ${template.title}`}
              fill
              priority={priority}
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition-opacity duration-200 group-hover:opacity-90"
            />
          </div>
        </div>

        <div className="p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.6px] text-black/50">
                {template.sourcePath}
              </p>
              <h2 className="mt-2 text-2xl font-[540] leading-tight tracking-[-0.4px]">
                {template.title}
              </h2>
            </div>
            <span className="rounded-full border border-black/15 px-3 py-1 text-xs">
              Preview
            </span>
          </div>

          <p className="mt-4 line-clamp-2 text-[15px] font-[330] leading-[1.45] tracking-[-0.14px] text-black/65">
            {template.description}
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {template.features.slice(0, 3).map((feature) => (
              <span
                key={feature}
                className="rounded-full bg-black/[0.06] px-3 py-1 text-xs text-black/70"
              >
                {feature}
              </span>
            ))}
          </div>
        </div>
      </a>
    </article>
  );
}
