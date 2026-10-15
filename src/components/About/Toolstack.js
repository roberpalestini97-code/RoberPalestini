import React from "react";
import { Col, Row } from "react-bootstrap";
import {
  SiVisualstudiocode,
  SiGithub,
  SiGitlab,
  SiJenkins,
  SiRedhatopenshift,
  SiTerraform,
  SiSwagger,
  SiPostman,
  SiLinux,
  SiJira,
  SiAdobeillustrator,
  SiAdobephotoshop,
} from "react-icons/si";
import { DiGit } from "react-icons/di";
import { FaRobot } from "react-icons/fa";

const tools = [
  { icon: <FaRobot />, label: "Claude Code" },
  { icon: <SiVisualstudiocode />, label: "VS Code" },
  { icon: <DiGit />, label: "Git" },
  { icon: <SiGithub />, label: "GitHub" },
  { icon: <SiGitlab />, label: "GitLab CI/CD" },
  { icon: <SiJenkins />, label: "Jenkins" },
  { icon: <SiRedhatopenshift />, label: "OpenShift" },
  { icon: <SiTerraform />, label: "Terraform" },
  { icon: <SiSwagger />, label: "Swagger / OpenAPI" },
  { icon: <SiPostman />, label: "Postman" },
  { icon: <SiLinux />, label: "Linux" },
  { icon: <SiJira />, label: "Jira" },
  { icon: <SiAdobeillustrator />, label: "Illustrator" },
  { icon: <SiAdobephotoshop />, label: "Photoshop" },
];

function Toolstack() {
  return (
    <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
      {tools.map(({ icon, label }) => (
        <Col xs={4} md={2} className="tech-icons" key={label} title={label}>
          {icon}
          <div className="tech-icon-label">{label}</div>
        </Col>
      ))}
    </Row>
  );
}

export default Toolstack;
