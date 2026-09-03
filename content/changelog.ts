export type ChangelogType = "feat" | "release" | "docs" | "chore" | "perf";

export type ChangelogEntry = {
  /** YYYY-MM, or YYYY when only the year is known. */
  date: string;
  type: ChangelogType;
  scope: string;
  message: string;
  href?: string;
};

/** Career milestones, newest first, rendered like `git log --oneline`. */
export const changelog: ChangelogEntry[] = [
  {
    date: "2026-09",
    type: "release",
    scope: "site",
    message: "rebuild this portfolio on Next.js 16, React 19 and Tailwind v4",
  },
  {
    date: "2026-07",
    type: "release",
    scope: "akij-air",
    message: "ship Akij Air Android update to Google Play",
    href: "https://play.google.com/store/apps/details?id=com.akijair.b2c",
  },
  {
    date: "2026",
    type: "feat",
    scope: "kicbak",
    message: "launch Kicbak and the Direct Booking Alliance",
    href: "/work/kicbak",
  },
  {
    date: "2025-08",
    type: "feat",
    scope: "career",
    message: "join AKIJ iBOS as Senior Software Engineer I, lead Akij Air frontend",
    href: "/experience",
  },
  {
    date: "2024-01",
    type: "feat",
    scope: "career",
    message: "promoted to Senior Software Engineer at Flight Expert",
    href: "/experience",
  },
  {
    date: "2022-07",
    type: "feat",
    scope: "career",
    message: "Software Engineer at Flight Expert",
  },
  {
    date: "2021-12",
    type: "feat",
    scope: "career",
    message: "join Flight Expert as Frontend Developer",
  },
  {
    date: "2021",
    type: "docs",
    scope: "research",
    message: "publish counterfeit-medicine deep learning paper at KES HSCI (Springer)",
    href: "https://link.springer.com/chapter/10.1007/978-981-16-3264-8_5",
  },
  {
    date: "2020-12",
    type: "chore",
    scope: "education",
    message: "graduate B.Sc. CSE, University of Asia Pacific, CGPA 3.79",
  },
];
