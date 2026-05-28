"use client";

import { useState } from "react";
import styles from "./ContactReveal.module.css";

/**
 * Contact info is split + base64-encoded so the raw values never appear in the
 * SSR HTML or initial JS payload as a plain string. Naive scrapers (grep for
 * `mailto:` / phone regex / `@hotmail.com`) get nothing. A headless-Chrome
 * scraper that clicks buttons can still get it — that's an accepted limit;
 * defense in depth means pairing this with a disposable email + Google Voice
 * number for the duration of the sale.
 */
type Encoded = { p: [string, string, string]; e: [string, string, string] };

// "901.401.8104" split into 3 chunks and base64'd.
// "vanhallaforsale" / "gmail" / "com" split similarly.
// (Sale-only Google Voice number + Gmail alias — disposable after sale.)
const ENC: Encoded = {
  p: ["OTAx", "NDAx", "ODEwNA=="], // 901 | 401 | 8104
  e: ["dmFuaGFsbGFmb3JzYWxl", "Z21haWw=", "Y29t"], // vanhallaforsale | gmail | com
};

function b64(s: string) {
  if (typeof window === "undefined") return "";
  return atob(s);
}

function decodePhone(): string {
  const [a, b, c] = ENC.p.map(b64);
  return `${a}.${b}.${c}`;
}

function decodeEmail(): string {
  const [user, host, tld] = ENC.e.map(b64);
  return `${user}@${host}.${tld}`;
}

export default function ContactReveal() {
  const [revealed, setRevealed] = useState(false);

  if (!revealed) {
    return (
      <button
        type="button"
        className={styles.revealBtn}
        onClick={() => setRevealed(true)}
        aria-label="Reveal seller contact information"
      >
        Click to reveal contact
      </button>
    );
  }

  const phone = decodePhone();
  const email = decodeEmail();
  const telHref = `tel:+1${phone.replace(/\D/g, "")}`;

  return (
    <div className={styles.revealed}>
      <div className={styles.row}>
        <span className={styles.label}>Phone</span>
        <a className={styles.value} href={telHref}>
          {phone}
        </a>
        <small className={styles.note}>Text preferred first</small>
      </div>
      <div className={styles.row}>
        <span className={styles.label}>Email</span>
        <a className={styles.value} href={`mailto:${email}`}>
          {email}
        </a>
      </div>
    </div>
  );
}
