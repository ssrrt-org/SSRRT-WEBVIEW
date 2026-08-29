import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import ProseSection from "@/components/shared/ProseSection";
import ExploreGrid from "@/components/shared/ExploreGrid";
import HashRedirect from "@/components/shared/HashRedirect";
import { SlimHead } from "@/components/shared/PageSections";
import {
  goshalaAdoptTitle,
  goshalaHubParagraphs,
  goshalaSupportParagraphs,
  goshalaSupportTitle,
} from "@/constants/goshalaContent";
import { docPageImages } from "@/constants/docPageImages";
import { docExcerpt, docTitle } from "@/lib/docContent";

export default function GoshalaPage() {
  return (
    <>
      <HashRedirect basePath="/goshala" ids={["adopt", "day"]} />

      <SlimHead
        eyebrow="Kaamadhenau · Gau Seva"
        title={goshalaAdoptTitle || docTitle("goshala_adopt")}
      />

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
    </>
  );
}
