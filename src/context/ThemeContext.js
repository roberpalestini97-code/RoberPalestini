import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { readPref, writePref } from "./storage";

const ThemeContext = createContext({ theme: "dark", toggleTheme: () => {} });

const systemTheme = () =>
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";

export function ThemeProvider({ children }) {
  const saved = readPref("theme");
  const [theme, setTheme] = useState(saved === "light" || saved === "dark" ? saved : systemTheme);
  const [explicit, setExplicit] = useState(saved === "light" || saved === "dark");

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", theme);
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", theme === "light" ? "#f6f0fb" : "#0c0513");
  }, [theme]);

  // Follow the OS setting until the visitor picks a theme.
  useEffect(() => {
    if (explicit || !window.matchMedia) return undefined;
    const mq = window.matchMedia("(prefers-color-scheme: light)");
    const onChange = (e) => setTheme(e.matches ? "light" : "dark");
    if (mq.addEventListener) mq.addEventListener("change", onChange);
    else mq.addListener(onChange);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", onChange);
      else mq.removeListener(onChange);
    };
  }, [explicit]);

  const toggleTheme = useCallback(() => {
    const root = document.documentElement;
    root.classList.add("theme-transition");
    window.setTimeout(() => root.classList.remove("theme-transition"), 450);
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      writePref("theme", next);
      return next;
    });
    setExplicit(true);
  }, []);

  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => useContext(ThemeContext);
