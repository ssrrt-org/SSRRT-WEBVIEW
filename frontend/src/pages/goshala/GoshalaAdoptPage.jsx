import { Link } from "react-router-dom";
import { ArrowUpRight, ChevronRight, HandHeart, Home, Leaf, Stethoscope } from "lucide-react";
import { Eyebrow, SlimHead } from "@/components/shared/PageSections";

export default function GoshalaAdoptPage() {
  return (
    <>
      <SlimHead
        eyebrow="Adopt a cow"
        title="Sponsor feed and care for one animal."
      />

      <section className="anchor">
        <div className="wrap">
          <div className="adopt-grid">
            <article><Leaf size={22} aria-hidden="true" /><h3>Feed & fodder</h3><p>Green fodder, dry feed, minerals, and clean water every day.</p></article>
            <article><Stethoscope size={22} aria-hidden="true" /><h3>Veterinary care</h3><p>Check-ups, vaccinations, treatment when a cow falls ill.</p></article>
            <article><Home size={22} aria-hidden="true" /><h3>Shelter</h3><p>Sheds cleaned daily, shade in summer, dry bedding in monsoon.</p></article>
            <article><HandHeart size={22} aria-hidden="true" /><h3>Staff</h3><p>Caretakers who know each cow by name, from before dawn.</p></article>
          </div>

          <div className="adopt-cta">
            <div>
              <h3>Give through the Trust office or online form.</h3>
              <p>Any amount helps. The office can tell you how sponsorship is recorded.</p>
            </div>
            <Link className="btn-solid" data-testid="goshala-adopt-donate" to="/donate?purpose=goshala">
              Donate to the Goshala <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <section className="child-nav tint">
        <div className="wrap child-nav-inner">
          <Link className="btn-ghost-dark" data-testid="goshala-adopt-back" to="/goshala">
            Project Kaamadhenau <ChevronRight size={15} />
          </Link>
          <Link data-testid="goshala-adopt-day" to="/goshala/day">
            A day at Kaamadhenau →
          </Link>
        </div>
      </section>
    </>
  );
}
