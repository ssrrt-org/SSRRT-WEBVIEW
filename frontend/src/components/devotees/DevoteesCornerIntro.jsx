import { NavLink } from "react-router-dom";
import MaterialIcon from "@/components/devotees/MaterialIcon";

const pillClass = ({ isActive }) =>
  [
    "flex items-center gap-2 px-5 py-2 rounded-full font-sanctum text-sanctum-label-lg uppercase tracking-wide transition-all duration-200",
    isActive
      ? "bg-sanctum-surface-container-lowest text-sanctum-primary font-semibold shadow-sm"
      : "text-sanctum-on-surface-variant hover:text-sanctum-primary",
  ].join(" ");

export default function DevoteesCornerIntro({ active }) {
  const isExperiences = active === "experiences";

  return (
    <header className="text-center max-w-3xl xl:max-w-[min(100%,80rem)] mx-auto mb-6 md:mb-8">
      <div
        className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#f1e6dd] border border-sanctum-surface-variant rounded-full text-sanctum-secondary mb-4 shadow-sm"
      >
        <span className="text-xs" aria-hidden="true">✦ ॐ ✦</span>
        <span className="font-sanctum text-sanctum-label-md uppercase tracking-wider text-sanctum-secondary">
          Community &amp; Devotee Anubhava
        </span>
        <span className="text-xs" aria-hidden="true">✦</span>
      </div>

      <h1 className="font-sanctum text-sanctum-headline-lg md:text-[44px] text-sanctum-primary tracking-tight mb-4 font-normal">
        {isExperiences
          ? "Devotees Corner — Grace & Sacred Experiences"
          : "Share Your Sacred Experience"}
      </h1>

      <p
        className="font-sanctum text-sanctum-on-surface-variant font-light leading-relaxed mb-5 mx-auto max-w-[min(100%,72rem)] px-2 text-[14px] sm:text-[15px] md:text-base lg:text-[16px] lg:leading-[1.45] xl:whitespace-nowrap"
      >
        {isExperiences
          ? "A sacred repository of heartfelt personal experiences, miraculous interventions, and divine blessings shared by devotees walking under the grace of Divine Mother Srimad Sai RajaRajeshwari."
          : "Your testimony is a lamp of faith for fellow seekers — share how Divine Mother’s compassion, darshan, or seva has guided your life; every submission is reviewed before publication."}
      </p>

      <div className="inline-flex p-1 bg-sanctum-surface-container border border-sanctum-surface-variant rounded-full shadow-inner">
        <NavLink to="/devotees-corner" className={pillClass} end>
          <MaterialIcon name="menu_book" className="text-base text-sanctum-secondary" />
          <span>Read Experiences (Published)</span>
        </NavLink>
        <NavLink to="/devotees-corner/share" className={pillClass}>
          <MaterialIcon name="stylus" className="text-base" />
          <span>Share Your Experience</span>
        </NavLink>
      </div>
    </header>
  );
}
