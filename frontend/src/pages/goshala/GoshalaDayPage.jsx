import { Link } from "react-router-dom";
import { ChevronRight, Heart, Home, Sunrise, Utensils } from "lucide-react";
import { SlimHead } from "@/components/shared/PageSections";

export default function GoshalaDayPage() {
  return (
    <>
      <SlimHead
        eyebrow="Kaamadhenau"
        title="A day at the Goshala."
      />

      <section className="day-in-life">
        <div className="wrap day-in-life-inner">
          <ol className="daylist">
            <li>
              <Sunrise size={20} aria-hidden="true" />
              <div>
                <strong>Before dawn</strong>
                <p>Walk through the shelters, refill water, check cooling. Milking starts after calves have fed.</p>
              </div>
            </li>
            <li>
              <Utensils size={20} aria-hidden="true" />
              <div>
                <strong>Morning</strong>
                <p>Cut fodder from the fields, portion concentrate feed, watch calves closely.</p>
              </div>
            </li>
            <li>
              <Home size={20} aria-hidden="true" />
              <div>
                <strong>Midday</strong>
                <p>Animals rest in shade. Cleaning and field work continue.</p>
              </div>
            </li>
            <li>
              <Heart size={20} aria-hidden="true" />
              <div>
                <strong>Evening</strong>
                <p>Final feed and water. Residents often stop by at dusk.</p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      <section className="child-nav tint">
        <div className="wrap child-nav-inner">
          <Link className="btn-ghost-dark" data-testid="goshala-day-back" to="/goshala">
            Project Kaamadhenau <ChevronRight size={15} />
          </Link>
          <Link data-testid="goshala-day-adopt" to="/goshala/adopt">
            Adopt a cow →
          </Link>
        </div>
      </section>
    </>
  );
}
