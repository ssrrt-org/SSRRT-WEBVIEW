import { IMG } from "@/constants/images";

export const sevaPillars = [
  {
    id: "medical",
    path: "/seva/medical",
    navTitle: "Multi-village medical centre",
    eyebrow: "Pillar 01 · Mother for the Needy",
    title: "Multi-village Free Medical Centre.",
    image: IMG.medical,
    imageAlt: "Medical camp",
    reverse: false,
    tint: false,
    paragraphs: [
      "Access to basic healthcare remains one of the most persistent challenges in rural India. For families living below the poverty line, even a simple fever can spiral into a crisis when the nearest qualified doctor is hours away.",
      "SSRRT's free medical centre serves as a vital lifeline for four to five surrounding villages — offering consultations, basic diagnostics, medicines for common ailments, and guidance on when specialised care is needed. Preventive camps, hygiene awareness and early screening help villagers avoid illness altogether, and the centre has become a trusted institution where people know they will be treated with dignity regardless of their ability to pay.",
    ],
  },
  {
    id: "education",
    path: "/seva/education",
    navTitle: "Rural education",
    eyebrow: "Pillar 02 · Rural Upliftment",
    title: "Education — opening doors to a brighter future.",
    image: IMG.child,
    imageAlt: "Rural education",
    reverse: true,
    tint: true,
    paragraphs: [
      "Many village children, despite talent and curiosity, find their journeys cut short simply because their families cannot afford fees, books, uniforms or the incidental costs of higher schooling.",
      "Scholarships, financial assistance, mentorship and direct sponsorship of tuition and study materials have enabled hundreds of children to pursue school, college and specialised professional courses. Just as important is the mentorship that accompanies the funds — many of these young people are the first in their families to consider higher education, and SSRRT's coordinators walk with them through applications, exams and career planning.",
    ],
  },
  {
    id: "water",
    path: "/seva/water",
    navTitle: "Water in harsh summers",
    eyebrow: "Pillar 03 · Rural Upliftment",
    title: "Water in the harshest summers.",
    image: IMG.water,
    imageAlt: "Water tanker delivery",
    reverse: false,
    tint: false,
    paragraphs: [
      "When rivers and lakes dry up and even the wells run empty, women and young girls carry the burden — often walking several kilometres a day for water.",
      "SSRRT coordinates tanker deliveries to villages where sources have dried up, working with village leaders for equitable distribution and prioritising the most vulnerable households first. Girls stay in school, women reclaim their hours, and the elderly and infants are spared the dangers of unsafe water and waterborne disease.",
    ],
  },
  {
    id: "relief",
    path: "/seva/relief",
    navTitle: "Bedding, medicines & relief",
    eyebrow: "Pillar 04 · Emergency Relief",
    title: "Bedding, medicines & essentials in times of crisis.",
    image: IMG.village,
    imageAlt: "Rural community relief",
    reverse: true,
    tint: true,
    paragraphs: [
      "During the COVID-19 pandemic, when hospitals were overwhelmed and families could not access basic medical supplies, SSRRT mobilised swiftly — delivering medicines, blankets, mats and food to households that had lost their livelihoods overnight.",
      "The same rapid, compassionate response extends to floods, cyclones and other calamities. In the aftermath of catastrophe the immediate needs are the most basic: a dry place to sleep, a blanket against the cold, medicine for injuries, and food to sustain the body through the crisis.",
    ],
  },
  {
    id: "food",
    path: "/seva/food",
    navTitle: "Food for the needy",
    eyebrow: "Pillar 05 · Mother for the Needy",
    title: "Food for the needy — nourishing body and soul.",
    image: IMG.serve,
    imageAlt: "Food distribution",
    reverse: false,
    tint: false,
    paragraphs: [
      "Beyond the annual Narayana Seva, Amma personally cooks and distributes food for hundreds of people who might otherwise go hungry — street dwellers, small vegetable vendors, daily-wage labourers, and families facing hardship.",
      "Rather than dry rations from a distance, food is prepared fresh, with the same care and attention one would give to feeding one's own family. The message is clear: the poor deserve not just sustenance, but the dignity of a warm, freshly prepared meal.",
    ],
  },
];

export const narayanaProgram = {
  id: "narayana",
  path: "/seva/narayana",
  navTitle: "Narayana Seva",
  eyebrow: "Narayana Seva · Annual programme",
  title: "Food is God. To offer food is to offer the Divine.",
  paragraphs: [
    "Every year, SSRRT organises Narayana Seva — one of the most moving and large-scale acts of humanitarian service in the region. More than 10,000–15,000 people — from city slums, the central jail, orphanages, schools for the deaf and mute, and surrounding villages — are brought together under one great act of shared humanity.",
    "Amma herself stands at her home on this day and serves thousands with her own hands. The kitchens begin in the pre-dawn hours; volunteers cook, transport, distribute and sit alongside those they feed. Hygiene, safety and dignity are held to the highest standard — because when you see someone as Narayana, you do not offer them anything less than the best.",
  ],
  beneficiaries: [
    ["City slums", "Families living in overcrowded urban poverty"],
    ["Central jail", "Inmates often forgotten by society"],
    ["Orphanages", "Young lives without the shelter of family"],
    ["Schools for the deaf & mute", "Facing unique daily challenges"],
    ["Multiple villages", "Rural communities with limited resources"],
  ],
};

export const allSevaPrograms = [...sevaPillars, narayanaProgram];
