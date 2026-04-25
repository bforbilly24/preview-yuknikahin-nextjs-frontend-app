import { TemplateCatalogTabs } from "@/components/template-catalog-tabs";
import { getWeddingTemplates } from "@/lib/wedding-templates";

export default async function Home() {
  const templates = await getWeddingTemplates();

  return (
    <main className="min-h-screen bg-white text-black">
      <header className="border-b border-black/10 px-4 py-5 sm:px-6 lg:px-10">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <a href="#catalog" className="flex items-center gap-3" aria-label="YukNikahin catalog home">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-white">
              <LogoMark />
            </span>
            <span className="text-base font-[540] tracking-[-0.14px]">
              YukNikahin
            </span>
          </a>

          <a
            href="#catalog"
            className="rounded-full bg-black px-5 py-3 text-sm font-[400] leading-none text-white transition-colors duration-200 hover:bg-black/75"
          >
            Catalog
          </a>
        </div>
      </header>

      <section className="px-4 py-10 sm:px-6 sm:py-14 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <p className="font-mono text-xs uppercase tracking-[0.6px] text-black/60">
            Wedding website preview
          </p>
          <div className="mt-4 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="max-w-3xl text-[44px] font-[400] leading-none tracking-[-1.2px] sm:text-[64px] lg:text-[76px]">
                Catalog template undangan.
              </h1>
              <p className="mt-4 max-w-2xl text-[18px] font-[330] leading-[1.45] tracking-[-0.18px] text-black/70 sm:text-[20px]">
                Pilih tema, lihat preview, lalu lanjutkan ke personalisasi data
                calon pengantin.
              </p>
            </div>

            <p className="rounded-full border border-black/15 px-4 py-2 text-sm text-black/65">
              {templates.length} template tersedia
            </p>
          </div>
        </div>
      </section>

      <section id="catalog" className="px-4 pb-16 sm:px-6 lg:px-10">
        <TemplateCatalogTabs templates={templates} />
      </section>

      <footer className="border-t border-black/10 px-4 py-8 sm:px-6 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 text-sm text-black/60 sm:flex-row sm:items-center sm:justify-between">
          <p>YukNikahin Preview Catalog</p>
          <p>Next.js 16 + Cache Components</p>
        </div>
      </footer>
    </main>
  );
}

function LogoMark() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7 5.5C7 3.57 8.57 2 10.5 2H17v6.5C17 10.43 15.43 12 13.5 12H7V5.5Z"
        fill="currentColor"
      />
      <path
        d="M7 12h6.5c1.93 0 3.5 1.57 3.5 3.5S15.43 19 13.5 19H7v-7Z"
        fill="currentColor"
        opacity="0.78"
      />
      <path
        d="M7 19h6.5C15.43 19 17 20.57 17 22.5V24h-6.5C8.57 24 7 22.43 7 20.5V19Z"
        fill="currentColor"
        opacity="0.54"
      />
    </svg>
  );
}
