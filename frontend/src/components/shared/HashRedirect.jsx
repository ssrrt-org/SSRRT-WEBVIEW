import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

/** Redirect legacy `#section` URLs to standalone child routes. */
export default function HashRedirect({ basePath, ids }) {
  const navigate = useNavigate();

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash && ids.includes(hash)) {
      navigate(`${basePath}/${hash}`, { replace: true });
    }
  }, [basePath, ids, navigate]);

  return null;
}
