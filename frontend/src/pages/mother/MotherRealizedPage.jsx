import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { SlimHead, Split } from "@/components/shared/PageSections";
import { IMG } from "@/constants/images";

export default function MotherRealizedPage() {
  return (
    <>
      <SlimHead
        eyebrow="Amma"
        title="Realized beings."
      />
      <Split title="Naadi readings." image={IMG.shirdi} reverse tint>
        <p>Devotees who know both Shirdi Sai and the Divine Mother often speak of the same quality of compassion in Amma — serving anyone who comes, without asking for spectacle.</p>
        <p>Amma herself asks devotees to seek humility and service rather than visions. The Ashram's work — food, medicine, cows — is offered in that spirit.</p>
      </Split>
      <section className="child-nav tint">
        <div className="wrap child-nav-inner">
          <Link className="btn-ghost-dark" to="/mother">Glimpses of the Mother <ChevronRight size={15} /></Link>
          <Link to="/ashram/shirdi">Shirdi Baba temple →</Link>
        </div>
      </section>
    </>
  );
}
