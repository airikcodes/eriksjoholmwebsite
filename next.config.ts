import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // ── Pre-existing short-links ──────────────────────────────────────────
      { source: "/work",                                       destination: "/songs",                                     permanent: true },
      { source: "/resonators",                                 destination: "https://eriksjoholm-newsletter.beehiiv.com", permanent: true },
      { source: "/:locale(de|es|sv|fi|it|fr|pt)/work",        destination: "/:locale/songs",                             permanent: true },
      { source: "/:locale(de|es|sv|fi|it|fr|pt)/resonators",  destination: "https://eriksjoholm-newsletter.beehiiv.com", permanent: true },

      // ── WordPress migration (eriksjoholm.com → eriksjoholm.com) ──────────
      // Generated 2026-07-01 from WordPress.2026-06-30.xml

      // Home
      { source: "/home-2-2",   destination: "/", permanent: true },
      { source: "/home-2-2-2", destination: "/", permanent: true },

      // About
      { source: "/biography", destination: "/about", permanent: true },

      // Storyteller / show concepts
      { source: "/glenn",          destination: "/storyteller", permanent: true },
      { source: "/bonfirestories", destination: "/storyteller", permanent: true },
      { source: "/lostandfound",   destination: "/storyteller", permanent: true },

      // Songs / discography
      { source: "/music",             destination: "/songs", permanent: true },
      { source: "/music-slider",      destination: "/songs", permanent: true },
      { source: "/music-grid",        destination: "/songs", permanent: true },
      { source: "/2-7",               destination: "/songs", permanent: true },
      { source: "/recordings",        destination: "/songs", permanent: true },
      { source: "/in-the-beginning",  destination: "/songs", permanent: true },
      { source: "/dream-true",        destination: "/songs", permanent: true },
      { source: "/we-are-one",        destination: "/songs", permanent: true },
      { source: "/alela",             destination: "/songs", permanent: true },
      { source: "/matsawana",         destination: "/songs", permanent: true },
      { source: "/sooner-or-later",   destination: "/songs", permanent: true },

      // Shows / live
      { source: "/tour",             destination: "/live", permanent: true },
      { source: "/tour-sk",          destination: "/live", permanent: true },
      { source: "/tour-list",        destination: "/live", permanent: true },
      { source: "/tour-past-events", destination: "/live", permanent: true },
      { source: "/tour-all-events",  destination: "/live", permanent: true },
      { source: "/tour-grid",        destination: "/live", permanent: true },
      { source: "/2-3",              destination: "/live", permanent: true },
      { source: "/charity-event-for-leina-live", destination: "/live", permanent: true },

      // Contact (slug was music-2 but content is a contact/press page)
      { source: "/music-2", destination: "/contact", permanent: true },

      // Notes (old blog posts → Beehiiv newsletter landing)
      { source: "/news-classic",   destination: "/notes", permanent: true },
      { source: "/news-4-columns", destination: "/notes", permanent: true },
      { source: "/news-2-columns", destination: "/notes", permanent: true },
      { source: "/news-list",      destination: "/notes", permanent: true },
      { source: "/2-2",            destination: "/notes", permanent: true },
      { source: "/2",              destination: "/notes", permanent: true },
      { source: "/greetings-from-italy",            destination: "/notes", permanent: true },
      { source: "/thankful",                        destination: "/notes", permanent: true },
      { source: "/new-friends-from-belgium",        destination: "/notes", permanent: true },
      { source: "/inspiration-for-compromise",      destination: "/notes", permanent: true },
      { source: "/onlove",                          destination: "/notes", permanent: true },
      { source: "/monday-news-la-ferte-sous-jouarre-france-30-10", destination: "/notes", permanent: true },
      { source: "/sergio-salvador-dieter-negrin",   destination: "/notes", permanent: true },
      { source: "/yourmessageishere",               destination: "/notes", permanent: true },
      { source: "/an-ocean-of-opportunities",       destination: "/notes", permanent: true },
      { source: "/zodiac-signs",                    destination: "/notes", permanent: true },
      { source: "/i-am-nobody",                     destination: "/notes", permanent: true },
      { source: "/short-clip-from-our-performance-in-festival-in-situ-paris-france", destination: "/notes", permanent: true },
      { source: "/12-10-2018-la-fortuna-costa-rica", destination: "/notes", permanent: true },
      { source: "/san-jose-costa-rica",             destination: "/notes", permanent: true },
      { source: "/drake-bay-costa-rica",            destination: "/notes", permanent: true },
      { source: "/la-latina-lyrics",                destination: "/notes", permanent: true },
      { source: "/arrival-in-santa-marta-colombia", destination: "/notes", permanent: true },
      { source: "/first-impressions-colombia",      destination: "/notes", permanent: true },
      { source: "/a-night-of-street-art",           destination: "/notes", permanent: true },
      { source: "/6-1-2019-riohacha-colombia",      destination: "/notes", permanent: true },
      { source: "/27-1-colombia-comes-to-an-end",   destination: "/notes", permanent: true },
      { source: "/3-2-2018-in-cuzco-peru",          destination: "/notes", permanent: true },
      { source: "/what-an-unexpected-day",          destination: "/notes", permanent: true },
      { source: "/stillness-observation-and-patience", destination: "/notes", permanent: true },
      { source: "/easily-we-forget",                destination: "/notes", permanent: true },
      { source: "/bonfire-stories-day-1",           destination: "/notes", permanent: true },
      { source: "/bonfire-stories-after-the-first-show", destination: "/notes", permanent: true },

      // Dead WooCommerce / empty theme-demo pages → home
      { source: "/shop",     destination: "/", permanent: true },
      { source: "/cart",     destination: "/", permanent: true },
      { source: "/checkout", destination: "/", permanent: true },
      { source: "/2-4",      destination: "/", permanent: true },
      { source: "/2-5",      destination: "/", permanent: true },
      { source: "/2-6",      destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
