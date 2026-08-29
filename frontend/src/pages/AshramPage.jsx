import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import ProseSection from "@/components/shared/ProseSection";
import ExploreGrid from "@/components/shared/ExploreGrid";
import HashRedirect from "@/components/shared/HashRedirect";
import { SlimHead } from "@/components/shared/PageSections";
import { ashramHubParagraphs } from "@/constants/ashramContent";
import { ashramRituals } from "@/constants/sevasRituals";
import { templeCards } from "@/constants/templeData";
import { docExcerpt, docTitle } from "@/lib/docContent";
import { docPageImages } from "@/constants/docPageImages";
import { usePageImages } from "@/context/CmsContext";
import { IMG } from "@/constants/images";

const templeIds = templeCards.map((t) => t.id);

const sacredSpaces = [
  {
    id: "bhairava",
    path: "/ashram/bhairava",
    name: docTitle("bhairava"),
    note: docExcerpt("bhairava", { skip: 1 }),
    img: IMG.shiva,
  },
  {
    id: "harake-nandi",
    path: "/ashram/harake-nandi",
    name: docTitle("harake_nandi"),
    note: docExcerpt("harake_nandi", { skip: 1 }),
    img: IMG.manidweepa,
  },
];

export default function AshramPage() {
  const img = usePageImages("/ashram");
  const temples = templeCards.map((t) => ({
    ...t,
    img: img(`temple-card-${t.id}`, t.img),
  }));
  const sacred = sacredSpaces.map((space) => ({
    ...space,
    img: img(`sacred-${space.id}`, space.img),
  }));

  return (
    <>
      <HashRedirect basePath="/ashram" ids={templeIds} />

      <SlimHead
        eyebrow={docTitle("sacred_ashram", { minLen: 10 })}
        title={docTitle("sacred_ashram", { minLen: 20 })}
      />

      <ProseSection paragraphs={ashramHubParagraphs} images={docPageImages.sacred_ashram} />

      <section className="temple-section-v2 tint">
        <div className="wrap">
          <div className="temple-grid-v2">
            {temples.map((t) => (
              <Link key={t.id} to={t.path} className="temple-card-link" data-testid={`ashram-link-${t.id}`}>
                <article>
                  <div className="temple-img">
                    <img src={t.img} alt={t.name} loading="lazy" />
                  </div>
                  <div className="temple-card-body">
                    <h3>{t.name}</h3>
                    <p>{t.note}</p>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="sevas-band">
        <div className="wrap">
          <div className="sevas-grid">
            {sacred.map((space) => (
              <Link key={space.id} to={space.path} className="seva-card-link" data-testid={`ashram-sacred-${space.id}`}>
                <article>
                  <img src={space.img} alt={space.name} loading="lazy" />
                  <div>
                    <h3>{space.name}</h3>
                    <p>{space.note}</p>
                  </div>
                </article>
              </Link>
            ))}
            {ashramRituals.map((ritual) => (
              <Link key={ritual.id} to={ritual.path} className="seva-card-link" data-testid={`ashram-ritual-${ritual.id}`}>
                <article>
                  <div>
                    <h3>{ritual.title}</h3>
                    <p>{ritual.paragraphs?.[0]?.slice(0, 140)}…</p>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ExploreGrid
        title="Plan your visit"
        items={[
          { to: "/contact", title: "Contact the office", note: docExcerpt("sacred_ashram", { skip: 7 }) },
          { to: "/events", title: "Ashram events", note: docExcerpt("guru_pournima", { skip: 1 }) },
          { to: "/volunteering", title: "Volunteer", note: docExcerpt("goshala_volunteer", { skip: 1 }) },
        ]}
      />
    </>
  );
}
