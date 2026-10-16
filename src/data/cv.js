// Single source of truth for the portfolio content.
// Keep this file in sync with public/Roberto_Palestini_CV.pdf.
import { useLang } from "../context/LanguageContext";

export const profile = {
  name: "Roberto Palestini",
  shortName: "Rober Palestini",
  title: "Senior Full Stack Developer",
  location: "Mar del Plata, Buenos Aires, Argentina",
  phone: "+54 9 223 343 1845",
  email: "roberpalestini97@gmail.com",
  whatsapp: "5492233431845",
  years: "12+",
  freelanceYears: "7+",
};

export const links = {
  linkedin: "https://www.linkedin.com/in/rober-palestini-3a2b43365",
  github: "https://github.com/roberpalestini97-code",
  githubUser: "roberpalestini97-code",
  freelancer: "https://www.freelancer.com/u/roberpalestini",
  botpass: "https://botpass.io",
};

// Replace only this file when the CV changes.
export const cvPdf = `${process.env.PUBLIC_URL}/Roberto_Palestini_CV.pdf`;
export const cvFileName = "Roberto_Palestini_CV.pdf";

const shared = {
  skillItems: {
    languages: ["JavaScript", "TypeScript", "Java", "PHP", "SQL"],
    frontend: ["React.js", "Next.js", "Redux", "HTML5", "CSS3", "Azure MSAL"],
    backend: [
      "Node.js",
      "Express",
      "NestJS (BFF)",
      "Spring Boot",
      ".NET Core",
      "Symfony",
      "REST APIs",
      "GraphQL",
      "Prisma ORM",
      "OAuth2",
      "JWT",
      "Swagger/OpenAPI",
    ],
    databases: ["PostgreSQL", "MySQL", "Oracle", "MongoDB", "Redis", "DynamoDB", "Firebase", "Elasticsearch"],
    devops: [
      "Docker",
      "Kubernetes",
      "OpenShift",
      "Jenkins",
      "GitLab CI/CD",
      "Control-M",
      "OpenTelemetry",
      "Jaeger",
      "AWS (EC2, ECS, Lambda, S3, RDS, IAM, Cognito, API Gateway, CloudWatch, CloudFront, CDK, CloudFormation, Secrets Manager)",
      "Azure (Azure AD, Data Factory)",
    ],
    ai: ["Claude Code", "LLM APIs"],
  },
};

