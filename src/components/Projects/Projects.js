import React, { useMemo, useState } from "react";
import { Container } from "react-bootstrap";
import { FiMessageCircle, FiDownload, FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import Particle from "../Particle";
import Spotlight from "./Spotlight";
import ProjectCard from "./ProjectCard";
import Reveal from "./Reveal";
import CountUp from "./CountUp";
import resume from "../../Assets/curriculum.pdf";
import ContactButton from "../Contact/ContactButton";
import {
  categories,
  spotlight,
  projects,
  designWorks,
  stats,
} from "../../data/projects";
import "./projects.css";

function Projects() {
  const [filter, setFilter] = useState("all");

  const counts = useMemo(() => {
    const c = { all: projects.length };
    projects.forEach((p) => {
      c[p.category] = (c[p.category] || 0) + 1;
    });
    return c;
  }, []);

  const visible =
    filter === "all" ? projects : projects.filter((p) => p.category === filter);

  return (
    <Container fluid className="project-section pj">
      <Particle />
      <Container className="pj-container">
        {/* Hero */}
        <header className="pj-hero">
          <Reveal>
            <span className="eyebrow">Portfolio · 2011 — 2026</span>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="pj-title">
              Products I've <span className="gradient-text">built & shipped</span>
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="pj-subtitle">
              From a complete SaaS built with an AI-first workflow to banking
              platforms that move real money: architecture, code and
              infrastructure, end to end.
            </p>
          </Reveal>
          <Reveal delay={240} className="pj-stats">
            {stats.map((s) => (
              <div className="stat" key={s.label}>
                <span className="stat-value">
                  <CountUp value={s.value} suffix={s.suffix} />
                </span>
                <span className="stat-label">{s.label}</span>
              </div>
            ))}
          </Reveal>
        </header>

        {/* Spotlight */}
        <Spotlight data={spotlight} />

        {/* Grid */}
        <section className="pj-section">
          <Reveal className="pj-section-head">
            <div>
              <span className="eyebrow">Selected work</span>
              <h2 className="pj-h2">
                Live products & <span className="purple">case studies</span>
              </h2>
            </div>
            <div className="filters" role="tablist" aria-label="Filter projects">
              {categories.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  role="tab"
                  aria-selected={filter === c.id}
                  className={`filter ${filter === c.id ? "active" : ""}`}
                  onClick={() => setFilter(c.id)}
                >
                  {c.label}
                  <span className="filter-count">{counts[c.id] || 0}</span>
                </button>
              ))}
            </div>
          </Reveal>

          <div className="pj-grid" key={filter}>
            {visible.map((p, i) => (
              <div
                className="pj-grid-item"
                key={p.id}
                style={{ animationDelay: `${i * 70}ms` }}
              >
                <ProjectCard project={p} />
              </div>
            ))}
          </div>
        </section>

        {/* Design archive */}
        <section className="pj-section">
          <Reveal className="pj-section-head">
            <div>
              <span className="eyebrow">Archive</span>
              <h2 className="pj-h2">
                Freelance & <span className="purple">brand design</span>
              </h2>
            </div>
            <p className="pj-section-note">
              Web, e-commerce and identity work from my years as a web developer
              and designer.
            </p>
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

        {/* CTA */}
        <Reveal className="pj-cta">
          <div className="pj-cta-glow" />
          <span className="eyebrow">Next project</span>
          <h2 className="pj-cta-title">
            Have a product in mind? <span className="gradient-text">Let's build it.</span>
          </h2>
          <p className="pj-subtitle">
            Full stack, cloud and AI-first development, from the first commit to
            production.
          </p>
          <div className="pj-cta-actions">
            <ContactButton className="btn-glow">
              <FiMessageCircle /> Get in touch
            </ContactButton>
            <a
              className="btn-ghost"
              href={resume}
              target="_blank"
              rel="noreferrer"
              download="Roberto_Palestini_CV.pdf"
            >
              <FiDownload /> Download CV
            </a>
            <Link className="btn-ghost" to="/resume">
              Experience <FiArrowRight />
            </Link>
          </div>
        </Reveal>
      </Container>
    </Container>
  );
}

export default Projects;
