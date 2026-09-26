/**
 * Parked: the full-screen video section that used to sit between the hero and the Library
 * (light theme). It is a transparent 100svh window over the fixed PersistentBackground video;
 * its styles live in globals.css under `.video-window`.
 *
 * To bring it back: import { VideoBand } and render <VideoBand /> in app/[locale]/page.tsx
 * directly after the hero panel's closing </section>.
 */
export function VideoBand() {
  return <div className="video-window" aria-hidden="true" />;
}
