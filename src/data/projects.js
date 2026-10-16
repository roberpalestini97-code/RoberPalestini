// Projects shown on /project and /project/:id.
// `screen` picks the CSS mockup drawn inside the browser frame
// (landing | app | api | corporate | fintech | video | site); `image`
// replaces it with a real screenshot, `poster` fills the video mockup.
// Every `id` must also be listed in Server/data/likeable.json.

import { useLang } from "../context/LanguageContext";
import imageBioluniel from "../Assets/Bioluniel-Logo.png";
import imageSolQuerandi from "../Assets/Projects/solquerandi.jpg";
import imageVideoCotizacion from "../Assets/Projects/videocotizacion.jpg";
import imageAmazon from "../Assets/Portfolio/amazonclone.png";
import imageBeFit from "../Assets/Portfolio/BeFit.jpg";
import imageBurma from "../Assets/Portfolio/BurmaBikinis.jpg";
import imageBunker from "../Assets/Portfolio/BunkerGrafico.jpg";
import imageSitus from "../Assets/Portfolio/Situs.jpg";
import imageColiseo from "../Assets/Portfolio/ColiseoVerbal-Logo.jpg";
import imageAikido from "../Assets/Portfolio/Aikido-Logo.jpg";
import imagePhNegativo from "../Assets/Portfolio/PhNegativo-Logo.jpg";

export const categories = ["all", "saas", "fintech", "web"];

const botpassEn = {
  role: "Sole developer: cloud architecture, back end, front end and WordPress integration.",
  highlights: [
    "Architected and deployed the full cloud infrastructure hosting the web app, API and supporting services.",
    "Built the whole product with an AI-first workflow, using AI as the primary development tool from day one.",
    "Shipped a PHP WordPress plugin that connects WordPress sites to the platform through the API.",
  ],
};

const botpassEs = {
  role: "Único desarrollador: arquitectura cloud, back end, front end e integración con WordPress.",
  highlights: [
    "Diseñé y desplegué toda la infraestructura cloud que aloja la web app, la API y los servicios de soporte.",
    "Construí todo el producto con un flujo AI-first, usando la IA como herramienta principal desde el primer día.",
    "Publiqué un plugin de WordPress en PHP que conecta sitios WordPress con la plataforma a través de la API.",
  ],
};

