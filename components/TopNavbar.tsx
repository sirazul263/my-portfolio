import { useEffect, useRef, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { motion } from "framer-motion";

export default function TopNavbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [hasShadow, setHasShadow] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  // Track when navbar is in viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0 }
    );

    if (navRef.current) {
      observer.observe(navRef.current);
    }

    return () => {
      if (navRef.current) {
        observer.unobserve(navRef.current);
      }
    };
  }, []);

  // Add shadow when scrolling past top
  useEffect(() => {
    const handleScroll = () => {
      setHasShadow(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const links = [
    { id: "about", label: "About" },
    { id: "experience", label: "Experience" },
    { id: "work", label: "Work" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <nav
      ref={navRef}
      className={`transition-all duration-500 ease-in-out w-full z-50 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5"
      } bg-[#0a192f] backdrop-blur-md ${
        hasShadow ? "shadow-md" : "shadow-none"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Left: Name */}
        <div className="text-clr-primary font-bold uppercase tracking-widest cursor-pointer">
          Md Sirazul Islam
        </div>

        {/* Desktop Nav */}
        <ul className="hidden md:flex space-x-10 text-clr-primary tracking-widest text-sm font-medium items-center">
          {links.map(({ id, label }) => (
            <li key={label}>
              <button
                onClick={() => scrollToSection(id)}
                className="hover:text-pink-600 transition-colors duration-300 cursor-pointer"
              >
                {label}
              </button>
            </li>
          ))}
          <li>
            <a
              href="/CV_of_Md_Sirazul_Islam.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              <motion.button
                type="button"
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "#ec4899", // Tailwind's pink-500
                  color: "#ffffff",
                  boxShadow: "0px 4px 15px rgba(236, 72, 153, 0.5)",
                }}
                transition={{ type: "spring", stiffness: 300 }}
                className="text-pink-600 cursor-pointer transition-colors duration-300 border border-pink-600 px-4 py-2 rounded"
              >
                Resume
              </motion.button>
            </a>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-clr-primary"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#071323] px-6 py-4 space-y-4 text-clr-primary text-sm">
          {links.map(({ id, label }) => (
            <div key={label}>
              <button
                className="block cursor-pointer hover:text-pink-600 transition-colors duration-300"
                onClick={() => {
                  scrollToSection(id);
                  setIsMenuOpen(false);
                }}
              >
                {label}
              </button>
            </div>
          ))}
          <div>
            <a
              href="/CV_of_Md_Sirazul_Islam.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMenuOpen(false)}
            >
              <motion.button
                type="button"
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "#ec4899", // Tailwind's pink-500
                  color: "#ffffff",
                  boxShadow: "0px 4px 15px rgba(236, 72, 153, 0.5)",
                }}
                transition={{ type: "spring", stiffness: 300 }}
                className="text-pink-600 cursor-pointer transition-colors duration-300 border border-pink-600 px-4 py-2 rounded"
              >
                Resume
              </motion.button>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
