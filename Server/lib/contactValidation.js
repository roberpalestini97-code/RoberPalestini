const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^\+?[\d\s().-]+$/;

const clean = (value) =>
  typeof value === "string" ? value.replace(/\s+/g, " ").trim() : "";

// Returns { data } when valid or { errors } keyed by field.
function validateContact(body = {}) {
  const name = clean(body.name);
  const phone = clean(body.phone);
  const email = clean(body.email).toLowerCase();
  const errors = {};

  if (name.length < 2 || name.length > 80) {
    errors.name = "Name must be between 2 and 80 characters.";
  }

  const digits = phone.replace(/\D/g, "");
  if (!PHONE_RE.test(phone) || digits.length < 7 || digits.length > 15) {
    errors.phone = "Enter a valid phone number (7 to 15 digits).";
  }

  if (email && (email.length > 254 || !EMAIL_RE.test(email))) {
    errors.email = "Enter a valid email or leave it empty.";
  }

  if (Object.keys(errors).length) return { errors };
  return { data: { name, phone, phoneDigits: digits, email: email || null } };
}

module.exports = { validateContact };
