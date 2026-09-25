import { docExcerpt, docTitle } from "@/lib/docContent";

const SHIVA_MANTRA = "॥ ॐ नमः शिवाय ॥";

/** Split "Title — Subtitle" from doc first line. */
export function sacredHeroCopy(docKey, { breadcrumbLabel, mantra = SHIVA_MANTRA } = {}) {
  const fullTitle = docTitle(docKey);
  const dash = fullTitle.includes(" — ") ? fullTitle.split(" — ", 2) : [fullTitle, ""];
  const title = dash[0].trim();
  const tag = dash[1]?.trim() || "";
  return {
    breadcrumbCurrent: breadcrumbLabel || title,
    title,
    tag,
    mantra,
    intro: docExcerpt(docKey, { skip: 1, maxLen: 320 }),
  };
}
