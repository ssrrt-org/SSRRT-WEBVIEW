import dattatreya from "@/constants/templeDocs/dattatreya.json";
import ganesha from "@/constants/templeDocs/ganesha.json";
import krishna from "@/constants/templeDocs/krishna.json";
import shirdi from "@/constants/templeDocs/shirdi.json";
import shiva from "@/constants/templeDocs/shiva.json";
import subramanya from "@/constants/templeDocs/subramanya.json";

const templeDocs = {
  krishna,
  shirdi,
  ganesha,
  subramanya,
  dattatreya,
  shiva,
};

export function getTempleDoc(templeId) {
  return templeDocs[templeId] || null;
}

export function templeDocParagraphs(templeId) {
  const doc = getTempleDoc(templeId);
  if (!doc?.sections?.length) return [];
  return doc.sections.flatMap((section) => [section.heading, ...(section.paragraphs || [])]);
}
