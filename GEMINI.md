# Project Tech Stack Preference

This file serves as a reference for the project's preferred technologies and tools. Please adhere to these versions and packages whenever adding new features or installing dependencies.

Property Expense Manager is a tool to manage propfirms  expenses. 

Architecture
Prop Expense Manager/
├── Client/                 # React frontend (Vite or CRA)
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── common/         # Summary API file. All APIs and their methods are defined in this file.
│   │   ├── layouts/        # Layout components
│   │   ├── pages/          # Page-level components (routes)
│   │   ├── hooks/          # Custom React hooks
│   │   ├── store/          # Redux Toolkit store (if needed)
│   │   ├── provider/       # Global state (if needed)
│   │   ├── utils/          # Utility functions
│   │   ├── route/          # React Router Dom routes
│   │   ├── App.jsx         # Main app 
│   │   └── main.jsx        # Entry point
│   └── public/
│
├── Server/                 # Backend API
│   ├── routes/             # Express route handlers
│   ├── controllers/        # Business logic
│   ├── models/             # DB schemas (Mongoose)
│   ├── middleware/         # Auth, validation, etc.
│   ├── db/                 # DB connection 
│   ├── utils/              # Utility functions
│   ├── app.js              # app.js is where we export the app instance
│   ├── constants.js        # Constants are defined in this file
│   ├── index.js            # Entry point
│
├── package.json
└── README.md

New UI → create a new component in /client/src/components or /pages
Routing → handled in React Router (App.jsx)
API calls → /client/src/services only (never directly inside components)

Where things belong:

    New UI → create a new component in /client/src/components or /pages
    State management → use redux store or react hooks. Store Redux slices in src/store folder. 
    Backend routes → /server/routes
    Business logic → /server/controllers (never inside routes)
    Database logic → /server/models (Mongoose schemas)

Code style
    JavaScript: camelCase for variables and functions
    React components: PascalCase (ExpenseCard.jsx)

    Components:
    - Keep components small and reusable
    - One responsibility per component

    API handling:
    - Use services layer (fetch/axios)

    Error handling:
    - Always handle API errors with try/catch
    - Return proper HTTP status codes in backend


## Client-Side (React + Vite)
- **Framework**: React
- **Build Tool**: Vite
- **State Management**: Redux Toolkit (`@reduxjs/toolkit`, `react-redux`)
- **Styling**: Tailwind CSS  (using `@tailwindcss/vite`)
- **Routing**: React Router Dom 
- **Data Fetching**: Axios
- **Form Handling**: React Hook Form
- **Tables**: TanStack Table (`@tanstack/react-table`)
- **UI Feedback**: React Hot Toast, SweetAlert2
- **Icons**: React Icons
- **Animations/Special Components**: React Infinite Scroll, React Type Animation
- **Linting**: ESLint

## Server-Side (Node.js + Express)
- **Framework**: Express 
- **Database**: MongoDB with Mongoose
- **Authentication**: JSON Web Token (JWT), bcryptjs
- **File Uploads**: Multer, Cloudinary
- **Security/Middleware**: Helmet, CORS, Cookie-parser, Morgan
- **Environment**: Dotenv
- **Email**: Resend



## General Guidelines
- Only install packages when they are explicitly required for a feature.
- Use ES Modules (`"type": "module"`) for both Client and Server.
- Maintain consistency with existing patterns and the glassmorphic/premium UI design goal.
- Always create reusable components
- Avoid prop drilling (use context if needed)
- Use async/await only (no .then chains)
- Keep API responses consistent (status, data, message)
