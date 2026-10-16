import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowUpRight, FiArrowRight } from "react-icons/fi";
import { FaCheckCircle } from "react-icons/fa";
import BrowserMockup from "./BrowserMockup";
import Reveal from "./Reveal";
import LikeButton from "../Likes/LikeButton";
import { useLang } from "../../context/LanguageContext";

function Spotlight({ data }) {
  const { t } = useLang();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const surface = data.surfaces[active];
  const total = data.surfaces.length;

  // Cycle through the product surfaces until the visitor picks one.
  useEffect(() => {
    if (paused) return undefined;
    const id = setInterval(() => setActive((i) => (i + 1) % total), 4500);
    return () => clearInterval(id);
  }, [paused, total]);

  const select = (i) => {
    setPaused(true);
    setActive(i);
  };

  return (
    <Reveal className="spotlight">
      <div className="spotlight-glow" />
      <div className="spotlight-grid">
        <div className="spotlight-info">
          <span className="eyebrow">
            {t("projects.featured")} · {data.year}
          </span>
          <h2 className="spotlight-title">
            <span className="gradient-text">{data.name}</span>
          </h2>
          <p className="spotlight-tagline">{data.tagline}</p>
          <p className="spotlight-client">{data.client}</p>
          <p className="spotlight-desc">{data.description}</p>
          <ul className="spotlight-highlights">
            {data.highlights.map((h) => (
              <li key={h}>
                <FaCheckCircle /> {h}
              </li>
            ))}
          </ul>
          <div className="chips">
            {data.stack.map((tech) => (
              <span className="chip" key={tech}>
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="spotlight-showcase">
          <div className="surface-tabs" role="tablist">
            {data.surfaces.map((s, i) => (
              <button
                key={s.id}
                type="button"
                role="tab"
                aria-selected={i === active}
                className={`surface-tab ${i === active ? "active" : ""}`}
                onClick={() => select(i)}
              >
                <span className="surface-step">0{i + 1}</span> {s.label}
              </button>
            ))}
          </div>

          <div className="surface-stage" onMouseEnter={() => setPaused(true)}>
            {data.surfaces.map((s, i) => (
              <div key={s.id} className={`surface-layer pos-${(i - active + total) % total}`}>
                <BrowserMockup domain={s.domain} screen={s.screen} hue={280 + i * 15} />
              </div>
            ))}
          </div>

          <div className="surface-caption">
            <p>{surface.description}</p>
            <div className="surface-actions">
              <LikeButton id={surface.id} />
              <Link className="btn-ghost" to={`/project/${surface.id}`}>
                {t("projects.viewCase")} <FiArrowRight />
              </Link>
              <a className="btn-glow" href={surface.url} target="_blank" rel="noreferrer">
                {t("projects.open")} {surface.domain} <FiArrowUpRight />
              </a>
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export default Spotlight;
