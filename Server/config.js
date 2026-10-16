// Runtime configuration read from environment variables.
// Copy .env.example to .env (or set the vars in Vercel) before starting.
require("dotenv").config();

// Inbox that receives every contact form submission.
const DEFAULT_CONTACT_TO = "roberpalestini97@gmail.com";

const list = (value) =>
  (value || "")
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean);

module.exports = {
  DEFAULT_CONTACT_TO,
  getSecretToken: () => process.env.MONGODB_URI,
  getUser: () => process.env.SECRET_USER || "Roberto Palestini",
  getAllowedOrigins: () => list(process.env.ALLOWED_ORIGINS),
  getMail: () => ({
    transport: process.env.MAIL_TRANSPORT || "smtp",
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 465),
    secure: (process.env.SMTP_SECURE || "true") !== "false",
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
    from: process.env.MAIL_FROM || process.env.SMTP_USER,
    to: process.env.CONTACT_TO || DEFAULT_CONTACT_TO,
    sendConfirmation: process.env.SEND_CONFIRMATION !== "false",
  }),
};
