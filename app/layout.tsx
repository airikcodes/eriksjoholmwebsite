import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import Header from "@/components/Header";
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
  description: "Official website of Erik Sjøholm — artist and musician.",
  openGraph: {
    title: "Erik Sjøholm",
    description: "Official website of Erik Sjøholm — artist and musician.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="bg-[#0A0A0A] text-[#FAFAFA] antialiased">
        <Header />
        {children}
      </body>
    </html>
  );
}
