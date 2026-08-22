# SSRRT Website

Frontend React app for the Srimad Sai Rajarajeshwari Trust website.

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

## Backend (Razorpay)

Donation payments use a small Express API in `backend/`.

```bash
npm run install:all
npm run start:backend   # http://localhost:5001
npm run dev             # frontend at http://localhost:3000
```

Set credentials in `.env` (root) and `frontend/.env` (`REACT_APP_RAZORPAY_KEY_ID` only).
