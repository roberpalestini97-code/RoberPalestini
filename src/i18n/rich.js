import React from "react";

// Renders "**text**" segments as highlighted purple text.
export default function rich(text) {
  if (typeof text !== "string") return text;
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <b className="purple" key={i}>
        {part.slice(2, -2)}
      </b>
    ) : (
      <React.Fragment key={i}>{part}</React.Fragment>
    )
  );
}
