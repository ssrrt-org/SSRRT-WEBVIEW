import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import ConsecratedSpaceScrollingHero from "@/components/ashram/ConsecratedSpaceScrollingHero";
import ProseSection from "@/components/shared/ProseSection";
import ExploreGrid from "@/components/shared/ExploreGrid";
import HashRedirect from "@/components/shared/HashRedirect";
import { Eyebrow } from "@/components/shared/PageSections";
import { ashramHubParagraphs } from "@/constants/ashramContent";
import { ashramRituals, cowAdoptionSeva } from "@/constants/sevasRituals";
import { templeCards } from "@/constants/templeData";
import { docExcerpt, docTitle } from "@/lib/docContent";
import { docPageImages } from "@/constants/docPageImages";
import { usePageImages } from "@/context/CmsContext";
import { consecratedSpaceTempleImages } from "@/constants/consecratedSpaceHeroImages";

const templeIds = templeCards.map((t) => t.id);

const DEITY_SANNIDHI_IDS = ["ganesha", "shiva", "krishna", "shirdi", "subramanya", "dattatreya"];
const OTHER_SACRED_CARD_IDS = ["manidweepa", "nataraja"];

const standaloneSacredSpaces = [
  {
    id: "bhairava",
    path: "/ashram/bhairava",
    name: docTitle("bhairava"),
    note: docExcerpt("bhairava", { skip: 1 }),
    img: consecratedSpaceTempleImages.bhairava,
  },
  {
    id: "harake-nandi",
    path: "/ashram/harake-nandi",
    name: docTitle("harake_nandi"),
    note: docExcerpt("harake_nandi", { skip: 1 }),
    img: consecratedSpaceTempleImages["harake-nandi"],
  },
];

export default function AshramPage() {
  const img = usePageImages("/ashram");
  const temples = templeCards.map((t) => ({
    ...t,
    img: img(`temple-card-${t.id}`, t.img),
  }));
  const deityTemples = temples.filter((t) => DEITY_SANNIDHI_IDS.includes(t.id));
  const otherSacredFromTemples = temples
    .filter((t) => OTHER_SACRED_CARD_IDS.includes(t.id))
    .map((t) => ({
      id: t.id,
      path: t.path,
      name: t.name,
      note: t.intro,
      img: t.img,
    }));
  const otherSacredStandalone = standaloneSacredSpaces.map((space) => ({
    ...space,
    img: img(`sacred-${space.id}`, space.img),
  }));
  const otherSacredSpaces = [...otherSacredFromTemples, ...otherSacredStandalone];

  const ashramTitle = docTitle("sacred_ashram", { minLen: 20 });
  const ashramEyebrow = docTitle("sacred_ashram", { minLen: 10 });
  const ashramLede = docExcerpt("sacred_ashram", { skip: 4, maxLen: 220 });

  return (
    <div className="mother-page consecrated-hub-page">
      <HashRedirect basePath="/ashram" ids={templeIds} />

      <header className="mother-page-head">
        <div className="wrap mother-page-head-inner">
          <Eyebrow>{ashramEyebrow || "Consecrated space"}</Eyebrow>
          <h1 className="mother-page-title">{ashramTitle || "Ashram & temples at Karekura"}</h1>
          <p className="mother-page-lede">{ashramLede}</p>
        </div>
      </header>

      <ConsecratedSpaceScrollingHero />

      <ProseSection paragraphs={ashramHubParagraphs} images={docPageImages.sacred_ashram} />

      <section className="temple-section-v2 tint">
        <div className="wrap">
          <Eyebrow>Temples</Eyebrow>
          <h2 className="section-h mother-line-heading-sm">Six deity sannidhis on the Cauvery.</h2>
          <div className="temple-grid-v2">
            {deityTemples.map((t) => (
              <Link key={t.id} to={t.path} className="temple-card-link" data-testid={`ashram-link-${t.id}`}>
                <article>
                  <div className="temple-img">
                    <img src={t.img} alt={t.name} loading="lazy" />
                  </div>
                  <div className="temple-card-body">
                    <h3>{t.name}</h3>
                    <p>{t.intro}</p>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="temple-section-v2">
        <div className="wrap">
          <Eyebrow>Other sacred spaces</Eyebrow>
          <h2 className="section-h mother-line-heading-sm">
            Mani-Dweepa, Nataraja Hall, Bhairava, and Harake Nandi.
          </h2>
          <div className="temple-grid-v2">
            {otherSacredSpaces.map((space) => (
              <Link
                key={space.id}
                to={space.path}
                className="temple-card-link"
                data-testid={`ashram-sacred-${space.id}`}
              >
                <article>
                  <div className="temple-img">
                    <img src={space.img} alt={space.name} loading="lazy" />
                  </div>
                  <div className="temple-card-body">
                    <h3>{space.name}</h3>
                    <p>{space.note}</p>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="temple-section-v2 tint">
        <div className="wrap">
          <Eyebrow>Ashram sevas</Eyebrow>
          <h2 className="section-h mother-line-heading-sm">Book abhisheka and seva at the sannidhis.</h2>
          <div className="temple-grid-v2">
            {[...ashramRituals, cowAdoptionSeva].map((ritual) => (
              <Link
                key={ritual.id}
                to={ritual.path}
                className="temple-card-link"
                data-testid={`ashram-ritual-${ritual.id}`}
              >
                <article>
                  <div className="temple-card-body temple-card-body-only">
                    <h3>{ritual.title}</h3>
                    <p>{ritual.intro}</p>
                  </div>
                </article>
              </Link>
            ))}
          </div>
          <p className="ashram-sevas-more">
            <Link to="/sevas" data-testid="ashram-all-sevas-link">
              View all Ashram sevas <ChevronRight size={15} aria-hidden="true" />
            </Link>
          </p>
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
    </div>
  );
}
