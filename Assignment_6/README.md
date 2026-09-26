# Assignment 6: Task Manager with Routing

A clean, modern, and simple single-page Task Management application built using **React** and **React Router v6**.

---

## 📌 Problem Statement & Specifications

Build a single-page Task Manager application using React that allows users to create, view, update, complete, filter, and delete tasks.

### 📋 Task Data Model & Fields
Each task contains the following fields:
1. **Task Header**: Title of the task
2. **Task Description**: Description of task requirements
3. **Priority**: `High` / `Medium` / `Low`
4. **Category**: `Academic` / `Personal`
5. **Raised Date and Time**: **Automatically picked** when the task is created (e.g., `28 Aug 2026, 10:30 AM`)
6. **Due Date**: Date field (default `2026-08-28`)
7. **Status**: `Raised` / `Pending` / `Closed`

---

## 🧭 Pages & Routing Architecture

Built using React Router v6 with **Nested Routes**, **Dynamic Routes**, and **Basic Protected Routes**:

1. **Root Layout & Navigation (`/`)**:
   - Uses `<Outlet />` for nested child routing.
   - Clean top Navigation bar with active route highlighting:
     - Dashboard (`/`)
     - Tasks (`/tasks`)
     - Completed Tasks (`/completed`)
     - + Add Task (`/add-task`)
     - Auth status toggle (Logged In / Guest) to test Protected Route.

2. **Dashboard (`/`)**:
   - Summary statistics cards: Total, Raised, Pending, Closed tasks.
   - Recent tasks preview list with quick links to task details.
   - Shortcut buttons to create new tasks or view all tasks.

3. **Tasks Directory (`/tasks`)**:
   - Complete list of tasks with badges for Priority, Category, and Status.
   - **URL Query Parameters** (`useSearchParams`):
     - Filter by Status: All, Raised, Pending, Closed.
     - Filter by Priority: All, High, Medium, Low.
     - Filter by Category: All, Academic, Personal.
     - Search filter by text query.
   - Actions on each card:
     - View Details (navigates to `/tasks/:id`).
     - Complete (marks status as Closed).
     - Delete (removes task).

4. **Add Task (`/add-task`)** — *Protected Route*:
   - Clean, focused form with required fields.
   - Automatically sets Raised Date & Time on submission.
   - Redirects to `/tasks` upon successful creation.

5. **Task Details (`/tasks/:id`)** — *Dynamic Route*:
   - Uses `useParams()` to dynamically load the selected task by ID.
   - Displays all task fields.
   - Edit mode allows updating Header, Description, Priority, Category, Due Date, and Status.
   - In-place quick status change dropdown.
   - Delete task and Mark Closed / Reopen buttons.

6. **Completed Tasks (`/completed`)**:
   - Dedicated page showing all tasks where `status === 'Closed'`.
   - Option to Reopen (moves back to Pending) or Delete.

7. **Basic Protected Route (`/login`)**:
   - Unauthenticated users attempting to access `/add-task` are redirected to `/login`.
   - Logging in immediately grants access and redirects back to the protected route.
   - Navbar allows instant 1-click logout/login to test this behavior.

---

## 🛠️ How to Run Locally

1. Open a terminal in the `Assignment_6` directory:
   ```bash
   cd Assignment_6
   ```

2. Install dependencies (if not already installed):
   ```bash
   npm install
   ```

3. Start the Vite development server:
   ```bash
   npm run dev
   ```

4. Open your browser at the displayed URL (e.g. `http://localhost:5178` or `http://localhost:5179`).
