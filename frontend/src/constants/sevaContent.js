import { IMG } from "@/constants/images";
import { docTitle, proseParas } from "@/lib/docContent";

export const sevaPillars = [
  {
    id: "medical",
    path: "/seva/medical",
    navTitle: "Multi-village medical centre",
    title: docTitle("medical"),
    image: "/Seva images/sevas18.jpg",
    imageAlt: "Medical camp",
    reverse: false,
    tint: false,
    paragraphs: proseParas("medical", { skip: 1 }),
  },
  {
    id: "food",
    path: "/seva/food",
    navTitle: "Food for the needy",
    title: docTitle("food"),
    image: "/Seva images/sevas24.JPG",
    imageAlt: "Food distribution",
    reverse: false,
    tint: false,
    paragraphs: proseParas("food", { skip: 1 }),
  },
];

export const narayanaProgram = {
  id: "narayana",
  path: "/seva/narayana",
  navTitle: "Narayana Seva",
  title: docTitle("food"),
  paragraphs: proseParas("food", { skip: 1 }),
};

export const allSevaPrograms = [...sevaPillars, narayanaProgram];
