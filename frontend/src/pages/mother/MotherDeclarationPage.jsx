import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import MotherDetailHeader from "@/components/mother/MotherDetailHeader";
import MotherDeclarationLayout from "@/components/mother/MotherDeclarationLayout";
import { declarationPageTitle } from "@/constants/motherDeclarationContent";

export default function MotherDeclarationPage() {
  return (
    <div className="declaration-page">
      <MotherDetailHeader
        eyebrow="Declaration of Avatar"
        title="29 March 1997"
        intro={declarationPageTitle}
      />

      <MotherDeclarationLayout />

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
    </div>
  );
}
