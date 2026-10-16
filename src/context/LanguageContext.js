import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import ui from "../i18n/ui";
import { readPref, writePref } from "./storage";

const LANGS = ["en", "es"];

function initialLang() {
  const saved = readPref("lang");
  if (LANGS.includes(saved)) return saved;
  const nav = (typeof navigator !== "undefined" && navigator.language) || "en";
  return nav.toLowerCase().startsWith("es") ? "es" : "en";
}

const get = (obj, path) =>
  path.split(".").reduce((acc, k) => (acc == null ? acc : acc[k]), obj);

const LanguageContext = createContext({ lang: "en", setLang: () => {}, t: (k) => k });

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(initialLang);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((next) => {
    setLangState(next);
    writePref("lang", next);
  }, []);

  // t("projects.title") → string for the current language, falling back to English.
  const t = useCallback(
    (key, vars) => {
      let value = get(ui[lang], key);
      if (value == null) value = get(ui.en, key);
      if (value == null) return key;
      if (vars && typeof value === "string") {
        Object.entries(vars).forEach(([k, v]) => {
          value = value.replace(`{${k}}`, v);
        });
      }
      return value;
    },
    [lang]
  );

  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export const useLang = () => useContext(LanguageContext);
