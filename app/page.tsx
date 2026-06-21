import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Music from "@/components/Music";
import Discover from "@/components/Discover";
import Shows from "@/components/Shows";
import About from "@/components/About";
import Subscribe from "@/components/Subscribe";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Music />
        <Discover />
        <Shows />
        <About />
        <Subscribe />
      </main>
      <Footer />
    </>
  );
}
