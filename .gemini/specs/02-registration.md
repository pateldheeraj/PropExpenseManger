# Spec: User Registration

## Overview

This step establishes the user authentication system for Prop Expense Manager.
It enables new users to create an account and existing users to log in and log out.
This is the entry point for all user-specific data (expenses, configs, etc.).
All subsequent features depend on a verified user identity provided by this layer.

---

## Depends on

- **Step 01 — Database Setup**: MongoDB connection, Mongoose, Express server running.

---

## Routes

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| `POST` | `/api/auth/register` | Create a new user account | Public |
| `POST` | `/api/auth/login` | Authenticate user, return JWT cookie | Public |
| `POST` | `/api/auth/logout` | Clear the auth cookie | Protected |

---

## Database changes

**Collection: `users`**

New collection created with the following fields:

| Field | Type | Constraints |
|-------|------|-------------|
| `name` | String | Required, trimmed |
| `email` | String | Required, unique, lowercase, trimmed |
| `password` | String | Required, min 6 chars (stored hashed) |
| `createdAt` | Date | Auto — via `timestamps: true` |
| `updatedAt` | Date | Auto — via `timestamps: true` |

**Indexes:**
- `email` — unique index (enforced by Mongoose schema)

---

## Models

- **Create:** `User` — `Server/models/user.model.js`
  - Mongoose schema with `name`, `email`, `password`
  - `timestamps: true` for `createdAt` / `updatedAt`
  - No password comparison method on model (bcrypt is used directly in controller)

---

## Controllers

**`Server/controllers/auth.controller.js`**

| Function | Responsibility |
|----------|----------------|
| `register` | Validate input → check duplicate email → hash password → create user → issue JWT cookie → return 201 |
| `login` | Validate input → find user by email → compare password with bcrypt → issue JWT cookie → return 200 |
| `logout` | Clear the `token` cookie → return 200 |

**Helpers (in same file):**
- `generateToken(user)` — signs a JWT using `JWT_SECRET` and `JWT_EXPIRES_IN` env vars
- `cookieOptions` — shared cookie config (`httpOnly`, `secure` in prod, `sameSite: strict`, 7-day TTL)

---

## Files to change

_None — all files are new for this step._

---

## Files to create

| File | Purpose |
|------|---------|
| `Server/models/user.model.js` | User Mongoose schema |
| `Server/controllers/auth.controller.js` | Register, Login, Logout logic |
| `Server/routes/auth.routes.js` | Auth route definitions |
| `Server/middleware/auth.middleware.js` | JWT verification middleware (required for logout route) |

---

## New dependencies

| Package | Purpose |
|---------|---------|
| `bcryptjs` | Password hashing |
| `jsonwebtoken` | JWT signing and verification |
| `cookie-parser` | Parse cookies from incoming requests |

---

## Environment variables required

```env
JWT_SECRET=<your-secret-key>
JWT_EXPIRES_IN=7d
NODE_ENV=development
```

---

## Rules for implementation

- Use Mongoose (no raw MongoDB queries)
- Passwords **must** be hashed with `bcrypt` (salt rounds: 10) — never stored as plaintext
- JWT **must** be used for authentication — token stored in `httpOnly` cookie
- No business logic inside routes — controllers handle all logic
- Validate all request body fields before processing
- Never trust client input — always sanitize and validate on the server
- Use `async/await` only (no `.then()` chains)
- Use environment variables for all secrets (`JWT_SECRET`, `JWT_EXPIRES_IN`)
- Normalize email to lowercase before any DB operation
- Use generic error messages for auth failures (e.g. "Invalid credentials") to prevent user enumeration

---

## API Response Format

All responses follow the consistent format:

```json
{
  "status": "success" | "error",
  "message": "Human readable message",
  "data": { }
}
```

---

## Frontend Pages

**`Client/src/pages/Register.jsx`**
- Page layout for user registration.
- Contains the glassmorphic registration form.

**`Client/src/pages/Login.jsx`**
- Page layout for user login.
- Contains the glassmorphic login form.

---

## Frontend Components

**`Client/src/components/Auth/AuthForm.jsx` (or similar)**
- Reusable form component for both login and registration (or separate components if preferred).
- **Styling**: Must use Tailwind CSS to achieve a premium, glassmorphic UI (e.g., `bg-white/10 backdrop-blur-md border border-white/20`).

---

## Frontend Services (API)

**`Client/src/common/auth.api.js`**
- `registerAPI(data)`: POST `/api/auth/register`
- `loginAPI(data)`: POST `/api/auth/login`
- `logoutAPI()`: POST `/api/auth/logout`

---

## Definition of done

- [ ] Server runs without errors
- [ ] `POST /api/auth/register` creates a new user
- [ ] `POST /api/auth/register` returns 400 if email already exists
- [ ] `POST /api/auth/register` returns 400 if required fields are missing
- [ ] Password is hashed in the database (bcrypt)
- [ ] JWT token is issued and set as `httpOnly` cookie on register
- [ ] `POST /api/auth/login` authenticates a valid user
- [ ] `POST /api/auth/login` returns 401 for wrong email or password
- [ ] JWT token is issued and set as `httpOnly` cookie on login
- [ ] `POST /api/auth/logout` clears the auth cookie
- [ ] Protected routes reject requests without a valid token (401)
- [ ] Proper HTTP status codes returned for all cases
- [ ] No unhandled errors or server crashes
- [ ] `Register.jsx` and `Login.jsx` pages are created and routed in `App.jsx`
- [ ] Forms are connected to backend API (`registerAPI`, `loginAPI`)
- [ ] UI components are built with premium/glassmorphic design
- [ ] Success and error messages are displayed to the user (e.g., using React Hot Toast or SweetAlert)
- [ ] Upon successful login, the user is redirected to the Dashboard
