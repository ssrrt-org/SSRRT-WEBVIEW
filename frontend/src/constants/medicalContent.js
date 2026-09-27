import { docExcerpt, docTitle, proseParas } from "@/lib/docContent";

/** Fixed medical centre at Karekura — serves several surrounding villages. */
export const medicalCentreTitle = docTitle("medical");
export const medicalCentreLede = docExcerpt("medical", { skip: 1, maxLen: 240 });
export const medicalCentreParagraphs = proseParas("medical", { skip: 1 });

/** Mobile camps and village outreach (separate from the centre page). */
export const medicalVillageTitle = "Medical support in the village";
export const medicalVillageLede =
  "Free preventive medical camps and outreach in villages around Karekura — care brought to families who cannot travel to the centre.";
export const medicalVillageParagraphs = proseParas("medical", { skip: 3 });
