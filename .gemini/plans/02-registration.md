# Implementation Plan: User Registration (Frontend)

This plan outlines the frontend work required to complete Step 02 (User Registration) based on `.gemini/specs/02-registration.md`. The backend API is already complete.

## User Decisions (Approved)

- **Global State:** Redux slice (`Client/src/store/authSlice.js`) has been approved to manage the `user` state and authentication status.
- **Redirects:** Users will be redirected to the `/` (Dashboard) after they register and login.
- **Design Theme:** The design theme will mirror the `Dashboard.jsx` page (clean, premium light-mode aesthetics with subtle shadows and blue accents), rather than a dark-mode glass effect.

## Proposed Changes

---

### Redux Store (Global State)

#### [NEW] `Client/src/store/authSlice.js`
- Create a Redux slice to manage `user` and `isAuthenticated`.

#### [NEW] `Client/src/store/store.js`
- Configure the Redux store.

#### [MODIFY] `Client/src/main.jsx`
- Wrap the app in `<Provider store={store}>` to provide Redux context.

---

### API Services

#### [NEW] `Client/src/common/auth.api.js`
- Create `registerAPI(data)` using Axios.
- Create `loginAPI(data)` using Axios.
- Create `logoutAPI()` using Axios.
- Base URL configured to point to `/api/auth`.

---

### Reusable Components

#### [NEW] `Client/src/components/Auth/AuthForm.jsx`
- Create a reusable form component that can handle both Login and Registration.
- Implement `react-hook-form` for form validation.
- Style with Tailwind CSS to match the Dashboard theme (`bg-white rounded-3xl shadow-xl shadow-blue-50 border border-gray-100`).

---

### Pages & Routing

#### [NEW] `Client/src/pages/Register.jsx`
- Full-page wrapper for the registration form with a premium light background.
- Connects to `registerAPI` and dispatches user info to Redux.
- Uses `react-hot-toast` for success/error messages.
- Redirects to `/` on success.

#### [NEW] `Client/src/pages/Login.jsx`
- Full-page wrapper for the login form with matching aesthetic.
- Connects to `loginAPI` and dispatches user info to Redux.
- Uses `react-hot-toast` for success/error messages.
- Redirects to `/` on success.

#### [MODIFY] `Client/src/App.jsx`
- Add `<Toaster />` for global toast notifications.
- Add routes for `/register` and `/login`.

---

## Verification Plan

### Automated/Code Checks
- Verify no linting errors (`npm run lint`).
- Ensure tailwind classes map correctly to standard Vite + Tailwind setup.

### Manual Verification
- Start both backend and frontend servers.
- Verify `react-hot-toast` displays correctly on successful/failed attempts.
- Verify Redux state updates when a user logs in or registers.
- Inspect the UI to ensure the aesthetics match a premium standard.
