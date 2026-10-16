import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { AiOutlineDownload } from "react-icons/ai";
import Particle from "../Particle";
import { useCv, cvPdf, cvFileName } from "../../data/cv";
import { useLang } from "../../context/LanguageContext";
import usePageMeta from "../../hooks/usePageMeta";

function ResumeItem({ title, subtitle, period, children }) {
  return (
    <div className="resume-item">
      <h5 className="resume-title">{title}</h5>
      {subtitle && <p className="resume-subtitle">{subtitle}</p>}
      <p className="resume-period">{period}</p>
      {children}
    </div>
  );
}

function DownloadButton({ label }) {
  return (
    <Row style={{ justifyContent: "center", position: "relative" }}>
      <Button
        variant="primary"
        href={cvPdf}
        target="_blank"
        rel="noreferrer"
        download={cvFileName}
        style={{ maxWidth: "250px" }}
      >
        <AiOutlineDownload />
        &nbsp;{label}
      </Button>
    </Row>
  );
}

function Resume() {
  const { t } = useLang();
  const { experience, education, summary } = useCv();
  usePageMeta(t("titles.resume"));
  return (
    <Container fluid className="resume-section">
      <Particle />
      <Container>
        <DownloadButton label={t("resume.download")} />
        <Row className="resume">
          <Col md={12}>
            <h3 className="resume-title">{t("resume.summary")}</h3>
            <p style={{ textAlign: "justify" }}>{summary}</p>
          </Col>
          <Col md={7} className="resume-left">
            <h3 className="resume-title">{t("resume.experience")}</h3>
            {experience.map((job) => (
              <ResumeItem
                key={job.company + job.period}
                title={`${job.role.toUpperCase()} — ${job.company}`}
                subtitle={job.location}
                period={job.period}
              >
                <ul>
                  {job.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
                {job.link && (
                  <a href={job.link} target="_blank" rel="noreferrer">
                    {job.link.replace(/^https?:\/\/(www\.)?/, "")}
                  </a>
                )}
              </ResumeItem>
            ))}
          </Col>
          <Col md={5} className="resume-right">
            <h3 className="resume-title">{t("resume.education")}</h3>
            {education.map((ed) => (
              <ResumeItem
                key={ed.institution + ed.period}
                title={ed.title.toUpperCase()}
                subtitle={ed.institution}
                period={ed.period}
              >
                {ed.detail && (
                  <ul>
                    <li>{ed.detail}</li>
                  </ul>
                )}
              </ResumeItem>
            ))}
          </Col>
        </Row>
        <DownloadButton label={t("resume.download")} />
      </Container>
    </Container>
  );
}

export default Resume;
