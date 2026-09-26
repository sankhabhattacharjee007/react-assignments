# Assignment 7: Authentication System with Protected Dashboard

A clean, modern, and simple single-page application integrating **Authentication & Route Protection** with the Task Manager from Assignment 6. Built with **React** and **React Router v6** in a sleek **Matte Black & Crimson Red** theme.

---

## 📌 Problem Statement & Specifications

Implement an authentication system for the Task Manager application with route protection, session storage, and JWT simulation.

### 🔑 Features Implemented

1. **Login & Session Management**:
   - Clean, centered login portal at `/login`.
   - Stores active user profile and simulated JWT token in `localStorage`.
   - Redirects to Protected Dashboard (`/`) or previously attempted protected route upon successful login.

2. **Logout**:
   - Clears active authenticated state, user profile, and JWT token from `localStorage`.
   - Instantly redirects user back to `/login`.

3. **Protected Dashboard**:
   - The root Dashboard (`/`), Tasks (`/tasks`), Add Task (`/add-task`), and Task Details (`/tasks/:id`) are guarded by `<ProtectedRoute>`.
   - Attempting to access the Dashboard or any protected view without an active session redirects to `/login`.

4. **Remember User**:
   - "Remember User" checkbox on the login form.
   - When checked, saves the username into `localStorage` (`assignment7_remembered_username`) so it is prefilled on subsequent visits.
   - When unchecked, removes saved username.

5. **JWT Token Simulation**:
   - Generates standard 3-part base64url encoded tokens: `header.payload.signature` (`alg: HS256`, `typ: JWT`).
   - Payload contains standard claims: `sub`, `name`, `iat`, `exp`, `iss`.
   - Displayed and inspectable directly on the Protected Dashboard with a toggle to view the full raw token and decoded claims.

6. **Form Validation**:
   - **Username Required**: Displays validation error if submitted or blurred empty.
   - **Password Required**: Displays validation error if submitted or blurred empty.
   - **Display Password Strength**: Live interactive password strength meter with visual progress bar and labels (`Weak`, `Medium`, `Strong`) updating as the user types.

7. **Full Task Manager (Assignment 6 Integration)**:
   - Complete CRUD task features:
     - Task Header, Task Description, Priority (`High` / `Medium` / `Low`), Category (`Academic` / `Personal`), Raised Date & Time (auto-picked), Due Date (`2026-08-28`), Status (`Raised` / `Pending` / `Closed`).
     - Search & Filters synced with URL parameters (`useSearchParams`).
     - Dynamic route (`/tasks/:id`) for task inspection and editing.

---

## 🎨 Design Theme
- **Background**: Matte Black (`#09090b`) with dark card surfaces (`#121215`).
- **Primary Accent**: Crimson Red (`#e11d48`).
- **Typography**: Clean, developer-grade UI with high contrast and sharp geometry (`border-radius: 4px - 6px`).

---

## 🚀 How to Run Locally

1. Open a terminal in the `Assignment_7` directory:
   ```bash
   cd Assignment_7
   ```

2. Install dependencies (if needed):
   ```bash
   npm install
   ```

3. Start the Vite development server:
   ```bash
   npm run dev
   ```

4. Open the displayed URL in your browser to test the authentication system and Protected Dashboard.
