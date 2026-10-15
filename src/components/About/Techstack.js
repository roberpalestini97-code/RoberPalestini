import React from "react";
import { Col, Row } from "react-bootstrap";
import { DiNodejs, DiDotnet } from "react-icons/di";
import { FaRobot } from "react-icons/fa";
import {
  SiJavascript,
  SiTypescript,
  SiJava,
  SiPhp,
  SiReact,
  SiRedux,
  SiSpring,
  SiGraphql,
  SiPostgresql,
  SiMysql,
  SiOracle,
  SiMongodb,
  SiRedis,
  SiElasticsearch,
  SiDocker,
  SiKubernetes,
  SiAmazonaws,
  SiMicrosoftazure,
  SiWordpress,
  SiPython,
} from "react-icons/si";
import { skills } from "../../data/cv";

const icons = [
  { icon: <SiJavascript />, label: "JavaScript" },
  { icon: <SiTypescript />, label: "TypeScript" },
  { icon: <SiReact />, label: "React / Next.js" },
  { icon: <SiRedux />, label: "Redux" },
  { icon: <DiNodejs />, label: "Node.js / NestJS" },
  { icon: <SiJava />, label: "Java" },
  { icon: <SiSpring />, label: "Spring Boot" },
  { icon: <DiDotnet />, label: ".NET Core" },
  { icon: <SiPhp />, label: "PHP / Symfony" },
  { icon: <SiWordpress />, label: "WordPress" },
  { icon: <SiGraphql />, label: "GraphQL" },
  { icon: <SiPostgresql />, label: "PostgreSQL" },
  { icon: <SiMysql />, label: "MySQL" },
  { icon: <SiOracle />, label: "Oracle" },
  { icon: <SiMongodb />, label: "MongoDB" },
  { icon: <SiRedis />, label: "Redis" },
  { icon: <SiElasticsearch />, label: "Elasticsearch" },
  { icon: <SiDocker />, label: "Docker" },
  { icon: <SiKubernetes />, label: "Kubernetes" },
  { icon: <SiAmazonaws />, label: "AWS" },
  { icon: <SiMicrosoftazure />, label: "Azure" },
  { icon: <SiPython />, label: "Python" },
  { icon: <FaRobot />, label: "AI Agents / LLMs" },
];

function Techstack() {
  return (
    <>
      <Row style={{ justifyContent: "center", paddingBottom: "30px" }}>
        {icons.map(({ icon, label }) => (
          <Col xs={4} md={2} className="tech-icons" key={label} title={label}>
            {icon}
            <div className="tech-icon-label">{label}</div>
          </Col>
        ))}
      </Row>
      <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
        {skills.map(({ category, items }) => (
          <Col md={6} lg={4} key={category} className="skill-group">
            <h3 className="skill-group-title purple">{category}</h3>
            <div>
              {items.map((item) => (
                <span className="skill-badge" key={item}>
                  {item}
                </span>
              ))}
            </div>
          </Col>
        ))}
      </Row>
    </>
  );
}

export default Techstack;
