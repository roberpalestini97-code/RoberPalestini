import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Tilt from "react-parallax-tilt";
import { AiFillGithub, AiOutlineMessage } from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";
import { SiFreelancer } from "react-icons/si";
import myImg from "../../Assets/avatar.svg";
import { links } from "../../data/cv";
import { useLang } from "../../context/LanguageContext";
import rich from "../../i18n/rich";
import ContactButton from "../Contact/ContactButton";

function Home2() {
  const { t } = useLang();
  const intro = t("home.intro");
  return (
    <Container fluid className="home-about-section" id="about">
      <Container>
        <Row>
          <Col md={8} className="home-about-description">
            <h1 style={{ fontSize: "2.6em" }}>{rich(t("home.introTitle"))}</h1>
            <div className="home-about-body">
              {intro.map((p) => (
                <p key={p}>{rich(p)}</p>
              ))}
            </div>
          </Col>
          <Col md={4} className="myAvatar">
            <Tilt>
              <img src={myImg} className="img-fluid" alt="" />
            </Tilt>
          </Col>
        </Row>
        <Row>
          <Col md={12} className="home-about-social">
            <h1>{t("home.findMe")}</h1>
            <p>{rich(t("home.connect"))}</p>
            <ul className="home-about-social-links">
              <li className="social-icons">
                <a
                  href={links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour home-social-icons"
                  aria-label="GitHub"
                >
                  <AiFillGithub />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href={links.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour home-social-icons"
                  aria-label="LinkedIn"
                >
                  <FaLinkedinIn />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href={links.freelancer}
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour home-social-icons"
                  aria-label="Freelancer"
                >
                  <SiFreelancer />
                </a>
              </li>
              <li className="social-icons">
                <ContactButton
                  className="icon-colour home-social-icons"
                  aria-label={t("home.contactMe")}
                  title={t("home.contactMe")}
                >
                  <AiOutlineMessage />
                </ContactButton>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
export default Home2;
