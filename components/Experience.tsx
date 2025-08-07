import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

const Experience = () => {
  const jobs = [
    {
      company: "Flight Expert",
      url: "https://www.flightexpert.com.com/",
      positions: [
        {
          title: "Senior Software Engineer",
          range: "December 2021 - August 2025",
          responsibilities: [
            "Architected and developed scalable, secure, and user-friendly web applications supporting thousands of users.",
            "Collaborated closely with front-end and back-end teams to integrate and deploy seamless features, enhancing product quality and performance.",
            "Led code reviews and mentored junior developers to maintain high code standards and consistency.",
            "Identified and resolved performance bottlenecks, improving app responsiveness by 25%.",
            "Researched and implemented new technologies, driving continuous optimization and innovation.",
          ],
        },
      ],
    },
    {
      company: "EasySheba",
      url: "https://easysheba.com/",
      positions: [
        {
          title: "Junior Web Developer",
          range: "October 2021 - December 2021",
          responsibilities: [
            "Developed the company’s official website using modern web technologies ensuring cross-device compatibility.",
            "Maintained uptime and performance through deployment and server monitoring.",
            "Researched and implemented new technologies, driving continuous optimization and innovation.",
          ],
        },
      ],
    },
    {
      company: "PeopleNTech Limited",
      url: "https://www.peoplentech.com.bd/",
      positions: [
        {
          title: "Web Development Intern",
          range: "September 2019 - October 2019",
          responsibilities: [
            "Gained hands-on experience with core web technologies including HTML, CSS, and JavaScript.",
            "Developed and deployed basic web projects, learning essential deployment workflows and best practices.",
            "Collaborated with the development team to understand real-world software development processes.",
            "Built a solid foundation in front-end development and web application lifecycle.",
          ],
        },
      ],
    },
  ];

  const [selectedIndex, setSelectedIndex] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [indicatorStyles, setIndicatorStyles] = useState({ top: 0, height: 0 });

  // Update indicator position when selectedIndex changes
  useEffect(() => {
    const currentTab = tabRefs.current[selectedIndex];
    if (currentTab) {
      setIndicatorStyles({
        top: currentTab.offsetTop,
        height: currentTab.offsetHeight,
      });
    }
  }, [selectedIndex]);

  return (
    <section id="experience" className="max-w-2xl mx-auto mt-40 px-4">
      {/* Heading */}
      <motion.div
        className="w-full"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex items-center gap-4 mb-6">
          <h2 className="text-2xl font-bold whitespace-nowrap text-gray-100">
            Where I’ve Worked
          </h2>
          <div className="flex-1 h-px bg-gray-700" />
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="md:flex gap-8">
        {/* Tab List with Animated Indicator */}
        <div className="relative flex md:flex-col gap-2 mb-6 md:mb-0">
          {/* Animated Left Border Indicator */}
          <motion.div
            className="absolute left-0 w-0.5 bg-[#64ffda] rounded"
            initial={false}
            animate={indicatorStyles}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />

          {/* Tab Buttons */}
          <div className="flex md:flex-col border-l-2 border-[#112240]">
            {jobs.map((job, i) => (
              <button
                key={job.company}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                onClick={() => setSelectedIndex(i)}
                className={`relative cursor-pointer px-4 py-[10px] text-left text-sm font-medium transition-all duration-300 ease-in-out
                  ${
                    selectedIndex === i
                      ? "text-[#64ffda] bg-[#112240]"
                      : "text-gray-400 hover:text-[#64ffda]"
                  }`}
              >
                {job.company}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="flex-1">
          {jobs[selectedIndex].positions.map((position, i) => (
            <div className="mb-3">
              <h3 className="text-lg font-semibold text-gray-100 mb-1">
                {position.title}
                <span className="text-[#64ffda]">
                  &nbsp;@&nbsp;
                  <motion.a
                    href={jobs[selectedIndex].url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative inline-block "
                    initial="rest"
                    whileHover="hover"
                    animate="rest"
                  >
                    {jobs[selectedIndex].company}
                    <motion.span
                      className="absolute left-0 bottom-0 h-[1px] bg-[#64ffda]"
                      variants={{
                        rest: { width: 0 },
                        hover: { width: "100%" },
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.a>
                </span>
              </h3>
              <p className="text-sm font-medium text-gray-500 mb-4">
                {position.range}
              </p>
              <ul className="list-none pl-5 space-y-2 text-sm text-gray-400">
                {position.responsibilities.map((item, i) => (
                  <li
                    className="relative pl-5  before:content-['▹'] before:absolute before:left-0 before:top-1 before:text-[#64ffda] before:text-[13px] before:leading-[12px]"
                    key={i}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
