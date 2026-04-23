# Spec: Create Session with Accounts (Interactive Flow)

## Overview

This feature introduces a guided flow for creating a Hedge Session along with its associated trading accounts in a single user interaction. Instead of creating an empty session first, users will define session details and add one or more accounts before final submission. This ensures sessions are always meaningful and immediately usable.

---

## Depends on

* 01 Database Setup (User model)
* 02 Authentication (JWT login/register)

---

## Routes

### Session + Accounts (Combined Creation)

* `POST /api/sessions` — Create session with multiple accounts — Protected

### Fetch Data

* `GET /api/sessions` — Get all sessions for logged-in user — Protected
* `GET /api/sessions/:id` — Get session with accounts — Protected

### Optional (Future)

* `DELETE /api/sessions/:id` — Delete session — Protected

---

## Database changes

### A. sessions (Collection)

* `_id`
* `userId` (ObjectId, required)
* `name` (String, required)
* `status` (String, enum: ['Active', 'Completed', 'Failed'], default: 'Active')
* `createdAt` (Date, default: now)

---

### B. accounts (Collection)

Each session can have multiple accounts.

* `_id`
* `sessionId` (ObjectId, ref: Session, required)
* `profileName` (String, required)
* `startingBalance` (Number, required)
* `drawdown` (Number, required)
* `target` (Number, required)
* `targetPercentage` (Number, required)
* `createdAt` (Date, default: now)

---

## Models

### Create:

* `Session` model
* `Account` model

Relationship:

* One Session → Many Accounts

---

## Controllers

### session.controller.js

#### createSessionWithAccounts

* Validate:

  * session name exists
  * at least 1 account exists
* Create session
* Create all accounts linked to sessionId
* Return full session + accounts

#### getSessions

* Return all sessions for user

#### getSessionById

* Return session + its accounts

---

## Frontend Flow (IMPORTANT)

### Step 1: Click "Create New Session"

Route:
`/sessions/new`

---

### Step 2: Session Form UI

Fields:

* Session Name (input)

Button:

* "Add Account"

---

### Step 3: Add Account (Modal Popup)

When clicking "Add Account", open modal:

Fields inside modal:

* Profile Name
* Starting Balance
* Drawdown
* Target
* Target Percentage

Buttons:

* Save Account
* Cancel

---

### Step 4: Local State Behavior

* Accounts are stored temporarily in frontend state
* Display added accounts as list/cards below form
* User can:

  * Add multiple accounts
  * Remove account before submission

---

### Step 5: Final Submission

Click "Create Session":

Payload sent:

```json
{
  "name": "My Hedge Plan",
  "accounts": [
    {
      "profileName": "Phase 1",
      "startingBalance": 10000,
      "drawdown": 1000,
      "target": 800,
      "targetPercentage": 8
    }
  ]
}
```

---

## Frontend Pages

* `/sessions` → List sessions
* `/sessions/new` → Create session + accounts
* `/sessions/:id` → Session detail

---

## Frontend Components

* `SessionForm`
* `AccountModal`
* `AccountList`
* `AccountCard`

---

## Frontend Services

`session.api.js`

* `createSession(data)`
* `getSessions()`
* `getSession(id)`

---

## Files to create

### Backend

* `models/session.model.js`
* `models/account.model.js`
* `controllers/session.controller.js`
* `routes/session.routes.js`

### Frontend

* `pages/CreateSession.jsx`
* `components/AccountModal.jsx`
* `components/AccountCard.jsx`
* `components/SessionForm.jsx`
* `services/session.api.js`

---

## Files to change

* `server.js` → mount routes
* `App.jsx` → add routes

---

## New dependencies

No new dependencies required.

---

## Rules for implementation

### Backend

* Use Mongoose
* Validate all inputs
* Ensure accounts array is not empty
* Use transactions (if possible) for session + accounts creation
* Protect all routes with JWT

---

### Frontend

* Use React state for temporary accounts
* Modal must reset after submission
* Show validation errors
* Prevent empty submission
* Show success/error toast

---

## Definition of done

* [ ] User can open "Create Session" page
* [ ] User can add multiple accounts via modal
* [ ] Accounts appear in UI before submission
* [ ] User can remove accounts before submit
* [ ] Session + accounts saved in DB correctly
* [ ] API returns session with accounts
* [ ] Session detail page shows accounts
* [ ] Only logged-in users can access
* [ ] Proper validation and error handling works
