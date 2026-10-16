// Runtime configuration read from environment variables.
// Copy .env.example to .env (or set the vars in Vercel) before starting.
require("dotenv").config();

// Inbox that receives every contact form submission.
const DEFAULT_CONTACT_TO = "roberpalestini97@gmail.com";

// Values pasted into a dashboard often carry stray spaces or quotes.
const clean = (value) => (value || "").trim().replace(/^(["'])(.*)\1$/, "$2").trim();

const list = (value) =>
  (value || "")
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean);

module.exports = {
  DEFAULT_CONTACT_TO,
  getAllowedOrigins: () => list(process.env.ALLOWED_ORIGINS),
  getMail: () => ({
    transport: process.env.MAIL_TRANSPORT || "smtp",
    host: clean(process.env.SMTP_HOST) || "smtp.gmail.com",
    port: Number(clean(process.env.SMTP_PORT) || 465),
    secure: clean(process.env.SMTP_SECURE).toLowerCase() !== "false",
    user: clean(process.env.SMTP_USER),
    // Gmail shows app passwords in groups ("abcd efgh ijkl mnop"); they never contain spaces.
    pass: clean(process.env.SMTP_PASS).replace(/\s+/g, ""),
    from: clean(process.env.MAIL_FROM) || clean(process.env.SMTP_USER),
    to: clean(process.env.CONTACT_TO) || DEFAULT_CONTACT_TO,
    sendConfirmation: process.env.SEND_CONFIRMATION !== "false",
  }),
};
