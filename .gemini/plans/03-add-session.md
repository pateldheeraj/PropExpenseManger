# Goal Description
Implement the "Create Session with Accounts" feature, which introduces a guided, interactive flow for users to create a Hedge Session and attach multiple trading accounts before final submission. This guarantees sessions are immediately useful and populated with accounts.

## User Review Required
> [!IMPORTANT]
> - **Transactions in MongoDB**: Using native MongoDB transactions (`session.startTransaction()`) requires a Replica Set. If you are using a standard standalone local MongoDB instance, transactions will fail. I propose using sequential inserts (create session, then create accounts) with manual rollback logic (delete the session if accounts fail to create) to ensure it works on all development setups. Let me know if you have a Replica Set and strictly prefer MongoDB transactions.
answer-> yes u can
> - **App.jsx Routes**: I noticed the session routes were removed from `App.jsx` in your latest changes. I will re-add them wrapped in the `ProtectedRoute`.

## Proposed Changes

---

### Backend Components

#### [NEW] [account.model.js](file:///d:/Prop%20Expense%20Manager/Server/models/account.model.js)
- Define `Account` Mongoose schema with fields: `sessionId` (ref to Session), `profileName`, `startingBalance`, `drawdown`, `target`, and `targetPercentage`. Add an index on `sessionId`.

#### [MODIFY] [session.model.js](file:///d:/Prop%20Expense%20Manager/Server/models/session.model.js)
- Simplify to only include `userId`, `name`, and `status`, aligning with the new spec.

#### [MODIFY] [session.controller.js](file:///d:/Prop%20Expense%20Manager/Server/controllers/session.controller.js)
- Update `createSession`: Rename to `createSessionWithAccounts`. Validate payload has `name` and `accounts` array (length > 0). Insert `Session`, then map over `accounts` to inject `sessionId` and insert via `Account.insertMany()`.
- Update `getSessionById`: Fetch the session and its linked accounts from the `Account` collection (using `Account.find({ sessionId })`), returning both.

---

### Frontend Components

#### [MODIFY] [session.api.js](file:///d:/Prop%20Expense%20Manager/Client/src/common/session.api.js)
- Ensure payload structure for `createSessionAPI` sends `{ name, accounts }`.

#### [NEW] [AccountModal.jsx](file:///d:/Prop%20Expense%20Manager/Client/src/components/Sessions/AccountModal.jsx)
- Create a glassmorphic modal overlay containing a React Hook Form for `profileName`, `startingBalance`, `drawdown`, `target`, and `targetPercentage`.

#### [NEW] [AccountCard.jsx](file:///d:/Prop%20Expense%20Manager/Client/src/components/Sessions/AccountCard.jsx)
- Create a mini-card component to display an added account. Includes a "Remove" button when in edit mode.

#### [NEW] [AccountList.jsx](file:///d:/Prop%20Expense%20Manager/Client/src/components/Sessions/AccountList.jsx)
- Create a container to render multiple `AccountCard`s.

#### [MODIFY] [CreateSession.jsx](file:///d:/Prop%20Expense%20Manager/Client/src/pages/CreateSession.jsx)
- Overhaul to include local React state for `accounts`. Render `SessionForm`, `AccountList`, and an "Add Account" button that triggers `AccountModal`. Prevent submission if `accounts.length === 0`.

#### [MODIFY] [SessionDetail.jsx](file:///d:/Prop%20Expense%20Manager/Client/src/pages/SessionDetail.jsx)
- Update to handle the combined session + accounts payload and display the accounts using `AccountList`.

#### [MODIFY] [App.jsx](file:///d:/Prop%20Expense%20Manager/Client/src/App.jsx)
- Re-add the session routes (`/sessions`, `/sessions/new`, `/sessions/:id`) wrapped in `ProtectedRoute`.

## Verification Plan

### Manual Verification
1. Login to the app.
2. Navigate to `/sessions/new`.
3. Try to submit without accounts -> Verify validation prevents it.
4. Open "Add Account" modal, fill details, and save -> Verify modal resets, closes, and the account appears in the local list.
5. Add a second account.
6. Click "Remove" on one account -> Verify it is removed from the local list.
7. Submit the session -> Verify it creates both session and accounts in DB, and redirects to `/sessions` on success.
8. Navigate to the Session details page -> Verify both the session details and the attached accounts are successfully retrieved and displayed.
