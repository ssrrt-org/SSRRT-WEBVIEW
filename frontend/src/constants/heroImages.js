import { IMG } from "@/constants/images";

/** Background photo per route — local Ashram / Goshala imagery where possible. */
const exact = {
  "/goshala": IMG.goshalaLocal || IMG.cowCloseup,
  "/goshala/adopt": IMG.calf,
  "/goshala/day": IMG.cow3,
  "/mother-for-needy": IMG.medical,
  "/rural-upliftment": IMG.village,
  "/seva": IMG.serve,
  "/sevas": IMG.shiva,
  "/volunteering": IMG.volunteer,
  "/mother": IMG.amma,
  "/about": IMG.event1,
  "/shop": IMG.ammaGanesha,
  "/donate": IMG.manidweepa,
  "/contact": IMG.river,
  "/events": IMG.event2,
  "/ashram": IMG.river,
};

const prefix = [
  { test: (p) => p.startsWith("/goshala/"), image: IMG.cowCloseup },
  { test: (p) => p.startsWith("/ashram/shirdi"), image: IMG.shirdi },
  { test: (p) => p.startsWith("/ashram/manidweepa"), image: IMG.manidweepa },
  { test: (p) => p.startsWith("/ashram/krishna") || p.startsWith("/ashram/ganesha"), image: IMG.ammaGanesha },
  { test: (p) => p.startsWith("/ashram/shiva") || p.startsWith("/ashram/bhairava") || p.startsWith("/ashram/harake"), image: IMG.shiva },
  { test: (p) => p.startsWith("/ashram/"), image: IMG.templeGold },
  { test: (p) => p.startsWith("/seva/narayana") || p.startsWith("/seva/food"), image: IMG.kitchen },
  { test: (p) => p.startsWith("/seva/medical"), image: IMG.medical },
  { test: (p) => p.startsWith("/seva/"), image: IMG.village },
  { test: (p) => p.startsWith("/sevas/"), image: IMG.shiva },
  { test: (p) => p.startsWith("/mother/"), image: IMG.ammaGanesha },
  { test: (p) => p.startsWith("/shop/"), image: IMG.ammaGanesha },
];

export function heroImageForPath(pathname) {
  if (exact[pathname]) return exact[pathname];
  const match = prefix.find((r) => r.test(pathname));
  if (match) return match.image;
  return IMG.event1;
}
