import type { Metadata } from "next";
import { Cinzel_Decorative, Cinzel, Oswald } from "next/font/google";
import "./fifa.css";

// Heavy engraved display face for the "KIEL SUX" headline — carved-in-stone feel.
const displayFont = Cinzel_Decorative({
  variable: "--font-fifa-display",
  subsets: ["latin"],
  weight: ["700", "900"],
  display: "swap",
});

// Refined roman serif for subheads / eyebrow text.
const serifFont = Cinzel({
  variable: "--font-fifa-serif",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

// Condensed grotesk for numerals, labels, scoreboard energy.
const bodyFont = Oswald({
  variable: "--font-fifa-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kiel Sux FIFA Tournament",
  description:
    "The most epic World Cup 2026 pool ever assembled. 15 rivals. 45 nations. One villain: Kiel. $300 to the champion.",
  openGraph: {
    title: "Kiel Sux FIFA Tournament",
    description:
      "World Cup 2026 pool — live standings, glory, and eternal shame. Kiel sux.",
  },
};

export default function FifaLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div
      className={`${displayFont.variable} ${serifFont.variable} ${bodyFont.variable} fifa-root`}
    >
      {children}
    </div>
  );
}
