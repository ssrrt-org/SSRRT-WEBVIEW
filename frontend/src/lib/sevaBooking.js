import { httpsCallable } from "firebase/functions";
import { functions } from "@/lib/firebase";

export async function submitSevaBooking(payload) {
  try {
    const recordSevaBooking = httpsCallable(functions, "recordSevaBooking");
    const result = await recordSevaBooking(payload);
    return result.data;
  } catch (error) {
    console.warn("Seva booking record failed", error);
    throw error;
  }
}
