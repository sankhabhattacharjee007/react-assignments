import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Login = () => {
  const { isAuthenticated, login, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [username, setUsername] = useState('demo_user');
  const [password, setPassword] = useState('password123');

  // Destination route if redirected from protected route
  const from = location.state?.from?.pathname || '/add-task';

  const handleLogin = (e) => {
    e.preventDefault();
    login();
    navigate(from, { replace: true });
  };

  return (
    <div className="page login-page">
      <div className="login-card">
        <h2>Protected Route Access</h2>
        <p className="login-subtitle">
          {isAuthenticated
            ? 'You are currently authenticated. You can access protected pages like Add Task.'
            : 'Authentication is required to access protected routes (such as Add Task).'}
        </p>

        {isAuthenticated ? (
          <div className="logged-in-box">
            <p className="success-text">&check; Authenticated Session Active</p>
            <div className="form-actions">
              <button onClick={() => navigate('/add-task')} className="btn btn-primary">
                Proceed to Add Task
              </button>
              <button onClick={logout} className="btn btn-danger">
                Log Out
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleLogin} className="login-form">
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="input-field"
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                required
              />
            </div>

            <button type="submit" className="btn btn-primary btn-block">
              Log In (Unlock Protected Routes)
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
