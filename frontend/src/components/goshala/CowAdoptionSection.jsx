import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Check } from "lucide-react";
import {
  GOSHALA_COW_YEARLY_COST,
  goshalaAdoptableCows,
} from "@/constants/goshalaCows";

export default function CowAdoptionSection({ variant = "goshala" }) {
  const isSeva = variant === "seva";
  const [selected, setSelected] = useState(() => new Set());

  const toggle = (id) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const chosen = useMemo(
    () => goshalaAdoptableCows.filter((cow) => selected.has(cow.id)),
    [selected],
  );

  const total = chosen.length * GOSHALA_COW_YEARLY_COST;

  const checkoutHref = useMemo(() => {
    if (!chosen.length) return "/donate?purpose=goshala";
    const names = chosen.map((c) => c.name).join(", ");
    const params = new URLSearchParams({
      purpose: "goshala",
      amount: String(total),
      dedication: isSeva
        ? `Gau seva · annual adoption — ${names}`
        : `Annual adoption — ${names}`,
    });
    return `/donate?${params.toString()}`;
  }, [chosen, total, isSeva]);

  return (
    <section
      className={`goshala-adopt-picker tint${isSeva ? " goshala-adopt-picker-seva" : ""}`}
      data-testid={isSeva ? "seva-adopt-picker" : "goshala-adopt-picker"}
    >
      <div className="wrap">
        <header className="goshala-adopt-picker-head">
          <h2>{isSeva ? "Select cows for annual Gau seva" : "Choose a cow to adopt"}</h2>
          <p>
            {isSeva
              ? "This is the seva booking flow: pick one or more cows, then complete your annual sponsorship offering. You may sponsor multiple cows in a single visit."
              : "Select one or more cows and offer a full year of feed, shelter, and care. You may adopt as many cows as you wish — each sponsorship is for one year."}
          </p>
          <p className="goshala-adopt-picker-rate">
            ₹{GOSHALA_COW_YEARLY_COST.toLocaleString("en-IN")} per cow · one year
          </p>
        </header>

        <div className="goshala-adopt-grid">
          {goshalaAdoptableCows.map((cow) => {
            const on = selected.has(cow.id);
            return (
              <button
                type="button"
                key={cow.id}
                className={`goshala-adopt-card${on ? " selected" : ""}`}
                data-testid={`adopt-cow-${cow.id}`}
                onClick={() => toggle(cow.id)}
                aria-pressed={on}
              >
                <div className="goshala-adopt-card-img">
                  <img src={cow.image} alt="" loading="lazy" decoding="async" />
                  {on ? (
                    <span className="goshala-adopt-card-check" aria-hidden="true">
                      <Check size={18} />
                    </span>
                  ) : null}
                </div>
                <h3>{cow.name}</h3>
                <p>{cow.note}</p>
              </button>
            );
          })}
        </div>

        <div className="goshala-adopt-checkout">
          <p data-testid="adopt-cow-summary">
            {chosen.length
              ? `${chosen.length} cow${chosen.length > 1 ? "s" : ""} selected · ₹${total.toLocaleString("en-IN")} for one year`
              : "Select at least one cow to continue."}
          </p>
          <Link
            className="btn-solid"
            data-testid="adopt-cow-checkout"
            to={checkoutHref}
            aria-disabled={!chosen.length}
            onClick={(e) => {
              if (!chosen.length) e.preventDefault();
            }}
          >
            {isSeva ? "Continue to payment" : "Proceed to offer seva"}
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
