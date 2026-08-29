# SSRRT Website

Frontend React app for the Srimad Sai Rajarajeshwari Trust website. All backend services run on **Firebase** (Auth, Firestore, Storage, Cloud Functions).

## Run locally

```bash
npm run install:all
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build for production

```bash
npm run build
```

## Donations (Razorpay via Firebase Cloud Functions)

Payments are handled by Firebase Callable Functions — no separate Node server.

1. Set `REACT_APP_RAZORPAY_KEY_ID` in `frontend/.env` (public key only).
2. Deploy Cloud Functions with Razorpay secrets — see [FIREBASE_SETUP.md](./FIREBASE_SETUP.md).

```bash
firebase functions:secrets:set RAZORPAY_KEY_ID
firebase functions:secrets:set RAZORPAY_KEY_SECRET
npm run deploy:functions
```

## Firebase setup

See [FIREBASE_SETUP.md](./FIREBASE_SETUP.md) for Auth, Firestore rules, Storage, admin setup, and Razorpay deployment.
