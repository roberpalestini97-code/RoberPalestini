import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import myImg from "../../Assets/avatar.svg";
import Tilt from "react-parallax-tilt";
import { AiFillGithub, AiOutlineMessage } from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";
import { SiFreelancer } from "react-icons/si";
import { profile, links } from "../../data/cv";
import ContactButton from "../Contact/ContactButton";

function Home2() {
  return (
    <Container fluid className="home-about-section" id="about">
      <Container>
        <Row>
          <Col md={8} className="home-about-description">
            <h1 style={{ fontSize: "2.6em" }}>
              Let Me <span className="purple"> Introduce </span> Myself
            </h1>
            <p className="home-about-body">
              I'm a <b className="purple">{profile.title}</b> with{" "}
              <b className="purple">{profile.years} years</b> building and
              shipping web platforms end to end.
              <br />
              <br />
              I work across the whole stack:
              <i>
                <b className="purple"> React and Next.js </b>
              </i>
              front ends,
              <i>
                <b className="purple"> Node.js / NestJS, Java and .NET </b>
              </i>
              back ends, and
              <i>
                <b className="purple"> AWS / Azure </b>
              </i>
              cloud infrastructure with Docker, Kubernetes and CI/CD.
              <br />
              <br />
              I've delivered banking systems at
              <b className="purple"> Bank COMAFI </b> and
              <b className="purple"> Bank of Galicia </b>
              (financial transactions, OAuth2/JWT security, microservices) and,
              most recently, an entire SaaS product —
              <a
                href={links.botpass}
                target="_blank"
                rel="noreferrer"
                className="purple"
              >
                <b> BotPass</b>
              </a>{" "}
              — from infrastructure to API, web app and WordPress plugin, using
              an <b className="purple">AI-first workflow</b>.
              <br />
              <br />
              Today I'm deepening into
              <i>
                <b className="purple">
                  {" "}
                  Agentic AI: RAG, LangChain/LangGraph, MCP and multi-agent
                  systems.
                </b>
              </i>
            </p>
          </Col>
          <Col md={4} className="myAvatar">
            <Tilt>
              <img src={myImg} className="img-fluid" alt="avatar" />
            </Tilt>
          </Col>
        </Row>
        <Row>
          <Col md={12} className="home-about-social">
            <h1>Find Me On</h1>
            <p>
              Feel free to <span className="purple">connect </span>with me
            </p>
            <ul className="home-about-social-links">
              <li className="social-icons">
                <a
                  href={links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
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
                  className="icon-colour  home-social-icons"
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
                  className="icon-colour  home-social-icons"
                  aria-label="Freelancer"
                >
                  <SiFreelancer />
                </a>
              </li>
              <li className="social-icons">
                <ContactButton
                  className="icon-colour home-social-icons"
                  aria-label="Contact me"
                  title="Contact me"
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
