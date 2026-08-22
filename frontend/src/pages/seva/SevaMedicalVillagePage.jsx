import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { Eyebrow, SlimHead } from "@/components/shared/PageSections";
import { IMG } from "@/constants/images";

export default function SevaMedicalVillagePage() {
  return (
    <>
      <SlimHead
        eyebrow="Village medical camps"
        title="Care in the villages."
      />
      <section className="pillar-body tint">
        <div className="wrap pillar-body-grid rev">
          <div>
            <Eyebrow gold>Village level</Eyebrow>
            <h2>When the clinic cannot reach everyone.</h2>
            <p>Coordinators work with village leaders to run preventive camps — checking blood pressure, fevers, skin conditions, and referring serious cases to the medical centre or district hospital.</p>
            <p>Families are not turned away because they cannot pay. Much of the work is simply helping people avoid getting sick in the first place.</p>
          </div>
          <figure className="pillar-fig"><img src={IMG.village} alt="Village medical camp" /></figure>
        </div>
      </section>
      <section className="child-nav tint">
        <div className="wrap child-nav-inner">
          <Link className="btn-ghost-dark" to="/mother-for-needy">Mother for the Needy <ChevronRight size={15} /></Link>
          <Link to="/seva/medical">Medical centre →</Link>
        </div>
      </section>
    </>
  );
}
