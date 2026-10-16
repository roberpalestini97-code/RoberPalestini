import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { AiFillGithub, AiOutlineMessage } from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";
import { profile, links } from "../data/cv";
import ContactButton from "./Contact/ContactButton";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <Container fluid className="footer">
      <Row>
        <Col md="4" className="footer-copyright">
          <h3>Developed by {profile.name}</h3>
        </Col>
        <Col md="4" className="footer-copyright">
          <h3>Copyright © {year} RP</h3>
        </Col>
        <Col md="4" className="footer-body">
          <ul className="footer-icons">
            <li className="social-icons">
              <a
                href={links.github}
                style={{ color: "white" }}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
              >
                <AiFillGithub />
              </a>
            </li>
            <li className="social-icons">
              <a
                href={links.linkedin}
                style={{ color: "white" }}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn />
              </a>
            </li>
            <li className="social-icons">
              <ContactButton
                className="icon-like"
                style={{ color: "white" }}
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
  );
}

export default Footer;
