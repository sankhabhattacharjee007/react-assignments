import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTasks } from '../context/TaskContext';

export const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { stats } = useTasks();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        {/* Brand */}
        <Link to="/" className="brand">
          <span className="brand-badge">TM</span>
          <span className="brand-title">TaskManager</span>
        </Link>

        {/* Navigation Links - accessible when logged in */}
        {isAuthenticated && (
          <nav className="nav-links">
            <NavLink
              to="/"
              end
              className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/tasks"
              className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}
            >
              Tasks
              <span className="counter-pill">{stats.total}</span>
            </NavLink>
            <NavLink
              to="/completed"
              className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}
            >
              Completed
              <span className="counter-pill green">{stats.closed}</span>
            </NavLink>
            <NavLink
              to="/add-task"
              className={({ isActive }) => (isActive ? 'nav-item add-btn active' : 'nav-item add-btn')}
            >
              + Add Task
            </NavLink>
          </nav>
        )}

        {/* Auth status & actions */}
        <div className="nav-auth">
          {isAuthenticated ? (
            <div className="auth-status">
              <span className="auth-user-tag">👤 {user?.username}</span>
              <button onClick={handleLogout} className="btn-sm btn-outline">
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="btn-sm btn-primary">
              Log In
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
