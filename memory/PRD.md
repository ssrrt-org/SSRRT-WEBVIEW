# SSRRT Website PRD

## Original problem statement
Build a full responsive website for Srimad Sai Rajarajeshwari Trust (SSRRT), a spiritual ashram, temple complex, goshala, and seva trust in Karekura, Mysore, using the uploaded HTML as the approved visual direction and the supplied documents/images as source material. The critical donation experience was requested with Razorpay, server verification, webhooks, receipt email, and donation logging; the user selected a non-payment demo flow for this phase and will provide an email provider later.

## Architecture decisions
- React 19 multi-page experience using React Router with dedicated routes, shared Header/Footer, and CRA/Craco frontend shell.
- Standalone frontend — run with `npm run dev` from the project root.
- Firebase will be integrated later for donations, auth, and data persistence.
- Donation form uses a client-side demo flow; payment gateway is intentionally deferred.
- Supplied images are served from frontend/public/ssrrt and supplied document content is condensed into web copy.
- Visual system follows the approved ivory, indigo, maroon, gold, sage palette with Fraunces and Work Sans.

## User personas
- Devotees seeking Amma, the Ashram, temple information, and a quiet place to begin.
- Donors supporting the Goshala, Narayana Seva, medical work, temples, and events.
- Volunteers looking for hands-on Gau Seva, kitchen, medical, or temple service.
- Rural families and community members who benefit from SSRRT initiatives.

## Core requirements (static)
- Home, Mother, Goshala, Ashram/Temples, Seva, Volunteering, Shop direction, Events/Contact direction, and Donate sections.
- Responsive mobile-first layout, sticky navigation, accessible controls, real supplied imagery, SEO-friendly semantic section structure.
- Donation purpose selector, preset/custom amount, monthly toggle, donor details, and confirmation.
- Never imply live payment collection until the payment provider is connected.

## What has been implemented
- 2026-08-16: Rebuilt the starter screen into a complete SSRRT devotional website matching the uploaded reference direction.
- 2026-08-16: Split the experience into dedicated JavaScript routes: Home, Mother, Goshala, Ashram, Seva, Volunteering, Shop, Events, Donate, and Contact.
- 2026-08-16: Added responsive sticky navigation, hero, trust pillars, Amma, Goshala, Ashram, service, Narayana Seva, volunteering, donation, contact, and footer sections.
- 2026-08-16: Added supplied Amma, Goshala, Shirdi Sai, and Mani Dweepa imagery.
- 2026-08-16: Added demo donation form with validation and a donor confirmation state.
- 2026-08-20: Removed FastAPI/Python backend; frontend runs standalone until Firebase is integrated.

## Prioritized backlog
1. Connect Razorpay order creation, server-side signature verification, payment webhooks, and reconciliation.
2. Add receipt email provider and branded tax receipt workflow after provider details are supplied.
3. Add Trust-admin event and shop listing updates.
4. Expand the dedicated route pages with the remaining long-form source copy and finalized Trust contact/event details.

## Remaining P0/P1/P2
- P0: Live payment integration and payment security verification.
- P0: Receipt email and donor acknowledgement.
- P1: Donation review/admin view and export.
- P1: Events calendar and shop inventory.
- P2: Expanded long-form content, visit planning details, and newsletter/community updates.

## Next tasks
- Integrate Firebase (Firestore for donations, Auth if needed).
- Collect Razorpay and receipt-email implementation details from the Trust.
- Replace the demo flow with verified payment lifecycle handling.
- Add a simple non-technical content editor for events and shop items.
