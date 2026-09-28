import { useState } from "react";
import DevoteesCornerIntro from "@/components/devotees/DevoteesCornerIntro";
import MaterialIcon from "@/components/devotees/MaterialIcon";
import { submitInboxMessage } from "@/lib/inbox";

const initialForm = { name: "", email: "", phone: "", location: "", message: "" };

export default function DevoteesSharePage() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const update = (key) => (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError("Please share your name, email, and experience.");
      return;
    }
    setStatus("sending");
    try {
      await submitInboxMessage({
        type: "Devotees Corner",
        name: form.name,
        email: form.email,
        phone: form.phone,
        purpose: form.location || "Devotee experience",
        message: form.message,
      });
      setForm(initialForm);
      setStatus("sent");
    } catch {
      setError("We could not send your message right now. Please try again or email the Trust office.");
      setStatus("idle");
    }
  };

  const fieldClass =
    "w-full px-3 py-2.5 border border-sanctum-surface-variant rounded-sanctum bg-white text-sanctum-on-surface font-[Work_Sans,system-ui,sans-serif] text-sanctum-body-md focus:outline-none focus:ring-2 focus:ring-sanctum-gold-mid/40 focus:border-sanctum-gold-mid";

  return (
    <div className="devotees-page bg-sanctum-surface text-sanctum-on-surface antialiased font-[Work_Sans,system-ui,sans-serif]">
      <main className="max-w-7xl mx-auto w-full px-sanctum-margin-mobile md:px-sanctum-margin pt-4 pb-10 md:pt-6 md:pb-12">
        <DevoteesCornerIntro active="share" />

        <div className="max-w-2xl mx-auto">
          <div
            className="bg-sanctum-surface-container-lowest border border-sanctum-surface-variant rounded-sanctum-xl p-6 md:p-8 shadow-sanctum"
          >
            <div className="flex items-center gap-2 mb-6 text-sanctum-secondary">
              <MaterialIcon name="edit_note" className="text-xl" />
              <h2 className="font-sanctum text-sanctum-headline-sm text-sanctum-primary m-0">
                Submit your testimony
              </h2>
            </div>

            {status === "sent" ? (
              <p
                className="text-center font-sanctum text-sanctum-body-md text-sanctum-secondary py-8"
                data-testid="devotees-form-success"
              >
                Thank you. Your experience has been sent for review.
              </p>
            ) : (
              <form className="space-y-4" onSubmit={submit} data-testid="devotees-form">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label className="block">
                    <span className="font-sanctum text-sanctum-label-md uppercase text-sanctum-on-surface-variant block mb-1.5">
                      Your name
                    </span>
                    <input className={fieldClass} value={form.name} onChange={update("name")} required autoComplete="name" />
                  </label>
                  <label className="block">
                    <span className="font-sanctum text-sanctum-label-md uppercase text-sanctum-on-surface-variant block mb-1.5">
                      Email
                    </span>
                    <input
                      className={fieldClass}
                      type="email"
                      value={form.email}
                      onChange={update("email")}
                      required
                      autoComplete="email"
                    />
                  </label>
                  <label className="block">
                    <span className="font-sanctum text-sanctum-label-md uppercase text-sanctum-on-surface-variant block mb-1.5">
                      Phone (optional)
                    </span>
                    <input className={fieldClass} type="tel" value={form.phone} onChange={update("phone")} autoComplete="tel" />
                  </label>
                  <label className="block">
                    <span className="font-sanctum text-sanctum-label-md uppercase text-sanctum-on-surface-variant block mb-1.5">
                      City / region (optional)
                    </span>
                    <input className={fieldClass} value={form.location} onChange={update("location")} />
                  </label>
                </div>
                <label className="block">
                  <span className="font-sanctum text-sanctum-label-md uppercase text-sanctum-on-surface-variant block mb-1.5">
                    Your experience
                  </span>
                  <textarea
                    className={`${fieldClass} min-h-[160px] resize-y`}
                    rows={7}
                    value={form.message}
                    onChange={update("message")}
                    required
                    placeholder="Share your experience with Divine Mother…"
                  />
                </label>
                {error ? (
                  <p className="text-sanctum-maroon text-sanctum-body-sm m-0" role="alert">{error}</p>
                ) : null}
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 w-full sm:w-auto bg-sanctum-gold-mid hover:bg-[#B8852E] text-sanctum-primary font-sanctum text-sanctum-label-lg font-semibold px-8 py-3 rounded-sanctum shadow-sm transition-all disabled:opacity-60"
                  disabled={status === "sending"}
                >
                  {status === "sending" ? "Sending…" : "Submit for review"}
                  <MaterialIcon name="arrow_forward" className="text-sm" />
                </button>
                <p className="font-sanctum text-sanctum-body-sm text-sanctum-on-surface-variant italic m-0">
                  ✦ Submissions are reviewed by the Ashram team before they appear on Devotee experiences.
                </p>
              </form>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
