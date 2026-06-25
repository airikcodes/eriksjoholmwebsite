import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import "./globals.css";

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

export const metadata: Metadata = {
  title: "Erik Sjøholm",
  description: "Singer-songwriter and storyteller.",
  openGraph: {
    title: "Erik Sjøholm",
    description: "Singer-songwriter and storyteller.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
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

        {children}
      </body>
    </html>
  );
}
