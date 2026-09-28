import { Link } from "react-router-dom";
import MaterialIcon from "@/components/devotees/MaterialIcon";

export default function DevoteesShareInvite() {
  return (
    <section className="mt-6 mb-2">
      <div
        className="bg-sanctum-primary-container text-sanctum-ivory rounded-sanctum-xl p-8 md:p-10 relative overflow-hidden border border-sanctum-gold/40 shadow-md"
      >
        <div
          className="absolute -right-12 -bottom-12 w-64 h-64 rounded-full border border-sanctum-gold/20 pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute -right-6 -bottom-6 w-52 h-52 rounded-full border border-sanctum-gold/15 pointer-events-none"
          aria-hidden="true"
        />
        <div className="max-w-2xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-sanctum-primary border border-sanctum-gold/50 rounded-full mb-3">
            <MaterialIcon name="volunteer_activism" className="text-sm text-sanctum-gold" />
            <span className="font-sanctum text-[10px] uppercase tracking-widest text-sanctum-gold">
              Spiritual Witness &amp; Satsang
            </span>
          </div>
          <h2 className="font-sanctum text-sanctum-headline-md text-sanctum-ivory mb-3 font-normal">
            Have you experienced the divine grace of Divine Mother Amma?
          </h2>
          <p className="font-sanctum text-sanctum-body-md text-[#bec5e8] font-light mb-6 leading-relaxed">
            Your sacred personal testimony serves as an inspiring lamp of faith for fellow seekers on the
            spiritual path. Share how Divine Mother’s compassion, darshan, or seva has guided and sheltered
            your life.
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <Link
              to="/devotees-corner/share"
              className="inline-flex items-center justify-center gap-2 bg-sanctum-gold-mid hover:bg-[#B8852E] text-sanctum-primary font-sanctum text-sanctum-label-lg font-semibold px-6 py-2.5 rounded-sanctum shadow-sm transition-all duration-200 active:scale-95"
              data-testid="devotees-cta-share"
            >
              <span>Submit Your Experience</span>
              <MaterialIcon name="arrow_forward" className="text-sm" />
            </Link>
            <p className="font-sanctum text-[12px] text-[#BEC5E8]/80 italic">
              ✦ All submissions are lovingly reviewed by the Ashram Sevaks before being published.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
