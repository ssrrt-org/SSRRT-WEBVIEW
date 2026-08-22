const fs = require("fs");
const path = require("path");

const FILE = path.join(__dirname, "data", "donations.json");

function readDonations() {
  try {
    const raw = fs.readFileSync(FILE, "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeDonations(list) {
  fs.mkdirSync(path.dirname(FILE), { recursive: true });
  fs.writeFileSync(FILE, JSON.stringify(list, null, 2));
}

function addDonation(entry) {
  const list = readDonations();
  list.unshift(entry);
  writeDonations(list);
  return entry;
}

function donationSummary(list = readDonations()) {
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

module.exports = { readDonations, addDonation, donationSummary };
