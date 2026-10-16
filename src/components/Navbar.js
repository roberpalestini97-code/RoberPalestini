import React, { useState, useEffect } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { CgGitFork, CgFileDocument } from "react-icons/cg";
import {
  AiFillStar,
  AiOutlineHome,
  AiOutlineFundProjectionScreen,
  AiOutlineUser,
  AiOutlineSolution,
} from "react-icons/ai";
import { BsSun, BsMoon } from "react-icons/bs";
import logo from "../Assets/logo.png";
import { links, cvPdf, cvFileName } from "../data/cv";
import { useLang } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";
import LikeButton from "./Likes/LikeButton";

function NavBar() {
  const [expand, updateExpanded] = useState(false);
  const [navColour, updateNavbar] = useState(false);
  const { lang, setLang, t } = useLang();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const scrollHandler = () => updateNavbar(window.scrollY >= 20);
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, []);

  const close = () => updateExpanded(false);

  return (
    <Navbar expanded={expand} fixed="top" expand="md" className={navColour ? "sticky" : "navbar"}>
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img src={logo} className="img-fluid logo" alt="Roberto Palestini" />
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          onClick={() => updateExpanded(expand ? false : "expanded")}
        >
          <span></span>
          <span></span>
          <span></span>
        </Navbar.Toggle>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto" defaultActiveKey="#home">
            <Nav.Item>
              <Nav.Link as={Link} to="/" onClick={close}>
                <AiOutlineHome style={{ marginBottom: "2px" }} /> {t("nav.home")}
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/about" onClick={close}>
                <AiOutlineUser style={{ marginBottom: "2px" }} /> {t("nav.about")}
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/project" onClick={close}>
                <AiOutlineFundProjectionScreen style={{ marginBottom: "2px" }} /> {t("nav.projects")}
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/resume" onClick={close}>
                <AiOutlineSolution style={{ marginBottom: "2px" }} /> {t("nav.experience")}
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href={cvPdf} target="_blank" rel="noreferrer" download={cvFileName} onClick={close}>
                <CgFileDocument style={{ marginBottom: "2px" }} /> {t("nav.cv")}
              </Nav.Link>
            </Nav.Item>

            <Nav.Item className="nav-tools">
              <button
                type="button"
                className="nav-tool"
                onClick={() => setLang(lang === "es" ? "en" : "es")}
                aria-label={t("nav.language")}
                title={t("nav.language")}
              >
                <span className={lang === "en" ? "on" : ""}>EN</span>
                <span className={lang === "es" ? "on" : ""}>ES</span>
              </button>
              <button
                type="button"
                className="nav-tool nav-theme"
                onClick={toggleTheme}
                aria-label={theme === "dark" ? t("nav.toLight") : t("nav.toDark")}
                title={theme === "dark" ? t("nav.toLight") : t("nav.toDark")}
              >
                {theme === "dark" ? <BsSun /> : <BsMoon />}
              </button>
              <LikeButton id="portfolio" variant="nav" label={t("likes.likePortfolio")} />
            </Nav.Item>

            <Nav.Item className="fork-btn">
              <Button
                href={links.freelancer}
                target="_blank"
                rel="noreferrer"
                title={t("nav.freelancer")}
                aria-label={t("nav.freelancer")}
                className="fork-btn-inner"
              >
                <CgGitFork style={{ fontSize: "1.2em" }} /> <AiFillStar style={{ fontSize: "1.1em" }} />
              </Button>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
