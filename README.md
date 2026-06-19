# 🏦 Bank Transaction System

A production-style banking backend built with **Node.js**, **Express**, and **MongoDB** — featuring secure auth, real-world transaction flows, idempotency handling, and ledger-based balance tracking.

🔗 **Live Demo:** [https://backend-ledger-7e5z.onrender.com](https://backend-ledger-7e5z.onrender.com)

---

## ✨ Features

- JWT-based authentication with HTTP-only cookies
- Email notifications via Nodemailer (registration + transactions)
- Ledger-based balance — computed via MongoDB aggregation, never stored
- Idempotency validation to prevent duplicate transactions
- Account status checks before every transaction
- Token blacklisting for secure logout

---

## 🛠️ Tech Stack

`Node.js` `Express.js` `MongoDB Atlas` `Mongoose` `JWT` `bcrypt` `Nodemailer`

---

## 📁 Project Structure

```
├── config/         # DB connection
├── controllers/    # Auth, account, transaction logic
├── middlewares/    # JWT auth middleware
├── models/         # User, Account, Transaction, Ledger, Blacklist
├── routes/         # Auth, account, transaction routes
├── utils/          # Email utility
└── server.js
```

---

## 🚀 Getting Started

```bash
git clone https://github.com/your-username/bank-transaction-system.git
cd bank-transaction-system
npm install
```

Create a `.env` file:

```env
PORT=3000
MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password
```

```bash
npm run dev
```

---

## 📬 API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/register` | Register user | No |
| POST | `/api/auth/login` | Login, receive JWT cookie | No |
| POST | `/api/auth/logout` | Blacklist token | Yes |
| POST | `/api/account/create` | Create bank account | Yes |
| POST | `/api/transaction/transfer` | Initiate transfer | Yes |
| GET | `/api/transaction/balance` | Fetch balance from ledger | Yes |

---

## 💡 Key Design Decisions

**Ledger-based balance** — Balance is always derived from aggregating ledger entries, never stored as a field. This ensures consistency and auditability, mirroring real banking systems.

**Idempotency keys** — Every transaction requires a unique key. Re-sending the same request returns the original result without creating a duplicate.

**JWT blacklisting** — Logout invalidates the token by storing it in a Blacklist collection, checked on every protected request.
