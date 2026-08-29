import content from "@/constants/docContent.json";

/** Return paragraphs from extracted Word-doc content. */
export function docParas(key, { skip = 0, max, minLen = 50 } = {}) {
  let paras = (content[key] || []).filter((p) => p.length >= minLen);
  if (skip) paras = paras.slice(skip);
  if (max != null) paras = paras.slice(0, max);
  return paras;
}

/** First line of a doc (title / heading). */
export function docTitle(key, { minLen = 10 } = {}) {
  const line = (content[key] || []).find((p) => p.trim().length >= minLen);
  return line?.trim() || "";
}

/** Short excerpt for cards and previews. */
export function docExcerpt(key, { skip = 0, maxLen = 160 } = {}) {
  const para = docParas(key, { skip, max: 1, minLen: 40 })[0] || "";
  if (para.length <= maxLen) return para;
  return `${para.slice(0, maxLen).trim()}…`;
}

/** Slice paragraphs between optional start/end marker substrings. */
export function docSection(key, { from, until, max, minLen = 50 } = {}) {
  const paras = content[key] || [];
  let start = 0;
  let end = paras.length;
  if (from) {
    const i = paras.findIndex((p) => p.includes(from));
    if (i >= 0) start = i;
  }
  if (until) {
    const i = paras.findIndex((p, idx) => idx > start && p.includes(until));
    if (i >= 0) end = i;
  }
  return paras.slice(start, end).filter((p) => p.length >= minLen).slice(0, max);
}

function isProseParagraph(p) {
  const text = p.trim();
  if (!text) return false;
  if (/^\[ PHOTOGRAPH \]/i.test(text)) return false;
  if (/^ITHI /i.test(text)) return false;
  if (/^II [A-Z]/.test(text) && text.length < 140) return false;
  if (text === text.toUpperCase() && text.length < 120) return false;
  if (text.length < 80) {
    return /[.!?)"']$/.test(text);
  }
  return true;
}

/** Filter out headings, sloka fragments, and caption lines for readable body copy. */
export function proseParas(key, opts = {}) {
  const { from, until, skip, max, minLen } = opts;
  let raw;
  if (from || until) {
    raw = docSection(key, { from, until, max: max != null ? max + (skip || 0) : undefined, minLen });
    if (skip) raw = raw.slice(skip);
    if (max != null) raw = raw.slice(0, max);
  } else {
    raw = docParas(key, { skip, max, minLen });
  }
  return raw.filter(isProseParagraph);
}
