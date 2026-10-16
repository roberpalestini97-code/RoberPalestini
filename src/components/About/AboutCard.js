import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";
import { profile, links, useCv } from "../../data/cv";
import { useLang } from "../../context/LanguageContext";
import rich from "../../i18n/rich";
import ContactButton from "../Contact/ContactButton";

function AboutCard() {
  const { t } = useLang();
  const { summary } = useCv();
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            {t("about.hi")} <span className="purple">{profile.name} </span>
            {t("about.from")} <span className="purple">{profile.location}.</span>
            <br />
            <br />
            {summary}
            <br />
            <br />
            {rich(t("about.studying"))}
            <br />
            <br />
            {t("about.contact")}:{" "}
            <ContactButton className="link-like">{t("about.sendMessage")}</ContactButton>
            <br />
            LinkedIn:{" "}
            <a href={links.linkedin} target="_blank" rel="noreferrer">
              {profile.name}
            </a>
            <br />
            Freelancer:{" "}
            <a href={links.freelancer} target="_blank" rel="noreferrer">
              roberpalestini
            </a>
            <br />
            <br />
            {t("about.activitiesIntro")}
          </p>
          <ul>
            {t("about.activities").map((a) => (
              <li className="about-activity" key={a}>
                <ImPointRight /> {a}
              </li>
            ))}
          </ul>

          <p style={{ marginBlockEnd: 0, color: "rgb(155 126 172)" }}>{t("about.quote")} </p>
          <footer className="blockquote-footer">Michael Beebower</footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
