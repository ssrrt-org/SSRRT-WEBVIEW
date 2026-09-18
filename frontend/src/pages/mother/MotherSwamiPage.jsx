import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import MotherDetailHeader from "@/components/mother/MotherDetailHeader";
import { usePageImages } from "@/context/CmsContext";
import { IMG } from "@/constants/images";

export default function MotherSwamiPage() {
  const img = usePageImages("/mother/swami");

  return (
    <>
      <MotherDetailHeader eyebrow="Amma" title="Swami & Amma." />

      <section className="ritual-body tint">
        <div className="wrap ritual-body-inner">
          <figure className="pillar-fig" style={{ marginBottom: "24px" }}>
            <img src={img("inline-figure", IMG.boss)} alt="Swami and Amma" />
          </figure>
          <p>She has hidden her own stature under his name. Devotees who know her well say the Ashram's seva — the meals, the cows, the students — carries that same humility.</p>
        </div>
      </section>
      <section className="child-nav tint">
        <div className="wrap child-nav-inner">
          <Link className="btn-ghost-dark" to="/mother">About Amma <ChevronRight size={15} /></Link>
          <Link to="/mother/avatar">Avatar →</Link>
        </div>
      </section>
    </>
  );
}
