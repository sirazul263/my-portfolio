import { motion } from "framer-motion";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
const Contact = () => {
  return (
    <section
      id="contact"
      className="md:max-w-xl mx-auto mt-40 px-4 text-center"
    >
      <motion.p
        className="text-pink-600"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        What's next ?
      </motion.p>

      <motion.h3
        className="text-4xl sm:text-6xl font-bold text-gray-400 mt-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        Get In Touch
      </motion.h3>

      <motion.p
        className="my-8 text-gray-400"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        Feel free to reach out—whether you have a question, feedback, or just
        want to say hello. I'll do my best to respond as soon as I can!
      </motion.p>
      <motion.a
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="email-link"
        href="mailto:sirazul263@gmail.com"
        rel="noopener noreferrer"
        target="_blank"
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
          className="text-pink-600 font-sm cursor-pointer transition-colors duration-300 border border-pink-600 px-4 py-2 rounded"
        >
          Say Hello
        </motion.button>
      </motion.a>
      <div className="block sm:hidden">
        <div className="flex items-center justify-center space-x-6 mt-20">
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
        </div>
      </div>
      <motion.p
        className="text-gray-400 text-sm mt-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Designed & Built by <span className="font-bold">Md Sirazul Islam</span>
      </motion.p>
    </section>
  );
};

export default Contact;