const content = {
  en: {
    roles: [
      "Senior Full Stack Developer",
      "React · Next.js · Node.js · NestJS",
      "Java · Spring Boot · .NET Core",
      "AWS · Azure · Docker · Kubernetes",
      "AI-First Development",
    ],
    summary:
      "Senior Full Stack Developer with 12+ years building and shipping web platforms end to end: React/Next.js front ends, Node.js/NestJS, Java and .NET back ends, and AWS/Azure cloud infrastructure with Docker, Kubernetes and CI/CD. Delivered banking systems at Bank COMAFI and Bank of Galicia (financial transactions, OAuth2/JWT security, microservices) and, most recently, an entire SaaS product (BotPass) from infrastructure to API, web app and WordPress plugin using an AI-first workflow. 7+ years of freelance delivery with 100% on-time record.",
    skills: [
      { category: "Languages", items: [...shared.skillItems.languages, "Python (learning)"] },
      { category: "Frontend", items: [...shared.skillItems.frontend, "Responsive UI"] },
      {
        category: "Backend",
        items: [...shared.skillItems.backend, "WordPress plugins", "Microservices", "Serverless"],
      },
      { category: "Databases", items: shared.skillItems.databases },
      { category: "DevOps & Cloud", items: shared.skillItems.devops },
      {
        category: "AI & Automation",
        items: [
          "AI-first development",
          ...shared.skillItems.ai,
          "AI agents",
          "Learning: RAG, LangChain/LangGraph, MCP, multi-agent systems, FastAPI, Python",
        ],
      },
      {
        category: "Practices",
        items: ["Agile Methodologies", "CI/CD Automation", "Testing", "Code Reviews", "Technical Documentation"],
      },
    ],
    experience: [
      {
        company: "Performance Media",
        role: "Sr. Full Stack Developer",
        period: "05/2026 - 10/2026",
        location: "Barcelona, Spain (remote)",
        highlights: [
          "Architected and deployed the full cloud infrastructure for BotPass (botpass.io), hosting the web app, API and supporting services.",
          "Developed the entire BotPass application, web app and REST API, using an AI-first workflow with AI as the primary development tool from day one.",
          "Developed and shipped the BotPass WordPress plugin (PHP), connecting WordPress sites to the BotPass platform.",
        ],
      },
      {
        company: "Bank COMAFI",
        role: "Full Stack Developer & Multi-Cloud Developer",
        period: "01/2024 - 03/2026",
        highlights: [
          "Led migration of accounting and reconciliation systems from desktop software to cloud applications on AWS with Java microservices.",
          "Built REST APIs and serverless functions in TypeScript (Node.js, AWS Lambda, Prisma ORM) on PostgreSQL (RDS).",
          "Secured services with Azure AD, OAuth2 and JWT bearer tokens.",
          "Designed CI/CD pipelines with GitLab CI, Docker and ECS, provisioned with CloudFormation and IAM policies.",
          "Automated scheduled data operations with AWS S3, Control-M and Lambda triggers; delivered modular CRUDs with automatic data import/export.",
        ],
      },
      {
        company: "Bank of Galicia",
        role: "Full Stack Developer",
        period: "02/2021 - 12/2023",
        location: "Buenos Aires",
        highlights: [
          "Developed the COMEX Foreign Trade web app in React.js, integrated with RESTful Java and .NET microservices; optimized data flows for high-traffic financial transactions.",
          "Designed a full guarantees system with NestJS, a .NET Core 6 backend and Azure authentication.",
          "Built MT103/MT199 message trays and role-based CRUDs for analysts and approvers (Azure MSAL).",
          "Created an in-house Next.js platform that retired licenses of other systems; added OpenTelemetry tracing.",
          "Contributed Spring Boot endpoints with Swagger docs and JWT/OAuth2 security; configured Jenkins and OpenShift (Kubernetes) pipelines.",
        ],
      },
      {
        company: "Tutodia",
        role: "Full Stack Developer",
        period: "09/2021 - 05/2023",
        highlights: [
          "Migrated Blackboard courses to AWS storage and built a React front end with EC2-based login for a university in Brisbane, Australia.",
        ],
      },
      {
        company: "Freelancer.com",
        role: "Full Stack Developer",
        period: "05/2014 - 02/2022",
        link: links.freelancer,
        highlights: [
          "Maintained a 100% on-time delivery record over 7+ years, earning many client recommendations and reviews.",
          "Delivered full-stack apps with Next.js, Prisma and PostgreSQL (Docker), plus REST API and Elasticsearch consulting.",
          "Built an alternative-medicine products app (React.js, Node.js) with a Symfony 5.1 (PHP) backend.",
        ],
      },
      {
        company: "Ascanelli Group S.A.",
        role: "Team Leader: Graphic Design & Web Development",
        period: "05/2018 - 06/2019",
        highlights: [
          "Led a design and web team; delivered commercial consulting and a redesign of branding and corporate structure.",
        ],
      },
      {
        company: "Bunker Grafico",
        role: "Web Developer & Designer",
        period: "12/2017 - 06/2019",
        highlights: [
          "Delivered editorial design, web development, marketing communication and brand identity for an offset print house.",
        ],
      },
      {
        company: "Brothers Encoders",
        role: "Web Developer & Designer",
        period: "02/2011 - 10/2018",
        highlights: ["Built websites, applications and games tailored to client objectives (7+ years)."],
      },
    ],
    education: [
      {
        institution: "EBIS Business Techschool",
        title: "Master in Agentic AI Automation Engineering",
        period: "2026 - 2027 (in progress)",
        detail:
          "Generative AI and LLMs, RAG (LangChain, LangGraph), MCP, multi-agent systems, LLMOps, Claude Code, AI security and governance; includes Azure AI-900 certification.",
      },
      {
        institution: "Universidad Nacional de Córdoba",
        title: "University Diploma in DevOps",
        period: "08/2025 - 08/2026",
        detail: "AWS, Azure, GCP, Docker, Jenkins, Terraform.",
      },
      { institution: "AWS Training", title: "Advanced Architecting on AWS", period: "03/2024 - 12/2025" },
      { institution: "EducacionIT", title: "Cloud DevOps: Docker, Kubernetes & Jenkins", period: "03/2023 - 05/2023" },
      {
        institution: "UTN.BA E-Learning",
        title: "Full Stack Web Development with React.js & Node.js",
        period: "08/2021 - 02/2022",
      },
      {
        institution: "National Technological University (UTN)",
        title: "Software Engineering (in progress)",
        period: "03/2019 - Present",
      },
      {
        institution: "Audiovisual Communication Technician",
        title: "Audiovisual Communication",
        period: "03/2012 - 11/2014",
        detail: "Script analysis, interactive communication design, photography direction.",
      },
    ],
  },

  es: {
    roles: [
      "Senior Full Stack Developer",
      "React · Next.js · Node.js · NestJS",
      "Java · Spring Boot · .NET Core",
      "AWS · Azure · Docker · Kubernetes",
      "Desarrollo AI-First",
    ],
    summary:
      "Senior Full Stack Developer con más de 12 años construyendo y lanzando plataformas web de punta a punta: front ends con React/Next.js, back ends con Node.js/NestJS, Java y .NET, e infraestructura cloud en AWS/Azure con Docker, Kubernetes y CI/CD. Desarrollé sistemas bancarios en Banco COMAFI y Banco Galicia (transacciones financieras, seguridad OAuth2/JWT, microservicios) y, más recientemente, un producto SaaS completo (BotPass), desde la infraestructura hasta la API, la web app y el plugin de WordPress, con un flujo de trabajo AI-first. Más de 7 años como freelancer con el 100% de entregas a tiempo.",
    skills: [
      { category: "Lenguajes", items: [...shared.skillItems.languages, "Python (aprendiendo)"] },
      { category: "Frontend", items: [...shared.skillItems.frontend, "UI responsive"] },
      {
        category: "Backend",
        items: [...shared.skillItems.backend, "Plugins de WordPress", "Microservicios", "Serverless"],
      },
      { category: "Bases de datos", items: shared.skillItems.databases },
      { category: "DevOps y Cloud", items: shared.skillItems.devops },
      {
        category: "IA y Automatización",
        items: [
          "Desarrollo AI-first",
          ...shared.skillItems.ai,
          "Agentes de IA",
          "Aprendiendo: RAG, LangChain/LangGraph, MCP, sistemas multiagente, FastAPI, Python",
        ],
      },
      {
        category: "Prácticas",
        items: ["Metodologías ágiles", "Automatización CI/CD", "Testing", "Code reviews", "Documentación técnica"],
      },
    ],
    experience: [
      {
        company: "Performance Media",
        role: "Sr. Full Stack Developer",
        period: "05/2026 - 10/2026",
        location: "Barcelona, España (remoto)",
        highlights: [
          "Diseñé y desplegué toda la infraestructura cloud de BotPass (botpass.io), que aloja la web app, la API y los servicios de soporte.",
          "Desarrollé la aplicación completa de BotPass, web app y API REST, con un flujo AI-first usando la IA como herramienta principal de desarrollo desde el primer día.",
          "Desarrollé y publiqué el plugin de WordPress de BotPass (PHP), que conecta sitios WordPress con la plataforma.",
        ],
      },
      {
        company: "Banco COMAFI",
        role: "Full Stack Developer y Multi-Cloud Developer",
        period: "01/2024 - 03/2026",
        highlights: [
          "Lideré la migración de los sistemas de contabilidad y conciliación de software de escritorio a aplicaciones cloud en AWS con microservicios Java.",
          "Construí APIs REST y funciones serverless en TypeScript (Node.js, AWS Lambda, Prisma ORM) sobre PostgreSQL (RDS).",
          "Aseguré los servicios con Azure AD, OAuth2 y tokens JWT bearer.",
          "Diseñé pipelines de CI/CD con GitLab CI, Docker y ECS, aprovisionados con CloudFormation y políticas IAM.",
          "Automaticé operaciones de datos programadas con AWS S3, Control-M y triggers de Lambda; entregué CRUDs modulares con importación/exportación automática de datos.",
        ],
      },
      {
        company: "Banco Galicia",
        role: "Full Stack Developer",
        period: "02/2021 - 12/2023",
        location: "Buenos Aires",
        highlights: [
          "Desarrollé la web app de Comercio Exterior (COMEX) en React.js, integrada con microservicios REST en Java y .NET; optimicé los flujos de datos para transacciones financieras de alto tráfico.",
          "Diseñé un sistema completo de garantías con NestJS, backend en .NET Core 6 y autenticación de Azure.",
          "Construí bandejas de mensajes MT103/MT199 y CRUDs por rol para analistas y aprobadores (Azure MSAL).",
          "Creé una plataforma interna en Next.js que reemplazó licencias de otros sistemas; agregué trazas con OpenTelemetry.",
          "Desarrollé endpoints en Spring Boot con documentación Swagger y seguridad JWT/OAuth2; configuré pipelines en Jenkins y OpenShift (Kubernetes).",
        ],
      },
      {
        company: "Tutodia",
        role: "Full Stack Developer",
        period: "09/2021 - 05/2023",
        highlights: [
          "Migré cursos de Blackboard a almacenamiento en AWS y construí un front end en React con login sobre EC2 para una universidad de Brisbane, Australia.",
        ],
      },
      {
        company: "Freelancer.com",
        role: "Full Stack Developer",
        period: "05/2014 - 02/2022",
        link: links.freelancer,
        highlights: [
          "Mantuve un 100% de entregas a tiempo durante más de 7 años, con muchas recomendaciones y reseñas de clientes.",
          "Entregué apps full stack con Next.js, Prisma y PostgreSQL (Docker), además de consultoría en APIs REST y Elasticsearch.",
          "Construí una app de productos de medicina alternativa (React.js, Node.js) con backend en Symfony 5.1 (PHP).",
        ],
      },
      {
        company: "Ascanelli Group S.A.",
        role: "Team Leader: Diseño Gráfico y Desarrollo Web",
        period: "05/2018 - 06/2019",
        highlights: [
          "Lideré un equipo de diseño y web; brindé consultoría comercial y rediseñé la marca y la estructura corporativa.",
        ],
      },
      {
        company: "Bunker Grafico",
        role: "Desarrollador Web y Diseñador",
        period: "12/2017 - 06/2019",
        highlights: [
          "Diseño editorial, desarrollo web, comunicación de marketing e identidad de marca para una imprenta offset.",
        ],
      },
      {
        company: "Brothers Encoders",
        role: "Desarrollador Web y Diseñador",
        period: "02/2011 - 10/2018",
        highlights: ["Desarrollé sitios web, aplicaciones y juegos a medida de los objetivos de cada cliente (más de 7 años)."],
      },
    ],
    education: [
      {
        institution: "EBIS Business Techschool",
        title: "Máster en Ingeniería de Automatización con IA Agéntica",
        period: "2026 - 2027 (en curso)",
        detail:
          "IA generativa y LLMs, RAG (LangChain, LangGraph), MCP, sistemas multiagente, LLMOps, Claude Code, seguridad y gobernanza de IA; incluye la certificación Azure AI-900.",
      },
      {
        institution: "Universidad Nacional de Córdoba",
        title: "Diplomatura Universitaria en DevOps",
        period: "08/2025 - 08/2026",
        detail: "AWS, Azure, GCP, Docker, Jenkins, Terraform.",
      },
      { institution: "AWS Training", title: "Advanced Architecting on AWS", period: "03/2024 - 12/2025" },
      { institution: "EducacionIT", title: "Cloud DevOps: Docker, Kubernetes y Jenkins", period: "03/2023 - 05/2023" },
      {
        institution: "UTN.BA E-Learning",
        title: "Desarrollo Web Full Stack con React.js y Node.js",
        period: "08/2021 - 02/2022",
      },
      {
        institution: "Universidad Tecnológica Nacional (UTN)",
        title: "Ingeniería en Sistemas (en curso)",
        period: "03/2019 - Actualidad",
      },
      {
        institution: "Técnico en Comunicación Audiovisual",
        title: "Comunicación Audiovisual",
        period: "03/2012 - 11/2014",
        detail: "Análisis de guion, diseño de comunicación interactiva, dirección de fotografía.",
      },
    ],
  },
};

export const getCv = (lang) => content[lang] || content.en;

export function useCv() {
  const { lang } = useLang();
  return getCv(lang);
}
