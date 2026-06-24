import type { Metadata } from "next";
import "./globals.css";

const BASE_URL = "https://dhiren.my.id"; // 🔁 change this to your actual domain

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: "Dhiren — Software Engineer",
  description:
    "Software engineering student. ML Engineer, fullstack developer, and OS builder. Building from kernels to web apps.",

  // ── Open Graph (Discord, Telegram, Facebook, LinkedIn, WhatsApp) ──
  openGraph: {
    type: "website",
    url: BASE_URL,
    title: "Dhiren — Software Engineer",
    description:
      "Software engineering student. ML Engineer, fullstack developer, and OS builder. Building from kernels to web apps.",
    siteName: "Dhiren's Portfolio",
    images: [
      {
        url: "/og-image.png", // put your image in /public/og-image.png
        width: 1200,
        height: 630,
        alt: "Dhiren — Software Engineer",
      },
    ],
  },

  // ── Twitter / X card ──
  twitter: {
    card: "summary_large_image",
    title: "Dhiren — Software Engineer",
    description:
      "Software engineering student. ML Engineer, fullstack developer, and OS builder.",
    images: ["/og-image.png"],
  },

  // ── Extra ──
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
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
