🌲 The Wild Oasis — Admin Dashboard

A modern React-based hotel management dashboard featuring cabins, bookings, settings, user accounts, and authentication.
Built with React Router, TanStack React Query, Styled-components, Supabase, and React Hot Toast.

🚀 Features

📊 Dashboard showing metrics

🛏️ Cabin management (CRUD)

📘 Bookings management

👤 User accounts

⚙️ Hotel settings with live updates

🔐 Authentication (Login)

🌐 Fully routed UI with React Router

⚡ React Query for caching, syncing, and mutations

🍞 Notifications with React Hot Toast

🎨 Global styling via Styled Components

📁 Project Structure
src/
 ├─ pages/
 │   ├─ Dashboard.jsx
 │   ├─ Bookings.jsx
 │   ├─ Cabins.jsx
 │   ├─ Users.jsx
 │   ├─ Settings.jsx
 │   ├─ Account.jsx
 │   ├─ Login.jsx
 │   └─ PageNotFound.jsx
 ├─ ui/
 │   └─ AppLayout.jsx
 ├─ styles/
 │   └─ GlobalStyles.js
 ├─ features/
 │   └─ settings/
 │        ├─ useSettings.js
 │        ├─ useUpdateSetting.js
 │        └─ UpdateSettingsForm.jsx
 ├─ services/
 │   └─ apiSettings.js
 ├─ App.jsx

🧩 Technologies Used

React 18

React Router v6

@tanstack/react-query & React Query Devtools

Styled-components

React Hot Toast

Supabase (Database + Auth + Storage)

▶️ Running the Project
npm install
npm run dev

🛠 App Initialization Code

The project uses:

BrowserRouter for routing

QueryClientProvider for React Query

Custom <AppLayout /> for shared layout

<Toaster /> for notifications

🔧 Default React Query Config
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
    },
  },
});

🌍 Routes
Path	Page
/dashboard	Dashboard
/bookings	Bookings
/cabins	Cabins
/users	Users
/settings	Settings
/account	Account
/login	Login
*	Not Found
