import React from "react";
import { openContactForm } from "./contactForm";

// Reusable trigger for the contact form. Renders a <button> with whatever
// classes/children the caller needs, so it can look like a CTA, an icon or a link.
function ContactButton({ children, className = "", title, ...rest }) {
  return (
    <button
      type="button"
      className={`contact-trigger ${className}`}
      onClick={() => openContactForm(title ? { title } : undefined)}
      {...rest}
    >
      {children}
    </button>
  );
}

export default ContactButton;
