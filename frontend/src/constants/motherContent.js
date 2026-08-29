import { IMG } from "@/constants/images";
import { proseParas } from "@/lib/docContent";

export const motherSections = [
  {
    id: "story",
    path: "/mother/story",
    navTitle: "Her Story",
    type: "split",
    eyebrow: "The Human Aspect",
    title: "A life of exemplary grace in every role.",
    image: IMG.ammaGanesha,
    reverse: false,
    tint: false,
    paragraphs: proseParas("mother_descent", {
      from: "II. The Human Dimension",
      until: "III. The Avataarhood",
      max: 5,
    }),
  },
  {
    id: "avatar",
    path: "/mother/avatar",
    navTitle: "Divine Aspects",
    type: "split",
    eyebrow: "The Divine Aspect",
    title: "Shakti incarnate — affirmed across traditions.",
    image: IMG.manidweepa,
    reverse: true,
    tint: true,
    paragraphs: proseParas("mother_descent", {
      from: "III. The Avataarhood",
      until: "IV.",
      max: 4,
    }),
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
    type: "split",
    eyebrow: "The Naadi Readings",
    title: "Ancient scriptures that name the Mother.",
    image: IMG.boss,
    reverse: false,
    tint: false,
    paragraphs: proseParas("mother_naadi", { max: 5 }),
  },
];

export const motherDeclarationNarrative = proseParas("mother_declaration", { skip: 1, max: 2 });

export const motherDeclarationQuote = proseParas("mother_declaration", { skip: 2, max: 6 }).join(" ");

export const motherAvataarhoodParagraphs = proseParas("mother_avataarhood", { max: 6 });
