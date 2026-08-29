import { shopProducts as catalogSeed } from "@/constants/shopProducts";
import { buildPageImageDefaults } from "@/constants/pageImageCatalog";
import { docParas } from "@/lib/docContent";

export const CMS_STORAGE_KEY = "ssrrt-admin-cms";

export const HERO_PAGES = [
  { id: "/goshala", label: "Goshala", group: "Goshala" },
  { id: "/goshala/adopt", label: "Adopt a Cow", group: "Goshala" },
  { id: "/goshala/day", label: "A Day at the Goshala", group: "Goshala" },
  { id: "/mother-for-needy", label: "Mother for Needy", group: "Seva" },
  { id: "/rural-upliftment", label: "Rural Upliftment", group: "Seva" },
  { id: "/seva", label: "Seva hub", group: "Seva" },
  { id: "/seva/medical", label: "Medical camps", group: "Seva" },
  { id: "/seva/medical-village", label: "Medical village", group: "Seva" },
  { id: "/seva/food", label: "Food for the Needy", group: "Seva" },
  { id: "/seva/narayana", label: "Narayana Seva", group: "Seva" },
  { id: "/sevas", label: "Ashram sevas", group: "Sevas" },
  { id: "/volunteering", label: "Volunteering", group: "Sevas" },
  { id: "/mother", label: "Mother", group: "Mother" },
  { id: "/ashram", label: "Consecrated Space", group: "Ashram" },
  { id: "/ashram/krishna", label: "Krishna Maya Temple", group: "Ashram" },
  { id: "/ashram/shirdi", label: "Shirdi Baba Temple", group: "Ashram" },
  { id: "/ashram/ganesha", label: "Ganesha Sannidhi", group: "Ashram" },
  { id: "/ashram/shiva", label: "Grand Shiva Temple", group: "Ashram" },
  { id: "/ashram/manidweepa", label: "Mani-Dweepa", group: "Ashram" },
  { id: "/ashram/bhairava", label: "Kaala Bhairava", group: "Ashram" },
  { id: "/shop", label: "Shoppe", group: "SSRRT" },
  { id: "/events", label: "Events", group: "SSRRT" },
  { id: "/donate", label: "Donate", group: "SSRRT" },
  { id: "/about", label: "Formation", group: "SSRRT" },
  { id: "/contact", label: "Contact", group: "SSRRT" },
];

const defaultHeroes = Object.fromEntries(
  HERO_PAGES.map((page) => [page.id, { image: "", caption: "" }])
);

