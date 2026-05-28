export type VanhallaCategory =
  | "Exterior"
  | "Interior"
  | "Interior - wide"
  | "Interior - detail"
  | "Cab"
  | "Mechanical"
  | "Documentation"
  | "Known issues"
  | "Scenic"
  | "Lifestyle";

export type VanhallaPhoto = {
  filename: string;
  category: VanhallaCategory;
  banner: boolean;
  hidden: boolean;
  order: number;
};

export type VanhallaGalleryConfig = {
  photos: VanhallaPhoto[];
};

export const VANHALLA_CATEGORIES: VanhallaCategory[] = [
  "Exterior",
  "Interior",
  "Interior - wide",
  "Interior - detail",
  "Cab",
  "Mechanical",
  "Documentation",
  "Known issues",
  "Scenic",
  "Lifestyle",
];

export function photoUrl(filename: string) {
  return `/vanhalla-photos/${filename
    .split("/")
    .map((part) => encodeURIComponent(part))
    .join("/")}`;
}

export function listingFileUrl(filename: string) {
  return `/fordtransitforsale/files/${encodeURIComponent(filename)}`;
}
