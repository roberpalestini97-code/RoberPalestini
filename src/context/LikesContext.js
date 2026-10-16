import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { API_URL } from "../lib/api";
import { readPref, writePref } from "./storage";

const STORAGE_KEY = "liked";

const LikesContext = createContext({
  enabled: false,
  counts: {},
  liked: {},
  like: () => {},
  mostLiked: null,
});

const readLiked = () => {
  try {
    return JSON.parse(readPref(STORAGE_KEY) || "{}") || {};
  } catch (e) {
    return {};
  }
};

export function LikesProvider({ children }) {
  const [counts, setCounts] = useState({});
  const [enabled, setEnabled] = useState(false);
  const [liked, setLiked] = useState(readLiked);

  useEffect(() => {
    let cancelled = false;
    axios
      .get(`${API_URL}/likes`, { timeout: 8000 })
      .then(({ data }) => {
        if (cancelled) return;
        setEnabled(Boolean(data.enabled));
        setCounts(data.counts || {});
      })
      .catch(() => {
        if (!cancelled) setEnabled(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const like = useCallback(
    (id) => {
      if (liked[id]) return;
      const nextLiked = { ...liked, [id]: true };
      setLiked(nextLiked);
      writePref(STORAGE_KEY, JSON.stringify(nextLiked));
      // Optimistic: show the new number right away, then trust the server.
      setCounts((c) => ({ ...c, [id]: (c[id] || 0) + 1 }));
      axios
        .post(`${API_URL}/likes`, { id }, { timeout: 8000 })
        .then(({ data }) => {
          if (typeof data.count === "number") setCounts((c) => ({ ...c, [id]: data.count }));
        })
        .catch(() => {
          /* keep the optimistic state; the like is remembered locally */
        });
    },
    [liked]
  );

  const mostLiked = useMemo(() => {
    let best = null;
    Object.entries(counts).forEach(([id, n]) => {
      if (id === "portfolio" || n < 1) return;
      if (!best || n > best.n) best = { id, n };
    });
    return best && best.id;
  }, [counts]);

  const value = useMemo(
    () => ({ enabled, counts, liked, like, mostLiked }),
    [enabled, counts, liked, like, mostLiked]
  );
  return <LikesContext.Provider value={value}>{children}</LikesContext.Provider>;
}

export const useLikes = () => useContext(LikesContext);
