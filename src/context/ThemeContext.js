import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { readPref, writePref } from "./storage";

const ThemeContext = createContext({ theme: "dark", toggleTheme: () => {} });

// Dark by default; light only when the visitor picks it (remembered).
const initialTheme = () => (readPref("theme") === "light" ? "light" : "dark");

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(initialTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", theme === "light" ? "#f6f0fb" : "#0c0513");
  }, [theme]);

  const toggleTheme = useCallback(() => {
    const root = document.documentElement;
    root.classList.add("theme-transition");
    window.setTimeout(() => root.classList.remove("theme-transition"), 450);
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      writePref("theme", next);
      return next;
    });
  }, []);

  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => useContext(ThemeContext);
