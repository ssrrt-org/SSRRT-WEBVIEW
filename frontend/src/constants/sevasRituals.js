import { proseParas } from "@/lib/docContent";

export const ashramRituals = [
  {
    id: "nandi-abhisheka",
    path: "/sevas/nandi-abhisheka",
    title: "Nandi Abhisheka",
    eyebrow: "Seva at the Ashram",
    intro: "A traditional abhisheka to Shiva's faithful companion — held at the grand mantapa.",
    paragraphs: proseParas("nandi_seva", { skip: 1, max: 6 }),
  },
  {
    id: "butter-ganesha",
    path: "/sevas/butter-ganesha",
    title: "Ganesha Abhisheka and Butter Seva",
    eyebrow: "Seasonal offering · Ganesha Sannidhi",
    intro: "Sacred abhisheka and tender butter alankara at the Ganesha sannidhi.",
    paragraphs: proseParas("ganesha_seva", { skip: 1, max: 6 }),
  },
  {
    id: "butter-subramanya",
    path: "/sevas/butter-subramanya",
    title: "Subramanya Abhisheka and Butter Seva",
    eyebrow: "Seasonal offering · Subramanya Sannidhi",
    intro: "Abhisheka and butter seva offered to Lord Subramanya, commander of the divine army.",
    paragraphs: proseParas("subramanya_seva", { skip: 1, max: 6 }),
  },
];
