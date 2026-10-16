// Projects shown on /project.
// `screen` picks the CSS mockup drawn inside the browser frame
// (landing | app | api | corporate | fintech | video | site).
// To use a real screenshot instead, add `image: require("../Assets/...")`.

import imageBioluniel from "../Assets/Bioluniel-Logo.png";
import imageAmazon from "../Assets/Portfolio/amazonclone.png";
import imageBeFit from "../Assets/Portfolio/BeFit.jpg";
import imageBurma from "../Assets/Portfolio/BurmaBikinis.jpg";
import imageBunker from "../Assets/Portfolio/BunkerGrafico.jpg";
import imageSitus from "../Assets/Portfolio/Situs.jpg";
import imageColiseo from "../Assets/Portfolio/ColiseoVerbal-Logo.jpg";
import imageAikido from "../Assets/Portfolio/Aikido-Logo.jpg";
import imagePhNegativo from "../Assets/Portfolio/PhNegativo-Logo.jpg";

export const categories = [
  { id: "all", label: "All" },
  { id: "saas", label: "SaaS & AI" },
  { id: "fintech", label: "Fintech & Banking" },
  { id: "web", label: "Web & Brands" },
];

// The BotPass ecosystem: one product, three surfaces.
export const spotlight = {
  name: "BotPass",
  tagline: "An entire SaaS product, from cloud infrastructure to plugin.",
  client: "Performance Media · Barcelona (remote)",
  year: "2026",
  description:
    "Sole developer of the BotPass platform. I architected and deployed the full cloud infrastructure, then built the landing site, the web application, the REST API and a PHP WordPress plugin that connects WordPress sites to the platform, using an AI-first workflow with AI as the primary development tool from day one.",
  highlights: [
    "Full cloud infrastructure designed and deployed",
    "Web app + REST API built end to end",
    "WordPress plugin (PHP) connecting sites to the platform",
    "AI-first workflow with Claude Code from day one",
  ],
  stack: ["AI-first", "Claude Code", "REST API", "Cloud infrastructure", "WordPress", "PHP"],
  surfaces: [
    {
      id: "landing",
      label: "Landing",
      url: "https://botpass.io",
      domain: "botpass.io",
      screen: "landing",
      description: "Public marketing site presenting the product.",
    },
    {
      id: "app",
      label: "Web App",
      url: "https://botpass.io/app",
      domain: "botpass.io/app",
      screen: "app",
      description: "The customer-facing application and dashboard.",
    },
    {
      id: "api",
      label: "REST API",
      url: "https://api.botpass.io",
      domain: "api.botpass.io",
      screen: "api",
      description: "The API powering the web app and the WordPress plugin.",
    },
  ],
};

