import { useEffect } from "react";

/** Sets the browser tab title and meta description while the page is mounted, then restores them. */
export default function useDocumentMeta(title, description) {
  useEffect(() => {
    const previousTitle = document.title;
    if (title) document.title = title;

    let meta = document.querySelector('meta[name="description"]');
    const createdMeta = !meta;
    const previousDescription = meta?.getAttribute("content");
    if (description) {
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("name", "description");
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", description);
    }

    return () => {
      document.title = previousTitle;
      if (!description || !meta) return;
      if (createdMeta) meta.remove();
      else meta.setAttribute("content", previousDescription ?? "");
    };
  }, [title, description]);
}
