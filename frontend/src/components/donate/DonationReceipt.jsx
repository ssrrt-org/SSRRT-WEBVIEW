import { format } from "date-fns";
import { TRUST } from "@/constants/trust";

function formatPaymentMethod(method) {
  if (!method) return "Online payment";
  const map = {
    upi: "UPI",
    card: "Card",
    netbanking: "Net Banking",
    wallet: "Wallet",
    emi: "EMI",
    paylater: "Pay Later",
  };
  return map[method.toLowerCase()] || method;
}

function formatReceiptDate(date) {
  try {
    return format(new Date(date), "dd MMM yyyy");
  } catch {
    return format(new Date(), "dd MMM yyyy");
  }
}

export default function DonationReceipt({ data }) {
  if (!data) return null;

  const {
    receiptNo,
    date,
    amount,
    purpose,
    paymentMethod,
    donor,
    orderId,
    paymentId,
    status = "Captured / Successful",
  } = data;

  return (
    <article className="donation-receipt" data-testid="donation-receipt">
      <header className="donation-receipt-header">
        <div className="donation-receipt-brand">
          <img src={TRUST.logo} alt="" className="donation-receipt-logo" />
          <div>
            <h1>{TRUST.name}</h1>
            <p>{TRUST.address}</p>
            <p className="donation-receipt-meta-line">
              {TRUST.website} | Reg. No. {TRUST.regNo}
            </p>
          </div>
        </div>
        <div className="donation-receipt-title-block">
          <h2>DONATION RECEIPT</h2>
          <p><span>Receipt No:</span> {receiptNo}</p>
          <p><span>Date:</span> {formatReceiptDate(date)}</p>
        </div>
      </header>

      <div className="donation-receipt-highlight">
        <div>
          <span className="donation-receipt-label">DONATION AMOUNT</span>
          <strong className="donation-receipt-amount">
            Rs. {Number(amount).toLocaleString("en-IN")}
          </strong>
        </div>
        <div>
          <span className="donation-receipt-label">PURPOSE</span>
          <strong className="donation-receipt-purpose">{purpose}</strong>
          <small>Payment method: {formatPaymentMethod(paymentMethod)}</small>
        </div>
      </div>

      <div className="donation-receipt-body">
        <img
          src={TRUST.yantra}
          alt=""
          className="donation-receipt-watermark"
          aria-hidden="true"
        />
        <section>
          <h3>Donor Details</h3>
          <dl className="donation-receipt-fields">
            <div><dt>Donor Name</dt><dd>{donor.donor_name || "—"}</dd></div>
            <div><dt>PAN</dt><dd>{donor.pan || "—"}</dd></div>
            <div><dt>Email</dt><dd>{donor.email || "—"}</dd></div>
            <div><dt>Phone</dt><dd>{donor.phone || "—"}</dd></div>
            <div><dt>Address</dt><dd>{donor.address || "—"}</dd></div>
          </dl>
        </section>
        <section>
          <h3>Payment Details</h3>
          <dl className="donation-receipt-fields">
            <div><dt>Razorpay Payment ID</dt><dd>{paymentId}</dd></div>
            <div><dt>Razorpay Order ID</dt><dd>{orderId}</dd></div>
            <div><dt>Transaction Status</dt><dd>{status}</dd></div>
          </dl>
        </section>
      </div>

      <footer className="donation-receipt-footer">
        <p>
          This donation is eligible for tax deduction under Section 80G of the Income Tax Act, 1961,
          subject to applicable rules and the Trust&apos;s registration status.
        </p>
        <p>
          This is a system-generated receipt and does not require a physical signature.
        </p>
        <p className="donation-receipt-footer-contact">
          {TRUST.name} | Karekura, Mysore, Karnataka | {TRUST.email}
        </p>
      </footer>
    </article>
  );
}
