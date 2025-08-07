import { motion } from "framer-motion";
const About = () => {
  const technologies = [
    "JavaScript (ES6+)",
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "Laravel",
  ];
  return (
    <section
      id="about"
      className="md:max-w-[1000px] mx-auto mt-40 px-4 flex flex-col md:flex-row items-start justify-between"
    >
      {/* Text Content (left-aligned and constrained width) */}
      <motion.div
        className="w-full "
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {/* Heading with line */}
        <div className="flex items-center gap-4 mb-6">
          <h2 className="text-2xl font-bold whitespace-nowrap text-gray-100">
            About Me
          </h2>
          <div className="flex-1 h-px bg-gray-700" />
        </div>

        <p className="mb-4 text-gray-400">
          Hello! I’m Md. Sirazul Islam, a Senior Software Engineer based in
          Dhaka who enjoys creating things that live on the internet. I build
          exceptional websites, applications, and everything in between.
        </p>
        <p className="mb-4 text-gray-400">
          My goal is to always build products that provide pixel-perfect,
          performant experiences.
        </p>

        <div className="text-gray-400">
          <p className="mb-2">
            Here are a few technologies I’ve been working with recently:
          </p>
          <ul className="mt-2 grid list-none gap-x-[10px] gap-y-1 p-0 text-sm font-medium [grid-template-columns:repeat(2,minmax(140px,200px))]">
            {technologies.map((tech) => (
              <li
                key={tech}
                className="relative pl-5 before:content-['▹'] before:absolute before:left-0 before:text-[#64ffda] before:text-[13px] before:leading-[12px]"
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>

      {/* Right side remains intentionally empty or can hold image */}
      <motion.div
        className="hidden md:flex w-1/2 justify-end"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="relative w-64 h-75"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <motion.img
            src="./img/pro-pic.jpeg"
            alt="Profile"
            className="rounded-lg shadow-lg object-cover w-full h-full"
            whileHover={{ filter: "brightness(1.1)" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default About;