export const projects = [
  {
    id: "botpass-landing",
    title: "BotPass.io",
    kind: "Landing site",
    category: "saas",
    year: "2026",
    client: "Performance Media",
    url: "https://botpass.io",
    domain: "botpass.io",
    screen: "landing",
    hue: 280,
    live: true,
    description:
      "Marketing landing for the BotPass SaaS, hosted on the cloud infrastructure I designed and deployed for the whole platform.",
    stack: ["AI-first", "Cloud", "Responsive UI"],
  },
  {
    id: "botpass-app",
    title: "BotPass Web App",
    kind: "SaaS application",
    category: "saas",
    year: "2026",
    client: "Performance Media",
    url: "https://botpass.io/app",
    domain: "botpass.io/app",
    screen: "app",
    hue: 265,
    live: true,
    description:
      "The full BotPass web application, developed end to end with AI as the primary development tool from day one.",
    stack: ["Web app", "AI-first", "Claude Code"],
  },
  {
    id: "botpass-api",
    title: "api.botpass.io",
    kind: "REST API",
    category: "saas",
    year: "2026",
    client: "Performance Media",
    url: "https://api.botpass.io",
    domain: "api.botpass.io",
    screen: "api",
    hue: 300,
    live: true,
    description:
      "REST API behind the BotPass platform, consumed by the web app and by the BotPass WordPress plugin (PHP).",
    stack: ["REST API", "WordPress plugin", "PHP"],
  },
  {
    id: "performance-media",
    title: "PerformanceMedia.io",
    kind: "Corporate website",
    category: "web",
    year: "2026",
    client: "Performance Media",
    url: "https://performancemedia.io",
    domain: "performancemedia.io",
    screen: "corporate",
    hue: 320,
    live: true,
    description:
      "Corporate website for Performance Media, the Barcelona company behind BotPass.",
    stack: ["Web", "Responsive UI"],
  },
  {
    id: "comex-galicia",
    title: "COMEX Galicia",
    kind: "Foreign trade platform",
    category: "fintech",
    year: "2021 – 2023",
    client: "Bank of Galicia",
    url: "https://comex.galicia.ar",
    domain: "comex.galicia.ar",
    screen: "fintech",
    hue: 255,
    live: true,
    description:
      "COMEX Foreign Trade web app in React.js integrated with RESTful Java and .NET microservices, with data flows optimized for high-traffic financial transactions.",
    stack: ["React", "Java", ".NET", "Microservices", "Azure MSAL"],
  },
  {
    id: "videocotizacion",
    title: "VideoCotizacion.com",
    kind: "Web platform",
    category: "web",
    year: "",
    url: "https://videocotizacion.com",
    domain: "videocotizacion.com",
    screen: "video",
    hue: 290,
    live: true,
    description:
      "Web platform designed and developed end to end, from interface to deployment.",
    stack: ["Full stack", "Responsive UI"],
  },
  {
    id: "solquerandi",
    title: "SolQuerandi.com",
    kind: "Website",
    category: "web",
    year: "",
    url: "https://solquerandi.com",
    domain: "solquerandi.com",
    screen: "site",
    hue: 310,
    live: true,
    description:
      "Website designed and developed end to end, from interface to deployment.",
    stack: ["Web", "Responsive UI"],
  },
  {
    id: "comafi",
    title: "Accounting & Reconciliation Cloud",
    kind: "Internal banking system",
    category: "fintech",
    year: "2024 – 2026",
    client: "Bank COMAFI",
    screen: "fintech",
    hue: 270,
    private: true,
    description:
      "Led the migration of desktop accounting and reconciliation systems to AWS: Java microservices, TypeScript serverless APIs on PostgreSQL, Azure AD / OAuth2 / JWT security and GitLab CI pipelines on ECS.",
    stack: ["AWS", "Java", "Lambda", "Prisma", "PostgreSQL", "CloudFormation"],
  },
  {
    id: "galicia-guarantees",
    title: "Guarantees System & MT Trays",
    kind: "Internal banking system",
    category: "fintech",
    year: "2021 – 2023",
    client: "Bank of Galicia",
    screen: "app",
    hue: 250,
    private: true,
    description:
      "Full guarantees system with a NestJS BFF and .NET Core 6 backend, MT103/MT199 message trays and role-based CRUDs for analysts and approvers, plus an in-house Next.js platform with OpenTelemetry tracing.",
    stack: ["NestJS", ".NET Core 6", "Next.js", "OpenTelemetry", "OpenShift"],
  },
  {
    id: "tutodia",
    title: "University Course Migration",
    kind: "EdTech",
    category: "web",
    year: "2021 – 2023",
    client: "Tutodia · Brisbane, Australia",
    screen: "site",
    hue: 275,
    private: true,
    description:
      "Migrated Blackboard courses to AWS storage and built a React front end with EC2-based login for a university in Brisbane.",
    stack: ["React", "AWS S3", "EC2"],
  },
  {
    id: "bioluniel",
    title: "BioLuniel",
    kind: "Freelance · E-commerce app",
    category: "web",
    year: "",
    image: imageBioluniel,
    logo: true,
    hue: 285,
    description:
      "Alternative-medicine products app built with React.js and Node.js on a Symfony 5.1 (PHP) backend.",
    stack: ["React", "Node.js", "Symfony"],
  },
];

export const designWorks = [
  { image: imageAmazon, title: "Amazon Clone", kind: "React app" },
  { image: imageBurma, title: "BurmaBikinis", kind: "E-commerce" },
  { image: imageBunker, title: "Bunker Gráfico", kind: "Web & brand identity" },
  { image: imageSitus, title: "Situs", kind: "HTML5 · Bootstrap" },
  { image: imageBeFit, title: "BeFit", kind: "HTML5 website" },
  { image: imageColiseo, title: "Coliseo Verbal", kind: "Isologo · Illustrator" },
  { image: imageAikido, title: "Aikido", kind: "Isologo design" },
  { image: imagePhNegativo, title: "Ph Negativo", kind: "Isologo + typologo" },
];

export const stats = [
  { value: 12, suffix: "+", label: "Years shipping software" },
  { value: 7, suffix: "", label: "Live products in this page" },
  { value: 2, suffix: "", label: "Banks served" },
  { value: 100, suffix: "%", label: "On-time freelance delivery" },
];
