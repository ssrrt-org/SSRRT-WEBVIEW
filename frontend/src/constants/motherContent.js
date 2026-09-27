import { consecratedSpaceTempleImages } from "@/constants/consecratedSpaceHeroImages";
import { motherHeroImages } from "@/constants/motherHeroImages";
import { IMG } from "@/constants/images";
import { proseParas } from "@/lib/docContent";

/** Testimonies hub card & CMS default (Shiva shrine at the Ashram). */
export const MOTHER_TESTIMONIES_IMAGE = "/god/shiva/lord-shiva2.jpg";

/** Explore-card art (cropped in hub tiles) — separate from inner-page heroes. */
const motherExploreImages = {
  testimonies: MOTHER_TESTIMONIES_IMAGE,
  naadi: IMG.boss,
  declaration: motherHeroImages[4],
  avataarhood: motherHeroImages[5],
  swami: consecratedSpaceTempleImages.shirdi,
  realized: motherHeroImages[7],
};

const motherExploreImagePosition = {
  testimonies: "center 45%",
  naadi: "center 35%",
  declaration: "center 30%",
  avataarhood: "center 20%",
  swami: "center 40%",
  realized: "center 25%",
};

const motherExploreExtras = [
  {
    id: "declaration",
    to: "/mother/declaration",
    title: "Declaration of Avatar",
    tag: "29 March 1997",
    note: "The formal proclamation of Avatarhood at Karekura.",
    image: motherExploreImages.declaration,
    imagePosition: motherExploreImagePosition.declaration,
  },
  {
    id: "avataarhood",
    to: "/mother/avataarhood",
    title: "The Avataarhood",
    tag: "Divine purpose",
    note: "Birth, Lalitha, and the celestial inscrutability of every avatar's life.",
    image: motherExploreImages.avataarhood,
    imagePosition: motherExploreImagePosition.avataarhood,
  },
  {
    id: "swami",
    to: "/mother/swami",
    title: "Swami & Amma",
    tag: "At Baba's feet",
    note: "Her love and humility before Bhagawan Sri Sathya Sai Baba.",
    image: motherExploreImages.swami,
    imagePosition: motherExploreImagePosition.swami,
  },
  {
    id: "realized",
    to: "/mother/realized",
    title: "Realized beings",
    tag: "Naadi & Shirdi Sai",
    note: "Recognition preserved with care — Agastya Nadi, Budha Nadi, and Shirdi Sai Baba.",
    image: motherExploreImages.realized,
    imagePosition: motherExploreImagePosition.realized,
  },
];

const avatarOrigins = proseParas("mother_descent", { max: 4 });
const avatarHumanDimension = proseParas("mother_descent", {
  from: "II. The Human Dimension",
  until: "III. The Avataarhood",
});
const avatarAvataarhood = proseParas("mother_descent", {
  from: "III. The Avataarhood",
  until: "IV.",
});

export const avatarNarrative = {
  opening: avatarOrigins.slice(0, 2),
  chapters: [
    {
      id: "life-in-world",
      label: "A life in the world",
      paragraphs: avatarOrigins.slice(2),
    },
    {
      id: "presence-within",
      label: "The presence within",
      paragraphs: avatarHumanDimension,
    },
    {
      id: "avataarhood",
      label: "Avataarhood",
      paragraphs: avatarAvataarhood,
    },
  ],
};

const avatarMergedParagraphs = [
  ...avatarNarrative.opening,
  ...avatarNarrative.chapters.flatMap(({ paragraphs }) => paragraphs),
];

export const motherSections = [
  {
    id: "avatar",
    path: "/mother/avatar",
    published: false,
    navTitle: "Avatar",
    type: "split",
    eyebrow: "Divine Mother",
    title: "Avataarhood, divine presence, and sacred testimony.",
    image: IMG.manidweepa,
    reverse: false,
    tint: false,
    paragraphs: avatarMergedParagraphs,
    narrative: avatarNarrative,
  },
  {
    id: "testimonies",
    path: "/mother/testimonies",
    navTitle: "Testimonies",
    type: "stories",
    eyebrow: "Two revealing moments",
    title: "Undaunted courage. Absolute presence.",
    image: MOTHER_TESTIMONIES_IMAGE,
    stories: [
      {
        title: "The day of Narayana Seva",
        text: "When the father of her earthly body passed on at noon, thousands were already seated at Amma's home for the annual Narayana Seva. She suppressed her sorrow and continued serving as if nothing had happened. Only in the evening — after every last soul had been fed — was the loss announced.",
      },
      {
        title: "The Upanayanam",
        text: "When her earthly mother left the body, Amma sat on her throne and initiated her son into the Gayatri Mantra, performing the thread ceremony in the presence of her mother's body. Her mother had always wished to witness her grandson's Upanayanam. Amma, being Gayatri herself, is beyond such rituals — yet fulfilled her mother's wish with steady grace.",
      },
    ],
  },
  {
    id: "naadi",
    path: "/mother/naadi",
    navTitle: "Naadi Readings",
    type: "naadi",
    eyebrow: "The Naadi Readings",
    title: "Ancient scriptures that name the Mother.",
    image: IMG.boss,
    reverse: false,
    tint: false,
  },
];

/** Card grid data for Mother hubs and the home “More about Amma” strip (six cards). */
export const motherExploreProgrammes = [
  ...motherSections
    .filter((s) => s.published !== false)
    .map((s) => ({
      id: s.id,
      to: s.path,
      title: s.navTitle,
      tag: s.eyebrow,
      note: s.stories
        ? `${s.stories[0].text.slice(0, 120)}…`
        : `${(s.paragraphs?.[0] || s.title || "").slice(0, 120)}…`,
      image: motherExploreImages[s.id] || IMG.amma,
      imagePosition: motherExploreImagePosition[s.id],
      testid: `mother-link-${s.id}`,
    })),
  ...motherExploreExtras.map((link) => ({
    ...link,
    testid: `mother-link-${link.id}`,
  })),
];

export const motherDeclarationNarrative = proseParas("mother_declaration", { skip: 1, max: 2 });

export const motherDeclarationQuote = proseParas("mother_declaration", { skip: 2, max: 6 }).join(" ");

export const motherAvataarhoodParagraphs = proseParas("mother_avataarhood", { max: 6 });
