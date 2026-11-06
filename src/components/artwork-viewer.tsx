"use client";

import Image from "next/image";
import { createContext, useContext, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

type Artwork = { src: string; label: string };
const ArtworkContext = createContext<((artwork: Artwork) => void) | null>(null);

export function ArtworkViewer({ children }: { children: ReactNode }) {
  const [artwork, setArtwork] = useState<Artwork | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (artwork) {
      if (!dialog.open) dialog.showModal();
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = previousOverflow; };
    }

    if (dialog.open) dialog.close();
  }, [artwork]);

  return (
    <ArtworkContext.Provider value={setArtwork}>
      {children}
      <dialog
        ref={dialogRef}
        className="artwork-dialog"
        aria-labelledby="artwork-title"
        onCancel={(event) => { event.preventDefault(); setArtwork(null); }}
        onClick={(event) => { if (event.target === event.currentTarget) setArtwork(null); }}
      >
        {artwork && (
          <div className="artwork-dialog-content">
            <div className="flex items-center justify-between gap-6 pb-4 text-paper">
              <h2 id="artwork-title" className="text-sm font-medium sm:text-base">{artwork.label}</h2>
              <button type="button" onClick={() => setArtwork(null)} className="viewer-close shrink-0" aria-label="Close artwork">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.5" /></svg>
              </button>
            </div>
            <div className="relative h-[75svh] w-full">
              <Image src={artwork.src} alt={artwork.label} fill unoptimized sizes="90vw" className="object-contain" />
            </div>
          </div>
        )}
      </dialog>
    </ArtworkContext.Provider>
  );
}

export function ArtworkImage({ src, label, style, imageStyle, className = "", sizes = "50vw" }: {
  src: string;
  label: string;
  style?: CSSProperties;
  imageStyle?: CSSProperties;
  className?: string;
  sizes?: string;
}) {
  const open = useContext(ArtworkContext);
  const { objectFit, ...cropStyle } = imageStyle || {};

  return (
    <button type="button" className={`artwork-button ${className}`} style={style} aria-label={`View ${label}`} onClick={() => open?.({ src, label })}>
      <div style={{position: "absolute", left: 0, top: 0, width: "100%", height: "100%", ...cropStyle}}>
        <Image src={src} alt={label} fill unoptimized sizes={sizes} style={{objectFit}} />
      </div>
    </button>
  );
}
