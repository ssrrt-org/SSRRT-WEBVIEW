import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAdminCms } from "@/admin/AdminCmsContext";
import { fetchDonationSummary, formatRupees } from "@/lib/donations";

export default function AdminOverviewPage() {
  const { data } = useAdminCms();
  const localDonations = data.donations || [];
  const [donationStats, setDonationStats] = useState({
    total: localDonations.reduce((sum, item) => sum + (Number(item.amount) || 0), 0),
    count: localDonations.length,
  });

  useEffect(() => {
    fetchDonationSummary()
      .then((summary) => setDonationStats({ total: summary.total, count: summary.count }))
      .catch(() => {
        setDonationStats({
          total: localDonations.reduce((sum, item) => sum + (Number(item.amount) || 0), 0),
          count: localDonations.length,
        });
      });
  }, [localDonations]);

  const cards = [
    { label: "Total donations", value: formatRupees(donationStats.total), to: "/admin/donate" },
    { label: "Donors", value: donationStats.count, to: "/admin/donate" },
    { label: "Shop items", value: data.products.length, to: "/admin/shop" },
    { label: "Open orders", value: data.orders.length, to: "/admin/shop" },
    { label: "Events", value: data.events.length, to: "/admin/events" },
    { label: "Inbox", value: data.inbox.length, to: "/admin/inbox" },
  ];

  return (
    <div>
      <header className="admin-page-head">
        <h1>Overview</h1>
        <p>Everything the public site shows can be edited from this console. Saves stay in the browser until Firebase is connected.</p>
      </header>
      <div className="admin-stat-grid">
        {cards.map((card) => (
          <Link key={card.label} className="admin-stat" to={card.to}>
            <strong>{card.value}</strong>
            <span>{card.label}</span>
          </Link>
        ))}
      </div>
      <div className="admin-panel">
        <h2>What this covers</h2>
        <ul className="admin-list">
          <li>Home carousel slides and every inner-page hero image (Goshala, Mother, Ashram, Seva, Shop, Events…)</li>
          <li>Header and footer logos</li>
          <li>Shoppe catalogue: category, image, MRP, selling price, offer label, stock — the same fields a storefront like Amazon uses</li>
          <li>Verified donations: total received, and who offered (name, contact, purpose)</li>
        </ul>
      </div>
    </div>
  );
}
