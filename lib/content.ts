/**
 * All site copy lives here. Copy is taken from the live site; only obvious
 * typos/awkward phrasing were touched (marked `// edit:`).
 *
 * Anything marked TODO is a placeholder for Dhiren to fill in.
 */

// TODO: put your real address here. (The live page hides it behind Cloudflare
// email obfuscation, so it can't be read from the rendered HTML.)
export const EMAIL = "REPLACE-ME@example.com";

export const LINKS = {
  github: "https://github.com/brah4729",
  codeforces: "https://codeforces.com/profile/helloxdlolidc",
  linkedin: "https://www.linkedin.com/in/dhiren-gilson-7aa644412/",
} as const;

export const NAV = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "certificates", label: "Certificates" },
  { id: "contact", label: "Contact" },
] as const;

export const HERO = {
  prompt: ">_ hello, world",
  title: "I'm DhirenGilson",
  // edit: original was "...Currently still learning and want to explore more"
  lead: "Building things, focused on performance — kernels, models, and web apps. Still learning, and keen to explore more.",
};

export const ABOUT = [
  "I'm a Software Engineering student (RPL) at SMK Plus Pelita Nusantara, currently doing freelancing. I build across the full spectrum — from web apps to machine learning pipelines to bare-metal kernels.",
  "I'm the ML Engineer and Project Manager on a team competing in the AI Open Innovation Challenge 2026, building a PPE compliance monitoring system using computer vision.",
  "When I'm not writing Python or Go, I'm probably hacking on MonoOS (Dori) — a 32-bit i686 monolithic kernel I build from scratch in C and NASM. Yes, it has a desktop environment.",
];

export const STATUS = [
  { k: "status", v: "Freelancer" },
  { k: "competing", v: "AI Open Innovation Challenge 2026" },
  { k: "building", v: "MonoOS (Dori) — 32-bit custom kernel" },
  { k: "practicing", v: "Codeforces (helloxdlolidc)" },
  { k: "configuring", v: "NixOS + Hyprland (Tokyo Night → Ember)" },
];

/* ----------------------------------------------------------------- skills */

export type Skill = { name: string; /** project stack tags this skill maps to */ tags?: string[] };
export type SkillGroup = { title: string; skills: Skill[] };

export const SKILLS: SkillGroup[] = [
  {
    title: "AI / ML",
    skills: [
      { name: "Python", tags: ["Python"] },
      { name: "TensorFlow" },
      { name: "PyTorch" },
      { name: "scikit-learn" },
      { name: "AI Studio" },
    ],
  },
  {
    title: "Fullstack",
    skills: [
      { name: "Next.js", tags: ["Next.js"] },
      { name: "React" },
      { name: "TypeScript", tags: ["TypeScript"] },
      { name: "Express.js", tags: ["Express"] },
      { name: "Laravel", tags: ["Laravel"] },
      { name: "Prisma", tags: ["Prisma"] },
      { name: "PostgreSQL", tags: ["PostgreSQL"] },
      { name: "SQLite", tags: ["SQLite"] },
      { name: "JWT" },
      { name: "MySQL", tags: ["MySQL"] },
    ],
  },
  {
    title: "Systems / Low Level",
    skills: [
      { name: "C", tags: ["C"] },
      { name: "NASM", tags: ["NASM"] },
      { name: "x86 Assembly", tags: ["x86"] },
      { name: "Kernel" },
      { name: "NixOS" },
      { name: "Linux" },
    ],
  },
  {
    title: "Tools & Other",
    skills: [
      { name: "Git" },
      { name: "GitHub" },
      { name: "Docker" },
      { name: "QEMU" },
      { name: "VirtualBox", tags: ["VirtualBox"] },
      { name: "Nix" },
      { name: "Claude Code" },
    ],
  },
];

/* --------------------------------------------------------------- projects */

export type Category = "ai-ml" | "fullstack" | "systems";
export type Status = "In Progress" | "Competition" | "Submitted" | "Complete";

export const CATEGORY_LABEL: Record<Category, string> = {
  "ai-ml": "AI / ML",
  fullstack: "Fullstack",
  systems: "Systems",
};

export type Project = {
  id: string;
  title: string;
  category: Category;
  status: Status;
  description: string;
  stack: string[];
  /** grid width on desktop, out of 12 */
  span: 5 | 7 | 12;
  featured?: boolean;
  // TODO per project: fill in what exists. Empty fields render nothing in
  // production and a dashed "add me" marker in `next dev`.
  repo?: string;
  demo?: string;
  /** path under /public, e.g. "/projects/monoos.png" */
  screenshot?: string;
};

