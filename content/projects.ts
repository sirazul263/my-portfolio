export type ProjectStatus = "production" | "live" | "in-progress" | "source" | "shipped";

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  year: string;
  role: string;
  status: ProjectStatus;
  featured: boolean;
  /** Short blurb for cards. */
  summary: string;
  /** Longer paragraphs for the case-study page. */
  description: string[];
  highlights: string[];
  stack: string[];
  links: {
    live?: string;
    repo?: string;
    playStore?: string;
    appStore?: string;
    extraRepos?: { label: string; href: string }[];
  };
  /** Shown on the case-study page when there is no public source, e.g. why. */
  note?: string;
  /** Base hue (0-360) used to generate the project visual. */
  hue: number;
  /** Optional screenshot under /public. Falls back to a generated visual when absent. */
  image?: string;
};

export const projects: Project[] = [
  {
    slug: "akij-air",
    title: "Akij Air",
    tagline: "OTA flight booking platform, web and mobile",
    year: "2025 – present",
    role: "Frontend lead & mobile engineer",
    status: "production",
    featured: true,
    summary:
      "A full-scale online travel agency: search, live availability, booking, ticketing, cancellation and refunds on the web, plus the Android and iOS apps built from the ground up in React Native.",
    description: [
      "Akij Air is the flight booking product of AKIJ iBOS, the technology arm of Akij Group. I lead its frontend: flight search, real-time availability, multi-step booking and payment, ticketing, cancellation and refund flows, all driven by live airline data where fares and seats can change while the user is still looking at them.",
      "I also designed and built the Akij Air mobile apps in React Native from scratch, owning the architecture, core functionality, API integration, performance work and production delivery. On the backend I develop and maintain REST APIs for booking, ticketing and refunds, and contribute to schema design alongside the backend team.",
    ],
    highlights: [
      "State-heavy booking interfaces driven by real-time airline data: dynamic pricing, fare and seat availability, multi-step booking and payment.",
      "Cross-platform Android and iOS apps built from the ground up in React Native, from architecture through store delivery; the Android app is live on Google Play with 1K+ downloads.",
      "Backend REST APIs for booking, ticketing and refund operations, plus database schema design with the backend team.",
      "Rendering optimisation, efficient state management and streamlined API consumption to stay consistent under high-concurrency traffic.",
    ],
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "React Native",
      "Node.js",
      "REST APIs",
    ],
    links: {
      live: "https://akijair.com",
      playStore: "https://play.google.com/store/apps/details?id=com.akijair.b2c",
    },
    note: "Proprietary product built as part of my role at AKIJ iBOS; source is not public.",
    hue: 358,
    image: "/projects/akij-air.jpg",
  },
  {
    slug: "kicbak",
    title: "Kicbak",
    tagline: "Cashback and perks for booking travel direct",
    year: "2026",
    role: "Frontend & full-stack engineering",
    status: "live",
    featured: true,
    summary:
      "Travel platforms take 15–40% commission on every booking. Kicbak routes that value back to travelers as cashback and perks, and gives hotels, hosts and experience operators repeat direct guests.",
    description: [
      "Kicbak is the consumer product of the Direct Booking Alliance. Travelers book directly with hotels, short-term rentals, tours and experiences, earn cashback into a Kicbak wallet, and unlock direct-only perks such as room upgrades, free breakfast and late checkout.",
      "On the operator side, hotels and hosts bring their existing guests onto Kicbak and reward them for booking direct, turning one-off platform bookings into repeat direct revenue. I build the product with a small distributed team on Next.js, React and TypeScript.",
    ],
    highlights: [
      "Invite-gated onboarding with separate paths for travelers and for hotels, hosts and experience operators.",
      "Wallet-based cashback that accumulates across bookings and can be spent on the next trip.",
      "Direct-only perks surfaced alongside cashback, so booking direct beats booking through a platform.",
      "Full dark and light theming across the product.",
    ],
    stack: ["Next.js", "React", "TypeScript"],
    links: { live: "https://kicbak.co" },
    note: "Commercial product; source is not public.",
    hue: 340,
    image: "/projects/kicbak.jpg",
  },
  {
    slug: "direct-booking-alliance",
    title: "Direct Booking Alliance",
    tagline: "The hub for the direct booking ecosystem",
    year: "2026",
    role: "Frontend & full-stack engineering",
    status: "live",
    featured: true,
    summary:
      "An open network for hotels, short-term rentals, tour and experience operators, tech companies and creators shifting bookings direct. 103 members from 29 countries at last count, with a public member directory and ambassador programme.",
    description: [
      "Online travel platforms win because they are networks that span destinations and trip types, while individual operators have always had to win direct bookings alone. The Alliance gives direct booking a network of its own: operators, partners and shared initiatives in one connected ecosystem.",
      "The site is the front door to that ecosystem: free membership sign-up and sign-in, a searchable member directory, the ambassador programme and the Alliance's open initiatives. It is the sister product to Kicbak and shares the same team and stack.",
    ],
    highlights: [
      "Public member directory of operators and partners across 29 countries.",
      "Membership sign-up, sign-in and an ambassador programme.",
      "Content-heavy marketing site with initiatives and FAQ, built on Next.js.",
    ],
    stack: ["Next.js", "React", "TypeScript"],
    links: { live: "https://directbook.org" },
    note: "Commercial product; source is not public.",
    hue: 265,
    image: "/projects/direct-booking-alliance.jpg",
  },
  {
    slug: "flight-expert",
    title: "Flight Expert",
    tagline: "Online travel agency booking platform",
    year: "2021 – 2025",
    role: "Frontend Developer to Senior Software Engineer",
    status: "shipped",
    featured: true,
    summary:
      "The customer-facing booking platform of a high-traffic Bangladeshi online travel agency: flight search, booking and payment flows on React and Next.js, which I worked on for three and a half years.",
    description: [
      "Flight Expert (FEBD Ltd.) ran a high-traffic online travel platform. I joined as a Frontend Developer in December 2021 and left as Senior Software Engineer in August 2025, working on the customer-facing booking product throughout.",
      "The work covered the React and Next.js frontend, performance (code splitting, rendering strategy, profiling), backend REST APIs and database design alongside the backend team, and later code review and mentoring for the frontend team.",
    ],
    highlights: [
      "Architected and shipped scalable, secure booking applications on Next.js and React for a high-traffic travel platform.",
      "Cut load times through code splitting, rendering strategy improvements and frontend profiling.",
      "Developed backend REST APIs and contributed to architecture and database design with the backend team.",
      "Led code reviews and mentored junior developers as the team grew.",
    ],
    stack: ["Next.js", "React", "TypeScript", "JavaScript", "Node.js", "REST APIs"],
    links: {},
    note: "Proprietary product; the flightexpert.com site is no longer online, so this case study is written from my role there.",
    hue: 210,
  },
  {
    slug: "siteforge",
    title: "SiteForge",
    tagline: "Multi-tenant SaaS website builder",
    year: "2026",
    role: "Architecture & full-stack",
    status: "in-progress",
    featured: true,
    summary:
      "One Next.js deployment, one Postgres database, hard tenant isolation at the application layer. Businesses sign up, get a workspace, and build a site from industry templates.",
    description: [
      "SiteForge is a platform where agencies, restaurants, clinics and freelancers sign up, receive an isolated tenant workspace, and assemble a professional website from industry templates. The whole product runs as a single Next.js deployment against a single PostgreSQL database.",
      "The foundation phase covers the full data model, authentication, tenant-detection routing, role-based access control, a working tenant dashboard and the SaaS marketing site. The drag-and-drop page editor, platform admin panel and Stripe billing are designed into the schema so they can land later without a rewrite.",
    ],
    highlights: [
      "Shared-table multi-tenancy: every query is scoped by tenant ID and guarded by role-based access control.",
      "Better Auth with email verification, password reset and OAuth-ready providers, on Prisma 7 with the Neon serverless driver.",
      "Tenant-detection routing resolves the workspace from the incoming request before anything renders.",
      "Multi-file Prisma schema laid out so the page editor, admin panel and billing can be added without rework.",
    ],
    stack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS v4",
      "shadcn/ui",
      "Prisma 7",
      "Neon Postgres",
      "Better Auth",
      "TanStack Query",
      "Zustand",
      "Zod",
      "Resend",
    ],
    links: { repo: "https://github.com/sirazul263/site-forge-sass" },
    hue: 42,
  },
  {
    slug: "help-desk-expert",
    title: "Help Desk Expert",
    tagline: "Real-time customer support desk",
    year: "2025 – 2026",
    role: "Full-stack & real-time infrastructure",
    status: "live",
    featured: true,
    summary:
      "Customers open conversations, agents answer in real time. Live delivery over Pusher, plus a standalone Socket.IO relay that deploys independently of the Next.js app.",
    description: [
      "Help Desk Expert is a support platform: customers start conversations, agents pick them up and reply, and everything is delivered live. It was rebuilt on Next.js 16 and React 19 from an earlier version to take advantage of the newer App Router and caching model.",
      "Real-time delivery is handled two ways. Pusher channels push messages to connected clients, and a small Express + Socket.IO relay service can be deployed separately (Render, Fly) and forward events to the Next.js backend, so the transport layer can scale on its own.",
    ],
    highlights: [
      "Real-time messaging over Pusher, with a separately deployable Socket.IO relay service.",
      "Auth.js v5 sessions with bcrypt-hashed credentials on Prisma 7 and PostgreSQL.",
      "Transactional email through Resend; server state cached and synchronised with TanStack Query.",
      "Second-generation rebuild on Next.js 16 and React 19.",
    ],
    stack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Prisma 7",
      "PostgreSQL",
      "Auth.js v5",
      "Pusher",
      "Socket.IO",
      "Resend",
      "TanStack Query",
      "Zod",
      "Tailwind CSS v4",
    ],
    links: {
      live: "https://help-desk-expert-new.vercel.app",
      repo: "https://github.com/sirazul263/help-desk-expert-new",
      extraRepos: [
        {
          label: "Socket.IO relay",
          href: "https://github.com/sirazul263/socket-server",
        },
      ],
    },
    hue: 200,
    image: "/projects/help-desk-expert.jpg",
  },
  {
    slug: "ai-travel-chatbot",
    title: "AI Travel Chatbot",
    tagline: "Local-LLM assistant with human takeover",
    year: "2026",
    role: "Product & full-stack",
    status: "source",
    featured: false,
    summary:
      "A floating chat widget backed by Llama 3.2 running locally through Ollama. It gathers travel details, searches flights, and admins can watch, reply, or pause the AI and take over.",
    description: [
      "The chatbot lives as a floating bubble on a travel website. Instead of a paid API, it talks to a Llama 3.2 model served locally by Ollama, which keeps inference free and keeps conversation data on your own machine.",
      "The assistant asks for travel details conversationally, then queries a flight database. On the other side, an admin panel lists every conversation in near real time; an admin can reply directly or flip a per-conversation switch that pauses the AI so a human can take over.",
    ],
    highlights: [
      "Free local inference with Ollama and Llama 3.2: no API keys, no per-token cost.",
      "Admin dashboard with live conversation view, direct replies and a per-thread AI on/off switch.",
      "Conversational flight search: the model collects parameters before hitting the database.",
      "Auth.js v5 credentials; Prisma over SQLite for a zero-setup local run.",
    ],
    stack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Ollama",
      "Llama 3.2",
      "Prisma",
      "SQLite",
      "Auth.js v5",
      "Tailwind CSS v4",
    ],
    links: { repo: "https://github.com/sirazul263/ai-chatbot" },
    hue: 285,
  },
  {
    slug: "nodebase",
    title: "Nodebase",
    tagline: "Workflow automation, n8n-style",
    year: "2025",
    role: "Full-stack & event-driven architecture",
    status: "source",
    featured: false,
    summary:
      "Compose workflows from triggers and actions and run them durably in the background. Built to explore event-driven architecture with type safety from database to UI.",
    description: [
      "Nodebase is a node-based automation tool in the spirit of n8n. Users wire triggers to actions, and each execution runs as a durable background job that survives restarts and retries on failure.",
      "The API surface is fully typed end to end with tRPC 11 and Zod 4. AI steps use the Vercel AI SDK with OpenAI models, and Sentry captures anything that goes wrong in production.",
    ],
    highlights: [
      "Durable, retryable background execution with Inngest.",
      "End-to-end type safety with tRPC 11 and Zod 4.",
      "AI-powered workflow steps through the Vercel AI SDK.",
      "Better Auth sessions, Prisma on Postgres, Sentry error monitoring.",
    ],
    stack: [
      "Next.js 15",
      "React 19",
      "TypeScript",
      "tRPC",
      "Inngest",
      "Vercel AI SDK",
      "OpenAI",
      "Better Auth",
      "Prisma",
      "Sentry",
      "Tailwind CSS v4",
    ],
    links: { repo: "https://github.com/sirazul263/n8n-workflow" },
    hue: 150,
  },
  {
    slug: "gadget-store",
    title: "Gadget Store",
    tagline: "E-commerce storefront with Stripe",
    year: "2026",
    role: "Full-stack",
    status: "source",
    featured: false,
    summary:
      "A consumer-electronics storefront with catalogue, cart and Stripe payments, backed by authenticated accounts.",
    description: [
      "Gadget Store is a storefront for consumer electronics. Shoppers browse the catalogue, manage a cart and pay through Stripe, with accounts handled by Auth.js v5.",
    ],
    highlights: [
      "Stripe integration for payments.",
      "Auth.js v5 credentials with bcrypt hashing on a Prisma data layer.",
      "TanStack Query for catalogue and cart state; Motion for micro-interactions.",
    ],
    stack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Stripe",
      "Prisma",
      "Auth.js v5",
      "TanStack Query",
      "Zod",
      "Tailwind CSS v4",
    ],
    links: { repo: "https://github.com/sirazul263/gadget-store" },
    hue: 15,
  },
  {
    slug: "shop-management",
    title: "Shop Management",
    tagline: "Inventory, sales & billing for retailers",
    year: "2025",
    role: "Frontend & API",
    status: "live",
    featured: false,
    summary:
      "Day-to-day shop operations, inventory, sales, billing and reports, with a Next.js client on Vercel talking to a Laravel API on Railway.",
    description: [
      "A management system for small retailers covering inventory, sales, billing and reporting. The frontend and the API are separate deployables: a Next.js 14 app on Vercel and a Laravel REST API on Railway.",
    ],
    highlights: [
      "Decoupled architecture: Next.js client and Laravel API deployed independently.",
      "Form validation with Zod and server-state caching with TanStack Query.",
      "Accessible dialogs and primitives from Radix UI.",
    ],
    stack: [
      "Next.js 14",
      "TypeScript",
      "Tailwind CSS",
      "Radix UI",
      "TanStack Query",
      "Zod",
      "Laravel",
      "MySQL",
      "Vercel",
      "Railway",
    ],
    links: {
      live: "https://shop-management-nine.vercel.app",
      repo: "https://github.com/sirazul263/shop-management-frontend",
      extraRepos: [
        {
          label: "Laravel API",
          href: "https://github.com/sirazul263/shop-management-laravel-api",
        },
      ],
    },
    hue: 100,
  },
  {
    slug: "task-management",
    title: "Task Management",
    tagline: "Jira-style tracker with workspaces",
    year: "2024",
    role: "Full-stack",
    status: "live",
    featured: false,
    summary:
      "Create, assign and track tasks across workspaces and projects with statuses, priorities and team collaboration.",
    description: [
      "A project tracker modelled on Jira: workspaces contain projects, projects contain tasks, and tasks carry status, priority and assignees so teams can collaborate in one place.",
    ],
    highlights: [
      "Type-safe API layer built with Hono running inside Next.js route handlers.",
      "Appwrite for authentication, database and storage.",
      "TanStack Query and Zod for data fetching and validation.",
    ],
    stack: [
      "Next.js 14",
      "TypeScript",
      "Hono",
      "Appwrite",
      "TanStack Query",
      "Zod",
      "Radix UI",
      "Tailwind CSS",
    ],
    links: {
      live: "https://task-management-next15.vercel.app",
      repo: "https://github.com/sirazul263/task-management-next15",
    },
    hue: 230,
  },
  {
    slug: "social-media-app",
    title: "Social Media App",
    tagline: "Posts, media uploads & profiles",
    year: "2025",
    role: "Full-stack",
    status: "live",
    featured: false,
    summary:
      "A social platform with posts, media uploads and user profiles on Next.js 15.",
    description: [
      "A social feed application: users publish posts with media, browse profiles and interact with each other. Media goes through UploadThing, data through Prisma.",
    ],
    highlights: [
      "Media uploads handled by UploadThing.",
      "Prisma data model with Zod-validated inputs.",
      "TanStack Query for server-state caching.",
    ],
    stack: [
      "Next.js 15",
      "React 19",
      "TypeScript",
      "Prisma",
      "UploadThing",
      "TanStack Query",
      "Zod",
      "Radix UI",
      "Tailwind CSS",
    ],
    links: {
      live: "https://social-media-app-nu-ashy.vercel.app",
      repo: "https://github.com/sirazul263/social-media-app",
    },
    hue: 330,
  },
];

