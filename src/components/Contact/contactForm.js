import Swal from "sweetalert2";
import axios from "axios";
import "sweetalert2/dist/sweetalert2.min.css";
import "./contact.css";
import { API_URL } from "../../lib/api";
import ui from "../../i18n/ui";

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
  showClass: { popup: "rp-swal-in" },
  hideClass: { popup: "rp-swal-out" },
};

const escapeAttr = (v) => String(v).replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

const formHtml = (s) => `
  <p class="rp-swal-intro">${escapeAttr(s.intro)}</p>
  <form class="rp-form" novalidate autocomplete="on">
    <label class="rp-field">
      <span>${escapeAttr(s.name)} <em>*</em></span>
      <input id="rp-name" name="name" type="text" maxlength="80" autocomplete="name" placeholder="${escapeAttr(s.namePh)}" required />
    </label>
    <label class="rp-field">
      <span>${escapeAttr(s.phone)} <em>*</em></span>
      <input id="rp-phone" name="phone" type="tel" maxlength="25" autocomplete="tel" placeholder="${escapeAttr(s.phonePh)}" required />
    </label>
    <label class="rp-field">
      <span>${escapeAttr(s.email)} <small>${escapeAttr(s.optional)}</small></span>
      <input id="rp-email" name="email" type="email" maxlength="254" autocomplete="email" placeholder="${escapeAttr(s.emailPh)}" />
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

function validate({ name, phone, email }, s) {
  const errors = {};
  if (name.length < 2) errors["rp-name"] = s.errName;
  const digits = phone.replace(/\D/g, "");
  if (!PHONE_RE.test(phone) || digits.length < 7 || digits.length > 15) {
    errors["rp-phone"] = s.errPhone;
  }
  if (email && !EMAIL_RE.test(email)) errors["rp-email"] = s.errEmail;
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

const serverField = { name: ["rp-name", "errName"], phone: ["rp-phone", "errPhone"], email: ["rp-email", "errEmail"] };

const submit = (s, lang) => async () => {
  const data = readForm();
  const errors = validate(data, s);
  markInvalid(errors);
  if (Object.keys(errors).length) {
    Swal.showValidationMessage(Object.values(errors)[0]);
    return false;
  }

  try {
    await axios.post(`${API_URL}/contact`, { ...data, lang }, { timeout: 15000 });
    return true;
  } catch (err) {
    const res = err.response;
    if (res && res.status === 400 && res.data && res.data.errors) {
      const mapped = {};
      Object.keys(res.data.errors).forEach((k) => {
        if (serverField[k]) mapped[serverField[k][0]] = s[serverField[k][1]];
      });
      markInvalid(mapped);
      Swal.showValidationMessage(Object.values(mapped)[0] || s.errGeneric);
    } else if (res && res.status === 429) {
      Swal.showValidationMessage(s.errRate);
    } else {
      Swal.showValidationMessage(s.errGeneric);
    }
    return false;
  }
};

// Opens the contact form; resolves to true when the message was sent.
export async function openContactForm({ lang = "en" } = {}) {
  const s = (ui[lang] || ui.en).contact;
  const result = await Swal.fire({
    ...swalTheme,
    title: s.title,
    html: formHtml(s),
    showCancelButton: true,
    confirmButtonText: s.send,
    cancelButtonText: s.cancel,
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
    preConfirm: submit(s, lang),
  });

  if (result.isConfirmed) {
    await Swal.fire({
      ...swalTheme,
      customClass: { ...swalTheme.customClass, htmlContainer: "rp-swal-html rp-center" },
      icon: "success",
      title: s.okTitle,
      text: s.okText,
      confirmButtonText: s.okButton,
    });
    return true;
  }
  return false;
}
