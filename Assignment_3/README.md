# Farm Employee Directory (Assignment 3)

A high-performance, responsive React application built with **`useState()`**, **Event Handling**, and **Conditional Rendering**, styled in a **Black and Red** theme.

---

## Features Implemented

1. **Add Employee**:
   - Opens a modal dialog with full input validation (Name, Employee ID, Department, Gender, Phone, Local Address, Permanent Address, Role).
   - "Same as Local Address" checkbox helper to quickly sync addresses.
   - Prepends newly created employee to directory state with instant visual toast notification.

2. **Delete Employee**:
   - Delete button on each card/row triggers a custom danger confirmation modal.
   - Prevents accidental deletions and cleans up the employee from `useState()` state.

3. **Edit Employee Details**:
   - Loads the selected employee's current data directly into the modal form.
   - Validates changes and updates the record in-place in state.

4. **Live Search**:
   - Instant search across Employee Name, Employee ID, Phone Number, Farm Department, Farm Role, Local Address, and Permanent Address.
   - Clear (`×`) button for quick reset.

5. **Employee Count & Operational Metrics**:
   - **Total Employees** count tile.
   - **Farm Divisions** count.
   - **Matching Filter** live count.
   - **Gender Diversity** live breakdown (Male, Female, Other).

6. **Department Filter**:
   - Dropdown filter with all agricultural operational divisions.
   - One-click quick-filter pills for rapid switching between departments.

7. **Dual View Modes (Cards & Table)**:
   - Toggle between **Card Grid View** (clean, minimalist cards with **NO profile pictures**, as requested) and **Directory Table View**.

---

## Technical Architecture

### 1. State Management (`useState`)
- `employees`: Array of farm employee records initialized with seed data.
- `searchQuery`: String representing the live search query.
- `selectedDepartment`: Active department filter ('All' or specific branch).
- `viewMode`: Active display mode ('grid' or 'table').
- `isModalOpen`: Boolean controlling Add/Edit modal visibility.
- `editingEmployee`: Employee object being edited or `null` for new entries.
- `deleteTarget`: Employee object targeted for deletion confirmation.
- `notification`: Toast message state for action feedback.

### 2. Event Handling
- `onSubmit` & `onChange` in controlled modal form.
- Button `onClick` handlers for Add, Edit, Delete, Filter, Sort, View Toggle, and Reset.
- Keyboard and backdrop click dismissal for modal dialogues.

### 3. Conditional Rendering
- Add vs. Edit modal heading and button labels (`isEditMode ? ... : ...`).
- Validation errors rendered conditionally when fields are empty/invalid.
- Modals rendered only when triggered (`isOpen && <EmployeeModal />`, `deleteTarget && <DeleteConfirmModal />`).
- Empty state displayed when no employee matches the search or department filter.
- Card view vs Table view conditionally swapped based on `viewMode`.

---

## Farm Employee Data Fields
| Field | Type | Description |
|---|---|---|
| `empId` | String | Farm Employee ID (e.g. `FRM-101`) |
| `name` | String | Full Name of Employee |
| `department` | String | Farm Division (Crop, Livestock, Machinery, etc.) |
| `gender` | String | Gender (`Male`, `Female`, `Other`) |
| `phone` | String | Contact phone number |
| `role` | String | Specific job role / designation |
| `localAddress` | String | Local residence / Farm quarters address |
| `permanentAddress` | String | Native permanent home address |

---

## Running the Application

```bash
# Navigate to Assignment_3 directory
cd Assignment_3

# Start development server
npm run dev

# Build production bundle
npm run build
```
