import GoshalaScrollingHero from "@/components/goshala/GoshalaScrollingHero";
import ProseSection from "@/components/shared/ProseSection";
import ExploreGrid from "@/components/shared/ExploreGrid";
import HashRedirect from "@/components/shared/HashRedirect";
import { Eyebrow } from "@/components/shared/PageSections";
import {
  goshalaAdoptTitle,
  goshalaHubParagraphs,
  goshalaSupportParagraphs,
  goshalaSupportTitle,
} from "@/constants/goshalaContent";
import { docPageImages } from "@/constants/docPageImages";
import { docExcerpt, docTitle } from "@/lib/docContent";

const goshalaTitle = goshalaAdoptTitle || docTitle("goshala_adopt");
const goshalaLede = docExcerpt("goshala_adopt", { skip: 1, maxLen: 220 });

export default function GoshalaPage() {
  return (
    <div className="mother-page goshala-hub-page">
      <HashRedirect basePath="/goshala" ids={["adopt", "day"]} />

      <header className="mother-page-head">
        <div className="wrap mother-page-head-inner">
          <Eyebrow>Kaamadhenau · Gau Seva</Eyebrow>
          <h1 className="mother-page-title">{goshalaTitle}</h1>
          <p className="mother-page-lede">{goshalaLede}</p>
        </div>
      </header>

      <GoshalaScrollingHero />

      <ProseSection
        paragraphs={goshalaHubParagraphs}
        images={docPageImages.goshala_adopt}
      />

      <ProseSection
        eyebrow={goshalaSupportTitle}
        paragraphs={goshalaSupportParagraphs}
        images={docPageImages.goshala_support}
        tint
      />

      <ExploreGrid
        title="Also on the Goshala"
        items={[
          { to: "/goshala/adopt", title: "Adopt a cow", note: docExcerpt("goshala_adopt", { skip: 1 }), testid: "goshala-link-adopt" },
          { to: "/goshala/day", title: "A day at Kaamadhenau", note: docExcerpt("goshala_volunteer", { skip: 4 }), testid: "goshala-link-day" },
          { to: "/volunteering", title: "Volunteer", note: docExcerpt("goshala_volunteer", { skip: 1 }), testid: "goshala-link-volunteer" },
          { to: "/donate?purpose=goshala", title: "Donate to the Goshala", testid: "goshala-link-donate" },
        ]}
      />
    </div>
  );
}
