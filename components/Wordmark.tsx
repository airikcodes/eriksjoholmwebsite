import type { CSSProperties } from "react";

/**
 * The classic ERIK|SJØHOLM wordmark, drawn from the logo PNG as a mask so it takes whatever
 * text colour surrounds it (white on a hero photo, ink on paper, soft in the footer).
 */
export default function Wordmark({ height = "1em", className = "", style }: { height?: string; className?: string; style?: CSSProperties }) {
  return (
    <span
      role="img"
      aria-label="Erik Sjøholm"
      className={className}
      style={{
        display: "inline-block",
        height,
        aspectRatio: "1371 / 265",
        background: "currentColor",
        WebkitMaskImage: "url(/images/brand/wordmark.png)",
        maskImage: "url(/images/brand/wordmark.png)",
        WebkitMaskSize: "100% 100%",
        maskSize: "100% 100%",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        ...style,
      }}
    />
  );
}
