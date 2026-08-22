import { shopProducts as catalogSeed } from "@/constants/shopProducts";

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
    { id: "slide-2", img: "/ssrrt/Volunter.jpg", label: "Amma", caption: "The Divine Mother" },
    { id: "slide-3", img: "/ssrrt/ManiDweepa.jpg", label: "Mani Dweepa", caption: "The Sacred Ashram" },
  ],
  heroes: defaultHeroes,
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
    { id: "ev-3", title: "Butter Alankara — Ganesha", when: "Recurring · seasonal", note: "A traditional butter alankara offered at the Ganesha sannidhi.", image: "/ssrrt/AmmaGanesha.jpg", published: true },
    { id: "ev-4", title: "Butter Alankara — Subramanya", when: "Recurring · seasonal", note: "A traditional butter alankara offered at the Subramanya sannidhi.", image: "/ssrrt/AmmaGanesha.jpg", published: true },
    { id: "ev-5", title: "Free medical camps", when: "Rolling · across 4–5 villages", note: "Consultations, basic diagnostics and medicines — always free of cost.", image: "/ssrrt/IMG-20250923-WA0025.jpg", published: true },
    { id: "ev-6", title: "Ashram darshan", when: "Daily", note: "Temples open through the day; timings vary by season.", image: "/ssrrt/ManiDweepa.jpg", published: true },
  ],
  formation: {
    eyebrow: "SSRRT",
    title: "Srimad Sai Rajarajeshwari Trust.",
    intro: "Day-to-day work of the Trust at Karekura.",
    body1: "Project Kaamadhenau feeds and shelters more than 300 cows. A free clinic serves four or five villages. Students get help with school fees. Tankers run when wells dry up. Once a year, Narayana Seva cooks for 10,000–15,000 people.",
    body2: "The Ashram has eight temple sannidhis that Amma has worshipped in for decades. Volunteers help in the Goshala, kitchens, and during festivals.",
    image: "/ssrrt/IMG-20250923-WA0025.jpg",
    locationTitle: "Karekura, on the Cauvery.",
    address: "Karekura, Mysore, Karnataka, India",
  },
  donations: [],
  donate: {
    suggestedAmounts: [501, 1101, 2501, 5001],
    purposes: [
      { id: "general", label: "General Fund", note: "Wherever the need is greatest." },
      { id: "goshala", label: "Goshala · Adopt-a-Cow", note: "Feed, shelter and medical care for the herd." },
      { id: "narayana", label: "Narayana Seva", note: "Annual community meal." },
      { id: "ashram", label: "Ashram & Temple Maintenance", note: "Upkeep of consecrated spaces." },
      { id: "medical", label: "Medical Camps", note: "Free care in surrounding villages." },
      { id: "events", label: "Events", note: "Festivals and gatherings." },
    ],
  },
  orders: [
    { id: "ORD-2401", customer: "Lakshmi R.", email: "lakshmi@example.com", items: 2, total: 630, status: "Paid", date: "2026-08-12" },
    { id: "ORD-2402", customer: "Arun K.", email: "arun@example.com", items: 1, total: 1101, status: "Packed", date: "2026-08-14" },
    { id: "ORD-2403", customer: "Meera S.", email: "meera@example.com", items: 3, total: 850, status: "Shipped", date: "2026-08-18" },
    { id: "ORD-2404", customer: "Guest checkout", email: "guest@example.com", items: 1, total: 150, status: "Pending", date: "2026-08-21" },
  ],
  inbox: [
    { id: "in-1", type: "Contact", name: "Priya N.", email: "priya@example.com", message: "Please share darshan timings for next Saturday.", date: "2026-08-19" },
    { id: "in-2", type: "Volunteer", name: "Rahul M.", email: "rahul@example.com", message: "I can help with fodder prep on weekends.", date: "2026-08-20" },
  ],
  firebase: {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
  },
};
