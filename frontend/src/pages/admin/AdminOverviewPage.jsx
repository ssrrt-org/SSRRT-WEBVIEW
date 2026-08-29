import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useAdminCms } from "@/admin/AdminCmsContext";
import { fetchDonationSummary, formatRupees } from "@/lib/donations";

const STARTER_STEPS = [
  { label: "Update logos and site title", to: "/admin/branding" },
  { label: "Refresh home carousel slides", to: "/admin/images" },
  { label: "Check inbox for new messages", to: "/admin/inbox" },
  { label: "Review donation offerings", to: "/admin/donate" },
];

export default function AdminOverviewPage() {
  const { data } = useAdminCms();
  const localDonations = useMemo(() => data.donations || [], [data.donations]);
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
    { label: "Total donations", value: formatRupees(donationStats.total), to: "/admin/donate", hint: "Tap to view offerings" },
    { label: "Donors", value: donationStats.count, to: "/admin/donate", hint: "Tap to view offerings" },
    { label: "Shop items", value: data.products.length, to: "/admin/shop", hint: "Manage catalogue" },
    { label: "Events", value: data.events.length, to: "/admin/events", hint: "Manage events" },
    { label: "Inbox", value: data.inbox.length, to: "/admin/inbox", hint: "Read messages" },
  ];

  return (
    <div>
      <header className="admin-page-head">
        <div>
          <h1>Overview</h1>
          <p>Welcome. Use the cards below to jump to each section. Changes save automatically and appear on the live site.</p>
        </div>
      </header>

      <div className="admin-stat-grid">
        {cards.map((card) => (
          <Link key={card.label} className="admin-stat" to={card.to}>
            <strong>{card.value}</strong>
            <span>{card.label}</span>
            <small>{card.hint}</small>
          </Link>
        ))}
      </div>

      <div className="admin-panel">
        <h2>Quick start</h2>
        <p className="admin-muted admin-panel-intro">If you are new here, work through these steps in order.</p>
        <ol className="admin-checklist">
          {STARTER_STEPS.map((step) => (
            <li key={step.to}>
              <Link to={step.to}>{step.label}</Link>
            </li>
          ))}
        </ol>
      </div>

      <div className="admin-panel">
        <h2>What you can manage here</h2>
        <ul className="admin-list">
          <li>Home carousel and hero images for Goshala, Mother, Ashram, Seva, Shop, Events, and more</li>
          <li>Header Devi logo, Sri Yantra, footer logo, and trust title</li>
          <li>Shop catalogue: image, price, offer label, and stock</li>
          <li>Verified donations with donor name, purpose, and amount</li>
          <li>Contact and volunteer messages in the inbox</li>
        </ul>
      </div>
    </div>
  );
}
