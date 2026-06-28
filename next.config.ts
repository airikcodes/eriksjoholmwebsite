import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/work",
        destination: "/songs",
        permanent: true,
      },
      {
        source: "/resonators",
        destination: "https://eriksjoholm-newsletter.beehiiv.com",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
