import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { BiLinkExternal } from "react-icons/bi";

function ProjectCards(props) {
  return (
    <Card className="project-card-view">
      {props.imgPath && (
        <Card.Img variant="top" src={props.imgPath} alt={props.title} />
      )}
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        {props.subtitle && (
          <Card.Subtitle className="mb-2 purple">{props.subtitle}</Card.Subtitle>
        )}
        <Card.Text style={{ textAlign: "justify" }}>
          {props.description}
        </Card.Text>
        {props.stack && (
          <div style={{ paddingBottom: "15px" }}>
            {props.stack.map((t) => (
              <span className="skill-badge" key={t}>
                {t}
              </span>
            ))}
          </div>
        )}
        {props.link && (
          <Button
            variant="primary"
            href={props.link}
            target="_blank"
            rel="noreferrer"
          >
            <BiLinkExternal /> &nbsp;
            {props.isBlog ? "View Blog" : "View Project"}
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}
export default ProjectCards;
