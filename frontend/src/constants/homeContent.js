import { docExcerpt, docTitle, proseParas } from "@/lib/docContent";

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

export const homeNarayanaParagraphs = proseParas("food", { skip: 1, max: 2 });

export const homeVisitParagraph = proseParas("sacred_ashram", { skip: 7, max: 1 })[0] || "";
