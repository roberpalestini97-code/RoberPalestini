import React, { useMemo, useState } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FiMessageCircle, FiDownload, FiArrowRight } from "react-icons/fi";
import Particle from "../Particle";
import Spotlight from "./Spotlight";
import ProjectCard from "./ProjectCard";
import Reveal from "./Reveal";
import CountUp from "./CountUp";
import ContactButton from "../Contact/ContactButton";
import { categories, statValues, useProjects } from "../../data/projects";
import { cvPdf, cvFileName } from "../../data/cv";
import { useLang } from "../../context/LanguageContext";
import { useLikes } from "../../context/LikesContext";
import rich from "../../i18n/rich";
import usePageMeta from "../../hooks/usePageMeta";
import "./projects.css";

function Projects() {
  const { t } = useLang();
  const { mostLiked } = useLikes();
  const { projects, spotlight, designWorks } = useProjects();
  const [filter, setFilter] = useState("all");
  usePageMeta(t("titles.projects"), t("projects.subtitle"));

  const counts = useMemo(() => {
    const c = { all: projects.length };
    projects.forEach((p) => {
      c[p.category] = (c[p.category] || 0) + 1;
    });
    return c;
  }, [projects]);

  const stats = statValues.map((s, i) =>
    i === 1 ? { ...s, value: projects.filter((p) => p.live).length } : s
  );
  const statLabels = t("projects.stats");
  const visible = filter === "all" ? projects : projects.filter((p) => p.category === filter);

  return (
    <Container fluid className="project-section pj">
      <Particle />
      <Container className="pj-container">
        <header className="pj-hero">
          <Reveal>
            <span className="eyebrow">{t("projects.eyebrow")}</span>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="pj-title">{richGradient(t("projects.title"))}</h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="pj-subtitle">{t("projects.subtitle")}</p>
          </Reveal>
          <Reveal delay={240} className="pj-stats">
            {stats.map((s, i) => (
              <div className="stat" key={statLabels[i]}>
                <span className="stat-value">
                  <CountUp value={s.value} suffix={s.suffix} />
                </span>
                <span className="stat-label">{statLabels[i]}</span>
              </div>
            ))}
          </Reveal>
        </header>

        <Spotlight data={spotlight} />

        <section className="pj-section">
          <Reveal className="pj-section-head">
            <div>
              <span className="eyebrow">{t("projects.selected")}</span>
              <h2 className="pj-h2">{rich(t("projects.listTitle"))}</h2>
            </div>
            <div className="filters" role="tablist" aria-label={t("projects.filterLabel")}>
              {categories.map((c) => (
                <button
                  key={c}
                  type="button"
                  role="tab"
                  aria-selected={filter === c}
                  className={`filter ${filter === c ? "active" : ""}`}
                  onClick={() => setFilter(c)}
                >
                  {t(`projects.filters.${c}`)}
                  <span className="filter-count">{counts[c] || 0}</span>
                </button>
              ))}
            </div>
          </Reveal>

          <div className="pj-grid" key={filter}>
            {visible.map((p, i) => (
              <div className="pj-grid-item" key={p.id} style={{ animationDelay: `${i * 70}ms` }}>
                <ProjectCard project={p} isMostLiked={mostLiked === p.id} />
              </div>
            ))}
          </div>
        </section>

        <section className="pj-section">
          <Reveal className="pj-section-head">
            <div>
              <span className="eyebrow">{t("projects.archive")}</span>
              <h2 className="pj-h2">{rich(t("projects.designTitle"))}</h2>
            </div>
            <p className="pj-section-note">{t("projects.designNote")}</p>
          </Reveal>
          <div className="gallery">
            {designWorks.map((w, i) => (
              <Reveal className="gallery-item" key={w.title} delay={i * 60}>
                <img src={w.image} alt={w.title} loading="lazy" />
                <div className="gallery-overlay">
                  <span className="gallery-kind">{w.kind}</span>
                  <span className="gallery-title">{w.title}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <Reveal className="pj-cta">
          <div className="pj-cta-glow" />
          <span className="eyebrow">{t("projects.ctaEyebrow")}</span>
          <h2 className="pj-cta-title">
            {t("projects.ctaTitle")} <span className="gradient-text">{t("projects.ctaTitleAccent")}</span>
          </h2>
          <p className="pj-subtitle">{t("projects.ctaText")}</p>
          <div className="pj-cta-actions">
            <ContactButton className="btn-glow">
              <FiMessageCircle /> {t("projects.getInTouch")}
            </ContactButton>
            <a className="btn-ghost" href={cvPdf} target="_blank" rel="noreferrer" download={cvFileName}>
              <FiDownload /> {t("resume.download")}
            </a>
            <Link className="btn-ghost" to="/resume">
              {t("nav.experience")} <FiArrowRight />
            </Link>
          </div>
        </Reveal>
      </Container>
    </Container>
  );
}

// "**text**" → gradient span (used by the hero title).
function richGradient(text) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") ? (
      <span className="gradient-text" key={i}>
        {part.slice(2, -2)}
      </span>
    ) : (
      <React.Fragment key={i}>{part}</React.Fragment>
    )
  );
}

export default Projects;
