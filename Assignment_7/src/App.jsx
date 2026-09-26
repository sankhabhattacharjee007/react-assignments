import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { TaskProvider } from './context/TaskContext';
import { RootLayout } from './components/RootLayout';
import { ProtectedRoute } from './components/ProtectedRoute';

// Pages
import { Dashboard } from './pages/Dashboard';
import { Tasks } from './pages/Tasks';
import { AddTask } from './pages/AddTask';
import { TaskDetails } from './pages/TaskDetails';
import { CompletedTasks } from './pages/CompletedTasks';
import { Login } from './pages/Login';
import { NotFound } from './pages/NotFound';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <TaskProvider>
          <Routes>
            <Route path="/" element={<RootLayout />}>
              {/* Protected Dashboard Route */}
              <Route
                index
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />

              {/* Protected Tasks Route */}
              <Route
                path="tasks"
                element={
                  <ProtectedRoute>
                    <Tasks />
                  </ProtectedRoute>
                }
              />

              {/* Protected Dynamic Task Details Route */}
              <Route
                path="tasks/:id"
                element={
                  <ProtectedRoute>
                    <TaskDetails />
                  </ProtectedRoute>
                }
              />

              {/* Protected Add Task Route */}
              <Route
                path="add-task"
                element={
                  <ProtectedRoute>
                    <AddTask />
                  </ProtectedRoute>
                }
              />

              {/* Protected Completed Tasks Route */}
              <Route
                path="completed"
                element={
                  <ProtectedRoute>
                    <CompletedTasks />
                  </ProtectedRoute>
                }
              />

              {/* Public Authentication Gate */}
              <Route path="login" element={<Login />} />

              {/* Fallback 404 Route */}
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </TaskProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
