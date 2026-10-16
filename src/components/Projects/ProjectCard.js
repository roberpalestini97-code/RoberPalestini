import React from "react";
import Tilt from "react-parallax-tilt";
import { Link } from "react-router-dom";
import { FiArrowUpRight, FiArrowRight, FiLock } from "react-icons/fi";
import { AiFillFire } from "react-icons/ai";
import BrowserMockup from "./BrowserMockup";
import LikeButton from "../Likes/LikeButton";
import { useLang } from "../../context/LanguageContext";

function ProjectCard({ project, isMostLiked }) {
  const { t } = useLang();
  const { id, title, kind, year, client, url, domain, screen, image, poster, hue, live, description, stack } = project;
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
        {isMostLiked && (
          <span className="pcard-badge">
            <AiFillFire /> {t("projects.mostLiked")}
          </span>
        )}
        <div className={`pcard-media ${project.logo ? "pcard-logo" : ""}`}>
          <BrowserMockup
            domain={domain}
            screen={screen}
            image={image}
            poster={poster}
            hue={hue}
            isPrivate={isPrivate}
          />
        </div>
        <div className="pcard-body">
          <div className="pcard-meta">
            <span className="pcard-kind">{kind}</span>
            {live && (
              <span className="status status-live">
                <i /> {t("projects.live")}
              </span>
            )}
            {isPrivate && (
              <span className="status status-private">
                <FiLock /> {t("projects.private")}
              </span>
            )}
          </div>
          <h3 className="pcard-title">
            <Link to={`/project/${id}`} className="stretched-link pcard-title-link">
              {title}
            </Link>
          </h3>
          {(client || year) && (
            <p className="pcard-client">
              {client}
              {client && year && " · "}
              {year}
            </p>
          )}
          <p className="pcard-desc">{description}</p>
          <div className="chips">
            {stack.slice(0, 5).map((tech) => (
              <span className="chip" key={tech}>
                {tech}
              </span>
            ))}
            {stack.length > 5 && <span className="chip chip-more">+{stack.length - 5}</span>}
          </div>
          <div className="pcard-footer">
            <span className="pcard-link">
              {t("projects.viewCase")} <FiArrowRight />
            </span>
            <div className="pcard-actions">
              <LikeButton id={id} />
              {url && (
                <a
                  className="pcard-visit"
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${t("projects.visit")} ${domain}`}
                  title={`${t("projects.visit")} ${domain}`}
                >
                  <FiArrowUpRight />
                </a>
              )}
            </div>
          </div>
        </div>
      </article>
    </Tilt>
  );
}

export default ProjectCard;
