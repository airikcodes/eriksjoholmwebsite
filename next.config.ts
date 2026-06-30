import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/work",                                       destination: "/songs",                                     permanent: true },
      { source: "/resonators",                                 destination: "https://eriksjoholm-newsletter.beehiiv.com", permanent: true },
      { source: "/:locale(de|es|sv|fi|it|fr|pt)/work",        destination: "/:locale/songs",                             permanent: true },
      { source: "/:locale(de|es|sv|fi|it|fr|pt)/resonators",  destination: "https://eriksjoholm-newsletter.beehiiv.com", permanent: true },
    ];
  },
};

export default nextConfig;
