import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { SlimHead, Split } from "@/components/shared/PageSections";
import { IMG } from "@/constants/images";

export default function MotherAvataarhoodPage() {
  return (
    <>
      <SlimHead
        eyebrow="Amma"
        title="The Avataarhood."
      />
      <Split title="What devotees describe." image={IMG.manidweepa} tint>
        <p>Amma's family had prayed for the Divine Mother to be born among them. In daily life she was a bank officer and householder; in spiritual life devotees describe her assuming many forms — comforter, warrior, mother — to awaken those who come to her sincerely.</p>
      </Split>
      <section className="child-nav tint">
        <div className="wrap child-nav-inner">
          <Link className="btn-ghost-dark" to="/mother">Glimpses of the Mother <ChevronRight size={15} /></Link>
          <Link to="/mother/naadi">Naadi readings →</Link>
        </div>
      </section>
    </>
  );
}
