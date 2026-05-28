import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://zkhowes.me"),
  title: {
    template: "%s — ZKHOWES",
    default: "ZKHOWES",
  },
  openGraph: {
    siteName: "ZKHOWES",
  },
};

/**
 * Root layout — minimal on purpose. Owns <html>, <body>, fonts, global CSS,
 * and the Analytics beacon. Chrome (Nav + Header + NotebookShell) lives in
 * the (main) route group's layout, so the (bare) route group can opt out for
 * the for-sale listing without inheriting the personal-site nav.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={nunito.variable}>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
