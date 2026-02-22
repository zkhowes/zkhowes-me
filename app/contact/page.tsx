import type { Metadata } from "next";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Zach Howes.",
};

export default function Contact() {
  return (
    <>
      <section className="panel-border p-6 flex-1">
        <ol className="list-none flex flex-col gap-6 text-lg">
          <li>
            <p className="leading-relaxed">
              😎 zkhowes &#39;at&#39; hotmail.com
            </p>
            <p className="text-base leading-relaxed mt-1 opacity-70">
              One of my first jobs was working on Hotmail. I learned so much so
              I still rep the email address proudly.
            </p>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/zkhowes/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:no-underline"
            >
              🤓 linkedin.com/in/zkhowes
            </a>
          </li>
        </ol>
      </section>

      <Footer />
    </>
  );
}
