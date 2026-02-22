import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import NotebookShell from "@/components/NotebookShell";
import Header from "@/components/Header";
import Nav from "@/components/Nav";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={nunito.variable}>
      <body>
        <NotebookShell>
          {/* Left column: nav only, anchored to top */}
          <aside
            style={{ width: "210px", flexShrink: 0 }}
            className="flex flex-col px-4 pt-6 pb-4"
          >
            <Nav />
          </aside>

          {/* Right column: horizontal ZKHOWES header on top, then page content */}
          <main className="flex-1 flex flex-col gap-6 p-6">
            <Header />
            {children}
          </main>
        </NotebookShell>
      </body>
    </html>
  );
}
