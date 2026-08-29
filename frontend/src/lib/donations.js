import {
  collection,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { DONATIONS_COLLECTION } from "@/lib/cms";
import { db } from "@/lib/firebase";

export const CMS_UPDATED_EVENT = "ssrrt-cms-updated";

function summarize(list) {
  const byPurpose = {};
  let total = 0;
  for (const item of list) {
    const amount = Number(item.amount) || 0;
    total += amount;
    const key = item.purpose || "General Fund";
    byPurpose[key] = (byPurpose[key] || 0) + amount;
  }
  return { count: list.length, total, byPurpose, donations: list };
}

export async function fetchDonationSummary() {
  const snap = await getDocs(query(collection(db, DONATIONS_COLLECTION), orderBy("date", "desc")));
  return summarize(snap.docs.map((item) => item.data()));
}

export function formatRupees(value) {
  return `₹${Number(value || 0).toLocaleString("en-IN")}`;
}
