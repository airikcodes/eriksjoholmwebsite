import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Music & Work — Erik Sjøholm" };

export default function Work() {
  return <StubPage title="Music & Work" />;
}

function StubPage({ title }: { title: string }) {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6" style={{ background: "var(--color-bg)" }}>
      <h1
        className="font-[family-name:var(--font-cormorant)] font-light text-center"
        style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)", color: "var(--color-text)", letterSpacing: "0.04em" }}
      >
        {title}
      </h1>
      <p style={{ fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--color-muted)", marginTop: "1.5rem" }}>
        Coming soon
      </p>
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
