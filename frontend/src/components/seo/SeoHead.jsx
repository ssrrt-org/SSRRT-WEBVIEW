import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  DEFAULT_OG_PATH,
  absoluteUrl,
  breadcrumbJsonLd,
  organizationJsonLd,
  resolveSeo,
  websiteJsonLd,
} from "@/constants/seo";

function upsertMeta(attr, key, content) {
  if (!content) return;
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

function upsertJsonLd(id, data) {
  let el = document.getElementById(id);
  if (!data) {
    el?.remove();
    return;
  }
  if (!el) {
    el = document.createElement("script");
    el.id = id;
    el.type = "application/ld+json";
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

export default function SeoHead() {
  const { pathname } = useLocation();

  useEffect(() => {
    const seo = resolveSeo(pathname);
    const canonical = absoluteUrl(seo.canonicalPath === "/" ? "/" : seo.canonicalPath);
    const image = absoluteUrl(seo.image || DEFAULT_OG_PATH);
    const robots = seo.noIndex ? "noindex, nofollow" : "index, follow";

    document.title = seo.title;
    upsertMeta("name", "description", seo.description);
    upsertMeta("name", "robots", robots);
    upsertMeta("name", "googlebot", robots);
    upsertMeta("name", "author", "Srimad Sai Rajarajeshwari Trust");
    upsertMeta("name", "geo.region", "IN-KA");
    upsertMeta("name", "geo.placename", "Karekura, Mysore");

    upsertLink("canonical", canonical);

    upsertMeta("property", "og:type", seo.canonicalPath === "/" ? "website" : "article");
    upsertMeta("property", "og:site_name", "Srimad Sai Rajarajeshwari Trust");
    upsertMeta("property", "og:locale", "en_IN");
    upsertMeta("property", "og:title", seo.title);
    upsertMeta("property", "og:description", seo.description);
    upsertMeta("property", "og:url", canonical);
    upsertMeta("property", "og:image", image);
    upsertMeta("property", "og:image:alt", seo.title);

    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", seo.title);
    upsertMeta("name", "twitter:description", seo.description);
    upsertMeta("name", "twitter:image", image);

    if (seo.noIndex) {
      upsertJsonLd("seo-ld-org", null);
      upsertJsonLd("seo-ld-site", null);
      upsertJsonLd("seo-ld-crumbs", null);
      return;
    }

    upsertJsonLd("seo-ld-org", organizationJsonLd());
    upsertJsonLd("seo-ld-site", websiteJsonLd());
    upsertJsonLd("seo-ld-crumbs", breadcrumbJsonLd(seo.crumbs));
  }, [pathname]);

  return null;
}