const rawProjects = [
  {
    id: "botpass-landing",
    title: "BotPass.io",
    category: "saas",
    year: "2026",
    client: "Performance Media",
    url: "https://botpass.io",
    domain: "botpass.io",
    screen: "landing",
    hue: 280,
    live: true,
    stack: ["AI-first", "Cloud", "Responsive UI"],
    en: {
      kind: "Landing site",
      description:
        "Marketing landing for the BotPass SaaS, hosted on the cloud infrastructure I designed and deployed for the whole platform.",
      overview:
        "The public face of BotPass: the landing that presents the product and leads visitors into the web app. It runs on the same cloud infrastructure I designed for the whole platform.",
      ...botpassEn,
    },
    es: {
      kind: "Landing",
      description:
        "Landing comercial del SaaS BotPass, alojada en la infraestructura cloud que diseñé y desplegué para toda la plataforma.",
      overview:
        "La cara pública de BotPass: la landing que presenta el producto y lleva a los visitantes a la web app. Corre sobre la misma infraestructura cloud que diseñé para toda la plataforma.",
      ...botpassEs,
    },
  },
  {
    id: "botpass-app",
    title: "BotPass Web App",
    category: "saas",
    year: "2026",
    client: "Performance Media",
    url: "https://botpass.io/app",
    domain: "botpass.io/app",
    screen: "app",
    hue: 265,
    live: true,
    stack: ["Web app", "AI-first", "Claude Code"],
    en: {
      kind: "SaaS application",
      description:
        "The full BotPass web application, developed end to end with AI as the primary development tool from day one.",
      overview:
        "The customer-facing application of BotPass, built end to end on top of the BotPass REST API with an AI-first workflow.",
      ...botpassEn,
    },
    es: {
      kind: "Aplicación SaaS",
      description:
        "La web app completa de BotPass, desarrollada de punta a punta con la IA como herramienta principal desde el primer día.",
      overview:
        "La aplicación para clientes de BotPass, construida de punta a punta sobre la API REST de BotPass con un flujo AI-first.",
      ...botpassEs,
    },
  },
  {
    id: "botpass-api",
    title: "api.botpass.io",
    category: "saas",
    year: "2026",
    client: "Performance Media",
    url: "https://api.botpass.io",
    domain: "api.botpass.io",
    screen: "api",
    hue: 300,
    live: true,
    stack: ["REST API", "WordPress plugin", "PHP"],
    en: {
      kind: "REST API",
      description:
        "REST API behind the BotPass platform, consumed by the web app and by the BotPass WordPress plugin (PHP).",
      overview:
        "The REST API that powers BotPass. It serves the web app and the WordPress plugin, so any WordPress site can connect to the platform.",
      ...botpassEn,
    },
    es: {
      kind: "API REST",
      description:
        "La API REST detrás de la plataforma BotPass, que consumen la web app y el plugin de WordPress (PHP).",
      overview:
        "La API REST que mueve a BotPass. Atiende a la web app y al plugin de WordPress, para que cualquier sitio WordPress pueda conectarse a la plataforma.",
      ...botpassEs,
    },
  },
  {
    id: "videocotizacion",
    title: "VideoCotización",
    category: "saas",
    year: "2026",
    client: "Own product",
    clientEs: "Producto propio",
    url: "https://videocotizacion.com",
    domain: "videocotizacion.com",
    screen: "video",
    poster: imageVideoCotizacion,
    hue: 290,
    live: true,
    stack: ["Go", "PostgreSQL 16", "OpenAPI 3.1", "WebSockets", "React", "Three.js", "LLM", "Docker", "Caddy"],
    en: {
      kind: "AI video-call quoting platform",
      description:
        "Live labor quotes over a video call: the client talks to a 3D avatar while an LLM extracts the job details from the conversation and camera, and Go computes the price.",
      overview:
        "A service that quotes labor jobs (painting, gardening, repairs) during a video call. The client opens the professional's link, talks to a 3D avatar that runs in the browser, and a live whiteboard fills in the job details. The LLM only extracts data with a strict JSON Schema; the price is calculated in Go from tariff tables and shown at the end, with a WhatsApp handoff to the professional. The back end is designed to be sold as a multi-tenant API.",
      role: "Product owner and architect: product definition, API contract, Go back end, security and the agent-driven development workflow.",
      highlights: [
        "Multi-tenant Go back end with PostgreSQL 16 row-level security (FORCE RLS, per-transaction tenant).",
        "Contract-first: OpenAPI 3.1 + JSON Schema 2020-12, validated with ajv, Redocly and Spectral.",
        "LLM extracts structured data only (no amounts); prices computed in Go in integer cents.",
        "3D avatar with visemes in the browser, camera frames sampled and never stored.",
        "Advisor panel with secure cookies, CSRF protection, TOTP and anti-abuse quotas.",
      ],
    },
    es: {
      kind: "Plataforma de cotización por videollamada con IA",
      description:
        "Presupuestos de mano de obra en vivo por videollamada: el cliente habla con un avatar 3D mientras un LLM extrae los datos del trabajo y Go calcula el precio.",
      overview:
        "Un servicio que cotiza trabajos de mano de obra (pintura, jardinería, reparaciones) durante una videollamada. El cliente entra por el link del profesional, habla con un avatar 3D que corre en el navegador y un pizarrón en vivo va anotando los datos del trabajo. El LLM solo extrae datos con un JSON Schema estricto; el precio lo calcula Go con tablas de tarifas y se muestra al final, con derivación por WhatsApp al profesional. El back end está pensado para venderse como API multi-tenant.",
      role: "Dueño del producto y arquitecto: definición del producto, contrato de la API, back end en Go, seguridad y el flujo de desarrollo con agentes.",
      highlights: [
        "Back end en Go multi-tenant con seguridad a nivel de fila en PostgreSQL 16 (FORCE RLS, tenant por transacción).",
        "Contrato primero: OpenAPI 3.1 + JSON Schema 2020-12, validados con ajv, Redocly y Spectral.",
        "El LLM solo extrae datos estructurados (sin montos); los precios se calculan en Go en centavos enteros.",
        "Avatar 3D con visemas en el navegador; los fotogramas de la cámara se analizan y nunca se guardan.",
        "Panel del asesor con cookies seguras, protección CSRF, TOTP y cuotas anti-abuso.",
      ],
    },
  },
  {
    id: "performance-media",
    title: "PerformanceMedia.io",
    category: "web",
    year: "2026",
    client: "Performance Media",
    url: "https://performancemedia.io",
    domain: "performancemedia.io",
    screen: "corporate",
    hue: 320,
    live: true,
    stack: ["Web", "Responsive UI"],
    en: {
      kind: "Corporate website",
      description: "Corporate website for Performance Media, the Barcelona company behind BotPass.",
      overview: "The corporate website of Performance Media, the Barcelona-based company behind BotPass.",
    },
    es: {
      kind: "Sitio corporativo",
      description: "Sitio corporativo de Performance Media, la empresa de Barcelona detrás de BotPass.",
      overview: "El sitio corporativo de Performance Media, la empresa de Barcelona detrás de BotPass.",
    },
  },
  {
    id: "solquerandi",
    title: "Sol Querandí",
    category: "web",
    year: "2026",
    client: "Sol Querandí · Mar de Cobo",
    url: "https://solquerandi.com",
    domain: "solquerandi.com",
    image: imageSolQuerandi,
    hue: 20,
    live: true,
    stack: ["HTML5", "CSS3", "JavaScript", "Schema.org", "llms.txt", "GitHub Actions", "GitHub Pages"],
    en: {
      kind: "Immersive landing · SEO & GEO",
      description:
        "Immersive landing for three beachfront cabins in Mar de Cobo, built for search engines and AI assistants: structured data, FAQ and an llms.txt file.",
      overview:
        "A fast, immersive landing for Sol Querandí, three holiday cabins 100 m from the beach in Parque Lago, Mar de Cobo. Built as a lightweight static site with scroll-driven motion, optimized both for classic SEO and for GEO (being cited by AI assistants), and published automatically to GitHub Pages.",
      role: "Design, development, SEO/GEO strategy and deployment.",
      highlights: [
        "Rich structured data: LodgingBusiness, FAQPage, ratings and amenities in JSON-LD.",
        "llms.txt with the key facts so AI assistants can answer about the cabins accurately.",
        "Static HTML/CSS/JS with custom scroll animations: no framework, fast on mobile.",
        "Automatic publishing to GitHub Pages with a GitHub Actions workflow.",
        "Rebuilt from a previous React version into a lighter, faster site.",
      ],
    },
    es: {
      kind: "Landing inmersiva · SEO y GEO",
      description:
        "Landing inmersiva para tres cabañas frente al mar en Mar de Cobo, pensada para buscadores y asistentes de IA: datos estructurados, preguntas frecuentes y archivo llms.txt.",
      overview:
        "Una landing rápida e inmersiva para Sol Querandí, tres cabañas de alquiler temporario a 100 m de la playa en Parque Lago, Mar de Cobo. Hecha como sitio estático liviano con animaciones al hacer scroll, optimizada para SEO clásico y para GEO (que los asistentes de IA la citen), y publicada automáticamente en GitHub Pages.",
      role: "Diseño, desarrollo, estrategia SEO/GEO y despliegue.",
      highlights: [
        "Datos estructurados completos: LodgingBusiness, FAQPage, valoraciones y servicios en JSON-LD.",
        "Archivo llms.txt con los datos clave para que los asistentes de IA respondan bien sobre las cabañas.",
        "HTML/CSS/JS estático con animaciones de scroll propias: sin frameworks, rápido en el celular.",
        "Publicación automática en GitHub Pages con un workflow de GitHub Actions.",
        "Reconstruida a partir de una versión anterior en React, ahora más liviana y rápida.",
      ],
    },
  },
  {
    id: "comex-galicia",
    title: "COMEX Galicia",
    category: "fintech",
    year: "2021 – 2023",
    client: "Bank of Galicia",
    clientEs: "Banco Galicia",
    url: "https://comex.galicia.ar",
    domain: "comex.galicia.ar",
    screen: "fintech",
    hue: 255,
    live: true,
    stack: ["React", "Java", ".NET", "Microservices", "Azure MSAL"],
    en: {
      kind: "Foreign trade platform",
      description:
        "COMEX Foreign Trade web app in React.js integrated with RESTful Java and .NET microservices, with data flows optimized for high-traffic financial transactions.",
      overview:
        "The foreign trade (COMEX) web application of Bank of Galicia, used for high-traffic financial transactions.",
      role: "Full Stack Developer on the front end and its integration with the bank's microservices.",
      highlights: [
        "React.js front end integrated with RESTful Java and .NET microservices.",
        "Optimized data flows for high-traffic financial transactions.",
        "MT103/MT199 message trays and role-based CRUDs for analysts and approvers (Azure MSAL).",
      ],
    },
    es: {
      kind: "Plataforma de comercio exterior",
      description:
        "Web app de Comercio Exterior en React.js integrada con microservicios REST en Java y .NET, con flujos de datos optimizados para transacciones de alto tráfico.",
      overview:
        "La aplicación web de comercio exterior (COMEX) del Banco Galicia, usada para transacciones financieras de alto tráfico.",
      role: "Full Stack Developer en el front end y su integración con los microservicios del banco.",
      highlights: [
        "Front end en React.js integrado con microservicios REST en Java y .NET.",
        "Flujos de datos optimizados para transacciones financieras de alto tráfico.",
        "Bandejas de mensajes MT103/MT199 y CRUDs por rol para analistas y aprobadores (Azure MSAL).",
      ],
    },
  },
  {
    id: "comafi",
    title: "Accounting & Reconciliation Cloud",
    titleEs: "Contabilidad y Conciliación en la Nube",
    category: "fintech",
    year: "2024 – 2026",
    client: "Bank COMAFI",
    clientEs: "Banco COMAFI",
    screen: "fintech",
    hue: 270,
    private: true,
    stack: ["AWS", "Java", "Lambda", "Prisma", "PostgreSQL", "CloudFormation"],
    en: {
      kind: "Internal banking system",
      description:
        "Led the migration of desktop accounting and reconciliation systems to AWS: Java microservices, TypeScript serverless APIs on PostgreSQL, Azure AD / OAuth2 / JWT security and GitLab CI pipelines on ECS.",
      overview:
        "Migration of the bank's accounting and reconciliation systems from desktop software to cloud applications on AWS.",
      role: "Full Stack & Multi-Cloud Developer, leading the migration.",
      highlights: [
        "Java microservices on AWS replacing desktop software.",
        "REST APIs and serverless functions in TypeScript (Node.js, Lambda, Prisma) on PostgreSQL (RDS).",
        "Security with Azure AD, OAuth2 and JWT bearer tokens.",
        "CI/CD with GitLab CI, Docker and ECS, provisioned with CloudFormation and IAM.",
        "Scheduled data operations with S3, Control-M and Lambda triggers.",
      ],
    },
    es: {
      kind: "Sistema bancario interno",
      description:
        "Lideré la migración de los sistemas de contabilidad y conciliación a AWS: microservicios Java, APIs serverless en TypeScript sobre PostgreSQL, seguridad con Azure AD / OAuth2 / JWT y pipelines de GitLab CI en ECS.",
      overview:
        "Migración de los sistemas de contabilidad y conciliación del banco, de software de escritorio a aplicaciones cloud en AWS.",
      role: "Full Stack y Multi-Cloud Developer, liderando la migración.",
      highlights: [
        "Microservicios Java en AWS que reemplazan software de escritorio.",
        "APIs REST y funciones serverless en TypeScript (Node.js, Lambda, Prisma) sobre PostgreSQL (RDS).",
        "Seguridad con Azure AD, OAuth2 y tokens JWT bearer.",
        "CI/CD con GitLab CI, Docker y ECS, aprovisionado con CloudFormation e IAM.",
        "Operaciones de datos programadas con S3, Control-M y triggers de Lambda.",
      ],
    },
  },
  {
    id: "galicia-guarantees",
    title: "Guarantees System & MT Trays",
    titleEs: "Sistema de Garantías y Bandejas MT",
    category: "fintech",
    year: "2021 – 2023",
    client: "Bank of Galicia",
    clientEs: "Banco Galicia",
    screen: "app",
    hue: 250,
    private: true,
    stack: ["NestJS", ".NET Core 6", "Next.js", "OpenTelemetry", "OpenShift"],
    en: {
      kind: "Internal banking system",
      description:
        "Full guarantees system with a NestJS BFF and .NET Core 6 backend, MT103/MT199 message trays and role-based CRUDs, plus an in-house Next.js platform with OpenTelemetry tracing.",
      overview:
        "Internal systems for Bank of Galicia: a complete guarantees system and an in-house platform that retired licenses of other products.",
      role: "Full Stack Developer: design and development across BFF, back end and front end.",
      highlights: [
        "Guarantees system with a NestJS BFF, .NET Core 6 back end and Azure authentication.",
        "In-house Next.js platform that retired licenses of other systems, with OpenTelemetry tracing.",
        "Spring Boot endpoints with Swagger and JWT/OAuth2; Jenkins and OpenShift pipelines.",
      ],
    },
    es: {
      kind: "Sistema bancario interno",
      description:
        "Sistema completo de garantías con BFF en NestJS y backend en .NET Core 6, bandejas de mensajes MT103/MT199 y CRUDs por rol, más una plataforma interna en Next.js con trazas de OpenTelemetry.",
      overview:
        "Sistemas internos del Banco Galicia: un sistema completo de garantías y una plataforma propia que reemplazó licencias de otros productos.",
      role: "Full Stack Developer: diseño y desarrollo en BFF, back end y front end.",
      highlights: [
        "Sistema de garantías con BFF en NestJS, back end en .NET Core 6 y autenticación de Azure.",
        "Plataforma interna en Next.js que reemplazó licencias de otros sistemas, con trazas de OpenTelemetry.",
        "Endpoints en Spring Boot con Swagger y JWT/OAuth2; pipelines en Jenkins y OpenShift.",
      ],
    },
  },
  {
    id: "tutodia",
    title: "University Course Migration",
    titleEs: "Migración de Cursos Universitarios",
    category: "web",
    year: "2021 – 2023",
    client: "Tutodia · Brisbane, Australia",
    screen: "site",
    hue: 275,
    private: true,
    stack: ["React", "AWS S3", "EC2"],
    en: {
      kind: "EdTech",
      description:
        "Migrated Blackboard courses to AWS storage and built a React front end with EC2-based login for a university in Brisbane.",
      overview: "Course migration for a university in Brisbane, Australia, moving Blackboard content to AWS.",
      role: "Full Stack Developer.",
      highlights: [
        "Blackboard courses migrated to AWS storage.",
        "React front end with an EC2-based login.",
      ],
    },
    es: {
      kind: "EdTech",
      description:
        "Migré cursos de Blackboard a almacenamiento en AWS y construí un front end en React con login sobre EC2 para una universidad de Brisbane.",
      overview: "Migración de cursos para una universidad de Brisbane, Australia, llevando el contenido de Blackboard a AWS.",
      role: "Full Stack Developer.",
      highlights: [
        "Cursos de Blackboard migrados a almacenamiento en AWS.",
        "Front end en React con login sobre EC2.",
      ],
    },
  },
  {
    id: "bioluniel",
    title: "BioLuniel",
    category: "web",
    year: "",
    image: imageBioluniel,
    logo: true,
    hue: 285,
    stack: ["React", "Node.js", "Symfony"],
    en: {
      kind: "Freelance · E-commerce app",
      description:
        "Alternative-medicine products app built with React.js and Node.js on a Symfony 5.1 (PHP) backend.",
      overview: "A products app for an alternative-medicine brand, delivered as a freelance project.",
      role: "Full Stack Developer.",
      highlights: ["React.js and Node.js front end.", "Symfony 5.1 (PHP) back end."],
    },
    es: {
      kind: "Freelance · App de e-commerce",
      description:
        "App de productos de medicina alternativa hecha con React.js y Node.js sobre un backend en Symfony 5.1 (PHP).",
      overview: "Una app de productos para una marca de medicina alternativa, entregada como proyecto freelance.",
      role: "Full Stack Developer.",
      highlights: ["Front end en React.js y Node.js.", "Back end en Symfony 5.1 (PHP)."],
    },
  },
];

