import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import { profile } from "../data/cv";
import { useLang } from "../context/LanguageContext";

function WhatsAppButton() {
  const { t } = useLang();
  const href = `https://wa.me/${profile.whatsapp}?text=${encodeURIComponent(t("whatsapp.message"))}`;
  return (
    <a
      className="wa-float"
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={t("whatsapp.label")}
      title={t("whatsapp.label")}
    >
      <FaWhatsapp />
      <span className="wa-float-label">{t("whatsapp.label")}</span>
    </a>
  );
}

export default WhatsAppButton;
