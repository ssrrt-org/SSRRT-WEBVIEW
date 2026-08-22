import { IMG } from "@/constants/images";

const ASHRAM_LOCATION = "Srimad Sai Rajarajeshwari Ashram, Karekura, Mysore";
const VISIT_TIME = "Morning & evening darshan — contact the office to confirm";

const defaultHighlights = [
  { title: "Every meal offered", note: "Narayana Seva and daily food seva sanctified at the Ashram." },
  { title: "Every student supported", note: "Education programmes for villages surrounding Karekura." },
  { title: "Every cow protected", note: "Project Kaamadhenau — Gau seva as living worship." },
];

const defaultGallery = (img) => [img, IMG.manidweepa, IMG.event1, IMG.river, IMG.templeGold];

const templeExtras = {
  ganesha: {
    mantra: "॥ श्री गणेशाय नमः ॥",
    offerings: "Modak, flowers, durva grass",
    beginningsTitle: "A place for new beginnings",
    whySeek: [
      { title: "Before new beginnings", note: "Careers, marriages, housewarmings, and fresh spiritual practices." },
      { title: "When obstacles arise", note: "Outer blocks in work or health, and inner blocks of fear or confusion." },
      { title: "For clarity and focus", note: "His large ears listen; his trunk discriminates — concentration before action." },
    ],
    audiences: [
      { title: "Seek blessings", note: "Offer difficulties with sincerity before the sannidhi." },
      { title: "For students", note: "Families bring children before a new academic year." },
      { title: "For families", note: "A gentle first stop for darshan when visiting the Ashram." },
    ],
    quote: "Before every undertaking at this Ashram — every meal cooked, every cow fed, every prayer offered — Ganesha is remembered first.",
  },
  shiva: {
    mantra: "॥ ॐ नमः शिवाय ॥",
    offerings: "Milk, water, bilva leaves, flowers",
    whySeek: [
      { title: "For meditation", note: "Shiva as Yogeshvara — grace for stillness and inner dissolution." },
      { title: "In grief and endings", note: "Every ending is also a doorway; Shiva holds what words cannot." },
      { title: "Through Nandi", note: "Whisper a prayer into Nandi's ear at the grand mantapa." },
    ],
    audiences: [
      { title: "Seekers of silence", note: "Sit before the throne and let the mind settle." },
      { title: "Those in transition", note: "Loss, change, and the closing of old chapters." },
      { title: "Devotees of Nandi Abhisheka", note: "Join recurring worship at the Shiva mantapa." },
    ],
    quote: "On the banks of the Cauvery, Shiva enthroned is a vision of the cosmos — ordered, purposeful, radiating.",
  },
  krishna: {
    mantra: "॥ श्री कृष्णाय नमः ॥",
    offerings: "Butter, flowers, tulsi, fruits",
    whySeek: [
      { title: "For bhakti", note: "The incomparable sweetness of devotional love." },
      { title: "For guidance", note: "The Bhagavad Gita's teachings on duty and equanimity." },
      { title: "With the Goshala", note: "Krishna as Govinda — patron of cows; deity and herd as one worship." },
    ],
    audiences: [
      { title: "Devotees of bhakti", note: "Flute, leela, and the call of the heart homeward." },
      { title: "After Gau seva", note: "Many visit Krishna sannidhi after time in the Goshala." },
      { title: "Families", note: "Joy, playfulness, and the completeness of divine friendship." },
    ],
    quote: "Deity, animals, river and sky — visitors often describe one continuous act of sacred attention here.",
  },
  shirdi: {
    mantra: "॥ ॐ साई राम ॥",
    offerings: "Flowers, incense, prasad",
    whySeek: [
      { title: "Faith and patience", note: "Shraddha and Saburi — his twin gifts to every devotee." },
      { title: "Beyond boundaries", note: "Sabka Malik Ek — the Lord of all is One." },
      { title: "Practical grace", note: "His compassion meets the whole person, not only the seeker." },
    ],
    audiences: [
      { title: "All backgrounds", note: "Muslim, Hindu, Christian — Baba welcomed every soul." },
      { title: "Those in difficulty", note: "When life offers no easy answer, many turn to Shirdi." },
      { title: "Devotees of Amma", note: "Naadi readings place her in the same spiritual stature." },
    ],
    quote: "The same unconditional compassion devotees knew in Shirdi is felt in the air of this Ashram.",
  },
  subramanya: {
    mantra: "॥ ॐ सरवण भव ॥",
    offerings: "Flowers, fruits, panchamrit",
    whySeek: [
      { title: "Courage and discipline", note: "The eternal warrior of the spirit — effort, not passivity." },
      { title: "For students", note: "Clarity of purpose when choosing a path or examination." },
      { title: "Renewed willpower", note: "When spiritual life demands sustained, fearless effort." },
    ],
    audiences: [
      { title: "Young adults", note: "Traditionally sought at crossroads and new chapters." },
      { title: "Students", note: "Before exams, admissions, and vocational choices." },
      { title: "Seekers of strength", note: "Amma's decades of seva echo Subramanya's spirit." },
    ],
    quote: "Spiritual life is not passive — it requires the courage Subramanya embodies.",
  },
  dattatreya: {
    mantra: "॥ ॐ दिगंबराय विद्महे ॥",
    offerings: "Flowers, fruits, sacred water",
    whySeek: [
      { title: "Guru's grace", note: "The Adi Guru — transmission from realised teacher to sincere student." },
      { title: "Ancestral karma", note: "Liberation from patterns that persist across generations." },
      { title: "The Trimurti", note: "Brahma, Vishnu and Shiva in one form — wholeness of the divine." },
    ],
    audiences: [
      { title: "Serious seekers", note: "Those who need the deepest form of spiritual guidance." },
      { title: "Families", note: "Prayers for release from inherited burdens." },
      { title: "Students of the guru principle", note: "Dattatreya's presence affirms the Ashram as a teaching place." },
    ],
    quote: "His grace dissolves what cannot be solved by effort alone — the weight of ancestral karma.",
  },
  manidweepa: {
    mantra: "॥ श्री ललिता त्रिपुरसुन्दर्यै नमः ॥",
    offerings: "Flowers, kumkum, sacred chants",
    whySeek: [
      { title: "The Divine Mother", note: "Shakti in her most concentrated, benevolent form." },
      { title: "Stillness", note: "The mind quietens; ordinary concerns subside at the threshold." },
      { title: "Amma's worship", note: "Decades of daily prayer have made this a living reservoir of grace." },
    ],
    audiences: [
      { title: "Devotees of the Mother", note: "Lalitha Tripura Sundari — the jewelled island of the texts." },
      { title: "Those seeking peace", note: "A space of luminous stillness at the heart of the campus." },
      { title: "First-time visitors", note: "Many begin their Ashram walk here." },
    ],
    quote: "Cross the threshold and the atmosphere changes — the heart opens before words are spoken.",
  },
  nataraja: {
    mantra: "॥ ॐ नमो भगवते रुद्राय ॥",
    offerings: "Flowers, lamps, incense",
    whySeek: [
      { title: "Community", note: "Where the Ashram gathers for satsangs, sevas, and festivals." },
      { title: "The cosmic dance", note: "Creation and dissolution as one continuous movement." },
      { title: "Narayana Seva", note: "The great annual meal is prepared and served from this collective life." },
    ],
    audiences: [
      { title: "Festival visitors", note: "Discourses, programmes, and collective worship." },
      { title: "Volunteers", note: "Kitchens and distribution lines during major gatherings." },
      { title: "Cultural continuity", note: "The hall where the Ashram's shared story unfolds." },
    ],
    quote: "Nataraja's dance reminds every gathering that joy and stillness are one movement.",
  },
};

