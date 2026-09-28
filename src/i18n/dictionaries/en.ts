export const en = {
  meta: {
    title: "Camilo Castro — Full-stack developer",
    description:
      "Full-stack developer from Bucaramanga, Colombia. I build software that reaches production: payroll and inventory systems, real-time apps and websites for real businesses.",
    ogTitle: "Camilo Castro",
    ogSubtitle: "Full-stack developer · Bucaramanga, Colombia",
    ogTagline: "Software that reaches production.",
  },
  a11y: {
    skip: "Skip to content",
    menu: "Menu",
    closeMenu: "Close menu",
    primaryNav: "Primary",
    home: "Camilo Castro — home",
    toDark: "Switch to dark theme",
    toLight: "Switch to light theme",
    language: "Language",
    newTab: "opens in a new tab",
    backToTop: "Back to top",
  },
  nav: {
    work: "Work",
    capabilities: "Capabilities",
    about: "About",
    contact: "Contact",
  },
  hero: {
    role: "Full-stack developer",
    place: "Bucaramanga, Colombia",
    line1: "Camilo",
    line2: "Castro",
    lede: "I build software that reaches production — from websites for local businesses to the payroll engine of a bread factory.",
    available: "Open to full-time roles and freelance work",
    ctaWork: "See the work",
    ctaContact: "Write to me",
    mottoLabel: "Motto: 戦え, tatakae — “fight”",
    prologue: "Prologue",
    scroll: "Scroll",
  },
  chapter: "Chapter",
  work: {
    title: "Selected work",
    lede: "Five projects, from a hotel's front door on the web to the systems that close a factory's month.",
    caseStudy: "Read the case study",
    visit: "Visit the site",
    source: "Source code",
    private: "Private client code",
    role: "Role",
    stack: "Stack",
    client: "Client",
    year: "Year",
    of: "of",
  },
  more: {
    label: "Chapter 01 — continued",
    title: "More work",
    lede: "A degree project, side projects and tools made for specific people.",
  },
  archive: {
    label: "Chapter 01 — appendix",
    title: "Also built",
    lede: "Smaller or earlier projects, listed for the record.",
    toggle: "See all",
    year: "Year",
    project: "Project",
    what: "What it is",
    tech: "Built with",
    link: "Link",
  },
  capabilities: {
    title: "What I do",
    lede: "Four kinds of problems I keep getting paid — or asked — to solve.",
    areas: [
      {
        title: "Business systems",
        tags: ["Colombian payroll & DIAN", "Role-based access", "Audit trails", "Excel & PDF output"],
      },
      {
        title: "Websites that sell",
        tags: ["Art direction", "Performance", "SEO", "WhatsApp-first flows"],
      },
      {
        title: "Real-time & distributed",
        tags: ["Socket.IO", "RabbitMQ", "Worker pools", "PostgreSQL replication"],
      },
      {
        title: "Automation & data",
        tags: ["pandas & openpyxl", "rembg & Pillow", "Serverless Python", "Scrapers"],
      },
    ],
    toolboxTitle: "Toolbox",
    toolbox: [
      { group: "Languages", items: ["TypeScript", "JavaScript", "Python", "SQL", "Java", "Dart"] },
      { group: "Front end", items: ["React", "Next.js", "Vite", "Tailwind CSS", "CSS Modules", "TanStack Query", "React Hook Form + Zod"] },
      { group: "Back end", items: ["Node.js", "Express", "FastAPI", "Hono", "Socket.IO", "Electron"] },
      { group: "Data", items: ["PostgreSQL", "SQLite / libSQL (Turso)", "MySQL", "SQL Server", "MongoDB", "Drizzle", "Prisma", "SQLAlchemy"] },
      { group: "Infrastructure", items: ["Docker", "Vercel", "Cloudflare Pages & R2", "GitHub Actions", "RabbitMQ", "Redis"] },
      { group: "Testing", items: ["pytest", "Vitest", "Playwright", "Jest", "Supertest"] },
    ],
  },
  about: {
    title: "About",
    pull: "The careful part is where trust gets built.",
    paragraphs: [
      "I'm a full-stack developer from Bucaramanga, Colombia, finishing Systems & Informatics Engineering at UPB (graduating late 2026). Most of what I build runs real businesses — and I work with the people who use it, from the first interview to the deploy.",
    ],
    motto: {
      word: "戦え",
      reading: "tatakae — “fight.”",
      note: "The one word on my GitHub profile. A reminder to keep going until it ships.",
    },
    facts: [
      { term: "Based in", detail: "Bucaramanga, Colombia · UTC−5" },
      { term: "Studying", detail: "Systems & Informatics Engineering, UPB — graduating late 2026" },
      { term: "Currently", detail: "Preparing the payroll system's parallel run and closing my degree project" },
    ],
  },
  contact: {
    title: "Let's build something that ships.",
    lede: "Full-time roles, freelance projects, or a system your business has outgrown — write to me.",
    copy: "Copy",
    copied: "Copied",
    copyLabel: "Copy email address",
    elsewhere: "Elsewhere",
  },
  footer: {
    continued: "To be continued",
    rights: "Camilo Castro",
    colophon: "Built with Next.js, set in Archivo and IBM Plex.",
    source: "View source",
  },
  caseStudy: {
    back: "All work",
    case: "Case",
    brief: "The brief",
    built: "What I built",
    engineering: "Under the hood",
    architecture: "Architecture",
    gallery: "Gallery",
    outcome: "Where it stands",
    next: "Next case",
  },
  notFound: {
    title: "This panel was left blank.",
    body: "The page you're looking for doesn't exist or has moved.",
    home: "Back to the start",
  },
} as const satisfies DictionaryShape;

/** Structural type both languages must satisfy (values are free text). */
export type DictionaryShape = {
  meta: Record<"title" | "description" | "ogTitle" | "ogSubtitle" | "ogTagline", string>;
  a11y: Record<"skip" | "menu" | "closeMenu" | "primaryNav" | "home" | "toDark" | "toLight" | "language" | "newTab" | "backToTop", string>;
  nav: Record<"work" | "capabilities" | "about" | "contact", string>;
  hero: {
    role: string; place: string; line1: string; line2: string; lede: string;
    available: string;
    ctaWork: string; ctaContact: string; mottoLabel: string; prologue: string; scroll: string;
  };
  chapter: string;
  work: Record<"title" | "lede" | "caseStudy" | "visit" | "source" | "private" | "role" | "stack" | "client" | "year" | "of", string>;
  more: Record<"label" | "title" | "lede", string>;
  archive: Record<"label" | "title" | "lede" | "toggle" | "year" | "project" | "what" | "tech" | "link", string>;
  capabilities: {
    title: string; lede: string;
    areas: readonly { title: string; tags: readonly string[] }[];
    toolboxTitle: string;
    toolbox: readonly { group: string; items: readonly string[] }[];
  };
  about: {
    title: string; pull: string; paragraphs: readonly string[];
    motto: { word: string; reading: string; note: string };
    facts: readonly { term: string; detail: string }[];
  };
  contact: Record<"title" | "lede" | "copy" | "copied" | "copyLabel" | "elsewhere", string>;
  footer: Record<"continued" | "rights" | "colophon" | "source", string>;
  caseStudy: Record<"back" | "case" | "brief" | "built" | "engineering" | "architecture" | "gallery" | "outcome" | "next", string>;
  notFound: Record<"title" | "body" | "home", string>;
};
