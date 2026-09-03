export type SocialIcon = "github" | "linkedin" | "x" | "instagram";

export type SocialLink = {
  label: string;
  handle: string;
  href: string;
  icon: SocialIcon;
};

export const site = {
  name: "Md. Sirazul Islam",
  firstName: "Sirazul",
  initials: "SI",
  role: "Senior Software Engineer",
  focus: "Full-stack & mobile",
  headline: "Building fast, dependable software for web and mobile.",
  description:
    "Senior Software Engineer in Dhaka specialising in TypeScript, React, Next.js and React Native. Five years shipping production web and mobile apps, from high-traffic flight booking platforms to multi-tenant SaaS.",
  email: "sirazul263@gmail.com",
  location: "Dhaka, Bangladesh",
  timezone: "Asia/Dhaka",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://sirazul263.vercel.app",
  resumeUrl: "/CV_Md_Sirazul_Islam.pdf",
  githubUser: "sirazul263",
  /** First day of professional work; used to compute years of experience. */
  careerStart: "2021-10-01",
  /** Shown as the status pill in the hero. */
  current: {
    title: "Senior Software Engineer I",
    company: "AKIJ iBOS",
    product: "Akij Air",
  },
  /** Flip `open` to true to swap the hero pill for an availability notice. */
  availability: {
    open: false,
    label: "Open to senior frontend & full-stack roles",
  },
  socials: [
    {
      label: "GitHub",
      handle: "@sirazul263",
      href: "https://github.com/sirazul263",
      icon: "github",
    },
    {
      label: "LinkedIn",
      handle: "in/sirazul263",
      href: "https://www.linkedin.com/in/sirazul263",
      icon: "linkedin",
    },
    {
      label: "X",
      handle: "@siraz263",
      href: "https://x.com/siraz263",
      icon: "x",
    },
    {
      label: "Instagram",
      handle: "@sirazul.islam.263",
      href: "https://instagram.com/sirazul.islam.263",
      icon: "instagram",
    },
  ] as SocialLink[],
};

export const nav = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/experience", label: "Experience" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;
