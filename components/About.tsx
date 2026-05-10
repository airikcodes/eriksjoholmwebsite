export default function About() {
  return (
    <section id="about" className="py-32 border-t border-white/5">
      <div className="px-6 md:px-10 max-w-7xl mx-auto">
        {/* Section header */}
        <div className="flex items-center gap-6 mb-16">
          <span className="block w-10 h-px bg-[#F59E0B]" />
          <span className="text-[0.6rem] tracking-[0.35em] uppercase text-[#888888]">About</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-start">
          {/* Portrait placeholder */}
          <div className="relative aspect-[3/4] bg-[#1A1A1A] overflow-hidden">
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{
                background: "linear-gradient(160deg, #1A1A1A 0%, #0D0D0D 100%)",
              }}
            >
              <span className="font-[family-name:var(--font-cormorant)] text-8xl font-light text-white/5 select-none">
                ES
              </span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#0A0A0A] to-transparent" />
            <p className="absolute bottom-6 left-6 text-[0.55rem] tracking-[0.2em] uppercase text-[#444444]">
              Drop portrait photo here → <code className="text-[#F59E0B]">/public/portrait.jpg</code>
            </p>
          </div>

          {/* Bio */}
          <div className="flex flex-col justify-center">
            <h2 className="font-[family-name:var(--font-cormorant)] text-5xl md:text-6xl font-light text-white leading-tight mb-8">
              Erik<br />Sjøholm
            </h2>

            <div className="space-y-5">
              <p className="text-[#AAAAAA] leading-relaxed text-[0.9rem]">
                {/* Replace with your actual bio */}
                Erik Sjøholm is a Swedish artist and musician whose work lives at the intersection
                of sound, feeling, and space. Drawing from a deep well of emotion, his music creates
                worlds that are at once intimate and expansive.
              </p>
              <p className="text-[#888888] leading-relaxed text-[0.9rem]">
                With roots in Stockholm and a sound that crosses borders, Erik&apos;s releases have
                gathered listeners across the globe, united by a shared resonance with something
                honest and unhurried.
              </p>
            </div>

            <div className="mt-12 flex items-center gap-6">
              <a
                href="https://www.instagram.com/eriksjoholmofficial"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-[0.65rem] tracking-[0.25em] uppercase text-[#888888] hover:text-[#F59E0B] transition-colors duration-300"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
                @eriksjoholmofficial
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
