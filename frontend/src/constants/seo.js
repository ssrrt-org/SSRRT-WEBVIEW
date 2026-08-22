import { TRUST } from "@/constants/trust";
import { templeCards } from "@/constants/templeData";
import { allSevaPrograms } from "@/constants/sevaContent";
import { ashramRituals } from "@/constants/sevasRituals";
import { motherSections } from "@/constants/motherContent";
import { shopCategories } from "@/constants/shopProducts";

const TITLE_END = "SSRRT";

export const SITE_ORIGIN = (process.env.REACT_APP_SITE_URL || "https://www.ssrrt.org").replace(/\/$/, "");

export const DEFAULT_DESCRIPTION =
  "Srimad Sai Rajarajeshwari Trust in Karekura, Mysore — Goshala, Ashram temples, Narayana Seva, and rural seva on the banks of the Cauvery.";

export const DEFAULT_OG_PATH = "/ssrrt/ManiDweepa.jpg";

const clip = (text, max = 158) => {
  const clean = String(text || "").replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  return `${clean.slice(0, max - 1).trim()}…`;
};

const page = (title, description, extra = {}) => ({
  title: `${title} | ${TITLE_END}`,
  description: clip(description),
  ...extra,
});

const STATIC = {
  "/": {
    title: "Srimad Sai Rajarajeshwari Trust | Goshala & Ashram, Mysore",
    description: DEFAULT_DESCRIPTION,
  },
  "/goshala": page(
    "Project Kaamadhenau Goshala",
    "Gau seva at SSRRT — more than 300 cows, bulls and calves sheltered at the Karekura Goshala near Mysore."
  ),
  "/goshala/adopt": page(
    "Adopt a cow | Project Kaamadhenau",
    "Sponsor feed and care for a cow at the SSRRT Goshala in Karekura, Mysore."
  ),
  "/goshala/day": page(
    "A day at the Goshala",
    "Daily feeding, care and volunteer seva at Project Kaamadhenau, Karekura."
  ),
  "/mother": page(
    "Amma | Glimpses of the Mother",
    "About Amma of Srimad Sai Rajarajeshwari Trust — householder, devotee of Sri Sathya Sai Baba, and guiding presence of the Ashram."
  ),
  "/mother/avataarhood": page(
    "Amma's Avataarhood",
    "Devotees describe Amma assuming many forms to awaken those who come to her at Karekura."
  ),
  "/mother/swami": page(
    "Swami and Amma",
    "Amma's devotion to Bhagawan Sri Sathya Sai Baba and the spiritual lineage of the Ashram."
  ),
  "/mother/realized": page(
    "Realized beings and Naadi",
    "Naadi readings and accounts of realized beings connected with Amma and the Trust."
  ),
  "/mother-for-needy": page(
    "Mother for the Needy",
    "Free medical camps, food seva and care for families around Karekura, Mysore."
  ),
  "/rural-upliftment": page(
    "Rural upliftment",
    "Education, water tankers, emergency relief and village programmes of SSRRT in rural Mysore."
  ),
  "/ashram": page(
    "Ashram and temples | Karekura",
    "Eight temple sannidhis at Srimad Sai Rajarajeshwari Ashram on the Cauvery — darshan and daily worship."
  ),
  "/ashram/bhairava": page(
    "Kaala Bhairava Trishula",
    "Kaala Bhairava worship at the SSRRT Ashram in Karekura, Mysore."
  ),
  "/ashram/harake-nandi": page(
    "Harake Nandi",
    "Nandi harake at the grand Shiva mantapa — prayers carried to Shiva at the Karekura Ashram."
  ),
  "/seva": page(
    "Seva programmes",
    "Medical, education, water, relief, food and Narayana Seva programmes of Srimad Sai Rajarajeshwari Trust."
  ),
  "/seva/medical-village": page(
    "Village medical camps",
    "Free preventive medical camps in villages around Karekura, organised by SSRRT."
  ),
  "/sevas": page(
    "Ashram sevas and rituals",
    "Nandi Abhisheka, butter alankara and temple sevas at the Karekura Ashram."
  ),
  "/volunteering": page(
    "Volunteer at the Goshala",
    "Offer time at Project Kaamadhenau — feeding, care, medical support and festival seva in Karekura."
  ),
  "/shop": page(
    "Ashram Shoppe",
    "Books, bhajans, padukas and sacred items from Srimad Sai Rajarajeshwari Trust, Karekura."
  ),
  "/events": page(
    "Events and festivals",
    "Narayana Seva, Nandi Abhisheka, darshan and seasonal programmes at the SSRRT Ashram, Mysore."
  ),
  "/donate": page(
    "Donate | Support the Trust",
    "Make an offering to the Goshala, Narayana Seva, medical camps and Ashram seva of SSRRT, Karekura."
  ),
  "/about": page(
    "About the Trust",
    "Srimad Sai Rajarajeshwari Trust — formation, Goshala, temples and seva in Karekura, Mysore."
  ),
  "/contact": page(
    "Contact and visit Karekura",
    "Trust office of SSRRT at Karekura, Mysore — plan a visit, volunteering, donations and seva enquiries."
  ),
};