function enrichTemple(base) {
  const extra = templeExtras[base.id] || {};
  return {
    ...base,
    mantra: extra.mantra || "",
    sevaTitle: "A temple at the heart of seva",
    sevaParagraphs: [base.intro, base.body],
    highlights: extra.highlights || defaultHighlights,
    whySeek: extra.whySeek || [
      { title: "For darshan", note: base.intro },
      { title: "Spiritual gift", note: base.gift },
    ],
    beginningsTitle: extra.beginningsTitle || "A place for devotion",
    beginningsBody: base.body,
    audiences: extra.audiences || [
      { title: "Devotees", note: "Quiet darshan and prayer at the sannidhi." },
      { title: "Families", note: "Visit the Ashram and include this temple in your walk." },
      { title: "First-time visitors", note: "Call the office for timings before you travel." },
    ],
    gallery: extra.gallery || defaultGallery(base.img),
    visit: {
      location: ASHRAM_LOCATION,
      bestTime: VISIT_TIME,
      offerings: extra.offerings || "Flowers, fruits, and sincere prayer",
    },
    quote: extra.quote || base.intro,
  };
}

export const templeCards = [
  {
    id: "ganesha",
    path: "/ashram/ganesha",
    name: "Lord Ganesha",
    tag: "Vighneshvara · Remover of Obstacles",
    img: IMG.ganesha,
    intro: "The elephant-headed son of Shiva and Parvati — first to be worshipped before every significant undertaking. His large ears listen; his small eyes concentrate; his trunk discriminates; his belly digests every experience with equanimity.",
    body: "At the Srimad Sai Rajarajeshwari Ashram, Ganesha's temple is a keystone of the entire spiritual ecosystem. Every act of service at the Ashram — every meal offered to the poor, every student educated, every cow protected — is sanctified by his presence. Sitting before Lord Ganesha, offering one's difficulties with sincerity, is an ancient practice that continues to produce results. Families from the surrounding villages bring their children here before the start of a new academic year.",
    gift: "Removes obstacles both outer (career, health, finances) and inner (ego, fear, confusion). Blesses beginnings — new careers, new relationships, new practices.",
  },
  {
    id: "shiva",
    path: "/ashram/shiva",
    name: "The Grand Shiva Temple",
    tag: "Mahadeva on his celestial throne",
    img: IMG.shiva,
    intro: "The Ashram's spiritual crown — Lord Shiva along with Nandi installed on a grand mantapa of arresting artistry. To see Shiva enthroned this way is to receive a vision of the cosmos as the divine king surveys it: ordered, purposeful, radiating.",
    body: "The location on the banks of the Cauvery creates a natural synergy of sacred energies. Shiva is Yogeshvara — lord of all yoga — and his grace supports the deepening of meditation, the dissolution of restlessness, and the direct experience of the silent awareness that underlies all mental activity. Whisper your heartfelt prayer into Nandi's ear; the tradition holds that Nandi carries it directly to Shiva's consciousness.",
    gift: "Dissolves the false sense of separate selfhood. A refuge for grief and endings — Shiva teaches that every ending is also a doorway.",
  },
  {
    id: "krishna",
    path: "/ashram/krishna",
    name: "The Krishna Maya Temple",
    tag: "Govinda · Giver of joy to all",
    img: IMG.krishna,
    intro: "Krishna is the mischievous child of Vrindavan, the divine lover whose flute calls every soul home, the warrior who delivered the Bhagavad Gita, the perfect friend, the god who dances. The most complete divine manifestation ever known to humanity.",
    body: "Amma's relationship with Krishna is among the deepest threads in her spiritual life, and this intimacy is felt the moment one enters the temple. Krishna is the patron deity of cows — the Ashram's Goshala with its 300+ animals is a living worship of Govinda. Visitors who sit in the Krishna temple after time in the Goshala often report a sense of deep coherence, as though deity, animals, river and sky are one act of sacred attention.",
    gift: "The incomparable sweetness of bhakti — devotional love. The clarity of the Gita's teachings on equanimity and duty without attachment.",
  },
  {
    id: "shirdi",
    path: "/ashram/shirdi",
    name: "Shirdi Sai Baba Temple",
    tag: "Sabka Malik Ek · The Lord of All is One",
    img: IMG.shirdi,
    intro: "One of the most universally beloved saints in Indian history — whose transcendence of religious boundaries and radical compassion for every human being have made him an object of devotion across the world. He said 'Allah Malik' and 'Sabka Malik Ek' — God is the master, and the Lord of all is One.",
    body: "The presence of Shirdi Sai at this Ashram carries a significance both personal and cosmic. Ancient Nadi readings describe Amma as one equivalent to Shirdi Sai in spiritual stature. The same quality of unconditional compassion, the same willingness to serve anyone who comes, the same combination of exacting wisdom and boundless tenderness — devotees who know both traditions feel this equivalence in the air.",
    gift: "Shraddha and Saburi — faith and patience. His grace operates practically, meeting the whole person and not only the spiritual seeker.",
  },
  {
    id: "subramanya",
    path: "/ashram/subramanya",
    name: "Lord Subramanya",
    tag: "Murugan · Skanda · The eternal warrior of the spirit",
    img: IMG.templeSouth,
    intro: "The second son of Shiva and Parvati — born for a specific cosmic purpose: to lead the army of the gods against darkness. Depicted as a young man of surpassing beauty, riding his peacock, holding a vel — a divine spear of piercing wisdom.",
    body: "Subramanya's presence at the Ashram speaks to a dimension often overlooked: spiritual life is not passive. It requires the qualities of the warrior — courage, discipline, sustained effort. Amma's own decades of sustained service is itself a form of Subramanya's spirit made manifest.",
    gift: "Sharpens the mind, strengthens willpower, renews purpose. Traditionally sought by students, young adults choosing their path, and seekers who need spiritual courage.",
  },
  {
    id: "dattatreya",
    path: "/ashram/dattatreya",
    name: "Lord Dattatreya",
    tag: "Trimurti Incarnate · The Guru of Gurus",
    img: IMG.templeGold,
    intro: "Uniquely embodies the entire cosmic Trinity — Brahma, Vishnu and Shiva — in a single form. Three heads, six arms, accompanied by four dogs (the four Vedas) and a cow (the earth, abundance, nurture). The Adi Guru — the first and original spiritual teacher.",
    body: "Dattatreya's presence at an ashram is always a statement about the guru principle — that spiritual growth requires not only personal effort but living transmission of grace from a realised teacher to a sincere student. His grace is particularly associated with liberation from ancestral karmas — the deeply entrenched patterns that persist across generations until consciously addressed.",
    gift: "Dissolves inherited karmic debts. The supreme refuge for the deepest form of guidance — the transmission of the guru's grace.",
  },
  {
    id: "manidweepa",
    path: "/ashram/manidweepa",
    name: "Mani Dweepa",
    tag: "The jewelled island of the Divine Mother",
    img: IMG.manidweepa,
    intro: "The heart of the Ashram — Mani Dweepa, literally the 'island of jewels', the highest sacred abode of Lalitha Tripura Sundari described in the ancient texts. A space of luminous stillness and quiet devotion.",
    body: "Devotees describe an atmosphere that feels different the moment one crosses the threshold. The mind quietens; the heart opens; the ordinary concerns of ordinary life subside into a background hum. Amma's decades of worship have made this space a living reservoir of the Divine Mother's grace.",
    gift: "Direct communion with the Divine Mother — Shakti in her most concentrated, benevolent form.",
  },
  {
    id: "nataraja",
    path: "/ashram/nataraja",
    name: "Nataraja Hall",
    tag: "The cosmic dance of creation",
    img: IMG.event2,
    intro: "The great hall of Shiva as Nataraja — the eternal dancer whose Tandava maintains the rhythm of the cosmos. A space for gathering, discourses, festival programmes and grace.",
    body: "Where the Ashram community comes together — for sevas, satsangs, discourses, and the collective work of Narayana Seva. The dance of Nataraja reminds every gathering that creation and dissolution, joy and stillness, form and formlessness are one continuous movement.",
    gift: "Community, cultural continuity, and the shared space in which the Ashram's collective life unfolds.",
  },
].map(enrichTemple);
