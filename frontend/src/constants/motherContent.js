import { IMG } from "@/constants/images";
import { proseParas } from "@/lib/docContent";

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

export const motherDeclarationNarrative = proseParas("mother_declaration", { skip: 1, max: 2 });

export const motherDeclarationQuote = proseParas("mother_declaration", { skip: 2, max: 6 }).join(" ");

export const motherAvataarhoodParagraphs = proseParas("mother_avataarhood", { max: 6 });
