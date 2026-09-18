import { useLocation } from "react-router-dom";
import ScrollHint from "@/components/shared/ScrollHint";

export default function GlobalScrollHint() {
  const { pathname } = useLocation();

  if (pathname.startsWith("/admin")) {
    return null;
  }

  return <ScrollHint variant="light" placement="corner" />;
}