export type MiniProject = {
  title: string;
  summary: string;
  stack: string[];
  repo: string;
  live?: string;
};

export const experiments: MiniProject[] = [
  {
    title: "Job Board API",
    summary:
      "REST API with JWT auth and role-based access, Zod validation and Mongoose.",
    stack: ["Express 5", "MongoDB", "TypeScript", "Zod", "JWT"],
    repo: "https://github.com/sirazul263/Job-Board-Api",
  },
  {
    title: "E-commerce Node API",
    summary: "Typed e-commerce backend on Postgres with Prisma and JWT auth.",
    stack: ["Express", "Prisma", "PostgreSQL", "TypeScript", "Zod"],
    repo: "https://github.com/sirazul263/ecommerce-nodejs-api",
  },
  {
    title: "Chat App",
    summary: "Real-time chat with Pusher, NextAuth sessions and Prisma.",
    stack: ["Next.js 13", "Pusher", "NextAuth", "Prisma", "Zustand"],
    repo: "https://github.com/sirazul263/chat-app",
    live: "https://chat-app-psi-lyart.vercel.app",
  },
  {
    title: "AI Invoice Generator",
    summary: "Generate and manage invoices with AI assistance.",
    stack: ["Next.js 14", "TypeScript", "Tailwind CSS"],
    repo: "https://github.com/sirazul263/ai-invoice-generator",
  },
  {
    title: "Livewire E-commerce",
    summary: "Server-driven storefront built with Laravel Livewire.",
    stack: ["Laravel", "Livewire", "Blade", "MySQL"],
    repo: "https://github.com/sirazul263/livewire-ecommerce",
  },
  {
    title: "E-commerce Admin",
    summary: "Admin dashboard for catalogue and order management.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    repo: "https://github.com/sirazul263/ecommerce-admin",
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getAdjacentProjects(slug: string) {
  const i = projects.findIndex((p) => p.slug === slug);
  if (i === -1) return { prev: undefined, next: undefined };
  return {
    prev: projects[(i - 1 + projects.length) % projects.length],
    next: projects[(i + 1) % projects.length],
  };
}
