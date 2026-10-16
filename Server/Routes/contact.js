const express = require("express");
const rateLimit = require("express-rate-limit");
const { validateContact } = require("../lib/contactValidation");
const { getMailer } = require("../lib/mailer");

const router = express.Router();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: { status: 429, message: "Too many messages. Please try again later." },
});

const escapeHtml = (value) =>
  String(value).replace(
    /[&<>"']/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])
  );

function ownerMessage({ name, phone, phoneDigits, email }, mail) {
  const whatsapp = `https://wa.me/${phoneDigits}`;
  const rows = [
    ["Name", escapeHtml(name)],
    ["Phone", `<a href="tel:${escapeHtml(phone)}">${escapeHtml(phone)}</a> · <a href="${whatsapp}">WhatsApp</a>`],
    ["Email", email ? `<a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a>` : "—"],
  ];
  return {
    from: mail.from,
    to: mail.to,
    replyTo: email || undefined,
    subject: `New portfolio contact: ${name}`,
    text: `New contact from the portfolio\n\nName: ${name}\nPhone: ${phone}\nWhatsApp: ${whatsapp}\nEmail: ${email || "-"}\n`,
    html: `<div style="font-family:Arial,sans-serif;max-width:520px">
  <h2 style="color:#623686;margin:0 0 16px">New contact from your portfolio</h2>
  <table style="border-collapse:collapse;width:100%">${rows
    .map(
      ([k, v]) =>
        `<tr><td style="padding:8px 12px;background:#f4ecfa;font-weight:bold;width:90px">${k}</td><td style="padding:8px 12px;border-bottom:1px solid #eee">${v}</td></tr>`
    )
    .join("")}</table>
</div>`,
  };
}

function confirmationMessage({ name, email }, mail) {
  const first = name.split(" ")[0];
  return {
    from: mail.from,
    to: email,
    subject: "Thanks for reaching out — Roberto Palestini",
    text: `Hi ${first},\n\nThanks for getting in touch! I received your details and will contact you soon.\n\nRoberto Palestini\nSenior Full Stack Developer`,
    html: `<div style="font-family:Arial,sans-serif;max-width:520px">
  <p>Hi ${escapeHtml(first)},</p>
  <p>Thanks for getting in touch! I received your details and will contact you soon.</p>
  <p style="margin-top:24px">Roberto Palestini<br><span style="color:#623686">Senior Full Stack Developer</span></p>
</div>`,
  };
}

router.post("/", limiter, async (req, res) => {
  // Honeypot: real visitors never fill this hidden field.
  if (req.body && req.body.company) {
    return res.status(200).json({ status: 200, message: "Message sent" });
  }

  const { data, errors } = validateContact(req.body);
  if (errors) {
    return res.status(400).json({ status: 400, message: "Invalid data", errors });
  }

  const mailer = getMailer();
  if (!mailer) {
    console.error("Contact form: email service is not configured");
    return res
      .status(503)
      .json({ status: 503, message: "Email service is not configured." });
  }

  const { transporter, mail } = mailer;
  try {
    await transporter.sendMail(ownerMessage(data, mail));
  } catch (err) {
    console.error("Contact form: failed to send owner email", err);
    return res
      .status(502)
      .json({ status: 502, message: "The message could not be sent. Please try again." });
  }

  if (data.email && mail.sendConfirmation) {
    try {
      await transporter.sendMail(confirmationMessage(data, mail));
    } catch (err) {
      // The lead already reached the owner; a failed courtesy copy is not fatal.
      console.error("Contact form: failed to send confirmation email", err);
    }
  }

  return res.status(200).json({ status: 200, message: "Message sent" });
});

module.exports = router;
