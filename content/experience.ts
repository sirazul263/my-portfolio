export type Position = {
  title: string;
  /** YYYY-MM */
  start: string;
  /** YYYY-MM or "present" */
  end: string;
  bullets: string[];
};

export type Company = {
  name: string;
  legalName?: string;
  url?: string;
  location: string;
  summary: string;
  positions: Position[];
};

export const companies: Company[] = [
  {
    name: "AKIJ iBOS",
    url: "https://ibos.io/",
    location: "Dhaka, Bangladesh · On-site",
    summary:
      "Technology arm of Akij Group. Leading the frontend of Akij Air, a full-scale online travel agency, and building its iOS and Android apps from the ground up.",
    positions: [
      {
        title: "Senior Software Engineer I",
        start: "2025-08",
        end: "present",
        bullets: [
          "Lead frontend development of Akij Air, an OTA flight booking ecosystem covering search, availability, booking, ticketing, cancellation and refund workflows.",
          "Independently designed and built the Akij Air mobile apps in React Native from scratch, owning architecture, core functionality, API integration, performance and production delivery.",
          "Build state-heavy booking interfaces driven by real-time airline data: dynamic pricing, fare and seat availability, and multi-step booking and payment flows that stay consistent under high-concurrency traffic.",
          "Develop and maintain backend REST APIs for booking, ticketing and refund operations, and contribute to backend architecture and database schema design with the backend team.",
          "Improved responsiveness through rendering optimisation, efficient state management and streamlined API consumption.",
          "Partner with product, QA and UI/UX to turn requirements into production-ready features; mentor junior engineers on clean architecture, SOLID principles, reusable components and code quality.",
        ],
      },
    ],
  },
  {
    name: "Flight Expert",
    legalName: "FEBD Ltd.",
    location: "Dhaka, Bangladesh",
    summary:
      "High-traffic online travel platform. Grew from Frontend Developer to Senior Software Engineer over three and a half years, owning customer-facing booking flows built on React and Next.js.",
    positions: [
      {
        title: "Senior Software Engineer",
        start: "2024-01",
        end: "2025-08",
        bullets: [
          "Architected and developed scalable, secure, user-friendly applications with Next.js and React for a high-traffic online travel platform.",
          "Optimised performance and responsiveness through code splitting, rendering strategy improvements and frontend profiling.",
          "Developed backend REST APIs and contributed to backend architecture and database design, keeping integration with the frontend clean.",
          "Led code reviews and mentored junior developers, raising code quality and consistency across the team.",
          "Evaluated and introduced modern tools into the development workflow to improve delivery speed and maintainability.",
          "Ran extensive usability, functionality and accessibility testing before every release.",
        ],
      },
      {
        title: "Software Engineer",
        start: "2022-07",
        end: "2023-12",
        bullets: [
          "Delivered multiple production web solutions with React and Next.js, focusing on clean UI architecture and user experience.",
          "Worked closely with backend teams on API design and integration for booking and travel services.",
          "Identified and resolved performance bottlenecks, improving load times and runtime stability.",
        ],
      },
      {
        title: "Frontend Developer",
        start: "2021-12",
        end: "2022-06",
        bullets: [
          "Built responsive, accessible interfaces across desktop and mobile breakpoints.",
          "Maintained code quality and long-term maintainability through established best practices and testing.",
        ],
      },
    ],
  },
  {
    name: "Easy Sheba",
    legalName: "Easy Sheba Platform Ltd.",
    url: "https://easysheba.com/",
    location: "Dhaka, Bangladesh",
    summary: "On-demand services platform.",
    positions: [
      {
        title: "Junior Web Developer",
        start: "2021-10",
        end: "2021-12",
        bullets: [
          "Developed and deployed company websites with React and Node.js.",
          "Managed deployment and post-launch maintenance.",
          "Performed functional and cross-browser compatibility testing.",
        ],
      },
    ],
  },
];

export const education = [
  {
    school: "University of Asia Pacific",
    location: "Dhaka, Bangladesh",
    degree: "B.Sc. in Computer Science & Engineering",
    start: "2016-10",
    end: "2020-12",
    detail: "CGPA 3.79 / 4.00",
    awards: ["Vice Chancellor’s Award (2x)", "Dean’s Award (4x)"],
  },
  {
    school: "Rajbari Government College",
    location: "Rajbari, Bangladesh",
    degree: "Higher Secondary Certificate, Science",
    start: "2012-05",
    end: "2014-08",
    detail: "GPA 4.70 / 5.00",
    awards: [] as string[],
  },
];

export const research = [
  {
    title: "Identifying Counterfeit Medicine in Bangladesh Using Deep Learning",
    venue: "KES HSCI International Conference 2021, published by Springer",
    summary:
      "Applied deep learning and computer vision to detect counterfeit pharmaceutical packaging, a significant public-health problem in Bangladesh.",
    href: "https://link.springer.com/chapter/10.1007/978-981-16-3264-8_5",
  },
];
