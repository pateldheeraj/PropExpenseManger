# Spec: Session Details and Add Account Page

## Overview

This feature enhances the session management experience by providing a detailed view of an existing Hedge Session and adding the ability to attach new trading accounts to it after the initial creation. Users can monitor session-wide metrics and expand their session as needed.

---

## Depends on

- **03 Create Session with Accounts**: Base models and initial creation flow.

---

## Routes

### Backend (New)

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| `POST` | `/api/sessions/:id/accounts` | Add a new account to an existing session | Protected |

### Frontend (New/Modified)

| Route | Page | Description |
|-------|------|-------------|
| `/sessions/:id` | `SessionDetail.jsx` | Display session summary and accounts (Updated) |
| `/sessions/:id/add-account` | `AddAccount.jsx` | Dedicated page to add a new account to a session |

---

## Database changes

No new collections. The `accounts` collection will receive new documents linked to existing `sessions`.

---

## Models

- **Modify:** No changes needed to `Session` or `Account` models.

---

## Controllers

**`Server/controllers/session.controller.js`**

| Function | Responsibility |
|----------|----------------|
| `addAccountToSession` | Validate session existence → Validate account data → Create and save new Account linked to session → Return updated session/accounts |

---

## Frontend Pages

**`Client/src/pages/SessionDetail.jsx` (Modify)**
- Add a summary section showing aggregate stats (e.g., Total Balance, Total Target).
- Add an "Add Account" button that navigates to `/sessions/:id/add-account`.
- Improve the visual layout with glassmorphic cards for session info.

**`Client/src/pages/AddAccount.jsx` (New)**
- A dedicated page containing a form to add a single account.
- Reuses logic/styling from the `AccountModal` but as a full-page experience.
- Redirects back to `/sessions/:id` on success.

---

## Frontend Components

**`Client/src/components/Sessions/AccountCard.jsx` (Modify)**
- Ensure it displays all account fields correctly (Propfirm name, Phase, etc.).
- Add subtle hover animations.

---

## Frontend Services (API)

**`Client/src/common/session.api.js` (Modify)**
- `addAccountToSessionAPI(sessionId, accountData)`: POST `/api/sessions/:sessionId/accounts`

---

## Files to change

- `Server/routes/session.routes.js` — Register the new sub-route.
- `Server/controllers/session.controller.js` — Implement `addAccountToSession`.
- `Client/src/common/session.api.js` — Add the API call.
- `Client/src/pages/SessionDetail.jsx` — Add "Add Account" button and UI updates.
- `Client/src/App.jsx` — Register the `/sessions/:id/add-account` route.
- `Client/src/store/sessionSlice.js` — Add thunk for adding an account.

---

## Files to create

- `Client/src/pages/AddAccount.jsx` — The new add account page.

---

## New dependencies

_No new dependencies_

---

## Rules for implementation

- Use Mongoose for all DB interactions.
- Ensure the `sessionId` in the URL matches a session owned by the authenticated user.
- Validate that the session exists before adding an account.
- Use `async/await` for all operations.
- Maintain the glassmorphic/premium UI design theme.
- Use `react-hot-toast` for success/error notifications.
- Follow the consistent API response format (`status`, `message`, `data`).

---

## Definition of done

- [ ] `POST /api/sessions/:id/accounts` endpoint works and validates ownership.
- [ ] Session details page shows aggregate stats for all accounts.
- [ ] "Add Account" button correctly navigates to the add account page.
- [ ] New account can be added successfully to an existing session.
- [ ] UI reflects the premium/glassmorphic design standards.
- [ ] Success/Error messages are displayed to the user.
- [ ] User is redirected back to details after adding an account.
- [ ] No regressions in session creation or listing.
