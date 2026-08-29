import { IMG } from "@/constants/images";

/** Optional images inserted between doc paragraphs (UI only — text stays from docs). */
export const docPageImages = {
  goshala_adopt: [
    { after: 2, src: IMG.cow1, alt: "Cows at Project Kaamadhenau", layout: "inline" },
    { after: 6, src: IMG.calf, alt: "Calf care at the Goshala", layout: "full" },
    { after: 10, src: IMG.cow4, alt: "The herd at Karekura", layout: "inline" },
  ],
  goshala_support: [
    { after: 1, src: IMG.manidweepa, alt: "Ashram at Karekura", layout: "full" },
  ],
  goshala_volunteer: [
    { after: 2, src: IMG.cowCloseup, alt: "Volunteers at the Goshala", layout: "inline" },
    { after: 5, src: IMG.cow3, alt: "Daily feeding and care", layout: "full" },
    { after: 9, src: IMG.volunteer, alt: "Seva at the shelter", layout: "inline" },
  ],
  medical: [
    { after: 1, src: IMG.medical, alt: "Free medical camp", layout: "inline" },
    { after: 3, src: IMG.village, alt: "Village outreach", layout: "full" },
  ],
  food: [
    { after: 1, src: IMG.kitchen, alt: "Narayana Seva kitchen", layout: "inline" },
    { after: 3, src: IMG.serve, alt: "Food distribution", layout: "full" },
  ],
  sacred_ashram: [
    { after: 1, src: IMG.manidweepa, alt: "Mani Dweepa at the Ashram", layout: "full" },
    { after: 4, src: IMG.river, alt: "River Cauvery", layout: "inline" },
    { after: 6, src: IMG.ammaGanesha, alt: "Ganesha Sannidhi", layout: "full" },
  ],
  formation: [
    { after: 1, src: IMG.event1, alt: "SSRRT formation", layout: "inline" },
    { after: 3, src: IMG.amma, alt: "Divine Mother Srimad Sai Rajarajeshwari", layout: "full" },
  ],
  mother_avataarhood: [
    { after: 2, src: IMG.manidweepa, alt: "Srimad Sai Rajarajeshwari", layout: "full" },
  ],
  bhairava: [
    { after: 2, src: IMG.shiva, alt: "Kaala Bhairava Trishula", layout: "full" },
  ],
  harake_nandi: [
    { after: 2, src: IMG.manidweepa, alt: "Harake Nandi", layout: "full" },
  ],
};