export const PROJECTS: Project[] = [
  {
    id: "monoos",
    title: "MonoOS (Dori)",
    category: "systems",
    status: "In Progress",
    span: 12,
    featured: true,
    description:
      "A 32-bit i686 monolithic kernel built from scratch in C and NASM, with a custom desktop environment (Oki DE), interactive terminal, PS/2 mouse & keyboard, and a waybar-style taskbar.",
    stack: ["C", "NASM", "x86", "VirtualBox"],
  },
  {
    id: "ppe",
    title: "PPE Compliance Monitor",
    category: "ai-ml",
    status: "Competition",
    span: 7,
    description:
      "AI-powered PPE detection system for AI Open Innovation Challenge 2026. YOLOv8 for real-time detection, Go/Fiber backend, FastAPI ML microservice, SQLite + JWT auth.",
    stack: ["YOLOv8", "Python", "Go", "Fiber", "FastAPI", "SQLite"],
  },
  {
    id: "dapur",
    title: "Dapur Pintar",
    category: "fullstack",
    status: "Submitted",
    span: 5,
    description:
      "Smart kitchen assistant using Gemini Vision + Next.js. Identifies ingredients from photos and suggests recipes. Built for the #JuaraVibeCoding Google competition.",
    stack: ["Next.js", "Gemini Vision", "TypeScript"],
  },
  {
    id: "biscuit",
    title: "Biscuit Quality Classifier",
    category: "ai-ml",
    status: "Complete",
    span: 5,
    description:
      "MobileNetV2 transfer learning model achieving 88% validation accuracy. Extended with NLP component (DistilBERT + FLAN-T5) for lab parameter analysis. Flask + frontend.",
    stack: ["MobileNetV2", "DistilBERT", "FLAN-T5", "Flask", "Python"],
  },
  {
    id: "toko",
    title: "Toko Keren (E-commerce)",
    category: "fullstack",
    status: "Complete",
    span: 7,
    description:
      "Full e-commerce platform in Laravel with RBAC, admin routes, Eloquent relationships, Blade layouts, and authentication. Includes security audit findings.",
    stack: ["Laravel", "PHP", "MySQL", "Blade"],
  },
  {
    id: "monorepo",
    title: "Fullstack TS Monorepo",
    category: "fullstack",
    status: "Complete",
    span: 12,
    description:
      "Next.js + Express + Prisma 7 + Neon PostgreSQL monorepo with REST APIs, JWT auth via httpOnly cookies, and full CRUD with type safety end-to-end.",
    stack: ["Next.js", "Express", "Prisma", "PostgreSQL", "TypeScript"],
  },
];

/** Boot lines for the MonoOS card. Every entry is a feature already named in the copy above/below. */
export const BOOT = ["heap", "vmm", "ps/2 keyboard", "ps/2 mouse", "oki de", "taskbar", "terminal"];

/* ------------------------------------------------------------- experience */

export type Experience = {
  role: string;
  period: string;
  org: string;
  tag: string;
  body: string;
  projectId?: string;
};

export const EXPERIENCE: Experience[] = [
  {
    role: "ML Engineer & Project Manager",
    period: "2025 – Present",
    org: "AI Open Innovation Challenge 2026",
    tag: "Competition — TUV Nord / President University",
    body: "Leading the ML and engineering effort for Case 2: PPE Compliance Monitoring via computer vision. Managing team of developers as a Project Manager.",
    projectId: "ppe",
  },
  {
    role: "Fullstack Developer",
    period: "2025",
    org: "#JuaraVibeCoding",
    tag: "Competition — Google",
    body: "Built and submitted Dapur Pintar (Smart Kitchen), an AI-powered cooking assistant using Gemini Vision and Next.js that identifies ingredients from photos and suggests recipes.",
    projectId: "dapur",
  },
  {
    role: "Kernel Developer",
    period: "2024 – Present",
    org: "MonoOS (Dori) — Personal Project",
    tag: "Open Source",
    body: "Designing and implementing a 32-bit i686 monolithic kernel from scratch in C and NASM. Implemented memory management (heap/VMM), PS/2 drivers, custom desktop environment (Oki DE), and interactive terminal.",
    projectId: "monoos",
  },
  {
    role: "Competitive Programmer",
    period: "2025 – Present",
    org: "Codeforces (helloxdlolidc)",
    tag: "CITE UP 2026",
    // edit: fixed the stray " .Participating" punctuation
    body: "Practicing algorithmic problem solving in Python, starting from Codeforces. Participating in CITE UP 2026 competition.",
  },
];

/* ----------------------------------------------------------- certificates */

export type Certificate = {
  src: string;
  // TODO: fill these in, one per certificate.
  title?: string;
  issuer?: string;
  year?: string;
};

export const CERTIFICATES: Certificate[] = Array.from({ length: 11 }, (_, i) => ({
  src: `/certificates/cert${i + 1}.png`,
}));
