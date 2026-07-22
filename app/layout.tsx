import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import LocaleSwitcher from "@/components/LocaleSwitcher";
import PersistentBackground from "@/components/PersistentBackground";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

const validLocales = ['en', 'de', 'es', 'sv', 'fi', 'it', 'fr', 'pt'];

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover", // enables env(safe-area-inset-*) on iOS
};

export const metadata: Metadata = {
  metadataBase: new URL("https://eriksjoholm.com"),
  title: "Erik Sjøholm",
  description:
    "Singer-songwriter and storyteller from Ostrobothnia, Finland, based in Luzern, Switzerland. Songs built from real moments, lived quietly and felt deeply.",
  openGraph: {
    title: "Erik Sjøholm",
    description:
      "Singer-songwriter and storyteller from Finland, based in Luzern, Switzerland.",
    url: "https://eriksjoholm.com",
    siteName: "Erik Sjøholm",
    images: [{ url: "/images/portrait.jpg", width: 800, height: 800, alt: "Erik Sjøholm" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Erik Sjøholm",
    description:
      "Singer-songwriter and storyteller from Finland, based in Luzern, Switzerland.",
    images: ["/images/portrait.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get('NEXT_LOCALE')?.value ?? 'en';
  const lang = validLocales.includes(cookieLocale) ? cookieLocale : 'en';

  return (
    <html lang={lang} className={`${cormorant.variable} ${inter.variable}`}>
      <body>
        {/* Portrait mark — global home link, fixed top-left */}
        <Link href="/" className="portrait-mark" aria-label="Erik Sjøholm — Home">
          <Image
            src="/images/portrait.jpg"
            alt="Erik Sjøholm"
            width={52}
            height={52}
            priority
          />
        </Link>

        {/* Preload first background video on desktop so it's ready the moment JS enables video mode */}
        <link rel="preload" as="video" href="/videos/bg-01.mp4" type="video/mp4" media="(min-width: 768px)" />
        <SmoothScroll />
        <LocaleSwitcher />
        <PersistentBackground />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebSite",
                  "@id": "https://eriksjoholm.com/#website",
                  name: "Erik Sjøholm",
                  url: "https://eriksjoholm.com",
                },
                {
                  "@type": ["Person", "MusicGroup"],
                  "@id": "https://eriksjoholm.com/#artist",
                  name: "Erik Sjøholm",
                  alternateName: "Erik Sjoholm",
                  url: "https://eriksjoholm.com",
                  image: {
                    "@type": "ImageObject",
                    url: "https://eriksjoholm.com/images/portrait.jpg",
                  },
                  description:
                    "Singer-songwriter and storyteller from Ostrobothnia, Finland, based in Luzern, Switzerland.",
                  genre: ["Folk", "Singer-Songwriter", "Indie Folk"],
                  sameAs: [
                    "https://open.spotify.com/artist/1UpcgaCHBwic2IqUQ3hHdp",
                    "https://tidal.com/artist/47687355",
                    "https://www.instagram.com/eriksjoholmofficial",
                    "https://facebook.com/eriksjoholmffofficial/",
                    "https://www.youtube.com/eriksjoholmofficial",
                    "https://www.linkedin.com/in/eriksjoholmofficial1717/",
                  ],
                },
              ],
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}
