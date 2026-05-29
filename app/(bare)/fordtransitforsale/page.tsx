import type { Metadata } from "next";
import Image from "next/image";
import VanhallaGallery from "@/components/vanhalla/VanhallaGallery";
import ContactReveal from "@/components/vanhalla/ContactReveal";
import {
  listingFileUrl,
  photoUrl,
  readVanhallaGallery,
  readVanhallaMarkdown,
} from "@/lib/vanhalla";
import styles from "./page.module.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Vanhalla For Sale",
  description:
    "2020 Ford Transit 350 AWD EcoBoost Mammoth Vans build for sale in Seattle.",
  alternates: {
    canonical: "https://zkhowes.me/fordtransitforsale",
  },
  openGraph: {
    title: "Vanhalla For Sale",
    description:
      "2020 Ford Transit 350 AWD EcoBoost Mammoth Vans build for sale in Seattle.",
    url: "https://zkhowes.me/fordtransitforsale",
    type: "article",
  },
};

const carfaxFilename =
  "CARFAX Vehicle History Report for this 2020 FORD TRANSIT 350_ 1FTBW2XG2LKA88810.pdf";

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function formatInline(value: string) {
  return escapeHtml(value)
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/_(.+?)_/g, "<em>$1</em>");
}

function markdownToHtml(markdown: string) {
  const lines = markdown.split(/\r?\n/);
  const html: string[] = [];
  let listType: "ul" | "ol" | null = null;

  function closeList() {
    if (listType) {
      html.push(`</${listType}>`);
      listType = null;
    }
  }

  for (const line of lines) {
    const trimmed = line.trim();

    if (!trimmed) {
      closeList();
      continue;
    }

    if (trimmed === "---") {
      closeList();
      html.push("<hr />");
      continue;
    }

    const heading = /^(#{1,6})\s+(.+)$/.exec(trimmed);
    if (heading) {
      closeList();
      const level = Math.min(heading[1].length + 1, 4);
      html.push(`<h${level}>${formatInline(heading[2])}</h${level}>`);
      continue;
    }

    const ordered = /^\d+\.\s+(.+)$/.exec(trimmed);
    if (ordered) {
      if (listType !== "ol") {
        closeList();
        html.push("<ol>");
        listType = "ol";
      }
      html.push(`<li>${formatInline(ordered[1])}</li>`);
      continue;
    }

    const unordered = /^-\s+(.+)$/.exec(trimmed);
    if (unordered) {
      if (listType !== "ul") {
        closeList();
        html.push("<ul>");
        listType = "ul";
      }
      html.push(`<li>${formatInline(unordered[1])}</li>`);
      continue;
    }

    closeList();
    html.push(`<p>${formatInline(trimmed)}</p>`);
  }

  closeList();
  return html.join("\n");
}

function longFormListingOnly(markdown: string) {
  const longFormHeading = "## Long-form listing (Bring a Trailer / RV Trader / Vanlife Trader)";
  const shortVersionHeading = "\n## Short version";
  const longFormStart = markdown.indexOf(longFormHeading);

  if (longFormStart < 0) return markdown;

  const contentStart = longFormStart + longFormHeading.length;
  const shortVersionStart = markdown.indexOf(shortVersionHeading, contentStart);
  const contentEnd = shortVersionStart > -1 ? shortVersionStart : markdown.length;

  return markdown.slice(contentStart, contentEnd).replace(/^(\s*---\s*)+/, "").trim();
}

export default async function FordTransitForSale() {
  const [markdown, gallery] = await Promise.all([
    readVanhallaMarkdown(),
    readVanhallaGallery(),
  ]);
  const listingMarkdown = markdown
    .replaceAll("Valhalla", "Vanhalla")
    .replaceAll("$92,500", "$77,500");
  const publicListingMarkdown = longFormListingOnly(listingMarkdown);

  const visiblePhotos = gallery.photos.filter((photo) => !photo.hidden);
  const bannerPhotos = gallery.photos.filter((photo) => photo.banner).slice(0, 2);
  const fallbackBannerPhotos = visiblePhotos.slice(0, 2);
  const heroPhotos = bannerPhotos.length > 0 ? bannerPhotos : fallbackBannerPhotos;

  return (
    <article className={styles.page}>
      <section className={styles.hero} aria-label="Vanhalla listing summary">
        <div className={styles.bannerGrid}>
          {heroPhotos.map((photo) => (
            <div className={styles.bannerImageWrap} key={photo.filename}>
              <Image
                src={photoUrl(photo.filename)}
                alt="Ford Transit Vanhalla"
                fill
                priority
                sizes="(max-width: 780px) 100vw, 50vw"
                unoptimized
              />
            </div>
          ))}
        </div>

        <div className={styles.intro}>
          <p className={styles.kicker}>Ford Transit adventure van</p>
          <h1>Vanhalla For Sale</h1>
          <div className={styles.summaryGrid}>
            <div>
              <span>Price</span>
              <strong>$77,500</strong>
            </div>
            <div className={styles.contactCell}>
              <span>Contact seller</span>
              <ContactReveal />
            </div>
            <div>
              <span>VIN</span>
              <strong>1FTBW2XG2LKA88810</strong>
            </div>
            <div>
              <span>Vehicle history</span>
              <a href={listingFileUrl(carfaxFilename)} target="_blank" rel="noopener">
                View Carfax PDF
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.listingCopy}>
        <div
          className={styles.markdown}
          dangerouslySetInnerHTML={{ __html: markdownToHtml(publicListingMarkdown) }}
        />
      </section>

      <VanhallaGallery initialPhotos={gallery.photos} />
    </article>
  );
}
