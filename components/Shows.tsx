"use client";

const shows = [
  {
    date: "TBA",
    city: "Stockholm",
    country: "SE",
    venue: "Venue TBA",
    link: "#",
    soldOut: false,
  },
  // Add upcoming shows here
];

export default function Shows() {
  const hasShows = shows.length > 0;

  return (
    <section id="shows" className="py-32 border-t border-white/5">
      <div className="px-6 md:px-10 max-w-7xl mx-auto">
        {/* Section header */}
        <div className="flex items-center gap-6 mb-16">
          <span className="block w-10 h-px bg-[#F59E0B]" />
          <span className="text-[0.6rem] tracking-[0.35em] uppercase text-[#888888]">Shows</span>
        </div>

        {hasShows ? (
          <div className="divide-y divide-white/5">
            {shows.map((show, i) => (
              <div
                key={i}
                className="flex flex-col sm:flex-row sm:items-center justify-between py-7 gap-4 group"
              >
                {/* Date */}
                <div className="w-32 shrink-0">
                  <span className="font-[family-name:var(--font-cormorant)] text-2xl font-light text-white">
                    {show.date}
                  </span>
                </div>

                {/* Location */}
                <div className="flex-1">
                  <p className="text-white text-sm tracking-wide">{show.venue}</p>
                  <p className="text-[0.65rem] tracking-[0.2em] uppercase text-[#666666] mt-0.5">
                    {show.city}, {show.country}
                  </p>
                </div>

                {/* Ticket */}
                {show.soldOut ? (
                  <span className="text-[0.6rem] tracking-[0.25em] uppercase text-[#444444]">
                    Sold out
                  </span>
                ) : (
                  <a
                    href={show.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[0.6rem] tracking-[0.25em] uppercase text-[#888888] border border-white/10 px-6 py-2.5 hover:border-[#F59E0B] hover:text-[#F59E0B] transition-all duration-300 whitespace-nowrap"
                  >
                    Tickets
                  </a>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <p className="font-[family-name:var(--font-cormorant)] text-3xl font-light text-white/20">
              More shows coming soon
            </p>
            <p className="text-[0.6rem] tracking-[0.3em] uppercase text-[#333333] mt-4">
              Follow on Instagram for announcements
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
