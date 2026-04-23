# Plan 01 — Login, Registration & Trading Config API

## Overview

This plan covers building the authentication system and trading configuration API on top of the existing server foundation.

**Current State:**
- `db/index.js` — MongoDB connection using Mongoose ✅
- `constants.js` — `DB_NAME = "ExpenseManager"` ✅
- `index.js` — Loads `.env` and calls `connectDB()` ✅
- `package.json` — Has `express`, `mongoose`, `dotenv` but is **missing** `bcryptjs`, `jsonwebtoken`, `cookie-parser`, `cors`, `helmet`, `morgan`
- **Missing folders:** `routes/`, `controllers/`, `models/`, `middleware/`, `app.js`

**Goal:** Wire up a full Express app with JWT-based auth and a trading config CRUD API.

---

## Open Questions

> [!IMPORTANT]
> **JWT Storage strategy**: Should the JWT be returned as a JSON response body (stored in `localStorage` on the client), or set as an `httpOnly` cookie? Using `httpOnly` cookies is more secure and prevents XSS token theft. Recommend: **httpOnly cookie**.
 Answer => Set the JWT as `httpOnly` cookie
> [!NOTE]
> **Token expiry**: Default plan uses `7d` for JWT expiry. Change if a shorter session is preferred.
 Answer => `7d` for JWT expiry

---

## Step 1 — Install Missing Dependencies

The following packages are in the spec but not yet in `package.json`:

```bash
cd Server
npm install bcryptjs jsonwebtoken cookie-parser cors helmet morgan
```

Also add a `dev` script using `nodemon` for hot reload:

```bash
npm install --save-dev nodemon
```

Update `package.json` scripts:

```json
"scripts": {
  "start": "node index.js",
  "dev": "nodemon index.js"
}
```

Also add two new env vars to `.env`:

```
JWT_SECRET=your_super_secret_key_here
JWT_EXPIRES_IN=7d
```

---

## Step 2 — Create `app.js`

> [!IMPORTANT]
> Per the `GEMINI.md` architecture, `app.js` exports the Express app instance. `index.js` only handles DB connection and server startup. Do NOT put route logic in `index.js`.

**[NEW]** `Server/app.js`

```js
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import configRoutes from "./routes/config.routes.js";

const app = express();

// Middleware
app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173", credentials: true }));
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/config", configRoutes);

export default app;
```

---

## Step 3 — Update `index.js`

**[MODIFY]** `Server/index.js`

Import and start the Express app after DB connects:

```js
import dotenv from "dotenv";
import { connectDB } from "./db/index.js";
import app from "./app.js";

dotenv.config();

const PORT = process.env.PORT || 8000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
```

---

## Step 4 — Models

### [NEW] `Server/models/user.model.js`

| Field       | Type     | Rules                          |
|-------------|----------|-------------------------------|
| `name`      | String   | required, trimmed              |
| `email`     | String   | required, unique, lowercase    |
| `password`  | String   | required, min 6 chars          |
| `createdAt` | Date     | auto (Mongoose timestamps)     |

Password is **never** stored in plain text. Hashing is done in the controller using `bcryptjs`.

### [NEW] `Server/models/tradingConfig.model.js`

| Field        | Type     | Rules                                      |
|--------------|----------|--------------------------------------------|
| `userId`     | ObjectId | ref: `User`, required                      |
| `configName` | String   | optional                                   |
| `data`       | Object   | required, flexible JSON — no fixed sub-schema |
| `createdAt`  | Date     | auto (Mongoose timestamps)                 |

---

## Step 5 — Middleware

### [NEW] `Server/middleware/auth.middleware.js`

- Extracts JWT from `httpOnly` cookie (or `Authorization: Bearer` header as fallback)
- Verifies token using `jsonwebtoken`
- Attaches `req.user = { id, email }` for downstream controllers
- Returns `401` if token is missing or invalid

---

## Step 6 — Controllers

### [NEW] `Server/controllers/auth.controller.js`

#### `register`
1. Validate `name`, `email`, `password` present
2. Check if email already exists → `400` if so
3. Hash password with `bcrypt` (salt rounds: 10)
4. Save new `User` document
5. Generate JWT and set as `httpOnly` cookie
6. Return `201` with user data (excluding password)

#### `login`
1. Validate `email`, `password` present
2. Find user by email → `401` if not found
3. Compare password with `bcrypt.compare` → `401` if mismatch
4. Generate JWT and set as `httpOnly` cookie
5. Return `200` with user data (excluding password)

#### `logout`
1. Clear the JWT cookie
2. Return `200`

---

### [NEW] `Server/controllers/config.controller.js`

#### `createConfig`
1. Validate `data` field is present and is an object
2. Attach `userId` from `req.user.id`
3. Save to `TradingConfig` collection
4. Return `201` with created document

#### `getAllConfigs`
1. Query all configs where `userId === req.user.id`
2. Return `200` with array

#### `getConfigById`
1. Find config by `_id` and `userId` (prevents accessing other users' configs)
2. Return `200` or `404`

#### `deleteConfig`
1. Find and delete by `_id` and `userId`
2. Return `200` or `404`

---

## Step 7 — Routes

### [NEW] `Server/routes/auth.routes.js`

| Method | Path        | Controller      | Auth Required |
|--------|-------------|-----------------|---------------|
| POST   | `/register` | `register`      | No            |
| POST   | `/login`    | `login`         | No            |
| POST   | `/logout`   | `logout`        | Yes           |

### [NEW] `Server/routes/config.routes.js`

| Method | Path   | Controller      | Auth Required |
|--------|--------|-----------------|---------------|
| POST   | `/`    | `createConfig`  | Yes           |
| GET    | `/`    | `getAllConfigs`  | Yes           |
| GET    | `/:id` | `getConfigById` | Yes           |
| DELETE | `/:id` | `deleteConfig`  | Yes           |

All config routes are protected via `authMiddleware`.

---

## Final Folder Structure After Implementation

```
Server/
├── controllers/
│   ├── auth.controller.js        [NEW]
│   └── config.controller.js      [NEW]
├── routes/
│   ├── auth.routes.js            [NEW]
│   └── config.routes.js          [NEW]
├── models/
│   ├── user.model.js             [NEW]
│   └── tradingConfig.model.js    [NEW]
├── middleware/
│   └── auth.middleware.js        [NEW]
├── db/
│   └── index.js                  ✅ exists
├── app.js                        [NEW]
├── constants.js                  ✅ exists
├── index.js                      [MODIFY]
├── .env                          [MODIFY — add JWT_SECRET, JWT_EXPIRES_IN]
└── package.json                  [MODIFY — add deps + dev script]
```

---

## Verification Plan

### Automated (via terminal / REST client)

| Test | Expected |
|------|----------|
| `POST /api/auth/register` with valid body | `201`, user returned, password not in response |
| `POST /api/auth/register` with duplicate email | `400` error |
| `POST /api/auth/login` with valid credentials | `200`, JWT cookie set |
| `POST /api/auth/login` with wrong password | `401` error |
| `GET /api/config` without token | `401` error |
| `POST /api/config` with valid token + data | `201`, config saved |
| `GET /api/config` with valid token | `200`, array of user's configs |
| `DELETE /api/config/:id` with valid token | `200`, config deleted |

### Definition of Done (from spec)

- [ ] MongoDB connects successfully
- [ ] Users can register
- [ ] Users can login
- [ ] Passwords are hashed
- [ ] JWT authentication works
- [ ] User can create trading config
- [ ] Config is stored with flexible data
- [ ] No crashes or unhandled errors

