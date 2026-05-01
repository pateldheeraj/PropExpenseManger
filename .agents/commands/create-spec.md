---

description: Create a spec file and feature branch for the next backend step
argument-hint: "Step number and feature name e.g. 2 registration"
allowed-tools: Read, Write, Glob, Bash(git:*)
---------------------------------------------

You are a senior developer spinning up a new feature for Prop Expense Manager ( 
Node.js + Express + MongoDB application). Always follow the rules in GEMINI.md.

User input: $ARGUMENTS

## Step 1 — Check working directory is clean

Run `git status` and check for uncommitted, unstaged, or
untracked files. If any exist, stop immediately and tell
the user to commit or stash changes before proceeding.
DO NOT CONTINUE until the working directory is clean.

---

## Step 2 — Parse the arguments

From $ARGUMENTS extract:

1. `step_number`

   * zero-padded to 2 digits: 2 → 02, 11 → 11

2. `feature_title`

   * Human readable Title Case
   * Example: "User Registration", "Login and Authentication"

3. `feature_slug`

   * Lowercase, kebab-case
   * Only a-z, 0-9 and -
   * Max 40 characters
   * Example: registration, login-auth

4. `branch_name`

   * Format: `feature/<feature_slug>`

If unclear → ask user before continuing.

---

## Step 3 — Check branch availability

Run:
git branch

If branch exists → append number:
feature/registration-01, feature/registration-02

---

## Step 4 — Sync with main branch

Run:
git checkout main
git pull origin main

---

## Step 5 — Create feature branch

Run:
git checkout -b <branch_name>

---

## Step 6 — Research codebase

Read:

* GEMINI.md → project rules & architecture
* index.js → app entry point
* All files in:

  * /models
  * /routes
  * /controllers
  * /Client/src/pages
  * /Client/src/components
  * /Client/src/common
* All files in `.gemini/specs/`

Check GEMINI.md to ensure this step is not already completed.
If already done → STOP and warn user.

---

## Step 7 — Write the spec

Generate spec using this structure:

---

# Spec: <feature_title>

## Overview

Explain what this feature does and why it is needed now.

---

## Depends on

List previous steps required.

---

## Routes

List API endpoints:

* `METHOD /api/...` — description — access (public/protected)

If none → "No new routes"

---

## Database changes

Describe schema changes using MongoDB:

* New collections
* New fields
* Indexes (e.g. unique email)

If none → "No database changes"

---

## Models

* **Create:** list new Mongoose models
* **Modify:** existing models and changes

---

## Controllers

* List new controllers and responsibilities

---

## Frontend Pages

* List new React pages (routes) to be added to `App.jsx`

---

## Frontend Components

* List new reusable UI components
* Mention required glassmorphic/premium UI styling

---

## Frontend Services (API)

* List new API calls to be added to `/Client/src/common/`

---

## Files to change

List all files to modify.

---

## Files to create

List all new files.

---

## New dependencies

List npm packages (if any)

If none → "No new dependencies"

---

## Rules for implementation

Always include:

* Use Mongoose (no raw Mongo queries unless necessary)
* Passwords must be hashed using bcrypt
* JWT must be used for authentication
* No business logic inside routes
* Controllers handle all logic
* Validate all request data
* Never trust client input
* Use async/await only (no .then chains)
* Use environment variables for secrets

### Frontend Rules
* Use React Router for navigation
* Use Axios for API calls within `/Client/src/common/`
* Use Tailwind CSS for glassmorphic/premium UI design
* Manage state appropriately (Redux/Context or local hooks)
* Implement loading states and error handling via toast/sweetalert

---

## Definition of done

Checklist:

* [ ] Server runs without errors
* [ ] API routes work correctly
* [ ] User can register
* [ ] User can login
* [ ] Password is hashed
* [ ] JWT authentication works
* [ ] Protected routes are secured
* [ ] Proper error handling implemented
* [ ] Frontend UI components are built with premium/glassmorphic design
* [ ] Frontend routing is configured
* [ ] Forms are connected to backend API
* [ ] Success and error messages are displayed to the user

---

## Step 8 — Save the spec

Save file to:

.gemini/specs/<step_number>-<feature_slug>.md

---

## Step 9 — Report to user

Print:

Branch:    <branch_name>
Spec file: .gemini/specs/<step_number>-<feature_slug>.md
Title:     <feature_title>

Then say:

"Review the spec at `.gemini/specs/<step_number>-<feature_slug>.md`
then enter Plan Mode with Shift+Tab twice to begin implementation."

Do NOT print full spec unless asked.
