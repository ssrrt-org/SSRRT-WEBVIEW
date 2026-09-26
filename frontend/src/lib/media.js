/**
 * Web-friendly derivatives under /public/optimized (see scripts/optimize-images.sh).
 */

const OPT_HOME_HERO = "/optimized/home_hero";
const OPT_HOME_HERO_THUMB = "/optimized/home_hero/thumb";
const OPT_CARDS = "/optimized/cards";

/** Hero carousel slide — full panel for center, smaller file for side panels. */
export function heroSlideSrc(img, { main = true } = {}) {
  if (!img || typeof img !== "string") return img;
  const homeMatch = img.match(/^\/home_hero\/(.+\.jpe?g)$/i);
  if (!homeMatch) return img;
  const file = homeMatch[1];
  return main ? `${OPT_HOME_HERO}/${file}` : `${OPT_HOME_HERO_THUMB}/${file}`;
}

export const HOME_CARD_IMAGES = {
  goshala: `${OPT_CARDS}/goshala.jpg`,
  medical: `${OPT_CARDS}/medical.jpg`,
  narayana: `${OPT_CARDS}/narayana.jpg`,
  village: `${OPT_CARDS}/village.jpg`,
};

export const DIVINE_MOTHER_HOME_SRC = "/optimized/ssrrt/DivineMotherHome.jpg";
