# Wellness Log Dashboard

A React.js + TypeScript single-page app for tracking your wellness metrics with JWT-based authentication.

## Features

- **User authentication**: Login & signup with client-side validation  
- **Wellness log**: Create entries for mood, sleep duration, and activity notes  
- **Log listing & search**: Filter your past entries by notes text  
- **Responsive design**: Mobile and desktop layouts  

## Tech Stack

- **Framework**: React 18 + TypeScript  
- **Routing**: React Router v6  
- **Forms & Validation**: React Hook Form  
- **HTTP**: Axios (with interceptor for JWT)  
- **Styling**: CSS Modules  
- **Mock API**: Postman mock server  

## Getting Started

1. **Clone the repo**  
   ```
   git clone https://github.com/Gimhan001/wellness-dashboard.git
    ```

2. **Running Locally**
- Install dependencies using pnpm: `yarn install`
- Run the app: `yarn start`

3. **Directory tructure**

    ```
    wellness-dashboard/
    ├── public/
    ├── src/
    │   ├── components/
    │   │   ├── forms/         # LoginForm, SignupForm, WellnessLogForm
    │   │   └── ui/            # shared UI primitives
    │   ├── constants/         # routes, Zod schemas
    │   ├── contexts/          # AuthContext
    │   ├── hooks/             # custom hooks (useAuth, useLogs)
    │   ├── pages/             # LoginPage, SignupPage, DashboardPage
    │   ├── services/          # axios instances & service functions
    │   ├── store/             # Redux store
    │   ├── styles/            # global CSS or CSS modules
    │   ├── types/             # TypeScript interfaces & enums
    │   ├── utils/             # Utility functions
    │   ├── App.tsx
    │   └── index.tsx
    └── .env.local
    ```
