import { IMG } from "@/constants/images";

/** Optional images inserted between doc paragraphs (UI only — text stays from docs). */
export const docPageImages = {
  goshala_adopt: [
    { after: 6, src: "/Goshala/Goshalaaa9.JPG", alt: "Calf care at the Goshala", layout: "full" },
    { after: 10, src: "/Goshala/Goshalaaa31.JPG", alt: "The herd at Karekura", layout: "inline" },
  ],
  goshala_support: [
    { after: 1, src: "/Goshala/Goshalaaa4.JPG", alt: "Goshala at Karekura", layout: "full" },
  ],
  goshala_volunteer: [
    { after: 2, src: "/Goshala/Goshalaaa7.JPG", alt: "Volunteers at the Goshala", layout: "inline" },
    { after: 5, src: "/Goshala/Goshalaaa10.JPG", alt: "Daily feeding and care", layout: "full" },
    { after: 9, src: "/Goshala/Goshalaaa13.jpeg", alt: "Seva at the shelter", layout: "inline" },
  ],
  medical: [
    { after: 1, src: "/medical service/medical1.JPG", alt: "Free medical camp", layout: "inline" },
    { after: 3, src: "/medical service/medical5.JPG", alt: "Village outreach", layout: "full" },
    { after: 5, src: "/medical service/medical9.JPG", alt: "Patients at the dispensary", layout: "inline" },
  ],
  medical_village: [
    { after: 1, src: "/medical service/medical11.JPG", alt: "Medical support in the village", layout: "inline" },
    { after: 2, src: "/medical service/medical12.JPG", alt: "Patients waiting for care", layout: "full" },
  ],
  food: [
    { after: 1, src: IMG.kitchen, alt: "Narayana Seva kitchen", layout: "inline" },
    { after: 3, src: IMG.serve, alt: "Food distribution", layout: "full" },
  ],
  sacred_ashram: [
    { after: 1, src: "/Concentratedspace/Concentratedspace11.JPG", alt: "Mani Dweepa at the Ashram", layout: "full" },
    { after: 4, src: "/Concentratedspace/Concentratedspace12.JPG", alt: "Ashram on the banks of the Cauvery", layout: "inline" },
    { after: 6, src: "/Concentratedspace/Concentratedspace13.jpg", alt: "Ganesha Sannidhi", layout: "full" },
  ],
  formation: [
    { after: 1, src: IMG.event1, alt: "SSRRT formation", layout: "inline" },
    { after: 3, src: IMG.amma, alt: "Divine Mother Srimad Sai Rajarajeshwari", layout: "full" },
  ],
  mother_avataarhood: [
    { after: 2, src: IMG.manidweepa, alt: "Srimad Sai Rajarajeshwari", layout: "full" },
  ],
  bhairava: [
    { after: 2, src: "/Concentratedspace/Concentratedspace14.jpg", alt: "Kaala Bhairava Trishula", layout: "full" },
  ],
  harake_nandi: [
    { after: 2, src: "/Concentratedspace/Concentratedspace15.jpg", alt: "Harake Nandi", layout: "full" },
  ],
  mother_needy: [
    { after: 1, src: "/medical service/clinic4.jpg", alt: "Medical camp for the needy", layout: "inline" },
    { after: 2, src: "/medical service/medical8.jpeg", alt: "Dispensary service", layout: "full" },
    { after: 3, src: "/Seva images/sevas22.jpg", alt: "Food and community seva", layout: "inline" },
    { after: 4, src: "/Seva images/sevas24.JPG", alt: "Narayana Seva distribution", layout: "full" },
  ],
};
