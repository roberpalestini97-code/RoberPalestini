import React from "react";
import Typewriter from "typewriter-effect";
import { roles } from "../../data/cv";

function Type() {
  return (
    <Typewriter
      options={{
        strings: roles,
        autoStart: true,
        loop: true,
        deleteSpeed: 50,
      }}
    />
  );
}

export default Type;
