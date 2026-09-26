import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTasks } from '../context/TaskContext';

export const Navbar = () => {
  const { isAuthenticated, logout, login } = useAuth();
  const { stats } = useTasks();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        {/* Brand / Logo */}
        <Link to="/" className="brand">
          <span className="brand-badge">TM</span>
          <span className="brand-title">TaskManager</span>
        </Link>

        {/* Navigation Links */}
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

        {/* Auth / Protected Route Controls */}
        <div className="nav-auth">
          {isAuthenticated ? (
            <div className="auth-status">
              <span className="auth-badge logged-in">Logged In</span>
              <button onClick={handleLogout} className="btn-sm btn-outline">
                Logout
              </button>
            </div>
          ) : (
            <div className="auth-status">
              <span className="auth-badge logged-out">Guest</span>
              <button onClick={() => { login(); navigate('/add-task'); }} className="btn-sm btn-primary">
                Login
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
