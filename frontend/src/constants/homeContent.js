import { docExcerpt, docTitle, proseParas } from "@/lib/docContent";
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
    title: "Narayan Seva",
    tag: "Food seva",
    note: docExcerpt("food", { skip: 1, maxLen: 100 }),
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

export const homeNarayanaParagraphs = proseParas("food", { skip: 1, max: 2 });

export const homeVisitParagraph = proseParas("sacred_ashram", { skip: 7, max: 1 })[0] || "";
