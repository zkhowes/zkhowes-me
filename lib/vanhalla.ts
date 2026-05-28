import { promises as fs } from "fs";
import path from "path";
import {
  type VanhallaCategory,
  type VanhallaGalleryConfig,
  type VanhallaPhoto,
} from "@/lib/vanhalla-shared";
export { listingFileUrl, photoUrl } from "@/lib/vanhalla-shared";
export type { VanhallaGalleryConfig, VanhallaPhoto } from "@/lib/vanhalla-shared";

export const vanhallaDir = path.join(process.cwd(), "files", "Vanhalla Photos");
export const vanhallaPublicImagesDir = path.join(
  process.cwd(),
  "public",
  "vanhalla-photos",
);
export const vanhallaMarkdownPath = path.join(vanhallaDir, "Valhalla_Listing.md");

const imageExtensionPattern = /\.(png|jpe?g|webp|gif|heic)$/i;
const folderCategoryMap = new Map<string, VanhallaCategory>([
  ["1-exterior", "Exterior"],
  ["01-exterior", "Exterior"],
  ["exterior", "Exterior"],
  ["2-interior", "Interior"],
  ["02-interior", "Interior"],
  ["interior", "Interior"],
  ["2-interior-wide", "Interior - wide"],
  ["02-interior-wide", "Interior - wide"],
  ["interior-wide", "Interior - wide"],
  ["wide", "Interior - wide"],
  ["3-interior-detail", "Interior - detail"],
  ["03-interior-detail", "Interior - detail"],
  ["interior-detail", "Interior - detail"],
  ["detail", "Interior - detail"],
  ["4-cab", "Cab"],
  ["04-cab", "Cab"],
  ["cab", "Cab"],
  ["3-mechanical", "Mechanical"],
  ["03-mechanical", "Mechanical"],
  ["5-mechanical", "Mechanical"],
  ["05-mechanical", "Mechanical"],
  ["mechanical", "Mechanical"],
  ["6-documentation", "Documentation"],
  ["06-documentation", "Documentation"],
  ["documentation", "Documentation"],
  ["docs", "Documentation"],
  ["7-known-issues", "Known issues"],
  ["07-known-issues", "Known issues"],
  ["known-issues", "Known issues"],
  ["issues", "Known issues"],
  ["4-scenic", "Scenic"],
  ["04-scenic", "Scenic"],
  ["scenic", "Scenic"],
  ["8-lifestyle", "Lifestyle"],
  ["08-lifestyle", "Lifestyle"],
  ["lifestyle", "Lifestyle"],
]);

function isBannerPhoto(filename: string) {
  return (
    filename.toLowerCase().startsWith("0-banner/") ||
    filename.toLowerCase().startsWith("01-banner/")
  );
}

function categoryForIndex(index: number): VanhallaCategory {
  if (index < 25) return "Exterior";
  if (index < 45) return "Interior - wide";
  if (index < 70) return "Interior - detail";
  if (index < 80) return "Cab";
  if (index < 90) return "Mechanical";
  if (index < 93) return "Documentation";
  if (index < 96) return "Known issues";
  return "Lifestyle";
}

function categoryForPath(filename: string, index: number): VanhallaCategory {
  const [folder] = filename.split("/");
  const normalizedFolder = folder?.toLowerCase().replaceAll("_", "-").trim();

  if (normalizedFolder && normalizedFolder !== filename) {
    return folderCategoryMap.get(normalizedFolder) ?? categoryForIndex(index);
  }

  return categoryForIndex(index);
}

export async function listVanhallaImageFiles() {
  async function walk(dir: string): Promise<string[]> {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    const files = await Promise.all(
      entries.map(async (entry) => {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) return walk(fullPath);
        if (!entry.isFile() || !imageExtensionPattern.test(entry.name)) return [];
        return [path.relative(vanhallaPublicImagesDir, fullPath)];
      }),
    );

    return files.flat();
  }

  return (await walk(vanhallaPublicImagesDir)).sort((a, b) =>
    a.localeCompare(b, undefined, { numeric: true }),
  );
}

export async function readVanhallaMarkdown() {
  return fs.readFile(vanhallaMarkdownPath, "utf8");
}

export async function readVanhallaGallery(): Promise<VanhallaGalleryConfig> {
  const filenames = await listVanhallaImageFiles();
  const photos = filenames.map<VanhallaPhoto>((filename, index) => ({
    filename,
    category: categoryForPath(filename, index),
    banner: isBannerPhoto(filename) || index < 2,
    hidden: isBannerPhoto(filename),
    order: index,
  }));
  const hasBannerFolder = photos.some((photo) =>
    isBannerPhoto(photo.filename),
  );
  const normalizedPhotos = hasBannerFolder
    ? photos.map((photo) => ({
        ...photo,
        banner: isBannerPhoto(photo.filename),
        hidden: isBannerPhoto(photo.filename) ? true : photo.hidden,
      }))
    : photos;

  return {
    photos: normalizedPhotos,
  };
}
