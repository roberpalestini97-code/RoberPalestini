import { useEffect } from "react";

const BASE = "Roberto Palestini";

// Sets the tab title and meta description for the current page.
export default function usePageMeta(title, description) {
  useEffect(() => {
    document.title = title ? `${title} | ${BASE}` : `${BASE} | Senior Full Stack Developer`;
    if (description) {
      const meta = document.querySelector('meta[name="description"]');
      if (meta) meta.setAttribute("content", description);
    }
  }, [title, description]);
}