const rawSpotlight = {
  name: "BotPass",
  year: "2026",
  stack: ["AI-first", "Claude Code", "REST API", "Cloud infrastructure", "WordPress", "PHP"],
  surfaces: [
    { id: "botpass-landing", label: "Landing", url: "https://botpass.io", domain: "botpass.io", screen: "landing" },
    { id: "botpass-app", label: "Web App", url: "https://botpass.io/app", domain: "botpass.io/app", screen: "app" },
    { id: "botpass-api", label: "REST API", url: "https://api.botpass.io", domain: "api.botpass.io", screen: "api" },
  ],
  en: {
    tagline: "An entire SaaS product, from cloud infrastructure to plugin.",
    client: "Performance Media · Barcelona (remote)",
    description:
      "Sole developer of the BotPass platform. I architected and deployed the full cloud infrastructure, then built the landing site, the web application, the REST API and a PHP WordPress plugin that connects WordPress sites to the platform, using an AI-first workflow with AI as the primary development tool from day one.",
    highlights: [
      "Full cloud infrastructure designed and deployed",
      "Web app + REST API built end to end",
      "WordPress plugin (PHP) connecting sites to the platform",
      "AI-first workflow with Claude Code from day one",
    ],
    surfaces: [
      "Public marketing site presenting the product.",
      "The customer-facing application and dashboard.",
      "The API powering the web app and the WordPress plugin.",
    ],
  },
  es: {
    tagline: "Un producto SaaS completo, desde la infraestructura cloud hasta el plugin.",
    client: "Performance Media · Barcelona (remoto)",
    description:
      "Único desarrollador de la plataforma BotPass. Diseñé y desplegué toda la infraestructura cloud y después construí la landing, la aplicación web, la API REST y un plugin de WordPress en PHP que conecta sitios WordPress con la plataforma, con un flujo AI-first usando la IA como herramienta principal desde el primer día.",
    highlights: [
      "Infraestructura cloud completa, diseñada y desplegada",
      "Web app + API REST construidas de punta a punta",
      "Plugin de WordPress (PHP) que conecta sitios con la plataforma",
      "Flujo AI-first con Claude Code desde el primer día",
    ],
    surfaces: [
      "El sitio público que presenta el producto.",
      "La aplicación y el panel para clientes.",
      "La API que mueve la web app y el plugin de WordPress.",
    ],
  },
};

