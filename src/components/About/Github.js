import React, { useEffect, useMemo, useState } from "react";
import { Row } from "react-bootstrap";
import { links } from "../../data/cv";
import { useLang } from "../../context/LanguageContext";
import rich from "../../i18n/rich";
import "./github.css";

// Public contributions API (the one react-github-calendar uses today).
const API = "https://github-contributions-api.jogruber.de/v4";
const CELL = 12;
const GAP = 3;

function toWeeks(days) {
  const weeks = [];
  let week = [];
  days.forEach((d, i) => {
    const weekday = new Date(`${d.date}T00:00:00`).getDay();
    if (i === 0) week = Array(weekday).fill(null);
    week.push(d);
    if (weekday === 6) {
      weeks.push(week);
      week = [];
    }
  });
  if (week.length) weeks.push(week);
  return weeks;
}

function Github() {
  const { t, lang } = useLang();
  const [state, setState] = useState({ status: "loading", days: [], total: 0 });

  useEffect(() => {
    let cancelled = false;
    fetch(`${API}/${links.githubUser}?y=last`)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((data) => {
        if (cancelled) return;
        const days = Array.isArray(data.contributions) ? data.contributions : [];
        const total = data.total ? data.total.lastYear || 0 : 0;
        setState({ status: days.length ? "ok" : "error", days, total });
      })
      .catch(() => !cancelled && setState({ status: "error", days: [], total: 0 }));
    return () => {
      cancelled = true;
    };
  }, []);

  const weeks = useMemo(() => toWeeks(state.days), [state.days]);
  const months = useMemo(() => {
    const fmt = new Intl.DateTimeFormat(lang === "es" ? "es-AR" : "en-US", { month: "short" });
    const out = [];
    let last = -1;
    weeks.forEach((w, i) => {
      const first = w.find(Boolean);
      if (!first) return;
      const m = new Date(`${first.date}T00:00:00`).getMonth();
      if (m !== last) {
        out.push({ i, label: fmt.format(new Date(`${first.date}T00:00:00`)) });
        last = m;
      }
    });
    return out.filter((m, idx) => idx === 0 || m.i - out[idx - 1].i >= 3);
  }, [weeks, lang]);

  // Hide the whole block if the public API is down: no "Error" boxes.
  if (state.status === "error") return null;

  const width = weeks.length * (CELL + GAP);
  const height = 7 * (CELL + GAP) + 18;

  return (
    <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
      <h1 className="project-heading" style={{ paddingBottom: "20px" }}>
        {rich(t("about.codeDays"))}
      </h1>
      <div className="gh-cal">
        {state.status === "loading" ? (
          <div className="gh-cal-skeleton" aria-hidden="true" />
        ) : (
          <>
            <div className="gh-cal-scroll">
              <svg
                width={width}
                height={height}
                viewBox={`0 0 ${width} ${height}`}
                role="img"
                aria-label={`${state.total} contributions in the last year`}
              >
                {months.map((m) => (
                  <text key={m.i} x={m.i * (CELL + GAP)} y={10} className="gh-cal-month">
                    {m.label}
                  </text>
                ))}
                {weeks.map((w, wi) =>
                  w.map((d, di) =>
                    d ? (
                      <rect
                        key={d.date}
                        x={wi * (CELL + GAP)}
                        y={18 + di * (CELL + GAP)}
                        width={CELL}
                        height={CELL}
                        rx={3}
                        className={`gh-l${d.level}`}
                      >
                        <title>{`${d.count} · ${d.date}`}</title>
                      </rect>
                    ) : null
                  )
                )}
              </svg>
            </div>
            <div className="gh-cal-footer">
              <a href={links.github} target="_blank" rel="noreferrer">
                {state.total} {lang === "es" ? "contribuciones en el último año" : "contributions in the last year"}
              </a>
              <span className="gh-cal-legend" aria-hidden="true">
                {[0, 1, 2, 3, 4].map((l) => (
                  <i key={l} className={`gh-l${l}`} />
                ))}
              </span>
            </div>
          </>
        )}
      </div>
    </Row>
  );
}

export default Github;