export const adminSeed = {
  branding: {
    siteTitle: "SRIMAD SAI RAJARAJESHWARI TRUST",
    siteTagline: "Goshala · Ashram · Seva · Karekura",
    headerDevi: "/ssrrt/devi-logo.jpg",
    headerYantra: "/ssrrt/sri-yantra.jpg",
    footerLogo: "/ssrrt/devi-logo.jpg",
  },
  homeCarousel: [
    { id: "slide-1", img: "/ssrrt/AmmaGanesha.jpg", label: "First Blessings", caption: "Ganesha Sannidhi" },
    { id: "slide-2", img: "/ssrrt/Umother.jpg", label: "Amma", caption: "The Divine Mother" },
    { id: "slide-3", img: "/ssrrt/ManiDweepa.jpg", label: "Mani Dweepa", caption: "The Sacred Ashram" },
    { id: "slide-4", img: "/ssrrt/ShirdiSai.jpg", label: "Shirdi Sai Baba", caption: "Temple Sannidhi" },
    { id: "slide-5", img: "/ssrrt/Cow1.jpeg", label: "Project Kaamadhenau", caption: "Gau Seva" },
    { id: "slide-6", img: "/ssrrt/IMG-20250923-WA0025.jpg", label: "Narayana Seva", caption: "Feeding the needy" },
  ],
  heroes: defaultHeroes,
  pageImages: buildPageImageDefaults(),
  products: catalogSeed.map((p, i) => ({
    ...p,
    sku: `SSRRT-${String(i + 1).padStart(3, "0")}`,
    mrp: Math.round(p.price * 1.15),
    offerLabel: "",
    stockQty: p.inStock ? 24 : 0,
    featured: i < 4,
  })),
  events: [
    { id: "ev-1", title: "Narayana Seva", when: "Annual · date announced by the Trust", note: "10,000–15,000 meals served across slums, jails, orphanages, schools and villages.", image: "/ssrrt/IMG-20250923-WA0025.jpg", published: true },
    { id: "ev-2", title: "Nandi Abhisheka", when: "Recurring · monthly", note: "A traditional abhisheka held at the grand Shiva mantapa.", image: "/ssrrt/IMG-20260206-WA0000.jpg", published: true },
    { id: "ev-3", title: "Ganesha Abhisheka & Butter Seva", when: "Recurring · seasonal", note: "Sacred abhisheka and butter alankara at the Ganesha sannidhi.", image: "/ssrrt/AmmaGanesha.jpg", published: true },
    { id: "ev-4", title: "Subramanya Abhisheka & Butter Seva", when: "Recurring · seasonal", note: "Abhisheka and butter seva at the Subramanya sannidhi.", image: "/ssrrt/AmmaGanesha.jpg", published: true },
    { id: "ev-5", title: "Free medical camps", when: "Rolling · across 4–5 villages", note: "Consultations, basic diagnostics and medicines — always free of cost.", image: "/ssrrt/IMG-20250923-WA0025.jpg", published: true },
    { id: "ev-6", title: "Ashram darshan", when: "Daily", note: "Temples open through the day; timings vary by season.", image: "/ssrrt/ManiDweepa.jpg", published: true },
    { id: "ev-7", title: "Guru Pournima", when: "Annual · full moon of Ashadha", note: docParas("guru_pournima", { max: 1 })[0]?.slice(0, 220) || "The most sacred day of surrender and grace at the Ashram.", image: "/ssrrt/ManiDweepa.jpg", published: true },
    { id: "ev-8", title: "Krishna Janmashtami", when: "Annual · midnight of Ashtami", note: docParas("janmashtami", { max: 1 })[0]?.slice(0, 220) || "Amma performs Abhisheka for Lord Krishna at the divine abode.", image: "/ssrrt/AmmaGanesha.jpg", published: true },
    { id: "ev-9", title: "Navaratri", when: "Annual · nine nights of the Divine Mother", note: docParas("navaratri", { max: 1 })[0]?.slice(0, 220) || "Ten days in the presence of the Mother at Karekura.", image: "/ssrrt/ManiDweepa.jpg", published: true },
    { id: "ev-10", title: "Divine Birthday Celebration", when: "Annual · five days culminating 29 March", note: docParas("birthday", { max: 1 })[0]?.slice(0, 220) || "Five days of grace, music, and boundless blessing.", image: "/ssrrt/Volunter.jpg", published: true },
  ],
  formation: {
    eyebrow: "SSRRT",
    title: "Srimad Sai Rajarajeshwari Trust.",
    intro: "Formed under Bhagawan Sri Sathya Sai Baba's guidance for lokakalyana — the welfare of the world.",
    body1: docParas("formation").join(" "),
    body2: "",
    image: "/ssrrt/IMG-20250923-WA0025.jpg",
    locationTitle: "Karekura, on the Cauvery.",
    address: "Karekura, Mysore, Karnataka, India",
  },
  donations: [],
  donate: {
    suggestedAmounts: [501, 1101, 2501, 5001],
    purposes: [
      { id: "general", label: "General Fund", note: "Wherever the need is greatest." },
      { id: "goshala", label: "Goshala · Adopt-a-Cow", note: "Every contribution goes directly to feed, medicine, and shelter for the herd." },
      { id: "narayana", label: "Narayana Seva", note: "Annual community meal." },
      { id: "ashram", label: "Ashram & Temple Maintenance", note: "Upkeep of consecrated spaces." },
      { id: "medical", label: "Medical Camps", note: "Free care in surrounding villages." },
      { id: "events", label: "Events", note: "Festivals and gatherings." },
    ],
  },
  orders: [],
  inbox: [],
};
