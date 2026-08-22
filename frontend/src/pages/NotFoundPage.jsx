import { Link } from "react-router-dom";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import { Eyebrow } from "@/components/shared/PageSections";

export default function NotFoundPage() { return (
  <section className="notfound">
    <div className="wrap notfound-inner">
      <div className="notfound-code">404</div>
      <Eyebrow gold>Page not found</Eyebrow>
      <h1>This path does not lead here.</h1>
      <p>The page you are looking for may have been moved, renamed, or is not yet part of the Trust's website. Return to a peaceful corner below.</p>
      <div className="notfound-links">
        <Link className="btn-solid" data-testid="notfound-home" to="/">Return home <ArrowUpRight size={16}/></Link>
        <Link className="btn-ghost-dark" data-testid="notfound-mother" to="/mother">About Amma <ChevronRight size={15}/></Link>
        <Link className="btn-ghost-dark" data-testid="notfound-goshala" to="/goshala">The Goshala <ChevronRight size={15}/></Link>
        <Link className="btn-ghost-dark" data-testid="notfound-contact" to="/contact">Contact the Trust <ChevronRight size={15}/></Link>
      </div>
    </div>
  </section>
);
}
