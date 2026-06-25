import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Contact — Erik Sjøholm" };

export default function Contact() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6" style={{ background: "var(--color-bg)" }}>
      <h1
        className="font-[family-name:var(--font-cormorant)] font-light text-center"
        style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)", color: "var(--color-text)", letterSpacing: "0.04em" }}
      >
        Contact
      </h1>
      <a
        href="mailto:erik@eriksjoholm.com"
        style={{ fontSize: "0.75rem", letterSpacing: "0.15em", color: "var(--color-muted)", marginTop: "2rem" }}
        className="hover:text-[var(--color-accent)] transition-colors duration-200"
      >
        erik@eriksjoholm.com
      </a>
      <Link
        href="/"
        style={{ fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--color-muted)", marginTop: "3rem" }}
        className="hover:text-[var(--color-text)] transition-colors duration-200"
      >
        ← Back
      </Link>
    </main>
  );
}
