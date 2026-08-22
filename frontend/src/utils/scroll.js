export function getStickyOffset() {
  const topbar = document.querySelector(".topbar");
  const header = document.querySelector(".site-header");
  return (topbar?.offsetHeight ?? 0) + (header?.offsetHeight ?? 0) + 16;
}
