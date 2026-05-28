"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import {
  photoUrl,
  VANHALLA_CATEGORIES,
  type VanhallaPhoto,
} from "@/lib/vanhalla-shared";
import styles from "@/app/fordtransitforsale/page.module.css";

type Props = {
  initialPhotos: VanhallaPhoto[];
};

export default function VanhallaGallery({ initialPhotos }: Props) {
  const [activePhoto, setActivePhoto] = useState<VanhallaPhoto | null>(null);

  const visiblePhotos = useMemo(
    () => initialPhotos.filter((photo) => !photo.hidden),
    [initialPhotos],
  );

  const groupedPhotos = useMemo(() => {
    return VANHALLA_CATEGORIES.map((category) => ({
      category,
      photos: visiblePhotos.filter((photo) => photo.category === category),
    })).filter((group) => group.photos.length > 0);
  }, [visiblePhotos]);

  useEffect(() => {
    if (!activePhoto) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setActivePhoto(null);
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activePhoto]);

  return (
    <section className={styles.gallerySection} aria-labelledby="photos-heading">
      <div className={styles.sectionHeader}>
        <h2 id="photos-heading">Photos</h2>
      </div>

      {groupedPhotos.map((group) => (
        <div className={styles.galleryGroup} key={group.category}>
          <h3>{group.category}</h3>
          <div className={styles.photoGrid}>
            {group.photos.map((photo) => (
              <figure className={styles.photoTile} key={photo.filename}>
                <button
                  type="button"
                  className={styles.photoButton}
                  onClick={() => setActivePhoto(photo)}
                  aria-label="Open full-size photo"
                >
                  <Image
                    src={photoUrl(photo.filename)}
                    alt=""
                    fill
                    loading="lazy"
                    sizes="(max-width: 780px) 100vw, 260px"
                    unoptimized
                  />
                </button>
              </figure>
            ))}
          </div>
        </div>
      ))}

      {activePhoto ? (
        <div
          className={styles.lightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Full-size photo"
          onClick={() => setActivePhoto(null)}
        >
          <button
            type="button"
            className={styles.lightboxClose}
            onClick={() => setActivePhoto(null)}
            aria-label="Close full-size photo"
          >
            Close
          </button>
          <div
            className={styles.lightboxImageWrap}
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={photoUrl(activePhoto.filename)}
              alt=""
              fill
              sizes="100vw"
              unoptimized
            />
          </div>
        </div>
      ) : null}
    </section>
  );
}
