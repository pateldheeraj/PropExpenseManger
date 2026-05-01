# Implementation Plan: Session Details and Add Account UI

This plan outlines the steps to implement the Session Details dashboard and the Add Account page, heavily influenced by the provided design references (`session details.png` and `AddAccount.png`) and the specification.

## Overview of Changes

1.  **Backend Expansion:** Add a new route to append an account to an existing session.
2.  **Frontend API & State:** Update Redux and API services to support the new endpoint.
3.  **UI Overhaul (Session Details):** Transform `SessionDetail.jsx` into a comprehensive dashboard featuring summary metric cards, detailed account cards with progress bars, and placeholders for future features (Trade Ledger, Recent Payouts).
4.  **New UI (Add Account):** Create a dedicated `AddAccount.jsx` page featuring a clean, spacious form design with a "Current Profit & Loss" initialization section.

---

## Step 1 — Backend API Implementation

### `Server/controllers/session.controller.js`
- Create `addAccountToSession`:
  - Extract `sessionId` from `req.params.id`.
  - Validate that the session exists and belongs to `req.user.id`.
  - Extract account details (`propfirmName`, `accountPhase`, `startingBalance`, `drawdown`, `target`) from `req.body`.
  - Create a new `Account` document linked to the `sessionId`.
  - Return `201` status with the newly created account.

### `Server/routes/session.routes.js`
- Add `router.post("/:id/accounts", addAccountToSession);`

---

## Step 2 — Frontend State & API

### `Client/src/common/session.api.js`
- Add `export const addAccountToSessionAPI = async (sessionId, accountData) => { ... }` pointing to `POST /api/sessions/${sessionId}/accounts`.

### `Client/src/store/sessionSlice.js`
- Create an async thunk `addAccountToSession({ sessionId, accountData })`.
- Update the slice reducers to push the newly created account into `state.currentSession.accounts` upon successful fulfillment, ensuring immediate UI updates without refetching the whole session.

---

## Step 3 — Frontend UI: Add Account Page

### `Client/src/pages/AddAccount.jsx` (New)
- **Layout:** A clean, full-page light-themed container matching the reference image.
- **Form Fields:**
  - Prop Firm Name (e.g., FTMO, Apex)
  - Maximum Drawdown (with "Hard breach threshold" subtext)
  - Profit Target (with "Account milestone goal" subtext)
  - Initial Balance (from the spec)
- **Initialization Section:** A distinct block for "Current Profit & Loss" (Active Balance Shift) initializing at $0.00.
- **Actions:** "Initialize Account" (primary blue button) and "Discard Draft" (secondary text/button).
- **Behavior:** On submit, dispatch `addAccountToSession`. On success, show a `react-hot-toast` success message and navigate back to `/sessions/:id`.

### `Client/src/App.jsx`
- Register `<Route path="/sessions/:id/add-account" element={<AddAccount />} />` inside the `ProtectedRoute`.

---

## Step 4 — Frontend UI: Session Details Dashboard

### `Client/src/components/Sessions/AccountCard.jsx` (Modify)
- Completely redesign to match the "Prop Firm Accounts" card in the reference image.
- **Header:** Propfirm Name, Phase/Status badge (e.g., "Active", "Funded").
- **Metrics:** Display "Current PnL" prominently.
- **Visuals:** Implement a horizontal progress bar visualizing the current PnL relative to the Max Drawdown (red) and Profit Target (blue).

### `Client/src/pages/SessionDetail.jsx` (Modify)
- Change layout to a multi-column dashboard grid.
- **Top Row (Stats):** Create 4 summary cards:
  - Active Accounts (Count)
  - Total Payout (Placeholder/Derived)
  - Account Costs (Placeholder/Derived)
  - Net Profit/Loss (Aggregated from accounts, styled prominently in blue).
- **Main Content Area:**
  - Section title "Prop Firm Accounts" with a link to "View All Accounts".
  - Render the updated `AccountCard` components in a grid.
- **Future Placeholders:**
  - Add structural placeholders for "Trade Ledger" (table) and "Recent Payouts" (side column) to match the reference layout perfectly.
- **Actions:** Add an "Add Account" button (primary blue) in the top header section navigating to the new page.

---

## Verification

- [ ] Backend route `/api/sessions/:id/accounts` successfully accepts and saves new accounts.
- [ ] Unauthorized users cannot add accounts to sessions they do not own.
- [ ] Navigating to `/sessions/:id/add-account` displays the new, clean form.
- [ ] Form submission successfully adds the account and redirects to the details page.
- [ ] The Session Details page accurately reflects the reference design with summary cards and progress-bar-equipped account cards.
- [ ] Adding a new account updates the details page immediately without a full page reload.
