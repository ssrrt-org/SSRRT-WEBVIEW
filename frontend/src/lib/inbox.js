import { addDoc, collection, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { INBOX_COLLECTION } from "@/lib/cms";
import { db } from "@/lib/firebase";

const PURPOSE_LABELS = {
  visit: "Planning a visit",
  volunteer: "Volunteering",
  donate: "Donation",
  seva: "Seva booking",
  other: "Other",
};

export async function submitInboxMessage({ type, name, email, phone, purpose, message }) {
  const docRef = await addDoc(collection(db, INBOX_COLLECTION), {
    type,
    name: name.trim(),
    email: email.trim(),
    phone: (phone || "").trim(),
    purpose: PURPOSE_LABELS[purpose] || purpose || "",
    message: message.trim(),
    date: new Date().toISOString().slice(0, 10),
    read: false,
    archived: false,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function archiveInboxMessage(id) {
  await updateDoc(doc(db, INBOX_COLLECTION, id), {
    archived: true,
    archivedAt: serverTimestamp(),
  });
}
