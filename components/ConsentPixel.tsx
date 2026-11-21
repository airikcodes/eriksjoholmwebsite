"use client";

import { useEffect, useState } from "react";

const PIXEL_ID = "3259562681023735";
const KEY = "meta-pixel-consent";

const TEXT: Record<string, { q: string; no: string; yes: string }> = {
  en: { q: "May I load a Meta Pixel to measure my ads? Nothing goes to Meta unless you say yes.", no: "No thanks", yes: "Accept" },
  de: { q: "Darf ich ein Meta-Pixel laden, um die Wirkung meiner Anzeigen zu messen? Ohne dein Ja geht nichts an Meta.", no: "Nein danke", yes: "Akzeptieren" },
  es: { q: "¿Puedo cargar un píxel de Meta para medir mis anuncios? No se envía nada a Meta sin tu consentimiento.", no: "No, gracias", yes: "Aceptar" },
  sv: { q: "Får jag ladda en Meta-pixel för att mäta mina annonser? Inget skickas till Meta utan ditt ja.", no: "Nej tack", yes: "Godkänn" },
  fi: { q: "Saanko ladata Meta-pikselin mainosteni mittaamiseen? Metalle ei lähetetä mitään ilman suostumustasi.", no: "Ei kiitos", yes: "Hyväksy" },
  it: { q: "Posso caricare un Meta Pixel per misurare i miei annunci? Niente viene inviato a Meta senza il tuo consenso.", no: "No grazie", yes: "Accetta" },
  fr: { q: "Puis-je charger un pixel Meta pour mesurer mes annonces ? Rien n’est envoyé à Meta sans votre accord.", no: "Non merci", yes: "Accepter" },
  pt: { q: "Posso carregar um pixel da Meta para medir os meus anúncios? Nada é enviado à Meta sem o seu consentimento.", no: "Não, obrigado", yes: "Aceitar" },
};

type Fbq = {
  (...args: unknown[]): void;
  callMethod?: (...args: unknown[]) => void;
  queue?: unknown[];
  loaded?: boolean;
  version?: string;
  push?: Fbq;
};
type FbWindow = Window & { fbq?: Fbq; _fbq?: Fbq };

function loadPixel() {
  const w = window as FbWindow;
  if (w.fbq) return;
  const fbq: Fbq = function (...args: unknown[]) {
    if (fbq.callMethod) fbq.callMethod(...args);
    else (fbq.queue as unknown[]).push(args);
  } as Fbq;
  fbq.push = fbq;
  fbq.loaded = true;
  fbq.version = "2.0";
  fbq.queue = [];
  w.fbq = fbq;
  w._fbq = fbq;
  const s = document.createElement("script");
  s.async = true;
  s.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(s);
  fbq("init", PIXEL_ID);
  fbq("track", "PageView");
}

/**
 * Meta Pixel behind a consent choice. Nothing is loaded or stored with Meta
 * until the visitor accepts; "No thanks" is remembered and the banner stays away.
 */
export default function ConsentPixel({ lang }: { lang: string }) {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem(KEY);
    } catch {}
    if (saved === "yes") loadPixel();
    else if (saved !== "no") queueMicrotask(() => setShown(true));
  }, []);

  function choose(value: "yes" | "no") {
    try {
      localStorage.setItem(KEY, value);
    } catch {}
    if (value === "yes") loadPixel();
    setShown(false);
  }

  if (!shown) return null;

  const t = TEXT[lang] ?? TEXT.en;
  return (
    <div className="consent" role="dialog" aria-label="Cookies">
      <p className="consent__text">{t.q}</p>
      <div className="consent__actions">
        <button type="button" className="consent__btn" onClick={() => choose("no")}>
          {t.no}
        </button>
        <button type="button" className="consent__btn consent__btn--yes" onClick={() => choose("yes")}>
          {t.yes}
        </button>
      </div>
    </div>
  );
}
