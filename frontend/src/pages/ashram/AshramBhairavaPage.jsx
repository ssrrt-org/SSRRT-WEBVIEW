import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { SlimHead } from "@/components/shared/PageSections";
import { IMG } from "@/constants/images";

export default function AshramBhairavaPage() {
  return (
    <>
      <SlimHead
        eyebrow="Ashram"
        title="Kaala Bhairava Trishula."
      />
      <section className="ritual-body">
        <div className="wrap ritual-body-inner">
          <figure className="pillar-fig" style={{ marginBottom: "24px" }}>
            <img src={IMG.shiva} alt="Kaala Bhairava Trishula" />
          </figure>
          <p>Kaala Bhairava — fierce aspect of Shiva — is worshipped here for protection and courage. The trishula stands among the Ashram's other sacred spots along the Cauvery.</p>
        </div>
      </section>
      <section className="child-nav tint">
        <div className="wrap child-nav-inner">
          <Link className="btn-ghost-dark" to="/ashram">The Sacred Ashram <ChevronRight size={15} /></Link>
          <Link to="/ashram/shiva">Shiva temple →</Link>
        </div>
      </section>
    </>
  );
}
