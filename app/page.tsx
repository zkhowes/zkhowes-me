import type { Metadata } from "next";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "ZKHOWES — Zach Howes",
  description:
    "Personal home page of Zach Howes — technologist, builder, and brainbook enthusiast.",
  alternates: {
    canonical: "https://zkhowes.me",
  },
  openGraph: {
    title: "ZKHOWES — Zach Howes",
    description: "Personal home page of Zach Howes.",
    url: "https://zkhowes.me",
    type: "website",
  },
};

export default function Home() {
  return (
    <>
      <section className="panel-border p-6 flex-1">
        <p className="text-lg leading-relaxed">
          Hello, my name is Zach Howes. My first internet alias assigned to me
          was ZKHOWES (my middle initial is &#39;K&#39;). I&#39;ve basically used this
          alias everywhere I&#39;ve been since (note: not a great idea for internet
          security, but it has kind of became a part of my identity). I&#39;m
          pretty obsessed with dot notebooks. My favorite are Leuchtturm1917. I
          go through one about a quarter. The idea of my website was just to
          make it look like a page out of my notebooks.
        </p>
      </section>

      <Footer />
    </>
  );
}
