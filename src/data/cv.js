// Single source of truth for the portfolio content.
// Keep this file in sync with src/Assets/curriculum.pdf.

export const profile = {
  name: "Roberto Palestini",
  shortName: "Rober Palestini",
  title: "Senior Full Stack Developer",
  location: "Mar del Plata, Buenos Aires, Argentina",
  phone: "+54 9 223 343 1845",
  email: "roberpalestini97@gmail.com",
  years: "12+",
  freelanceYears: "7+",
};

export const links = {
  linkedin: "https://www.linkedin.com/in/rober-palestini-3a2b43365",
  github: "https://github.com/robertopalestini",
  githubUser: "robertopalestini",
  freelancer: "https://www.freelancer.com/u/roberpalestini",
  portfolio: "https://connectwithme.vercel.app",
  botpass: "https://botpass.io",
};

export const roles = [
  "Senior Full Stack Developer",
  "React · Next.js · Node.js · NestJS",
  "Java · Spring Boot · .NET Core",
  "AWS · Azure · Docker · Kubernetes",
  "AI-First Development",
];

export const summary =
  "Senior Full Stack Developer with 12+ years building and shipping web platforms end to end: React/Next.js front ends, Node.js/NestJS, Java and .NET back ends, and AWS/Azure cloud infrastructure with Docker, Kubernetes and CI/CD. Delivered banking systems at Bank COMAFI and Bank of Galicia (financial transactions, OAuth2/JWT security, microservices) and, most recently, an entire SaaS product (BotPass) from infrastructure to API, web app and WordPress plugin using an AI-first workflow. 7+ years of freelance delivery with 100% on-time record.";

export const skills = [
  {
    category: "Languages",
    items: ["JavaScript", "TypeScript", "Java", "PHP", "SQL", "Python (learning)"],
  },
  {
    category: "Frontend",
    items: ["React.js", "Next.js", "Redux", "HTML5", "CSS3", "Responsive UI", "Azure MSAL"],
  },
  {
    category: "Backend",
    items: [
      "Node.js",
      "Express",
      "NestJS (BFF)",
      "Spring Boot",
      ".NET Core",
      "Symfony",
      "WordPress plugins",
      "REST APIs",
      "GraphQL",
      "Microservices",
      "Serverless",
      "Prisma ORM",
      "OAuth2",
      "JWT",
      "Swagger/OpenAPI",
    ],
  },
  {
    category: "Databases",
    items: [
      "PostgreSQL",
      "MySQL",
      "Oracle",
      "MongoDB",
      "Redis",
      "DynamoDB",
      "Firebase",
      "Elasticsearch",
    ],
  },
  {
    category: "DevOps & Cloud",
    items: [
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
  },
  {
    category: "AI & Automation",
    items: [
      "AI-first development",
      "Claude Code",
      "LLM APIs",
      "AI agents",
      "Learning: RAG, LangChain/LangGraph, MCP, multi-agent systems, FastAPI, Python",
    ],
  },
  {
    category: "Practices",
    items: [
      "Agile Methodologies",
      "CI/CD Automation",
      "Testing",
      "Code Reviews",
      "Technical Documentation",
    ],
  },
];

export const experience = [
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
    link: "https://www.freelancer.com/u/roberpalestini",
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
    highlights: [
      "Built websites, applications and games tailored to client objectives (7+ years).",
    ],
  },
];

export const education = [
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
  {
    institution: "AWS Training",
    title: "Advanced Architecting on AWS",
    period: "03/2024 - 12/2025",
  },
  {
    institution: "EducacionIT",
    title: "Cloud DevOps: Docker, Kubernetes & Jenkins",
    period: "03/2023 - 05/2023",
  },
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
    detail:
      "Script analysis, interactive communication design, photography direction.",
  },
];
