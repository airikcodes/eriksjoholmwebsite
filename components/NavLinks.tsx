"use client";

import Link from "next/link";
import { useRef } from "react";
import { useBgColorMode } from "@/lib/useBackgroundIsLight";

interface NavItem {
  label: string;
  href:  string;
  external: boolean;
}

export default function NavLinks({ items }: { items: NavItem[] }) {
  const wrapperRef = useRef<HTMLElement>(null);

  // Writes data-bg-mode onto the nav directly — no React state, no re-renders
  useBgColorMode(wrapperRef as React.RefObject<HTMLElement | null>);

  return (
    <nav
      ref={wrapperRef}
      data-no-peephole="true"
      className="flex flex-col items-center gap-5 sm:gap-6 md:gap-7"
    >
      {items.map((item) =>
        item.external ? (
          <a
            key={item.href}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="room-link font-[family-name:var(--font-cormorant)] font-light"
            style={{ fontSize: "clamp(1.8rem, 4vw, 3.5rem)", letterSpacing: "0.02em", textDecoration: "none" }}
          >
            {item.label}
          </a>
        ) : (
          <Link
            key={item.href}
            href={item.href}
            className="room-link font-[family-name:var(--font-cormorant)] font-light"
            style={{ fontSize: "clamp(1.8rem, 4vw, 3.5rem)", letterSpacing: "0.02em" }}
          >
            {item.label}
          </Link>
        )
      )}
    </nav>
  );
}
