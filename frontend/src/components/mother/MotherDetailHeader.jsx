import { Eyebrow } from "@/components/shared/PageSections";

export default function MotherDetailHeader({ eyebrow, title, intro }) {
  return (
    <section className="mother-detail-head">
      <div className="wrap">
        <Eyebrow gold>{eyebrow}</Eyebrow>
        <h1>{title}</h1>
        {intro && <p>{intro}</p>}
      </div>
    </section>
  );
}
