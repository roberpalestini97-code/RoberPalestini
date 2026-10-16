import React from "react";
import { FiLock } from "react-icons/fi";

const bars = (n, cls = "mk-line") =>
  Array.from({ length: n }, (_, i) => <span key={i} className={cls} />);

function LandingScreen() {
  return (
    <div className="mk mk-landing">
      <div className="mk-nav">
        <span className="mk-logo" />
        <div className="mk-nav-links">{bars(4, "mk-pill")}</div>
      </div>
      <div className="mk-hero">
        <span className="mk-title" />
        <span className="mk-title short" />
        <span className="mk-line" />
        <div className="mk-cta">
          <span className="mk-btn" />
          <span className="mk-btn ghost" />
        </div>
      </div>
      <div className="mk-features">{bars(3, "mk-feature")}</div>
    </div>
  );
}

function AppScreen() {
  return (
    <div className="mk mk-app">
      <div className="mk-sidebar">
        <span className="mk-logo" />
        {bars(6, "mk-side-item")}
      </div>
      <div className="mk-main">
        <div className="mk-kpis">{bars(3, "mk-kpi")}</div>
        <div className="mk-chart">
          {[40, 65, 50, 80, 60, 92, 74, 88].map((h, i) => (
            <span key={i} className="mk-bar" style={{ height: `${h}%` }} />
          ))}
        </div>
        <div className="mk-table">{bars(4, "mk-row")}</div>
      </div>
    </div>
  );
}

function ApiScreen() {
  return (
    <div className="mk mk-api">
      <div className="mk-code">
        <div>
          <span className="c-method">GET</span>{" "}
          <span className="c-path">/v1/status</span>
        </div>
        <div className="c-dim">HTTP/1.1 200 OK</div>
        <div>{"{"}</div>
        <div className="c-indent">
          <span className="c-key">"service"</span>:{" "}
          <span className="c-str">"botpass-api"</span>,
        </div>
        <div className="c-indent">
          <span className="c-key">"status"</span>:{" "}
          <span className="c-str">"operational"</span>,
        </div>
        <div className="c-indent">
          <span className="c-key">"version"</span>:{" "}
          <span className="c-num">1</span>
        </div>
        <div>{"}"}</div>
        <div className="c-cursor">
          <span className="c-dim">$</span> <span className="mk-caret" />
        </div>
      </div>
    </div>
  );
}

function CorporateScreen() {
  return (
    <div className="mk mk-corporate">
      <div className="mk-nav">
        <span className="mk-logo" />
        <div className="mk-nav-links">{bars(3, "mk-pill")}</div>
      </div>
      <div className="mk-split">
        <div className="mk-split-text">
          <span className="mk-title" />
          <span className="mk-title short" />
          {bars(2)}
          <span className="mk-btn" />
        </div>
        <div className="mk-orb" />
      </div>
      <div className="mk-logos">{bars(5, "mk-logo-item")}</div>
    </div>
  );
}

function FintechScreen() {
  return (
    <div className="mk mk-fintech">
      <div className="mk-topbar">
        <span className="mk-logo" />
        <span className="mk-pill" />
      </div>
      <div className="mk-fin-grid">
        <div className="mk-fin-card">
          <span className="mk-line short" />
          <span className="mk-amount" />
          <svg viewBox="0 0 100 30" preserveAspectRatio="none" className="mk-spark">
            <polyline points="0,24 14,20 28,22 42,12 56,15 70,7 84,10 100,3" />
          </svg>
        </div>
        <div className="mk-fin-list">
          {["MT103", "MT199", "MT103", "MT199"].map((t, i) => (
            <div className="mk-tx" key={i}>
              <span className="mk-tag">{t}</span>
              <span className="mk-line" />
              <span className={`mk-dot ${i % 2 ? "warn" : "ok"}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function VideoScreen() {
  return (
    <div className="mk mk-video">
      <div className="mk-player">
        <span className="mk-play" />
        <div className="mk-progress">
          <span />
        </div>
      </div>
      <div className="mk-quote">
        <span className="mk-title short" />
        {bars(2)}
        <span className="mk-btn" />
      </div>
    </div>
  );
}

function SiteScreen() {
  return (
    <div className="mk mk-site">
      <div className="mk-banner">
        <span className="mk-sun" />
        <span className="mk-title" />
        <span className="mk-title short" />
      </div>
      <div className="mk-features">{bars(3, "mk-feature")}</div>
    </div>
  );
}

const screens = {
  landing: LandingScreen,
  app: AppScreen,
  api: ApiScreen,
  corporate: CorporateScreen,
  fintech: FintechScreen,
  video: VideoScreen,
  site: SiteScreen,
};

function BrowserMockup({ domain, screen = "site", image, hue = 280, isPrivate, compact }) {
  const Screen = screens[screen] || SiteScreen;
  return (
    <div
      className={`browser ${compact ? "browser-compact" : ""}`}
      style={{ "--hue": hue }}
      aria-hidden="true"
    >
      <div className="browser-bar">
        <span className="browser-dots">
          <i />
          <i />
          <i />
        </span>
        <span className="browser-url">
          <FiLock /> {isPrivate ? "internal · private network" : domain}
        </span>
      </div>
      <div className="browser-body">
        {image ? (
          <img src={image} alt="" className="browser-img" />
        ) : (
          <Screen />
        )}
      </div>
    </div>
  );
}

export default BrowserMockup;
