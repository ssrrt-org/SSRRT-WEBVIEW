import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motherHeroImages } from "@/constants/motherHeroImages";
import { DIVINE_MOTHER_HOME_SRC, heroSlideSrc } from "@/lib/media";

const preloaded = new Set();

function preloadImage(href, fetchPriority) {
  if (!href || preloaded.has(href)) return;
  preloaded.add(href);
  if (document.querySelector(`link[rel="preload"][href="${href}"]`)) return;
  const link = document.createElement("link");
  link.rel = "preload";
  link.as = "image";
  link.href = href;
  if (fetchPriority) link.setAttribute("fetchpriority", fetchPriority);
  document.head.appendChild(link);
}

function warmImage(href) {
  if (!href || preloaded.has(`warm:${href}`)) return;
  preloaded.add(`warm:${href}`);
  const img = new Image();
  img.decoding = "async";
  img.src = href;
}

/** Start fetching route-critical photos as soon as the URL is known (before lazy chunks paint). */
function imagesForPath(pathname) {
  if (pathname === "/") {
    return [
      { href: DIVINE_MOTHER_HOME_SRC, priority: "auto" },
    ];
  }
  if (pathname === "/mother") {
    const hero = heroSlideSrc(motherHeroImages[0], { main: true });
    const side = heroSlideSrc(motherHeroImages[1], { main: false });
    return [
      { href: hero, priority: "high" },
      { href: side, priority: "low" },
    ];
  }
  return [];
}

export default function RouteImagePreload() {
  const { pathname } = useLocation();

  useEffect(() => {
    imagesForPath(pathname).forEach(({ href, priority }) => {
      preloadImage(href, priority);
      warmImage(href);
    });
  }, [pathname]);

  return null;
}
