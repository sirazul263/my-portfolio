import { motion } from "framer-motion";
import { Variants } from "framer-motion";
const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1], // cubic-bezier equivalent of easeOut
    },
  },
};

const Work = () => {
  const projects = [
    {
      title: "Shop Management",
      description:
        "A simple shop management system to handle inventory, sales, billing, and reports, making daily shop operations more efficient.",
      tech: [
        "Next.js",
        "TailwindCSS",
        "TypeScript",
        "Laravel",
        "Vercel",
        "Railway",
      ],
      image: "./img/istockphoto.jpg",
      github: "https://github.com/sirazul263/shop-management-frontend",
      external: "https://shop-management-nine.vercel.app/sign-in",
      featured: true,
    },
    {
      title: "Task Management",
      description:
        "A task management system for creating, assigning, and tracking tasks with features like status updates, priorities, and team collaboration—similar to Jira.",
      tech: ["Next.js", "TypeScript", "Hono.js", "Appwrite"],

      image: "./img/jira.png",
      github: "https://github.com/sirazul263/task-management-next15",
      external: "task-management-next15.vercel.app",
      featured: true,
    },
  ];
  return (
    <section id="work" className="max-w-5xl mx-auto mt-40">
      <motion.div
        className="w-full"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex items-center gap-4 mb-6">
          <h2 className="text-2xl font-bold whitespace-nowrap text-gray-100">
            Some Things I’ve Built
          </h2>
          <div className="flex-1 h-px bg-gray-700" />
        </div>
      </motion.div>

      <motion.div
        className="space-y-32"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        {projects.map((project, i) => (
          <motion.div
            key={i}
            variants={item}
            className={`relative grid md:grid-cols-12 md:gap-8 items-center`}
          >
            {/* Image */}
            {/* Image */}
            <div
              className={`md:col-span-7 relative group overflow-hidden rounded-lg shadow-lg ${
                i % 2 !== 0 ? "md:col-start-6" : ""
              }`}
            >
              <a
                href={project.external}
                target="_blank"
                rel="noopener noreferrer"
              >
                {/* Image */}
                <motion.img
                  src={project.image}
                  alt={project.title}
                  variants={item} // already defined
                  className="object-cover w-full h-full transform transition-transform duration-500 group-hover:scale-105"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-pink-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </a>
            </div>

            {/* Text */}
            <div
              className={`md:col-span-5 mt-6 md:mt-0 ${
                i % 2 === 0 ? "md:text-right" : "md:order-first md:text-left"
              }`}
            >
              <p className="text-pink-600 font-mono text-sm">
                Featured Project
              </p>
              <h3 className="text-2xl font-bold text-gray-100">
                {project.title}
              </h3>
              <div className="bg-[#112240] text-gray-400 p-4 rounded-lg mt-4 shadow-lg">
                <p>{project.description}</p>
              </div>
              <ul
                className={`flex flex-wrap gap-4 mt-4 text-sm text-gray-400 font-mono ${
                  i % 2 === 0 ? "justify-end" : "justify-start"
                }`}
              >
                {project.tech.map((t, index) => (
                  <li key={index}>{t}</li>
                ))}
              </ul>
              <div
                className={`flex gap-4 mt-4 ${
                  i % 2 === 0 ? "justify-end" : "justify-start"
                }`}
              >
                {/* GitHub Icon */}
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 hover:text-pink-600"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.29 9.43 7.86 10.96.57.1.78-.25.78-.55v-2.02c-3.2.7-3.87-1.54-3.87-1.54-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.75 1.19 1.75 1.19 1.02 1.75 2.68 1.24 3.33.95.1-.74.4-1.24.73-1.53-2.55-.29-5.23-1.27-5.23-5.65 0-1.25.45-2.27 1.18-3.07-.12-.29-.51-1.45.11-3.03 0 0 .96-.31 3.15 1.18.91-.25 1.88-.38 2.85-.38.97 0 1.94.13 2.85.38 2.19-1.49 3.15-1.18 3.15-1.18.62 1.58.23 2.74.11 3.03.73.8 1.18 1.82 1.18 3.07 0 4.39-2.69 5.36-5.26 5.64.41.36.77 1.07.77 2.16v3.2c0 .31.21.65.79.54C20.71 21.43 24 17.1 24 12c0-6.35-5.15-11.5-12-11.5z" />
                  </svg>
                </a>
                {/* External Link Icon */}
                <a
                  href={project.external}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 hover:text-pink-600"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M14 3h7v7" />
                    <path d="M10 14L21 3" />
                    <path d="M21 21H3V3" />
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Work;
