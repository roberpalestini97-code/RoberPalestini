import Swal from "sweetalert2";
import axios from "axios";
import "sweetalert2/dist/sweetalert2.min.css";
import "./contact.css";

// Same-origin "/api" by default (Vercel function in production, CRA proxy
// to Server/ in development). Override with REACT_APP_API_URL if needed.
const API_URL = (process.env.REACT_APP_API_URL || "/api").replace(/\/$/, "");

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^\+?[\d\s().-]+$/;

const swalTheme = {
  customClass: {
    popup: "rp-swal",
    title: "rp-swal-title",
    htmlContainer: "rp-swal-html",
    confirmButton: "rp-swal-confirm",
    cancelButton: "rp-swal-cancel",
    validationMessage: "rp-swal-validation",
    loader: "rp-swal-loader",
  },
  buttonsStyling: false,
  background: "transparent",
  color: "#f3eafa",
  showClass: { popup: "rp-swal-in" },
  hideClass: { popup: "rp-swal-out" },
};

const formHtml = `
  <p class="rp-swal-intro">Leave your details and I'll get back to you shortly.</p>
  <form class="rp-form" novalidate autocomplete="on">
    <label class="rp-field">
      <span>Name <em>*</em></span>
      <input id="rp-name" name="name" type="text" maxlength="80" autocomplete="name" placeholder="Your name" required />
    </label>
    <label class="rp-field">
      <span>Phone <em>*</em></span>
      <input id="rp-phone" name="phone" type="tel" maxlength="25" autocomplete="tel" placeholder="+54 9 223 000 0000" required />
    </label>
    <label class="rp-field">
      <span>Email <small>(optional)</small></span>
      <input id="rp-email" name="email" type="email" maxlength="254" autocomplete="email" placeholder="you@company.com" />
    </label>
    <input id="rp-company" name="company" type="text" tabindex="-1" autocomplete="off" class="rp-hp" aria-hidden="true" />
  </form>
`;

function readForm() {
  const value = (id) => document.getElementById(id).value.trim();
  return {
    name: value("rp-name"),
    phone: value("rp-phone"),
    email: value("rp-email"),
    company: value("rp-company"),
  };
}

function validate({ name, phone, email }) {
  const errors = {};
  if (name.length < 2) errors["rp-name"] = "Please enter your name.";
  const digits = phone.replace(/\D/g, "");
  if (!PHONE_RE.test(phone) || digits.length < 7 || digits.length > 15) {
    errors["rp-phone"] = "Please enter a valid phone number.";
  }
  if (email && !EMAIL_RE.test(email)) {
    errors["rp-email"] = "That email doesn't look right (or leave it empty).";
  }
  return errors;
}

function markInvalid(errors) {
  ["rp-name", "rp-phone", "rp-email"].forEach((id) => {
    const input = document.getElementById(id);
    if (!input) return;
    input.classList.toggle("is-invalid", Boolean(errors[id]));
    input.setAttribute("aria-invalid", errors[id] ? "true" : "false");
  });
  const first = Object.keys(errors)[0];
  if (first) document.getElementById(first).focus();
}

const serverFieldMap = { name: "rp-name", phone: "rp-phone", email: "rp-email" };

async function submit() {
  const data = readForm();
  const errors = validate(data);
  markInvalid(errors);
  if (Object.keys(errors).length) {
    Swal.showValidationMessage(Object.values(errors)[0]);
    return false;
  }

  try {
    await axios.post(`${API_URL}/contact`, data, { timeout: 15000 });
    return true;
  } catch (err) {
    const res = err.response;
    if (res && res.status === 400 && res.data && res.data.errors) {
      const mapped = {};
      Object.entries(res.data.errors).forEach(([k, v]) => {
        if (serverFieldMap[k]) mapped[serverFieldMap[k]] = v;
      });
      markInvalid(mapped);
      Swal.showValidationMessage(Object.values(res.data.errors)[0]);
    } else if (res && res.status === 429) {
      Swal.showValidationMessage(
        "Too many messages in a short time. Please try again later."
      );
    } else {
      Swal.showValidationMessage(
        "The message couldn't be sent right now. Please try again in a moment."
      );
    }
    return false;
  }
}

// Opens the contact form; resolves to true when the message was sent.
export async function openContactForm({ title = "Let's talk" } = {}) {
  const result = await Swal.fire({
    ...swalTheme,
    title,
    html: formHtml,
    showCancelButton: true,
    confirmButtonText: "Send",
    cancelButtonText: "Cancel",
    focusConfirm: false,
    reverseButtons: true,
    showLoaderOnConfirm: true,
    allowOutsideClick: () => !Swal.isLoading(),
    didOpen: (popup) => {
      document.getElementById("rp-name").focus();
      popup.querySelector(".rp-form").addEventListener("submit", (e) => {
        e.preventDefault();
        Swal.clickConfirm();
      });
      popup.querySelectorAll(".rp-field input").forEach((input) =>
        input.addEventListener("input", () => {
          input.classList.remove("is-invalid");
          Swal.resetValidationMessage();
        })
      );
    },
    preConfirm: submit,
  });

  if (result.isConfirmed) {
    await Swal.fire({
      ...swalTheme,
      customClass: { ...swalTheme.customClass, htmlContainer: "rp-swal-html rp-center" },
      icon: "success",
      iconColor: "#c770f0",
      title: "Message sent!",
      text: "Thanks for reaching out. I'll contact you very soon.",
      confirmButtonText: "Great",
    });
    return true;
  }
  return false;
}
