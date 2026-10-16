import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import homeLogo from "../../Assets/home-main.svg";
import Particle from "../Particle";
import Home2 from "./Home2";
import Type from "./Type";
import { profile } from "../../data/cv";
import { useLang } from "../../context/LanguageContext";
import usePageMeta from "../../hooks/usePageMeta";

function Home() {
  const { t } = useLang();
  usePageMeta(null);
  return (
    <section>
      <Container fluid className="home-section" id="home">
        <Particle />
        <Container className="home-content">
          <Row>
            <Col md={7} className="home-header">
              <h1 style={{ paddingBottom: 15 }} className="heading">
                {t("home.greeting")} <span className="wave">👋🏻</span>
              </h1>

              <h1 className="heading-name">
                {t("home.iAm")}
                <strong className="main-name"> {profile.name}</strong>
              </h1>

              <div style={{ padding: 50, textAlign: "left" }}>
                <Type />
              </div>
            </Col>

            <Col md={5} style={{ paddingBottom: 20 }}>
              <img src={homeLogo} alt="" className="img-fluid" />
            </Col>
          </Row>
        </Container>
      </Container>
      <Home2 />
    </section>
  );
}

export default Home;
