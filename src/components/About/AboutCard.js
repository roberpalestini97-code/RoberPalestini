import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";
import { profile, links, summary } from "../../data/cv";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            Hi, I'm <span className="purple">{profile.name} </span>
            from <span className="purple">{profile.location}.</span>
            <br />
            <br />
            {summary}
            <br />
            <br />
            Currently pursuing a{" "}
            <span className="purple">
              Master in Agentic AI Automation Engineering
            </span>{" "}
            (EBIS), a{" "}
            <span className="purple">University Diploma in DevOps</span> (UNC)
            and <span className="purple">Software Engineering</span> (UTN).
            <br />
            <br />
            Email:{" "}
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
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
            Apart from coding, these are some other activities that I enjoy:
          </p>
          <ul>
            <li className="about-activity">
              <ImPointRight /> Camping
            </li>
            <li className="about-activity">
              <ImPointRight /> Traveling
            </li>
            <li className="about-activity">
              <ImPointRight /> Listening to Music
            </li>
          </ul>

          <p style={{ marginBlockEnd: 0, color: "rgb(155 126 172)" }}>
            "All repetitive, menial computer tasks can most likely be automated
            or partially automated with the right code."{" "}
          </p>
          <footer className="blockquote-footer">Michael Beebower</footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
