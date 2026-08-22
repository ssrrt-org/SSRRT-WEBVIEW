import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { SlimHead } from "@/components/shared/PageSections";
import { IMG } from "@/constants/images";

export default function AshramHarakeNandiPage() {
  return (
    <>
      <SlimHead
        eyebrow="Ashram"
        title="Harake Nandi."
      />
      <section className="ritual-body">
        <div className="wrap ritual-body-inner">
          <figure className="pillar-fig" style={{ marginBottom: "24px" }}>
            <img src={IMG.shiva} alt="Harake Nandi" />
          </figure>
          <p>Nandi carries the devotee's prayer to Shiva. The harake here is part of the daily worship around the grand mantapa.</p>
        </div>
      </section>
      <section className="child-nav tint">
        <div className="wrap child-nav-inner">
          <Link className="btn-ghost-dark" to="/ashram">The Sacred Ashram <ChevronRight size={15} /></Link>
          <Link to="/sevas/nandi-abhisheka">Nandi Abhisheka →</Link>
        </div>
      </section>
    </>
  );
}
