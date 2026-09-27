import narayanaDoc from "@/constants/narayanaDoc.json";
import { docTitle, proseParas } from "@/lib/docContent";

export const narayanaEyebrow = "Service to Humanity is Service to God";
export const narayanaTitle = docTitle("narayana");
export const narayanaLede =
  "An Annual Programme of the Srimad Sai Rajarajeshwari Trust — under the Divine Guidance of Beloved Amma.";
export const narayanaOpeningQuote =
  "He who feeds the hungry feeds God. He who serves the suffering serves the Divine. This is not metaphor — it is the deepest truth of all spiritual paths.";
export const narayanaParagraphs = proseParas("narayana", { skip: 5 });
const cardSource =
  narayanaDoc.find((p) => p.includes("10,000 to 15,000")) ||
  narayanaDoc.find((p) => p.length > 120) ||
  "";
export const narayanaCardExcerpt =
  cardSource.length <= 160 ? cardSource : `${cardSource.slice(0, 160).trim()}…`;
