import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Particle from "../Particle";
import Github from "./Github";
import Techstack from "./Techstack";
import Aboutcard from "./AboutCard";
import laptopImg from "../../Assets/about.png";
import Toolstack from "./Toolstack";
import { useLang } from "../../context/LanguageContext";
import rich from "../../i18n/rich";
import usePageMeta from "../../hooks/usePageMeta";

function About() {
  const { t } = useLang();
  usePageMeta(t("titles.about"));
  return (
    <Container fluid className="about-section">
      <Particle />
      <Container>
        <Row style={{ justifyContent: "center", padding: "10px" }}>
          <Col md={7} style={{ justifyContent: "center", paddingTop: "30px", paddingBottom: "50px" }}>
            <h1 style={{ fontSize: "2.1em", paddingBottom: "20px" }}>{rich(t("about.title"))}</h1>
            <Aboutcard />
          </Col>
          <Col md={5} style={{ paddingTop: "120px", paddingBottom: "50px" }} className="about-img">
            <img src={laptopImg} alt="" className="img-fluid" />
          </Col>
        </Row>
        <h1 className="project-heading">{rich(t("about.skillSet"))}</h1>
        <Techstack />

        <h1 className="project-heading">{rich(t("about.tools"))}</h1>
        <Toolstack />

        <Github />
      </Container>
    </Container>
  );
}

export default About;
