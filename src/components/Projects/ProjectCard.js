import React from "react";
import Tilt from "react-parallax-tilt";
import { FiArrowUpRight, FiLock } from "react-icons/fi";
import BrowserMockup from "./BrowserMockup";

function ProjectCard({ project }) {
  const {
    title,
    kind,
    year,
    client,
    url,
    domain,
    screen,
    image,
    hue,
    live,
    description,
    stack,
  } = project;
  const isPrivate = Boolean(project.private);

  return (
    <Tilt
      tiltMaxAngleX={4}
      tiltMaxAngleY={4}
      glareEnable
      glareMaxOpacity={0.08}
      glareColor="#c770f0"
      glarePosition="all"
      className="pcard-tilt"
    >
      <article className="pcard" style={{ "--hue": hue }}>
        <div className={`pcard-media ${project.logo ? "pcard-logo" : ""}`}>
          <BrowserMockup
            domain={domain}
            screen={screen}
            image={image}
            hue={hue}
            isPrivate={isPrivate}
          />
        </div>
        <div className="pcard-body">
          <div className="pcard-meta">
            <span className="pcard-kind">{kind}</span>
            {live && (
              <span className="status status-live">
                <i /> Live
              </span>
            )}
            {isPrivate && (
              <span className="status status-private">
                <FiLock /> Private
              </span>
            )}
          </div>
          <h3 className="pcard-title">{title}</h3>
          {(client || year) && (
            <p className="pcard-client">
              {client}
              {client && year && " · "}
              {year}
            </p>
          )}
          <p className="pcard-desc">{description}</p>
          <div className="chips">
            {stack.map((t) => (
              <span className="chip" key={t}>
                {t}
              </span>
            ))}
          </div>
          {url ? (
            <a
              className="pcard-link"
              href={url}
              target="_blank"
              rel="noreferrer"
            >
              Visit {domain} <FiArrowUpRight />
            </a>
          ) : (
            <span className="pcard-link disabled">
              {isPrivate ? "Under NDA · details on request" : "Archived project"}
            </span>
          )}
        </div>
      </article>
    </Tilt>
  );
}

export default ProjectCard;
