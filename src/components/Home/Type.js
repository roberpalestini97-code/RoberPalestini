import React from "react";
import Typewriter from "typewriter-effect";
import { useCv } from "../../data/cv";
import { useLang } from "../../context/LanguageContext";

function Type() {
  const { roles } = useCv();
  const { lang } = useLang();
  return (
    <Typewriter
      key={lang}
      options={{ strings: roles, autoStart: true, loop: true, deleteSpeed: 50 }}
    />
  );
}

export default Type;
