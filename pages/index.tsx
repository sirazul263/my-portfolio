import React, { useEffect, useState } from "react";
import EmailRight from "@/components/EmailRight";
import TopNavbar from "@/components/TopNavbar";
import SocialLinksLeft from "@/components/SocialLinkLeft";
import Experience from "@/components/Experience";
import About from "@/components/About";
import Hero from "@/components/Hero";
import Work from "@/components/Work";
import Contact from "@/components/Contact";
import { FiChevronUp } from "react-icons/fi";
import { motion } from "framer-motion";
import Head from "next/head";

export default function Home() {
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  // Show "Go to Top" button after scrolling down 300px
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollToTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Head>
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="img/favicon-16x16.png"
        />
        <title>Md Sirazul Islam</title>
      </Head>
      <main className="min-h-screen bg-[#0a192f] text-gray-300 font-sans p-6 scroll-smooth">
        <TopNavbar />
        <div className="hidden sm:block">
          <SocialLinksLeft />
          <EmailRight />
        </div>
        {/* Hero Section */}
        <Hero />
        {/* About Section */}
        <About />
        {/* Experience */}
        <Experience />
        {/* Projects Section */}
        <Work />
        <Contact />
        {showScrollToTop && (
          <motion.button
            onClick={scrollToTop}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
            className="fixed cursor-pointer bottom-6 right-6 bg-pink-600 hover:bg-pink-700 text-white p-3 rounded-full shadow-lg z-50"
            aria-label="Scroll to top"
          >
            <FiChevronUp />
          </motion.button>
        )}
      </main>
    </>
  );
}
