import { SUPPORT_CAUSE_LABEL } from "@/constants/supportLabels";

export const navItems = [
  { label: "Home", path: "/" },
  {
    label: "Mother",
    path: "/mother",
    sub: [
      { label: "Avatar", path: "/mother/avatar" },
      { label: "Declaration of Avatar", path: "/mother/declaration" },
      { label: "The Avataarhood", path: "/mother/avataarhood" },
      { label: "The Naadi Readings", path: "/mother/naadi" },
      { label: "Swami & Amma", path: "/mother/swami" },
      { label: "Realized Beings", path: "/mother/realized" },
    ],
  },
  {
    label: "Mother for Needy",
    path: "/mother-for-needy",
    groups: [
      {
        heading: "MEDICAL CARE",
        links: [
          { label: "Medical Centers, Multi-Village", path: "/seva/medical" },
          { label: "Medical Support in the Village", path: "/seva/medical-village" },
        ],
      },
      {
        heading: "FOOD & NOURISHMENT",
        links: [
          { label: "Food for the Needy", path: "/seva/food" },
          { label: "Narayana Seva", path: "/seva/narayana" },
        ],
      },
    ],
  },
  {
    label: "Goshala",
    path: "/goshala",
    groups: [
      {
        heading: "ABOUT",
        links: [
          { label: "History of Goshala", path: "/goshala#history" },
        ],
      },
      {
        heading: "PARTICIPATE",
        links: [
          { label: "Adopt a Cow", path: "/goshala/adopt" },
          { label: "Volunteer at the Goshala", path: "/volunteering" },
          { label: SUPPORT_CAUSE_LABEL, path: "/donate?purpose=goshala" },
        ],
      },
    ],
  },
  {
    label: "Rural Upliftment",
    path: "/rural-upliftment",
    groups: [
      {
        heading: "RURAL PROGRAMMES",
        links: [
          { label: "Medical Centres", path: "/seva/medical" },
          { label: "Education & water", path: "/rural-upliftment" },
          { label: "Food for the Needy", path: "/seva/food" },
          { label: "Volunteering", path: "/volunteering" },
          { label: "Narayana Seva", path: "/seva/narayana" },
        ],
      },
    ],
  },
  {
    label: "Consecrated Space",
    path: "/ashram",
    groups: [
      {
        heading: "TEMPLES",
        links: [
          { label: "Lord Jagadeesh (Krishna)", path: "/ashram/krishna" },
          { label: "Shirdi Baba Temple", path: "/ashram/shirdi" },
          { label: "Ganesha Sannidhi", path: "/ashram/ganesha" },
          { label: "Lord Subramanya", path: "/ashram/subramanya" },
          { label: "Lord Dattatreya", path: "/ashram/dattatreya" },
          { label: "Grand Shiva Temple & Nandi", path: "/ashram/shiva" },
        ],
      },
      {
        heading: "OTHER SACRED SPACES",
        links: [
          { label: "Mani-Dweepa", path: "/ashram/manidweepa" },
          { label: "Kaala Bhairava Trishula", path: "/ashram/bhairava" },
          { label: "Harake Nandi", path: "/ashram/harake-nandi" },
          { label: "Nataraja Hall", path: "/ashram/nataraja" },
        ],
      },
    ],
  },
  {
    label: "Sevas",
    path: "/sevas",
    sub: [
      { label: "Nandi Abhisheka", path: "/sevas/nandi-abhisheka" },
      { label: "Ghee / Butter Abhisheka", path: "/sevas/ghee-butter-abhisheka" },
      { label: "Alankar", path: "/sevas/alankar" },
      { label: "Ganesh Abhisheka", path: "/sevas/ganesh-abhisheka" },
      { label: "Bhavatarini Seva", path: "/sevas/bhavatarini-seva" },
      { label: "Subramanya Seva", path: "/sevas/subramanya-seva" },
    ],
  },
  { label: "Volunteer", path: "/volunteering", volunteer: true },
  {
    label: "SSRRT",
    path: "/about",
    sub: [
      { label: "Events", path: "/events" },
      { label: "Contact", path: "/contact" },
    ],
  },
  { label: "Shoppe", path: "/shop" },
  { label: SUPPORT_CAUSE_LABEL, path: "/donate", donate: true },
];

export const donationPurposes = [
  "General Fund",
  "Goshala · Adopt-a-Cow",
  "Narayana Seva",
  "Ashram & Temple Maintenance",
  "Medical Camps",
  "Events",
];

export const donatePurposeFromQuery = {
  general: "General Fund",
  goshala: "Goshala · Adopt-a-Cow",
  narayana: "Narayana Seva",
  ashram: "Ashram & Temple Maintenance",
  medical: "Medical Camps",
  events: "Events",
};
