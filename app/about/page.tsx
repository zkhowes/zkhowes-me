import type { Metadata } from "next";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "About",
  description:
    "Zach Howes: husband, father, technologist, tinkerer. 20+ years in product and engineering.",
};

export default function About() {
  return (
    <>
      <section className="panel-border p-6 flex-1">
        <p className="text-lg leading-relaxed mb-6">
          I&#39;m first and foremost a husband to Amanda and Father to Izzy and
          Roz. I&#39;m also a technologist with a broad range. I&#39;m proud of roles
          where I was a Developer in large scale consumer services, a GPM for
          Microsoft Defender, and a Senior Director of Product at The Trade
          Desk.
        </p>

        <div className="flex flex-col gap-3 mb-6">
          <a
            href="/resume.pdf"
            download
            className="underline hover:no-underline"
          >
            📄 Download my resume
          </a>
          <a
            href="https://www.linkedin.com/in/zkhowes/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 underline hover:no-underline"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              width="18"
              height="18"
              aria-hidden="true"
            >
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            Find me on LinkedIn
          </a>
        </div>

        <p className="text-lg leading-relaxed mb-4">
          I also have a broad range of personal interests that generally lend
          towards learning, building things (digital, physical, art), and
          anything that gets me outside.
        </p>

        <ul className="list-none flex flex-col gap-2 text-lg">
          <li>🎿 Skiing, Hiking, Hunting</li>
          <li>🚐 Vanlife, Old Porsches</li>
          <li>🛥️ Boating, Fishing, Crabbing, Clamming</li>
          <li>🐓 Backyard chickens, gardening</li>
          <li>🎨 Drawing, Watercolor, Video Editing</li>
          <li>🧠 Reading, building, learning, info-voring, travel, hobbies</li>
        </ul>
      </section>

      <Footer />
    </>
  );
}
