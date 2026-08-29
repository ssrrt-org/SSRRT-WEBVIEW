import { useEffect, useMemo, useState } from "react";
import { confirmAdminAction } from "@/admin/adminUtils";
import { AdminAutoSaveHint, AdminField } from "@/admin/components/AdminFields";
import { useAdminCms } from "@/admin/AdminCmsContext";
import { fetchDonationSummary, formatRupees } from "@/lib/donations";

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

export default function AdminDonatePage() {
  const { data, patch, patchDebounced } = useAdminCms();
  const donate = data.donate;
  const [tab, setTab] = useState("received");
  const [remote, setRemote] = useState(null);
  const [source, setSource] = useState("local");

  useEffect(() => {
    let alive = true;
    fetchDonationSummary()
      .then((summary) => {
        if (!alive) return;
        setRemote(summary);
        setSource("firebase");
      })
      .catch(() => {
        if (!alive) return;
        setSource("local");
      });
    return () => {
      alive = false;
    };
  }, [data.donations]);

  const summary = remote || summarize(data.donations || []);

  const purposeTotals = useMemo(
    () => Object.entries(summary.byPurpose || {}),
    [summary]
  );

  const updatePurpose = (id, key, value) => {
    patchDebounced({
      donate: {
        ...donate,
        purposes: donate.purposes.map((p) => (p.id === id ? { ...p, [key]: value } : p)),
      },
    });
  };

  const addPurpose = () => {
    patch({
      donate: {
        ...donate,
        purposes: [...donate.purposes, { id: `p-${Date.now()}`, label: "New purpose", note: "" }],
      },
    });
  };

  const removePurpose = (id) => {
    if (!confirmAdminAction("Remove this donation purpose?")) return;
    patch({
      donate: {
        ...donate,
        purposes: donate.purposes.filter((p) => p.id !== id),
      },
    });
  };

  return (
    <div>
      <header className="admin-page-head">
        <div>
          <h1>Donations</h1>
          <p>
            Verified Razorpay offerings appear here with the donor&apos;s name and amount.
            {source === "firebase" ? " Synced from Firebase." : " Showing cached records."}
          </p>
        </div>
      </header>

      <div className="admin-tabs" role="tablist" aria-label="Donation sections">
        <button type="button" role="tab" aria-selected={tab === "received"} className={tab === "received" ? "on" : ""} onClick={() => setTab("received")}>
          Received
        </button>
        <button type="button" role="tab" aria-selected={tab === "purposes"} className={tab === "purposes" ? "on" : ""} onClick={() => setTab("purposes")}>
          Purposes
        </button>
      </div>

      {tab === "received" && (
        <>
          <div className="admin-stat-grid">
            <div className="admin-stat is-static">
              <strong>{formatRupees(summary.total)}</strong>
              <span>Total received</span>
            </div>
            <div className="admin-stat is-static">
              <strong>{summary.count}</strong>
              <span>Offerings</span>
            </div>
          </div>

          {purposeTotals.length > 0 && (
            <div className="admin-panel">
              <h2>By purpose</h2>
              <ul className="admin-list">
                {purposeTotals.map(([label, amount]) => (
                  <li key={label}>
                    {label} — <strong>{formatRupees(amount)}</strong>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th scope="col">Donor</th>
                  <th scope="col">Purpose</th>
                  <th scope="col">Amount</th>
                  <th scope="col">When</th>
                  <th scope="col">Payment</th>
                </tr>
              </thead>
              <tbody>
                {(summary.donations || []).length === 0 ? (
                  <tr>
                    <td colSpan={5} className="admin-empty-cell">
                      No offerings yet. Completed Donate-page payments will list here.
                    </td>
                  </tr>
                ) : (
                  summary.donations.map((item) => (
                    <tr key={item.id || item.paymentId}>
                      <td>
                        <strong>{item.name}</strong>
                        <div className="admin-muted">{item.email}</div>
                        {item.phone ? <div className="admin-muted">{item.phone}</div> : null}
                        {item.dedication ? <div className="admin-offer">On behalf of {item.dedication}</div> : null}
                      </td>
                      <td>
                        {item.purpose}
                        {item.recurring ? <div className="admin-offer">Monthly</div> : null}
                      </td>
                      <td><strong>{formatRupees(item.amount)}</strong></td>
                      <td>{item.date ? new Date(item.date).toLocaleString("en-IN") : "—"}</td>
                      <td>
                        <span className="admin-pill">{item.status || "Received"}</span>
                        <div className="admin-muted">{item.paymentId || item.id}</div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </>
      )}

      {tab === "purposes" && (
        <>
          <AdminAutoSaveHint />
          <div className="admin-panel admin-stack">
            <AdminField label="Suggested amounts (comma separated, rupees)">
              <input
                className="admin-input"
                value={donate.suggestedAmounts.join(", ")}
                onChange={(e) =>
                  patchDebounced({
                    donate: {
                      ...donate,
                      suggestedAmounts: e.target.value
                        .split(",")
                        .map((n) => Number(n.trim()))
                        .filter((n) => n > 0),
                    },
                  })
                }
              />
            </AdminField>
          </div>
          <div className="admin-panel">
            <div className="admin-panel-head">
              <h2>Purposes</h2>
              <button type="button" className="admin-btn sm" onClick={addPurpose}>Add purpose</button>
            </div>
            <div className="admin-stack">
              {donate.purposes.map((purpose) => (
                <div className="admin-purpose-row" key={purpose.id}>
                  <div className="admin-two">
                    <AdminField label="Label">
                      <input className="admin-input" value={purpose.label} onChange={(e) => updatePurpose(purpose.id, "label", e.target.value)} />
                    </AdminField>
                    <AdminField label="Note">
                      <input className="admin-input" value={purpose.note} onChange={(e) => updatePurpose(purpose.id, "note", e.target.value)} />
                    </AdminField>
                  </div>
                  <button type="button" className="admin-ghost sm danger" onClick={() => removePurpose(purpose.id)}>
                    Remove purpose
                  </button>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
