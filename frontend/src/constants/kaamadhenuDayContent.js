import { isDocSectionHeading } from "@/lib/docContent";
import kaamadhenuDayDoc from "@/constants/kaamadhenuDayDoc.json";

export const kaamadhenuDayEyebrow = "A day at Kamadhenu";
export const kaamadhenuDayHeadTitle = "A day in the life of Kaamadhenu.";
export const kaamadhenuDayHeadLede = kaamadhenuDayDoc[1];
export const kaamadhenuDayClosing =
  kaamadhenuDayDoc[kaamadhenuDayDoc.length - 1]?.trim() || "Jai Gaumata | Jai Amma";

function keepProseBlock(p) {
  const t = String(p || "").trim();
  if (!t) return false;
  if (isDocSectionHeading(t)) return true;
  if (t.length < 80) return /[.!?)"']$/.test(t);
  return true;
}

const kaamadhenuDayBlocks = kaamadhenuDayDoc.slice(2).filter(keepProseBlock);

function sectionIndex(prefix) {
  return kaamadhenuDayBlocks.findIndex((p) => p.startsWith(prefix));
}

const morningSectionAt = sectionIndex("Morning:");
const eveningSectionAt = sectionIndex("Evening:");
const challengesSectionAt = sectionIndex("The Challenges");

export const kaamadhenuDayParagraphsBeforeMorning =
  morningSectionAt > 0 ? kaamadhenuDayBlocks.slice(0, morningSectionAt) : kaamadhenuDayBlocks;

export const kaamadhenuDayParagraphsMorningThroughMidday =
  morningSectionAt >= 0 && eveningSectionAt > morningSectionAt
    ? kaamadhenuDayBlocks.slice(morningSectionAt, eveningSectionAt)
    : morningSectionAt >= 0
      ? kaamadhenuDayBlocks.slice(morningSectionAt)
      : [];

export const kaamadhenuDayParagraphsEvening =
  eveningSectionAt >= 0 && challengesSectionAt > eveningSectionAt
    ? kaamadhenuDayBlocks.slice(eveningSectionAt, challengesSectionAt)
    : eveningSectionAt >= 0
      ? kaamadhenuDayBlocks.slice(eveningSectionAt)
      : [];

const afterEveningBlocks =
  challengesSectionAt >= 0 ? kaamadhenuDayBlocks.slice(challengesSectionAt) : [];
export const kaamadhenuDayParagraphsAfterEvening = afterEveningBlocks.filter(
  (p) => p.trim() !== kaamadhenuDayClosing,
);
