import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 h-14 bg-white">
      <Link
        href="/"
        className="font-[family-name:var(--font-cormorant)] font-light text-[#0A0A0A] hover:text-[#F59E0B] transition-colors duration-300"
        style={{ fontSize: "clamp(0.85rem, 2vw, 1rem)", letterSpacing: "0.12em" }}
      >
        ERIK SJ<span className="text-[#F59E0B]">Ø</span>HOLM
      </Link>

      <nav className="flex items-center gap-6 md:gap-8">
        <Link
          href="/about"
          className="text-[0.6rem] tracking-[0.25em] uppercase text-[#AAAAAA] hover:text-[#0A0A0A] transition-colors duration-300"
        >
          About
        </Link>
        <a
          href="https://erik-sjoeholm-shop.fourthwall.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[0.6rem] tracking-[0.25em] uppercase text-[#AAAAAA] hover:text-[#0A0A0A] transition-colors duration-300"
        >
          Shop
        </a>
        <a
          href="mailto:erik@eriksjoholm.com"
          className="text-[0.6rem] tracking-[0.25em] uppercase text-[#AAAAAA] hover:text-[#0A0A0A] transition-colors duration-300"
        >
          Contact
        </a>
      </nav>
    </header>
  );
}
