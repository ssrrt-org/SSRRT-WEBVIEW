import { adminSeed, CMS_STORAGE_KEY } from "@/admin/adminSeed";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5001";
export const CMS_UPDATED_EVENT = "ssrrt-cms-updated";

function loadCms() {
  try {
    const raw = localStorage.getItem(CMS_STORAGE_KEY);
    if (!raw) return structuredClone(adminSeed);
    const parsed = JSON.parse(raw);
    return {
      ...structuredClone(adminSeed),
      ...parsed,
      donations: Array.isArray(parsed.donations) ? parsed.donations : [],
    };
  } catch {
    return structuredClone(adminSeed);
  }
}

export function recordDonationLocal(entry) {
  const cms = loadCms();
  const donations = [entry, ...(cms.donations || []).filter((d) => d.id !== entry.id)];
  localStorage.setItem(CMS_STORAGE_KEY, JSON.stringify({ ...cms, donations }));
  window.dispatchEvent(new Event(CMS_UPDATED_EVENT));
}

export async function fetchDonationSummary() {
  const response = await fetch(`${API_URL}/api/donations`);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || "Unable to load donations");
  }
  return data;
}

export function formatRupees(value) {
  return `₹${Number(value || 0).toLocaleString("en-IN")}`;
}