const rawDesignWorks = [
  { image: imageAmazon, title: "Amazon Clone", en: "React app", es: "App en React" },
  { image: imageBurma, title: "BurmaBikinis", en: "E-commerce", es: "E-commerce" },
  { image: imageBunker, title: "Bunker Gráfico", en: "Web & brand identity", es: "Web e identidad de marca" },
  { image: imageSitus, title: "Situs", en: "HTML5 · Bootstrap", es: "HTML5 · Bootstrap" },
  { image: imageBeFit, title: "BeFit", en: "HTML5 website", es: "Sitio HTML5" },
  { image: imageColiseo, title: "Coliseo Verbal", en: "Isologo · Illustrator", es: "Isologo · Illustrator" },
  { image: imageAikido, title: "Aikido", en: "Isologo design", es: "Diseño de isologo" },
  { image: imagePhNegativo, title: "Ph Negativo", en: "Isologo + typologo", es: "Isologo + logotipo" },
];

export const statValues = [
  { value: 12, suffix: "+" },
  { value: 8, suffix: "" },
  { value: 2, suffix: "" },
  { value: 100, suffix: "%" },
];

export const projectIds = rawProjects.map((p) => p.id);

function localizeProject(p, lang) {
  const text = p[lang] || p.en;
  const { en, es, titleEs, clientEs, ...rest } = p;
  return {
    ...rest,
    ...text,
    title: lang === "es" && titleEs ? titleEs : p.title,
    client: lang === "es" && clientEs ? clientEs : p.client,
  };
}

export function getProjects(lang) {
  return rawProjects.map((p) => localizeProject(p, lang));
}

export function getSpotlight(lang) {
  const text = rawSpotlight[lang] || rawSpotlight.en;
  return {
    name: rawSpotlight.name,
    year: rawSpotlight.year,
    stack: rawSpotlight.stack,
    tagline: text.tagline,
    client: text.client,
    description: text.description,
    highlights: text.highlights,
    surfaces: rawSpotlight.surfaces.map((s, i) => ({ ...s, description: text.surfaces[i] })),
  };
}

export function getDesignWorks(lang) {
  return rawDesignWorks.map((w) => ({ image: w.image, title: w.title, kind: w[lang] || w.en }));
}

export function useProjects() {
  const { lang } = useLang();
  return {
    projects: getProjects(lang),
    spotlight: getSpotlight(lang),
    designWorks: getDesignWorks(lang),
  };
}
