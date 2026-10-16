import React from "react";
import { Container } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { FiArrowLeft, FiArrowRight, FiArrowUpRight, FiLock, FiMessageCircle } from "react-icons/fi";
import { FaCheckCircle } from "react-icons/fa";
import Particle from "../Particle";
import BrowserMockup from "./BrowserMockup";
import Reveal from "./Reveal";
import LikeButton from "../Likes/LikeButton";
import ContactButton from "../Contact/ContactButton";
import { useProjects } from "../../data/projects";
import { useLang } from "../../context/LanguageContext";
import usePageMeta from "../../hooks/usePageMeta";
import "./projects.css";

function ProjectDetail() {
  const { id } = useParams();
  const { t } = useLang();
  const { projects } = useProjects();
  const index = projects.findIndex((p) => p.id === id);
  const project = projects[index];
  usePageMeta(project ? project.title : t("detail.notFound"), project && project.description);

  if (!project) {
    return (
      <Container fluid className="project-section pj">
        <Particle />
        <Container className="pj-container pd-empty">
          <h1 className="pj-h2">{t("detail.notFound")}</h1>
          <Link className="btn-ghost" to="/project">
            <FiArrowLeft /> {t("detail.back")}
          </Link>
        </Container>
      </Container>
    );
  }

  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  const isPrivate = Boolean(project.private);
  const facts = [
    [t("detail.client"), project.client],
    [t("detail.year"), project.year],
    [t("detail.type"), project.kind],
  ].filter(([, v]) => v);

  return (
    <Container fluid className="project-section pj pd" style={{ "--hue": project.hue }}>
      <Particle />
      <Container className="pj-container">
        <Link className="pd-back" to="/project">
          <FiArrowLeft /> {t("detail.back")}
        </Link>

        <header className="pd-hero">
          <Reveal className="pd-hero-text">
            <span className="eyebrow">{project.kind}</span>
            <h1 className="pd-title">{project.title}</h1>
            <p className="pd-lead">{project.description}</p>
            <div className="pd-actions">
              {project.url && (
                <a className="btn-glow" href={project.url} target="_blank" rel="noreferrer">
                  {t("detail.visit")} <FiArrowUpRight />
                </a>
              )}
              <LikeButton id={project.id} variant="detail" />
              <ContactButton className="btn-ghost">
                <FiMessageCircle /> {t("projects.getInTouch")}
              </ContactButton>
            </div>
          </Reveal>
          <Reveal className="pd-hero-media" delay={120}>
            <BrowserMockup
              domain={project.domain}
              screen={project.screen}
              image={project.image}
              poster={project.poster}
              hue={project.hue}
              isPrivate={isPrivate}
            />
          </Reveal>
        </header>

        <Reveal className="pd-facts">
          {facts.map(([k, v]) => (
            <div className="pd-fact" key={k}>
              <span className="pd-fact-key">{k}</span>
              <span className="pd-fact-value">{v}</span>
            </div>
          ))}
        </Reveal>

        <div className="pd-body">
          <div className="pd-main">
            <Reveal as="section" className="pd-section">
              <h2 className="pd-h2">{t("detail.overview")}</h2>
              <p>{project.overview || project.description}</p>
              {isPrivate && (
                <p className="pd-note">
                  <FiLock /> {t("detail.privateNote")}
                </p>
              )}
            </Reveal>
            {project.highlights && project.highlights.length > 0 && (
              <Reveal as="section" className="pd-section">
                <h2 className="pd-h2">{t("detail.highlights")}</h2>
                <ul className="pd-list">
                  {project.highlights.map((h) => (
                    <li key={h}>
                      <FaCheckCircle /> {h}
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}
          </div>
          <aside className="pd-side">
            {project.role && (
              <Reveal className="pd-card">
                <h3 className="pd-h3">{t("detail.role")}</h3>
                <p>{project.role}</p>
              </Reveal>
            )}
            <Reveal className="pd-card" delay={80}>
              <h3 className="pd-h3">{t("detail.stack")}</h3>
              <div className="chips">
                {project.stack.map((tech) => (
                  <span className="chip" key={tech}>
                    {tech}
                  </span>
                ))}
              </div>
            </Reveal>
          </aside>
        </div>

        <nav className="pd-nav" aria-label={t("nav.projects")}>
          <Link to={`/project/${prev.id}`} className="pd-nav-link">
            <span className="pd-nav-dir">
              <FiArrowLeft /> {t("detail.prev")}
            </span>
            <span className="pd-nav-title">{prev.title}</span>
          </Link>
          <Link to={`/project/${next.id}`} className="pd-nav-link pd-nav-next">
            <span className="pd-nav-dir">
              {t("detail.next")} <FiArrowRight />
            </span>
            <span className="pd-nav-title">{next.title}</span>
          </Link>
        </nav>
      </Container>
    </Container>
  );
}

export default ProjectDetail;
