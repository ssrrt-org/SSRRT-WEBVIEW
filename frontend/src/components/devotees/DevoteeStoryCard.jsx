export default function DevoteeStoryCard({ name, location, message, tag, date }) {
  const displayTag = tag?.trim() || "Devotee testimony";

  return (
    <article
      className="devotees-story-card bg-sanctum-surface-container-lowest border border-sanctum-surface-variant rounded-sanctum-xl p-6 flex flex-col justify-between shadow-sanctum relative overflow-hidden group hover:border-sanctum-gold transition-all duration-300"
    >
      <div
        className="absolute top-0 left-0 right-0 h-[3px] bg-sanctum-surface-variant group-hover:bg-sanctum-gold-mid transition-colors"
        aria-hidden="true"
      />
      <div>
        <div className="flex items-center justify-between mb-4 gap-3">
          <span
            className="text-4xl leading-none text-sanctum-gold font-sanctum select-none"
            aria-hidden="true"
          >
            “
          </span>
          <span
            className="inline-flex items-center px-2.5 py-0.5 rounded text-sanctum-label-md tracking-wider bg-[#fcf2e8] text-sanctum-secondary border border-sanctum-surface-variant shrink-0"
          >
            {displayTag}
          </span>
        </div>
        <p className="font-sanctum text-sanctum-body-md text-sanctum-on-surface italic leading-relaxed mb-6 font-normal">
          &ldquo;{message}&rdquo;
        </p>
      </div>
      <div className="pt-4 border-t border-[#f1e6dd] flex items-center justify-between gap-3">
        <div className="text-left min-w-0">
          <h2 className="font-sanctum text-[17px] font-semibold text-sanctum-primary leading-snug">
            {name}
          </h2>
          {location ? (
            <p className="font-sanctum text-sanctum-label-md text-sanctum-on-surface-variant">
              {location}
            </p>
          ) : null}
        </div>
        {date ? (
          <span className="font-sanctum text-sanctum-body-sm text-[12px] text-sanctum-on-surface-variant font-light shrink-0">
            {date}
          </span>
        ) : null}
      </div>
    </article>
  );
}
