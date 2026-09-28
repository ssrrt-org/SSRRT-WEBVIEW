import { Eyebrow } from "@/components/shared/PageSections";
import HubProgrammesSection from "@/components/shared/HubProgrammesSection";
import { usePageImages } from "@/context/CmsContext";
import { consecratedSpaceTempleImages } from "@/constants/consecratedSpaceHeroImages";
import { ashramRituals, cowAdoptionSeva } from "@/constants/sevasRituals";

const ritualImages = {
  "nandi-abhisheka": consecratedSpaceTempleImages["harake-nandi"],
  "ganesh-abhisheka": consecratedSpaceTempleImages.ganesha,
  "subramanya-seva": consecratedSpaceTempleImages.subramanya,
};

const programmes = [
  ...ashramRituals.map((r) => ({
    id: r.id,
    to: r.path,
    title: r.title,
    tag: r.eyebrow,
    note: r.intro || r.paragraphs?.[0],
    image: ritualImages[r.id],
    testid: `sevas-link-${r.id}`,
  })),
  {
    id: cowAdoptionSeva.id,
    to: cowAdoptionSeva.path,
    title: cowAdoptionSeva.title,
    tag: cowAdoptionSeva.eyebrow,
    note: cowAdoptionSeva.intro,
    image: ritualImages["harake-nandi"],
    testid: "sevas-link-adopt-a-cow",
  },
];

export default function SevasHubPage() {
  const img = usePageImages("/sevas");
  const cards = programmes.map((program) => ({
    ...program,
    image: img(`hub-${program.id}`, program.image),
  }));

  return (
    <div className="mother-page sevas-hub-page">
      <header className="mother-page-head">
        <div className="wrap mother-page-head-inner">
          <Eyebrow>Ashram sevas</Eyebrow>
          <h1 className="mother-page-title">Sacred sevas at the Ashram.</h1>
          <p className="mother-page-lede">
            Explore each offering on its own page, with its distinct tradition, significance, and booking details.
          </p>
        </div>
      </header>

      <HubProgrammesSection
        hideHeader
        lede="Select a seva to read its full description and continue to its individual booking page."
        programmes={cards}
        testIdPrefix="sevas"
        tint
      />
    </div>
  );
}
