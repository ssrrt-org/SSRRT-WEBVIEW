import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/** True when a string can be used as an img/background src. */
export function isUsableImageUrl(url) {
  if (!url || typeof url !== "string") return false;
  const trimmed = url.trim();
  if (!trimmed) return false;
  return (
    trimmed.startsWith("/")
    || trimmed.startsWith("http://")
    || trimmed.startsWith("https://")
    || trimmed.startsWith("data:image/")
  );
}

/** Safe CSS background-image value for Firebase / data URLs (handles & and quotes). */
export function cssBackgroundImage(url) {
  if (!isUsableImageUrl(url)) return undefined;
  return `url(${JSON.stringify(url.trim())})`;
}
