import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'imgproxy.fourthwall.dev' },
      { protocol: 'https', hostname: 'cdn.fourthwall.com' },
    ],
  },
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

      // Old blog posts → home
      { source: "/news-classic",   destination: "/", permanent: true },
      { source: "/news-4-columns", destination: "/", permanent: true },
      { source: "/news-2-columns", destination: "/", permanent: true },
      { source: "/news-list",      destination: "/", permanent: true },
      { source: "/2-2",            destination: "/", permanent: true },
      { source: "/2",              destination: "/", permanent: true },
      { source: "/greetings-from-italy",            destination: "/", permanent: true },
      { source: "/thankful",                        destination: "/", permanent: true },
      { source: "/new-friends-from-belgium",        destination: "/", permanent: true },
      { source: "/inspiration-for-compromise",      destination: "/", permanent: true },
      { source: "/onlove",                          destination: "/", permanent: true },
      { source: "/monday-news-la-ferte-sous-jouarre-france-30-10", destination: "/", permanent: true },
      { source: "/sergio-salvador-dieter-negrin",   destination: "/", permanent: true },
      { source: "/yourmessageishere",               destination: "/", permanent: true },
      { source: "/an-ocean-of-opportunities",       destination: "/", permanent: true },
      { source: "/zodiac-signs",                    destination: "/", permanent: true },
      { source: "/i-am-nobody",                     destination: "/", permanent: true },
      { source: "/short-clip-from-our-performance-in-festival-in-situ-paris-france", destination: "/", permanent: true },
      { source: "/12-10-2018-la-fortuna-costa-rica", destination: "/", permanent: true },
      { source: "/san-jose-costa-rica",             destination: "/", permanent: true },
      { source: "/drake-bay-costa-rica",            destination: "/", permanent: true },
      { source: "/la-latina-lyrics",                destination: "/", permanent: true },
      { source: "/arrival-in-santa-marta-colombia", destination: "/", permanent: true },
      { source: "/first-impressions-colombia",      destination: "/", permanent: true },
      { source: "/a-night-of-street-art",           destination: "/", permanent: true },
      { source: "/6-1-2019-riohacha-colombia",      destination: "/", permanent: true },
      { source: "/27-1-colombia-comes-to-an-end",   destination: "/", permanent: true },
      { source: "/3-2-2018-in-cuzco-peru",          destination: "/", permanent: true },
      { source: "/what-an-unexpected-day",          destination: "/", permanent: true },
      { source: "/stillness-observation-and-patience", destination: "/", permanent: true },
      { source: "/easily-we-forget",                destination: "/", permanent: true },
      { source: "/bonfire-stories-day-1",           destination: "/", permanent: true },
      { source: "/bonfire-stories-after-the-first-show", destination: "/", permanent: true },

      // Dead WooCommerce / empty theme-demo pages → home
      { source: "/cart",     destination: "/", permanent: true },
      { source: "/checkout", destination: "/", permanent: true },
      { source: "/2-4",      destination: "/", permanent: true },
      { source: "/2-5",      destination: "/", permanent: true },
      { source: "/2-6",      destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
