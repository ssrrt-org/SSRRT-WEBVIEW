import kaamadhenuDoc from "@/constants/kaamadhenuDoc.json";
import { isDocSectionHeading } from "@/lib/docContent";

export const kaamadhenuTitle = "PROJECT KAAMADHENU";
export const kaamadhenuEyebrow = "Project Kaamadhenu";
/** Hub-style page head (matches Mother for the Needy). */
export const kaamadhenuHeadTitle =
  "A story of compassion, devotion, and sustainable living.";
export const kaamadhenuHeadLede =
  "The sacred cow shelter of Srimad Sai Rajarajeshwari Ashram.";
export const kaamadhenuSubtitle =
  "The Sacred Cow Shelter of Srimad Sai Rajarajeshwari Ashram";
export const kaamadhenuTagline =
  "A Story of Compassion, Devotion, and Sustainable Living";
export const kaamadhenuOpeningQuote =
  "The cow is our mother. She nourishes us as we grow. Protecting her is not tradition — it is gratitude.";

export const kaamadhenuCalloutQuote = kaamadhenuDoc.find((p) =>
  p.startsWith("To care for a cow"),
);
export const kaamadhenuCalloutBody = kaamadhenuDoc.find((p) =>
  p.startsWith("For devotees who come"),
);

const calloutTexts = new Set([kaamadhenuCalloutQuote, kaamadhenuCalloutBody]);

function keepProseBlock(p) {
  const t = String(p || "").trim();
  if (!t || t.startsWith("__CALLOUT") || calloutTexts.has(t)) return false;
  if (isDocSectionHeading(t)) return true;
  if (t.length < 80) return /[.!?)"']$/.test(t);
  return true;
}

/** Doc indices 0–3 are page meta + hero quote; 4–5 are Amma's Vision heading + lead. */
export const kaamadhenuVisionHeading = kaamadhenuDoc[4] || "";
export const kaamadhenuVisionLead = kaamadhenuDoc[5] || "";

const body = kaamadhenuDoc.slice(6);
const calloutAt = body.findIndex((p) => p === "__CALLOUT_QUOTE__");

export const kaamadhenuParagraphsBefore = body.slice(0, calloutAt).filter(keepProseBlock);
export const kaamadhenuParagraphsBeforeBody = kaamadhenuParagraphsBefore;
export const kaamadhenuParagraphsAfter = body.slice(calloutAt + 3).filter(keepProseBlock);

export const kaamadhenuStatsTitle = "By the Numbers — Project Kaamadhenu Today";

export const kaamadhenuStats = [
  { value: "300+", label: "cows in total residence" },
  { value: "~80", label: "calves — the future of the herd" },
  { value: "Zero", label: "bulls sent to slaughter — fully protected" },
  { value: "20+", label: "years of continuous, unbroken care" },
  {
    value: "Organic",
    label: "grass field supplying daily green fodder",
  },
  {
    value: "Biogas",
    label: "programme planned for full energy self-sufficiency",
  },
];
