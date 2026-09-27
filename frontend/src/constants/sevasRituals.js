import { docTitle, proseParas } from "@/lib/docContent";

export const ashramRituals = [
  {
    id: "ganesh-abhisheka",
    path: "/sevas/ganesh-abhisheka",
    title: docTitle("ganesha_seva"),
    eyebrow: "Ganesha Sannidhi",
    intro: "Sacred abhisheka at the Ganesha sannidhi — sweetness, wisdom, and new beginnings.",
    paragraphs: proseParas("ganesha_seva", { skip: 1 }),
    bookPath: "/sevas/ganesh-abhisheka/book",
  },
  {
    id: "nandi-abhisheka",
    path: "/sevas/nandi-abhisheka",
    title: docTitle("nandi_seva"),
    eyebrow: "Seva at the Ashram",
    intro: "A traditional abhisheka to Shiva's faithful companion — held at the grand mantapa.",
    paragraphs: proseParas("nandi_seva", { skip: 1 }),
    bookPath: "/sevas/nandi-abhisheka/book",
  },
  {
    id: "subramanya-seva",
    path: "/sevas/subramanya-seva",
    title: docTitle("subramanya_seva"),
    eyebrow: "Subramanya Sannidhi",
    intro: "Abhisheka and seva offered to Lord Subramanya, commander of the divine army.",
    paragraphs: proseParas("subramanya_seva", { skip: 1 }),
    bookPath: "/sevas/subramanya-seva/book",
  },
];
