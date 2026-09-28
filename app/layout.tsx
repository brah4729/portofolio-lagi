import type { Metadata } from "next";
import Script from "next/script";
import { mono, sans } from "./fonts";
import "./globals.css";
import "./sections.css";

/**
 * SEO metadata below is reconstructed from the live <head>. If your current
 * layout.tsx has extra fields (icons, verification, etc.) keep yours and only
 * apply the font classes, the <Script>, and suppressHydrationWarning.
 */
export const metadata: Metadata = {
  metadataBase: new URL("https://dhiren.my.id"),
  title: "Dhiren — Software Engineer",
  description:
    "Software engineering student. ML Engineer, fullstack developer, and OS builder. Building from kernels to web apps.",
  keywords: [
    "Dhiren",
    "software engineer",
    "ML engineer",
    "fullstack developer",
    "kernel developer",
    "MonoOS",
    "YOLOv8",
    "Next.js",
    "portfolio",
  ],
  authors: [{ name: "Dhiren" }],
  robots: { index: true, follow: true },
  openGraph: {
    title: "Dhiren — Software Engineer",
    description:
      "Software engineering student. ML Engineer, fullstack developer, and OS builder. Building from kernels to web apps.",
    url: "https://dhiren.my.id",
    siteName: "Dhiren's Portfolio",
    type: "website",
    // og:image comes from app/opengraph-image — untouched.
  },
  twitter: {
    card: "summary_large_image",
    title: "Dhiren — Software Engineer",
    description: "Software engineering student. ML Engineer, fullstack developer, and OS builder.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <body>
        {/* runs before paint: enables reveal styles + applies the saved theme (dark by default) */}
        <Script id="boot" strategy="beforeInteractive">
          {`document.documentElement.classList.add('js');try{var t=localStorage.getItem('theme');if(t)document.documentElement.dataset.theme=t}catch(e){}`}
        </Script>
        {children}
      </body>
    </html>
  );
}
