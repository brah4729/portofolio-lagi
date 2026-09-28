import { Bricolage_Grotesque, JetBrains_Mono } from "next/font/google";

// Headlines + body: Bricolage Grotesque (variable, has an optical-size axis so
// display sizes get tighter, more characterful shapes). Labels/tags/metadata:
// JetBrains Mono. Two families, both self-hosted by next/font at build time.
export const sans = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  axes: ["opsz"],
});

export const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});
