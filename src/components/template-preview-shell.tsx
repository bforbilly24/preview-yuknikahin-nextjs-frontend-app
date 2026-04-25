"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { TemplateCatalogItem } from "@/data/template-catalog";

type Viewport = "desktop" | "mobile";

const viewportClass: Record<Viewport, string> = {
  desktop: "h-full w-full",
  mobile: "h-[calc(100dvh-120px)] w-[390px] max-w-full rounded-[32px] border border-white/10 shadow-2xl",
};

export function TemplatePreviewShell({
  template,
}: {
  template: TemplateCatalogItem;
}) {
  const [viewport, setViewport] = useState<Viewport>("mobile");
  const [isFrameReady, setIsFrameReady] = useState(false);
  const [reloadToken, setReloadToken] = useState(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const frameSrc = `${template.previewUrl}?previewReload=${reloadToken}`;

  const refreshFrame = () => {
    setIsFrameReady(false);
    setReloadToken((token) => token + 1);
  };

  const syncFrameCanvas = () => {
    const frameWindow = iframeRef.current?.contentWindow;
    if (!frameWindow) return;

    frameWindow.dispatchEvent(new Event("resize"));
    frameWindow.dispatchEvent(new Event("orientationchange"));
  };

  const handleFrameLoad = () => {
    const startedAt = Date.now();

    const markReadyWhenStable = () => {
      const frameDocument = iframeRef.current?.contentDocument;
      const loader = frameDocument?.getElementById("smartLoaderOverlay");
      const loaderVisible =
        loader &&
        !loader.classList.contains("hidden") &&
        getComputedStyle(loader).visibility !== "hidden" &&
        getComputedStyle(loader).opacity !== "0";
      const documentReady = frameDocument?.readyState === "complete";
      const timedOut = Date.now() - startedAt > 4500;

      if ((documentReady && !loaderVisible) || timedOut) {
        syncFrameCanvas();
        setTimeout(syncFrameCanvas, 120);
        setTimeout(syncFrameCanvas, 450);
        setTimeout(syncFrameCanvas, 900);
        setIsFrameReady(true);
        return;
      }

      window.setTimeout(markReadyWhenStable, 100);
    };

    requestAnimationFrame(markReadyWhenStable);
  };

  useEffect(() => {
    const previousHtmlOverflow = document.documentElement.style.overflow;
    const previousBodyOverflow = document.body.style.overflow;

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    const stopEvent = (event: Event) => event.preventDefault();
    const stopKeys = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      const blocked =
        key === "f12" ||
        (event.ctrlKey && event.shiftKey && ["i", "j", "c"].includes(key)) ||
        (event.metaKey && event.altKey && ["i", "j", "c"].includes(key)) ||
        (event.ctrlKey && key === "u") ||
        (event.metaKey && key === "u");

      if (blocked) {
        event.preventDefault();
      }
    };

    document.addEventListener("contextmenu", stopEvent);
    document.addEventListener("dragstart", stopEvent);
    document.addEventListener("keydown", stopKeys);

    return () => {
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.overflow = previousBodyOverflow;
      document.removeEventListener("contextmenu", stopEvent);
      document.removeEventListener("dragstart", stopEvent);
      document.removeEventListener("keydown", stopKeys);
    };
  }, []);

  return (
    <main className="fixed inset-0 h-[100dvh] overflow-hidden bg-[#080808] text-white select-none">
      <header className="flex h-[72px] items-center justify-between border-b border-white/10 bg-black px-4 sm:px-6">
        <div className="min-w-0">
          <p className="truncate text-lg font-[540] tracking-[-0.24px] sm:text-2xl">
            {template.title}
          </p>
          <p className="hidden font-mono text-[11px] uppercase tracking-[0.6px] text-white/45 sm:block">
            {template.package} / {template.category}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div
            className="hidden rounded-[10px] bg-white/15 p-1 sm:flex"
            role="tablist"
            aria-label="Preview viewport"
          >
            <ViewportButton
              label="Desktop"
              active={viewport === "desktop"}
              onClick={() => {
                if (viewport === "desktop") return;
                setIsFrameReady(false);
                setViewport("desktop");
                requestAnimationFrame(() => setReloadToken((token) => token + 1));
              }}
            >
              <DesktopIcon />
            </ViewportButton>
            <ViewportButton
              label="Mobile"
              active={viewport === "mobile"}
              onClick={() => {
                if (viewport === "mobile") return;
                setIsFrameReady(false);
                setViewport("mobile");
                requestAnimationFrame(() => setReloadToken((token) => token + 1));
              }}
            >
              <PhoneIcon />
            </ViewportButton>
          </div>

          <span className="hidden h-9 w-px bg-white/20 md:block" />

          <button
            type="button"
            className="hidden h-11 w-11 items-center justify-center rounded-full bg-white/14 text-white transition-colors duration-200 hover:bg-white/22 sm:flex"
            aria-label="Reload preview"
            onClick={refreshFrame}
          >
            <RefreshIcon />
          </button>

          <a
            href={template.previewUrl}
            target="_blank"
            rel="noreferrer"
            className="hidden h-11 w-11 items-center justify-center rounded-full bg-white/14 text-white transition-colors duration-200 hover:bg-white/22 sm:flex"
            aria-label="Open raw demo in new tab"
          >
            <ExternalIcon />
          </a>

          <a
            href="#buy-template"
            className="hidden rounded-full bg-[#003d2f] px-5 py-3 text-sm font-[540] text-[#12f0b0] transition-colors duration-200 hover:bg-[#064d3d] md:inline-flex"
          >
            Buy Template
          </a>

          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-[#3a2021] px-5 py-3 text-sm font-[540] text-white transition-colors duration-200 hover:bg-[#4a282a]"
          >
            <CloseIcon />
            <span className="hidden sm:inline">Close Demo</span>
          </Link>
        </div>
      </header>

      <section className="preview-stage relative flex h-[calc(100dvh-72px)] items-center justify-center overflow-hidden bg-[#0b0b0b] p-0 sm:p-6">
        {!isFrameReady ? (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#0b0b0b] text-white/70">
            <div className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm backdrop-blur-md">
              Loading preview...
            </div>
          </div>
        ) : null}
        <iframe
          ref={iframeRef}
          id="template-preview-frame"
          key={`${template.slug}-${viewport}-${reloadToken}`}
          title={`${template.title} demo preview`}
          src={frameSrc}
          loading="eager"
          allow="autoplay; fullscreen"
          className={`${viewportClass[viewport]} bg-white`}
          sandbox="allow-scripts allow-forms allow-popups allow-modals allow-same-origin"
          referrerPolicy="no-referrer"
          onLoad={handleFrameLoad}
        />
      </section>
    </main>
  );
}

function ViewportButton({
  label,
  active,
  onClick,
  children,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-label={label}
      aria-selected={active}
      className={`flex h-9 w-9 items-center justify-center rounded-[8px] transition-colors duration-200 ${
        active ? "bg-white/15 text-white" : "text-white/55 hover:text-white"
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

function DesktopIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <path d="M4 5h16v10H4V5Z" stroke="currentColor" strokeWidth="2" />
      <path d="M9 20h6M12 15v5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <path d="M8 2h8v20H8V2Z" stroke="currentColor" strokeWidth="2" />
      <path d="M12 19h.01" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function RefreshIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <path d="M20 6v5h-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 18v-5h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18 9a7 7 0 0 0-11.5-2.5L4 9m2 6a7 7 0 0 0 11.5 2.5L20 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <path d="M14 4h6v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20 4 10 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M11 5H5v14h14v-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
