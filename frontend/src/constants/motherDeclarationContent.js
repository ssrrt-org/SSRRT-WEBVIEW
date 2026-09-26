import content from "@/constants/docContent.json";

const raw = content.mother_declaration || [];

function stripQuotes(text) {
  return String(text || "")
    .replace(/^[\s"“]+/, "")
    .replace(/[\s"”]+$/, "")
    .trim();
}

export const declarationPageTitle = raw[0] || "Declaration of Amma's Avatharhood";

export const declarationMilestones = [
  { label: "Date", value: "29 March 1997" },
  { label: "Occasion", value: "50th year of Lalitha's advent" },
  { label: "Place", value: "Karekura Ashram" },
];

export const declarationPrologue = raw.slice(1, 3).filter(Boolean);

export const declarationAttributes = raw.slice(3, 13).map(stripQuotes).filter(Boolean);

export const declarationSlokaSection = {
  intro: raw[13] || "",
  lines: [raw[14], raw[15]].map(stripQuotes).filter(Boolean),
  meaning: (raw[16] || "").replace(/^\(Meaning:\s*/i, "").replace(/\)\s*$/, "").trim(),
};

export const declarationDiscourseIntro = declarationSlokaSection.intro;

export const declarationDiscourse = raw.slice(17, 49).filter(Boolean);

export const declarationProclamation = stripQuotes(raw[49] || "");

export const declarationClosing = raw[50] || "";

export const declarationAftermath = (raw[51] ? [raw[51]] : []);

export const declarationNadiIntro = raw[52] || "";

export const declarationNadiSlokas = [
  raw.slice(53, 55),
  raw.slice(56, 60),
].filter((group) => group.some((line) => line?.trim()));

export const declarationNadiGloss = raw[55] || "";

export const declarationNadiClosing = raw.slice(60).filter(Boolean);
