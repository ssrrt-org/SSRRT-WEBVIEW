import { goshalaCows } from "@/constants/cowGallery";
import { heroImageForPath } from "@/constants/heroImages";
import { IMG } from "@/constants/images";
import { motherSections } from "@/constants/motherContent";
import { sevaPillars } from "@/constants/sevaContent";
import { templeCards } from "@/constants/templeData";

function slot(id, label, defaultImage) {
  return { id, label, default: defaultImage || "" };
}

function heroSlot(path) {
  return slot("hero", "Top banner photo", heroImageForPath(path));
}

function page(path, label, slots = []) {
  return { path, label, slots: [heroSlot(path), ...slots] };
}

const aboutPillars = [
  ["goshala", "Project Kaamadhenau", IMG.goshalaLocal],
  ["ashram", "The Ashram", IMG.templeSouth],
  ["mother-needy", "Mother for the Needy", IMG.medical],
  ["rural", "Rural upliftment", IMG.village],
  ["sevas", "Ashram sevas", IMG.ganesha],
  ["volunteer", "Volunteering", IMG.serve],
];

const motherHubCards = [
  ["story", "Her Story", IMG.ammaGanesha],
  ["avatar", "Avataarhood", IMG.manidweepa],
  ["testimonies", "Testimonies", IMG.event1],
  ["naadi", "Naadi readings", IMG.boss],
  ["avataarhood", "The Avataarhood", IMG.manidweepa],
  ["swami", "Swami & Amma", IMG.shirdi],
  ["realized", "Realized beings", IMG.boss],
];

const needyHubCards = [
  ["medical", "Medical centre", IMG.medical],
  ["village", "Village camps", IMG.village],
  ["food", "Food seva", IMG.serve],
  ["kitchen", "Narayana kitchen", IMG.kitchen],
];

const ruralHubCards = [
  ["education", "Education support", IMG.village],
  ["water", "Water supply", IMG.event1],
  ["relief", "Crisis relief", IMG.serve],
  ["narayana", "Narayana Seva", IMG.kitchen],
];

const sevasHubCards = [
  ["nandi-abhisheka", "Nandi Abhisheka", IMG.manidweepa],
  ["butter-ganesha", "Butter Ganesha", IMG.ganesha],
  ["butter-subramanya", "Butter Subramanya", IMG.templeSouth],
  ["ashram", "Ashram card", IMG.templeSouth],
];

function hubSlots(prefix, items) {
  return items.map(([id, label, image]) => slot(`${prefix}-${id}`, `Card · ${label}`, image));
}

const goshalaGallerySlots = goshalaCows.map((cow) =>
  slot(`gallery-${cow.id}`, `Gallery · ${cow.name}`, cow.image),
);

const templePageSlots = templeCards.flatMap((t) => {
  const gallery = t.gallery || [t.img, IMG.manidweepa, IMG.event1];
  return page(t.path, t.name, [
    slot("card", "Card on Ashram page", t.img),
    slot("hero-bg", "Temple page background", IMG.manidweepa),
    slot("hero-figure", "Main deity photo", t.img),
    slot("seva-figure", "Seva section photo", gallery[1] || t.img),
    slot("beginnings-figure", "Beginnings section", gallery[2] || IMG.child),
  ]);
});

const sevaPillarPages = sevaPillars.map((p) =>
  page(p.path, p.navTitle, [slot("pillar-figure", "Main section photo", p.image)]),
);

const motherSectionPages = motherSections
  .filter((s) => s.image)
  .map((s) => page(s.path, s.navTitle, [slot("split", "Main section photo", s.image)]));

const extraMotherPages = [
  page("/mother/avataarhood", "The Avataarhood", [slot("split", "Main section photo", IMG.manidweepa)]),
  page("/mother/swami", "Swami & Amma", [slot("inline-figure", "Portrait photo", IMG.boss)]),
  page("/mother/realized", "Realized beings", [slot("split", "Main section photo", IMG.shirdi)]),
];


