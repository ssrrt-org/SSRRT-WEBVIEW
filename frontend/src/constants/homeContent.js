import { docExcerpt, docTitle, proseParas } from "@/lib/docContent";
import { narayanaCardExcerpt, narayanaTitle } from "@/constants/narayanaContent";
import { HOME_CARD_IMAGES } from "@/lib/media";

export const motherHomeIntro = proseParas("mother_home", { max: 1 })[0] || "";

export const motherVirtues = proseParas("mother_home")
  .slice(1, 6)
  .map((line) => {
    const [name, ...rest] = line.split(" — ");
    return { name: name.trim(), text: rest.join(" — ").trim() };
  })
  .filter((v) => v.name && v.text);

export const motherHomeNarrative = proseParas("mother_home", { skip: 6, max: 1 })[0] || "";

export const trustHomeParagraphs = proseParas("mother_home", { skip: 7 });

export const heroLede = proseParas("sacred_ashram", { skip: 4, max: 1 })[0] || "";

export const homePillars = [
  {
    n: "01",
    title: "Project Kaamadhenau",
    text: docExcerpt("goshala_adopt", { skip: 1, maxLen: 120 }),
    path: "/goshala",
    linkLabel: "About the Goshala",
  },
  {
    n: "02",
    title: "Food for the Needy",
    text: docExcerpt("food", { skip: 1, maxLen: 120 }),
    path: "/seva/food",
    linkLabel: "About food seva",
  },
  {
    n: "03",
    title: "Free Medical Centre",
    text: docExcerpt("medical", { skip: 1, maxLen: 120 }),
    path: "/seva/medical",
    linkLabel: "About medical seva",
  },
  {
    n: "04",
    title: "Sacred Ashram",
    text: docExcerpt("sacred_ashram", { skip: 4, maxLen: 120 }),
    path: "/ashram",
    linkLabel: "About the Ashram",
  },
];

export const homeProgrammeTiles = [
  {
    id: "goshala",
    to: "/goshala",
    title: "Goshala",
    tag: "Gau seva",
    note: docExcerpt("goshala_adopt", { skip: 1, maxLen: 100 }),
    image: HOME_CARD_IMAGES.goshala,
  },
  {
    id: "medical",
    to: "/seva/medical",
    title: "Medical Service",
    tag: "Free care",
    note: docExcerpt("medical", { skip: 1, maxLen: 100 }),
    image: HOME_CARD_IMAGES.medical,
  },
  {
    id: "narayana",
    to: "/seva/narayana",
    title: narayanaTitle,
    tag: "Annual programme",
    note: narayanaCardExcerpt,
    image: HOME_CARD_IMAGES.narayana,
  },
  {
    id: "village",
    to: "/rural-upliftment",
    title: "Village Improvement Project",
    tag: "Rural upliftment",
    note: docExcerpt("goshala_volunteer", { skip: 1, maxLen: 100 }),
    image: HOME_CARD_IMAGES.village,
  },
];

/** “Ashram as a Whole” pilgrimage copy on the home page. */
export const homeAshramPilgrimageParagraphs = proseParas("sacred_ashram", { skip: 10, max: 4 });

export const homeAshramInvitation =
  proseParas("sacred_ashram", { skip: 14, max: 1 })[0]?.replace(/^"|"$/g, "") || "";

export const homeVisitTitle = proseParas("sacred_ashram", { skip: 15, max: 1 })[0] || "Visit the Ashram";

export const homeVisitParagraph = proseParas("sacred_ashram", { skip: 16, max: 1 })[0] || "";

export const homeVisitTagline = proseParas("sacred_ashram", { skip: 17, max: 1 })[0] || "";

export const homeAshramClosingMantra = proseParas("sacred_ashram", { skip: 18, max: 1 })[0] || "";
