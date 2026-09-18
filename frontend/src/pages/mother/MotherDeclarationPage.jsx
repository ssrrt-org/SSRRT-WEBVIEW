import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import MotherDetailHeader from "@/components/mother/MotherDetailHeader";
import ProseSection from "@/components/shared/ProseSection";
import { Quote } from "@/components/shared/PageSections";
import {
  motherDeclarationNarrative,
  motherDeclarationQuote,
} from "@/constants/motherContent";

export default function MotherDeclarationPage() {
  return (
    <>
      <MotherDetailHeader
        eyebrow="Declaration of Avatar"
        title="29 March 1997"
        intro="Goddess Rajarajeshwari proclaimed — the declaration of Avatarhood at Karekura."
      />

      <ProseSection
        eyebrow="Declaration"
        title="Goddess Rajarajeshwari proclaimed."
        paragraphs={motherDeclarationNarrative}
      />

      <Quote author="Amma · Avataric declaration">{motherDeclarationQuote}</Quote>

      <section className="child-nav tint">
        <div className="wrap child-nav-inner">
          <Link className="btn-ghost-dark" data-testid="declaration-back" to="/mother">
            About Amma <ChevronRight size={15} />
          </Link>
          <div className="child-nav-links">
            <Link data-testid="declaration-avataarhood" to="/mother/avataarhood">
              The Avataarhood →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
