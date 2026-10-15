import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import { links } from "../../data/cv";
import imageBioluniel from "../../Assets/Bioluniel-Logo.png";
import imageAmazon from "../../Assets/Portfolio/amazonclone.png";
import imageBeFit from "../../Assets/Portfolio/BeFit.jpg";
import imageBurma from "../../Assets/Portfolio/BurmaBikinis.jpg";
import imageBunker from "../../Assets/Portfolio/BunkerGrafico.jpg";
import imageSitus from "../../Assets/Portfolio/Situs.jpg";
import imageColiseo from "../../Assets/Portfolio/ColiseoVerbal-Logo.jpg";
import imageAikido from "../../Assets/Portfolio/Aikido-Logo.jpg";
import imagePhNegativo from "../../Assets/Portfolio/PhNegativo-Logo.jpg";

const featured = [
  {
    title: "BotPass",
    subtitle: "Performance Media · 2026",
    description:
      "Complete SaaS product built end to end with an AI-first workflow: full cloud infrastructure, REST API, web app and a PHP WordPress plugin that connects WordPress sites to the platform.",
    stack: ["AI-first", "Claude Code", "REST API", "Cloud infra", "WordPress (PHP)"],
    link: links.botpass,
  },
  {
    title: "Accounting & Reconciliation Cloud Migration",
    subtitle: "Bank COMAFI · 2024 - 2026",
    description:
      "Migration of desktop accounting and reconciliation systems to AWS cloud applications: Java microservices, TypeScript serverless APIs, Azure AD/OAuth2/JWT security, GitLab CI pipelines and scheduled data operations with Control-M.",
    stack: ["AWS", "Java", "Lambda", "Prisma", "PostgreSQL", "GitLab CI", "CloudFormation"],
  },
  {
    title: "COMEX Foreign Trade & Guarantees Platform",
    subtitle: "Bank of Galicia · 2021 - 2023",
    description:
      "React.js foreign-trade web app over Java and .NET microservices, a guarantees system with NestJS BFF and .NET Core 6, MT103/MT199 message trays, and an in-house Next.js platform with OpenTelemetry tracing.",
    stack: ["React", "Next.js", "NestJS", ".NET Core", "Spring Boot", "Azure MSAL", "OpenShift"],
  },
  {
    title: "University Course Migration",
    subtitle: "Tutodia · 2021 - 2023",
    description:
      "Migrated Blackboard courses to AWS storage and built a React front end with EC2-based login for a university in Brisbane, Australia.",
    stack: ["React", "AWS S3", "EC2"],
  },
];

const portfolio = [
  {
    imgPath: imageBioluniel,
    title: "BioLuniel ReactApp",
    description:
      "Alternative-medicine products app built with React.js and Node.js on a Symfony 5.1 (PHP) backend.",
    link: "https://bioluniel-smoothscroll.herokuapp.com/",
  },
  {
    imgPath: imageAmazon,
    title: "Amazon Clone ReactApp",
    description: "E-commerce storefront clone built with React.js.",
  },
  {
    imgPath: imageBeFit,
    title: "BeFit Html5",
    description: "Responsive website built with HTML5 and CSS3.",
  },
  {
    imgPath: imageBurma,
    title: "BurmaBikinis E-commerce",
    description: "Online store with product catalog and shopping cart.",
  },
  {
    imgPath: imageBunker,
    title: "BunkerGráfico Html5 Bootstrap",
    description:
      "Website and brand identity for an offset print house: editorial design, web development and marketing communication.",
  },
  {
    imgPath: imageSitus,
    title: "Situs Html5 Bootstrap",
    description: "Responsive corporate website built with HTML5 and Bootstrap.",
  },
  {
    imgPath: imageColiseo,
    title: "IsoLogo Illustrator",
    description: "Brand isologo for Coliseo Verbal, designed in Adobe Illustrator.",
  },
  {
    imgPath: imageAikido,
    title: "IsoLogo Design",
    description: "Brand isologo design for an Aikido school.",
  },
  {
    imgPath: imagePhNegativo,
    title: "IsoLogo + Typologo Design",
    description: "Isologo and typographic logo for Ph Negativo.",
  },
];

function Projects() {
  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          Featured <strong className="purple">Professional Work </strong>
        </h1>
        <p style={{ color: "white" }}>
          Platforms I've built and shipped for companies and banks.
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          {featured.map((p) => (
            <Col md={6} className="project-card" key={p.title}>
              <ProjectCard {...p} />
            </Col>
          ))}
        </Row>

        <h1 className="project-heading">
          Freelance & <strong className="purple">Design Works </strong>
        </h1>
        <p style={{ color: "white" }}>
          A selection of web and graphic design projects from my freelance
          years.
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          {portfolio.map((p) => (
            <Col md={4} className="project-card" key={p.title}>
              <ProjectCard {...p} />
            </Col>
          ))}
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
