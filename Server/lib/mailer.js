const nodemailer = require("nodemailer");
const config = require("../config");

let cached;

// Returns { transporter, mail } or null when email is not configured.
// MAIL_TRANSPORT=json builds the messages without sending them (tests/dev).
function getMailer() {
  const mail = config.getMail();
  if (mail.transport === "json") {
    if (!cached || cached.kind !== "json") {
      cached = {
        kind: "json",
        transporter: nodemailer.createTransport({ jsonTransport: true }),
      };
    }
    return {
      transporter: cached.transporter,
      mail: {
        ...mail,
        from: mail.from || "portfolio@example.com",
        to: mail.to || "owner@example.com",
      },
    };
  }

  if (!mail.host || !mail.user || !mail.pass || !mail.to || !mail.from) {
    return null;
  }

  if (!cached || cached.kind !== "smtp") {
    cached = {
      kind: "smtp",
      transporter: nodemailer.createTransport({
        host: mail.host,
        port: mail.port,
        secure: mail.secure,
        auth: { user: mail.user, pass: mail.pass },
      }),
    };
  }
  return { transporter: cached.transporter, mail };
}

module.exports = { getMailer };
