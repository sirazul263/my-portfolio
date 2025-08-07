import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function SocialLinksLeft() {
  return (
    <div className="fixed left-10 bottom-0 flex flex-col items-center space-y-6 pl-6 z-50">
      <a
        href="https://github.com/sirazul263"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub"
        className="text-gray-600 hover:text-pink-600 hover:scale-110 transform transition duration-300"
      >
        <FaGithub className="w-6 h-6" />
      </a>
      <a
        href="https://www.linkedin.com/in/sirazul263"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
        className="text-gray-600 hover:text-pink-600 hover:scale-110 transform transition duration-300"
      >
        <FaLinkedin className="w-6 h-6" />
      </a>
      <a
        href="https://x.com/siraz263"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Twitter"
        className="text-gray-600 hover:text-pink-600 hover:scale-110 transform transition duration-300"
      >
        <FaXTwitter className="w-6 h-6" />
      </a>
      <a
        href="http://instagram.com/sirazul.islam.263"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram"
        className="text-gray-600 hover:text-pink-600 hover:scale-110 transform transition duration-300"
      >
        <FaInstagram className="w-6 h-6" />
      </a>
      {/* Vertical line */}
      <div className="w-px h-24 bg-gray-600 mt-3"></div>
    </div>
  );
}
