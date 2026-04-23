# 1. Overview

This document defines the backend architecture and database structure for the trading application.

The backend is built using:

* Node.js
* Express.js
* MongoDB (with Mongoose)

This step establishes:

* Authentication system (register/login)
* Data storage structure for trading configurations

All future features depend on this foundation.

---

# 2. Architecture

server/
├── controllers/        # Business logic
├── routes/             # Express route definitions
├── models/             # Mongoose schemas
├── middleware/         # Auth, validation
├── db/                 # DB connection
├── utils/              # Helpers (optional)
└── index.js            # Entry point

---

# 3. Database Design

MongoDB is document-based. Collections replace tables.

---

## A. users (Collection)

Purpose: Store user authentication data

Fields:

* _id (ObjectId)
* name (String, required)
* email (String, required, unique)
* password (String, required, hashed)
* createdAt (Date, default: now)

Constraints:

* Email must be unique
* Password must be hashed (bcrypt)
* No plaintext passwords stored

---

## B. trading_configs (Collection)

Purpose: Store user trading settings dynamically

Fields:

* _id (ObjectId)
* userId (ObjectId, reference to users)
* configName (String, optional)
* data (Object, required) ← flexible JSON structure
* createdAt (Date, default: now)

Example document:

{
"userId": "...",
"configName": "Funded Account Plan",
"data": {
"profitTarget": 10,
"maxDrawdown": 5,
"payout": 80,
"riskPerTrade": 1
}
}

Constraints:

* Must belong to a valid user
* data field must be an object
* No fixed structure enforced inside data

---

# 4. API Routes

All routes are prefixed with /api

---

## Auth Routes

POST /api/auth/register

* Create new user
* Hash password before saving

POST /api/auth/login

* Validate email + password
* Return JWT token

---

## Trading Config Routes

POST /api/config

* Create new trading configuration

GET /api/config

* Get all configs for logged-in user

GET /api/config/:id

* Get single config

DELETE /api/config/:id

* Delete config

---

# 5. Rules for Implementation

## Authentication

* Use bcrypt for password hashing
* Use JWT for authentication
* Protect routes using middleware

---

## Code Structure

* Routes → only define endpoints
* Controllers → contain logic
* Models → define schema only

DO NOT:

* Put logic inside routes
* Access database directly from routes

---

## Database Rules

* Always validate userId before saving data
* Use Mongoose schema validation
* Handle duplicate email errors properly

---

## Error Handling

* Return proper HTTP status codes:

  * 200 → success
  * 201 → created
  * 400 → bad request
  * 401 → unauthorized
  * 500 → server error

* Never expose internal errors directly

---

# 6. Dependencies

Required:

* express
* mongoose
* bcryptjs
* jsonwebtoken
* dotenv

---

# 7. Commands

Install dependencies:
npm install

Run server:
npm run dev

---

# 8. Security Notes

* Never store plain passwords
* Always validate input data
* Protect private routes with JWT
* Do not trust client-side data

---

# 9. Definition of Done

* [ ] MongoDB connects successfully
* [ ] Users can register
* [ ] Users can login
* [ ] Passwords are hashed
* [ ] JWT authentication works
* [ ] User can create trading config
* [ ] Config is stored with flexible data
* [ ] No crashes or unhandled errors

---

# 10. Future Scope (Not Now)

* Edit config
* Analytics dashboard
* Trade history tracking
* Role-based access

DO NOT implement these until core features are complete.
