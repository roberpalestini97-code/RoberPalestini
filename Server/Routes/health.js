const express = require("express");
const rateLimit = require("express-rate-limit");
const config = require("../config");
const { getMailer } = require("../lib/mailer");
const { getLikesStore } = require("../lib/likesStore");

const router = express.Router();

const smtpLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 5, standardHeaders: "draft-7", legacyHeaders: false });

// Reports what is configured (never the values). `?smtp=1` also tries to log
// in to the SMTP server and returns the exact error if it fails.
router.get("/", async (req, res, next) => {
  if (req.query.smtp) return smtpLimiter(req, res, next);
  return next();
}, async (req, res) => {
  const mail = config.getMail();
  const missing = ["SMTP_USER", "SMTP_PASS"].filter((k) => !process.env[k] || !process.env[k].trim());
  const store = getLikesStore();
  const body = {
    status: "ok",
    mail: {
      configured: missing.length === 0,
      missing,
      host: mail.host,
      port: mail.port,
      secure: mail.secure,
      to: mail.to,
    },
    likes: store ? store.kind : "disabled (connect Upstash Redis)",
  };

  if (req.query.smtp) {
    const mailer = getMailer();
    if (!mailer) {
      body.smtp = { ok: false, error: `Missing: ${missing.join(", ") || "configuration"}` };
    } else {
      try {
        await mailer.transporter.verify();
        body.smtp = { ok: true };
      } catch (err) {
        body.smtp = { ok: false, error: err.message, code: err.code, response: err.response };
      }
    }
  }

  res.set("Cache-Control", "no-store");
  res.status(200).json(body);
});

module.exports = router;
