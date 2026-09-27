import baseContent from "@/constants/docContent.json";
import kaamadhenuDayDoc from "@/constants/kaamadhenuDayDoc.json";
import kaamadhenuDoc from "@/constants/kaamadhenuDoc.json";
import narayanaDoc from "@/constants/narayanaDoc.json";

const content = {
  ...baseContent,
  narayana: narayanaDoc,
  kaamadhenu: kaamadhenuDoc,
  kaamadhenu_day: kaamadhenuDayDoc,
};

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
  return paras
    .slice(start, end)
    .filter((p) => p.length >= minLen || isDocSectionHeading(p))
    .slice(0, max);
}

/** Section titles in seva / long-form docs (often short or use an em dash, no closing period). */
export function isDocSectionHeading(text) {
  const t = String(text || "").trim();
  if (!t || t.length > 180) return false;
  if (/^\[ PHOTOGRAPH \]/i.test(t)) return false;
  if (/^ITHI /i.test(t)) return false;
  if (/^II [A-Z]/.test(t) && t.length < 140) return false;
  if (t === t.toUpperCase() && t.length < 120 && !/[—–]/.test(t)) return false;
  if (/[—–]/.test(t) && !/[.!?]$/.test(t)) return true;
  if (t.length < 100 && !/[.!?]$/.test(t) && /^[A-Z"“(]/.test(t)) return true;
  return false;
}

function isProseParagraph(p) {
  const text = p.trim();
  if (!text) return false;
  if (isDocSectionHeading(text)) return true;
  if (/^\[ PHOTOGRAPH \]/i.test(text)) return false;
  if (/^ITHI /i.test(text)) return false;
  if (/^II [A-Z]/.test(text) && text.length < 140) return false;
  if (text === text.toUpperCase() && text.length < 120) return false;
  if (text.length < 80) {
    return /[.!?)"']$/.test(text);
  }
  return true;
}

/** Sanskrit / Nadi sloka line — preserve line breaks when rendering naadi sections. */
export function isSlokaLine(line) {
  const text = line.trim();
  if (!text) return false;
  if (/^ITHI /i.test(text)) return true;
  if (/^II [A-Z]/.test(text) && text.length < 220) return true;
  if (/^[A-Z][A-Z\s,.'’\-]+$/.test(text) && text.length < 200 && !text.startsWith('"')) return true;
  return false;
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
    let paras = content[key] || [];
    if (skip) paras = paras.slice(skip);
    if (max != null) paras = paras.slice(0, max);
    raw = paras;
  }
  return raw.filter(isProseParagraph);
}
