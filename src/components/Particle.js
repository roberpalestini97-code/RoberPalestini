import React from "react";
import Particles from "react-particles-js";
import { useTheme } from "../context/ThemeContext";

function Particle() {
  const { theme } = useTheme();
  return (
    <Particles
      key={theme}
      params={{
        particles: {
          number: { value: 160, density: { enable: true, value_area: 1500 } },
          color: { value: theme === "light" ? "#8a3fbf" : "#ffffff" },
          line_linked: { enable: false, opacity: 0.03 },
          move: { direction: "right", speed: 0.05 },
          size: { value: theme === "light" ? 1.4 : 1 },
          opacity: { anim: { enable: true, speed: 1, opacity_min: 0.05 } },
        },
        interactivity: {
          events: { onclick: { enable: true, mode: "push" } },
          modes: { push: { particles_nb: 1 } },
        },
        retina_detect: true,
      }}
    />
  );
}

export default Particle;