function crumbsFor(pathname) {
  const parts = pathname.split("/").filter(Boolean);
  const crumbs = [{ name: "Home", path: "/" }];
  let acc = "";
  parts.forEach((part) => {
    acc += `/${part}`;
    const meta = STATIC[acc];
    crumbs.push({
      name: meta ? meta.title.replace(` | ${TITLE_END}`, "").split("|")[0].trim() : part.replaceAll("-", " "),
      path: acc,
    });
  });
  return crumbs;
}

export function resolveSeo(pathname) {
  const path = pathname.replace(/\/$/, "") || "/";

  if (path.startsWith("/admin")) {
    return {
      title: `Admin | ${TITLE_END}`,
      description: "Trust office console.",
      noIndex: true,
      canonicalPath: path,
      crumbs: [],
    };
  }

  if (STATIC[path]) {
    return { ...STATIC[path], noIndex: false, canonicalPath: path, crumbs: crumbsFor(path) };
  }

  const temple = templeCards.find((t) => t.path === path);
  if (temple) {
    return {
      ...page(
        `${temple.name} | Ashram, Karekura`,
        temple.intro || `${temple.name} at Srimad Sai Rajarajeshwari Ashram, Karekura, Mysore.`
      ),
      image: temple.img?.startsWith("http") ? temple.img : temple.img,
      noIndex: false,
      canonicalPath: path,
      crumbs: crumbsFor(path),
    };
  }

  const seva = allSevaPrograms.find((p) => p.path === path);
  if (seva) {
    return {
      ...page(
        seva.navTitle || seva.title,
        (seva.paragraphs && seva.paragraphs[0]) || seva.title
      ),
      noIndex: false,
      canonicalPath: path,
      crumbs: crumbsFor(path),
    };
  }

  const ritual = ashramRituals.find((r) => r.path === path);
  if (ritual) {
    return {
      ...page(ritual.title, ritual.intro || ritual.body),
      noIndex: false,
      canonicalPath: path,
      crumbs: crumbsFor(path),
    };
  }

  const mother = motherSections.find((s) => s.path === path);
  if (mother) {
    return {
      ...page(mother.navTitle, mother.paragraphs?.[0] || mother.title),
      noIndex: false,
      canonicalPath: path,
      crumbs: crumbsFor(path),
    };
  }

  if (path.startsWith("/shop/")) {
    const catId = path.slice("/shop/".length);
    const cat = shopCategories.find((c) => c.id === catId);
    if (cat && cat.id !== "all") {
      return {
        ...page(
          `${cat.label} | Shoppe`,
          `${cat.label} from the SSRRT Ashram Shoppe in Karekura, Mysore.`
        ),
        noIndex: false,
        canonicalPath: path,
        crumbs: crumbsFor(path),
      };
    }
  }

  return {
    title: `Page not found | ${TITLE_END}`,
    description: DEFAULT_DESCRIPTION,
    noIndex: true,
    canonicalPath: path,
    crumbs: [],
  };
}

export function listSitemapPaths() {
  const paths = new Set(Object.keys(STATIC));
  templeCards.forEach((t) => paths.add(t.path));
  allSevaPrograms.forEach((p) => paths.add(p.path));
  ashramRituals.forEach((r) => paths.add(r.path));
  motherSections.forEach((s) => paths.add(s.path));
  shopCategories.filter((c) => c.id !== "all").forEach((c) => paths.add(`/shop/${c.id}`));
  return [...paths].sort();
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "NGO",
    name: TRUST.name,
    alternateName: "SSRRT",
    url: SITE_ORIGIN,
    email: TRUST.email,
    logo: `${SITE_ORIGIN}${TRUST.logo}`,
    image: `${SITE_ORIGIN}${DEFAULT_OG_PATH}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Karekura",
      addressLocality: "Mysore",
      addressRegion: "Karnataka",
      addressCountry: "IN",
    },
    areaServed: "IN",
    description: DEFAULT_DESCRIPTION,
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: TRUST.name,
    url: SITE_ORIGIN,
    inLanguage: "en-IN",
  };
}

export function breadcrumbJsonLd(crumbs) {
  if (!crumbs?.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: `${SITE_ORIGIN}${c.path === "/" ? "/" : c.path}`,
    })),
  };
}

export function absoluteUrl(path) {
  if (!path) return SITE_ORIGIN;
  if (path.startsWith("http")) return path;
  return `${SITE_ORIGIN}${path.startsWith("/") ? path : `/${path}`}`;
}