export const PAGE_IMAGE_GROUPS = [
  {
    id: "home",
    label: "Home",
    pages: [
      page("/", "Home page", [
        slot("split-trust", "Split · Trust intro", IMG.manidweepa),
        slot("split-amma", "Split · Amma", IMG.amma),
      ]),
    ],
    carousel: true,
  },
  {
    id: "goshala",
    label: "Goshala",
    pages: [
      page("/goshala", "Goshala main", [
        slot("split-gaumata", "Split · Gaumata", IMG.cow1),
        slot("split-kamadhenu", "Split · Kamadhenu", IMG.calf),
        ...goshalaGallerySlots,
        slot("three-lives-cows", "Three lives · Cows", IMG.cow4),
        slot("three-lives-bulls", "Three lives · Bulls", IMG.cow2),
        slot("three-lives-calves", "Three lives · Calves", IMG.cow6),
      ]),
      page("/goshala/adopt", "Adopt a Cow"),
      page("/goshala/day", "A Day at the Goshala"),
    ],
  },
  {
    id: "mother",
    label: "Mother",
    pages: [
      page("/mother", "Mother hub", [
        slot("split-human", "Split · Human aspect", IMG.ammaGanesha),
        ...hubSlots("hub", motherHubCards),
      ]),
      ...motherSectionPages,
      ...extraMotherPages,
      page("/mother/testimonies", "Testimonies"),
    ],
  },
  {
    id: "seva",
    label: "Seva",
    pages: [
      page("/mother-for-needy", "Mother for Needy", [
        slot("split-outreach", "Split · Outreach", IMG.medical),
        ...hubSlots("hub", needyHubCards),
      ]),
      page("/rural-upliftment", "Rural Upliftment", [
        slot("split-village", "Split · Village", IMG.village),
        ...hubSlots("hub", ruralHubCards),
      ]),
      page("/seva", "Seva hub"),
      ...sevaPillarPages,
      page("/seva/medical-village", "Medical village", [
        slot("pillar-figure", "Main section photo", IMG.village),
      ]),
      page("/seva/narayana", "Narayana Seva"),
    ],
  },
  {
    id: "ashram",
    label: "Ashram & temples",
    pages: [
      page("/ashram", "Ashram hub", [
        slot("split-campus", "Split · Campus", IMG.manidweepa),
        ...templeCards.map((t) => slot(`temple-card-${t.id}`, `Temple card · ${t.name}`, t.img)),
        slot("sacred-bhairava", "Sacred space · Bhairava", IMG.shiva),
        slot("sacred-harake-nandi", "Sacred space · Harake Nandi", IMG.manidweepa),
      ]),
      ...templePageSlots,
      page("/ashram/bhairava", "Kaala Bhairava", [slot("inline-figure", "Main photo", IMG.shiva)]),
      page("/ashram/harake-nandi", "Harake Nandi", [slot("inline-figure", "Main photo", IMG.shiva)]),
    ],
  },
  {
    id: "site",
    label: "SSRRT pages",
    pages: [
      page("/about", "Formation / About", [
        slot("split-foundation", "Split · Foundation", IMG.amma),
        ...hubSlots("pillar", aboutPillars),
      ]),
      page("/shop", "Shoppe"),
      page("/events", "Events"),
      page("/donate", "Donate"),
      page("/contact", "Contact"),
      page("/sevas", "Ashram sevas hub", [
        slot("split-worship", "Split · Worship", IMG.manidweepa),
        ...hubSlots("hub", sevasHubCards),
      ]),
      page("/volunteering", "Volunteering", [
        slot("split-transformation", "Split · Transformation", IMG.meditation),
      ]),
    ],
  },
];

export const ALL_PAGE_IMAGE_PAGES = PAGE_IMAGE_GROUPS.flatMap((group) => group.pages);

export function buildPageImageDefaults() {
  const defaults = {};
  for (const entry of ALL_PAGE_IMAGE_PAGES) {
    defaults[entry.path] = {};
    for (const s of entry.slots) {
      defaults[entry.path][s.id] = s.default || "";
    }
  }
  return defaults;
}

export function getCatalogPage(path) {
  return ALL_PAGE_IMAGE_PAGES.find((entry) => entry.path === path);
}

export function getCatalogSlot(path, slotId) {
  const entry = getCatalogPage(path);
  return entry?.slots.find((s) => s.id === slotId);
}
