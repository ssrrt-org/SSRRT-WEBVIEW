# Firebase setup for SSRRT (`ssrt-live`)

Complete these steps once in [Firebase Console](https://console.firebase.google.com/project/ssrt-live) before using the admin console.

> **Blaze plan required** for Cloud Functions (Razorpay donations). Upgrade at [Firebase usage & billing](https://console.firebase.google.com/project/ssrt-live/usage/details). The free tier covers typical low-traffic usage; you only pay if you exceed free quotas.

## 1. Enable services

1. **Authentication** → Sign-in method → enable **Email/Password**
2. **Firestore Database** → Create database (production mode is fine — deploy rules below)
3. **Storage** → Get started (default bucket: `ssrt-live.firebasestorage.app`)

## 2. Deploy security rules (required — fixes "Missing or insufficient permissions")

Install Firebase CLI if needed:

```bash
npm install -g firebase-tools
firebase login
firebase use ssrt-live
```

From the project root:

```bash
firebase deploy --only firestore:rules,firestore:indexes,storage
```

### Collections and access

| Collection | Public read | Public write | Admin read | Admin write |
|------------|-------------|--------------|------------|-------------|
| `cms/site` | Yes | No | Yes | Yes |
| `donations/{paymentId}` | No | Cloud Function only | Yes | Cloud Function only |
| `inbox/{id}` | No | Create (contact form) | Yes | Archive/update |
| `admins/{uid}` | Own doc only | No | Own doc only | No (console only) |

Storage: public read, admin write for images under `cms/`.

## 3. Deploy rules (do this before first login)

```bash
firebase deploy --only firestore:rules,firestore:indexes,storage
```

Or paste `firestore.rules` into Firebase Console → Firestore → Rules → **Publish**.

## 4. Create the first admin user

1. **Authentication** → Users → **Add user**
   - Email: `admin@ssrrt.com`
   - Password: choose a strong password
2. Sign in at `/admin/login` — the app **auto-creates** `admins/{uid}` on first login for this email.

**Manual alternative:** copy the UID from Authentication, then in Firestore create:

| Collection | Document ID | Fields |
|------------|-------------|--------|
| `admins` | *(user UID)* | `email`: `admin@ssrrt.com`, `role`: `admin` |

1. Run the site: `cd frontend && npm start`
2. Sign in at `/admin/login`
3. On first login, the app seeds `cms/site` from the built-in defaults (shop, events, heroes, branding, etc.)

Edit content from the admin sidebar — changes sync to Firebase and appear on the public site.

## 6. What syncs to Firebase

| Data | Firestore path | Who can write |
|------|----------------|---------------|
| CMS (branding, shop, events, heroes, formation, donate settings) | `cms/site` | Admins |
| Donations (after Razorpay verify) | `donations/{paymentId}` | Cloud Function write, admin read |
| Contact / inbox messages | `inbox/{id}` | Public create, admin read/archive |
| Images | Firebase Storage `cms/*` | Admins |

## 7. Analytics

Measurement ID `G-P7XWK53CHD` is already in `frontend/src/lib/firebase.js`. Page views are tracked automatically.

## 8. Razorpay donations (Cloud Functions)

Donations use two Firebase Callable Functions in `asia-south1`:

| Function | Purpose |
|----------|---------|
| `createRazorpayOrder` | Creates a Razorpay order (amount in paise) |
| `verifyRazorpayPayment` | Verifies signature and writes `donations/{paymentId}` |

### Local development (before cloud deploy)

If Cloud Functions are not deployed yet, use the **local emulator**:

1. Copy `functions/.env.example` → `functions/.env` and add your Razorpay keys.
2. In `frontend/.env` add:
   ```
   REACT_APP_USE_FUNCTIONS_EMULATOR=true
   ```
3. In one terminal: `npm run dev:functions`
4. In another: `npm run dev`
5. Restart the frontend after changing `.env`.

### Production deploy

1. Add your Razorpay **Key ID** (public) to `frontend/.env`:
   ```
   REACT_APP_RAZORPAY_KEY_ID=rzp_test_xxxxxxxx
   ```

2. Store secrets for Cloud Functions (never put the secret in frontend):
   ```bash
   cd functions && npm install
   firebase functions:secrets:set RAZORPAY_KEY_ID
   firebase functions:secrets:set RAZORPAY_KEY_SECRET
   ```

   Functions bind these via `defineSecret()` in `functions/index.js`. Redeploy after changing secrets.

3. Deploy functions and rules:
   ```bash
   npm run deploy:firebase
   ```
   Or: `firebase deploy --only functions,firestore:rules`

4. Restart the frontend dev server after changing `.env`.

### Local emulator (optional)

```bash
firebase emulators:start --only functions
```

Set `REACT_APP_USE_FUNCTIONS_EMULATOR=true` in `frontend/.env` for local function testing.

## Troubleshooting

| Problem | Fix |
|---------|-----|
| "Not authorised for admin access" | Add `admins/{uid}` document for that user's UID |
| Permission denied on save | Deploy rules: `firebase deploy --only firestore:rules,storage` |
| Public site shows defaults only | Sign in to admin once to seed `cms/site`, or check Firestore rules allow public read on `cms/*` |
| Image upload fails | Enable Storage and deploy storage rules; sign in as admin |
| Donation fails / CORS error on `createRazorpayOrder` | Functions not deployed — run `firebase functions:list`. Upgrade to Blaze, deploy functions, set secrets |
| "Payment service is not reachable" | Same as above, or start local emulator with `REACT_APP_USE_FUNCTIONS_EMULATOR=true` |
| Payment works but donation not in admin | Check `verifyRazorpayPayment` deployed; Firestore rules block client writes to `donations` |

## Add another admin later

1. Create user in Authentication
2. Add `admins/{new-uid}` with `email` and `role: "admin"`
3. They sign in at `/admin/login`
