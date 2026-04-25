import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const figmaSans = Geist({
  variable: "--font-figma-sans",
  subsets: ["latin"],
});

const figmaMono = Geist_Mono({
  variable: "--font-figma-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "YukNikahin Preview | Template Undangan Digital",
  description:
    "Preview template undangan pernikahan digital premium dengan estetika Figma-inspired dan aksen tradisi Jawa.",
  metadataBase: new URL("https://preview.yuknikah.in"),
  openGraph: {
    title: "YukNikahin Preview | Template Undangan Digital",
    description:
      "Jelajahi template undangan pernikahan digital premium yang cepat, elegan, dan siap dipersonalisasi.",
    siteName: "YukNikahin Preview",
    locale: "id_ID",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${figmaSans.variable} ${figmaMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background text-foreground">{children}</body>
    </html>
  );
}
