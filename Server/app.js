const express = require("express");
const cors = require("cors");
const config = require("./config");
const contactRoute = require("./Routes/contact");
const likesRoute = require("./Routes/likes");
const healthRoute = require("./Routes/health");

const app = express();

// Vercel (and most hosts) sit behind a proxy; needed for per-IP rate limiting.
app.set("trust proxy", 1);

// The site and the API are served from the same domain, so CORS is only
// needed when the front end lives elsewhere (set ALLOWED_ORIGINS then).
const allowedOrigins = config.getAllowedOrigins();
if (allowedOrigins.length) {
  app.use(cors({ origin: allowedOrigins }));
}
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

app.get("/", (req, res) => res.json({ message: "Server Running" }));

// Routes are also mounted under /api: used by the Vercel functions and the
// CRA dev proxy.
app.use(["/contact", "/api/contact"], contactRoute);
app.use(["/likes", "/api/likes"], likesRoute);
app.use(["/health", "/api/health"], healthRoute);

module.exports = app;
