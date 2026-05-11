export default function About() {
  return (
    <section id="about" className="py-32 border-t border-white/5">
      <div className="px-6 md:px-10 max-w-7xl mx-auto">
        <div className="flex items-center gap-6 mb-16">
          <span className="block w-10 h-px bg-[#F59E0B]" />
          <span className="text-[0.6rem] tracking-[0.35em] uppercase text-[#888888]">About</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-start">
          {/* Portrait */}
          <div className="relative aspect-[3/4] bg-[#1A1A1A] overflow-hidden">
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{ background: "linear-gradient(160deg, #1A1A1A 0%, #0D0D0D 100%)" }}
            >
              <span className="font-[family-name:var(--font-cormorant)] text-8xl font-light text-white/5 select-none">
                ES
              </span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#0A0A0A] to-transparent" />
            <p className="absolute bottom-6 left-6 text-[0.55rem] tracking-[0.2em] uppercase text-[#444444]">
              Drop portrait here →{" "}
              <code className="text-[#F59E0B]">/public/portrait.jpg</code>
            </p>
          </div>

          {/* Bio */}
          <div className="flex flex-col justify-center">
            <h2 className="font-[family-name:var(--font-cormorant)] text-5xl md:text-6xl font-light text-white leading-tight mb-8">
              Erik<br />Sjøholm
            </h2>

            <div className="space-y-5">
              <p className="text-[#AAAAAA] leading-relaxed text-[0.9rem]">
                Singer-songwriter and storyteller who converts daily experiences into musical
                compositions — songs that live somewhere between the personal and the universal.
              </p>
              <p className="text-[#888888] leading-relaxed text-[0.9rem]">
                Shaped by John Lennon, Jeff Buckley, Joni Mitchell, and Damian Rice, Erik&apos;s
                music carries an honesty that doesn&apos;t rush. Each release is a small world — built
                from real moments, written for real people.
              </p>
              <p className="text-[#888888] leading-relaxed text-[0.9rem]">
                &ldquo;I think you deserve to be respected and loved for who you are.&rdquo;
              </p>
            </div>

            <div className="mt-12 flex flex-wrap items-center gap-6">
              <a
                href="https://open.spotify.com/artist/1UpcgaCHBwic2IqUQ3hHdp"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[0.65rem] tracking-[0.25em] uppercase text-[#888888] hover:text-[#1DB954] transition-colors duration-300"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                </svg>
                Spotify
              </a>
              <a
                href="https://www.instagram.com/eriksjoholmofficial"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[0.65rem] tracking-[0.25em] uppercase text-[#888888] hover:text-[#F59E0B] transition-colors duration-300"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
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
