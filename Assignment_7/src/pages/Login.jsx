import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { evaluatePasswordStrength } from '../utils/passwordStrength';

export const Login = () => {
  const { isAuthenticated, login, rememberedUsername } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const [username, setUsername] = useState(rememberedUsername || '');
  const [password, setPassword] = useState('');
  const [rememberUser, setRememberUser] = useState(Boolean(rememberedUsername));

  // Validation state
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Dynamic Password Strength Evaluation
  const strength = evaluatePasswordStrength(password);

  const destination = location.state?.from?.pathname || '/';

  const validate = () => {
    const errs = {};
    if (!username.trim()) {
      errs.username = 'Username is required';
    }
    if (!password) {
      errs.password = 'Password is required';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    if (field === 'username' && !username.trim()) {
      setErrors((prev) => ({ ...prev, username: 'Username is required' }));
    }
    if (field === 'password' && !password) {
      setErrors((prev) => ({ ...prev, password: 'Password is required' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({ username: true, password: true });

    if (!validate()) return;

    login(username, password, rememberUser);
    navigate(destination, { replace: true });
  };

  return (
    <div className="page login-page">
      <div className="login-card">
        <div className="login-header">
          <span className="brand-badge">TM</span>
          <h2>Sign In to TaskManager</h2>
          <p className="login-subtitle">
            Protected Dashboard requires an authenticated session.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {/* Username Field */}
          <div className="form-group">
            <label htmlFor="username">Username *</label>
            <input
              id="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                if (errors.username) setErrors((prev) => ({ ...prev, username: null }));
              }}
              onBlur={() => handleBlur('username')}
              className={`input-field ${touched.username && errors.username ? 'input-error' : ''}`}
            />
            {touched.username && errors.username && (
              <span className="field-error-text">&bull; {errors.username}</span>
            )}
          </div>

          {/* Password Field */}
          <div className="form-group">
            <label htmlFor="password">Password *</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) setErrors((prev) => ({ ...prev, password: null }));
              }}
              onBlur={() => handleBlur('password')}
              className={`input-field ${touched.password && errors.password ? 'input-error' : ''}`}
            />
            {touched.password && errors.password && (
              <span className="field-error-text">&bull; {errors.password}</span>
            )}

            {/* Display Password Strength */}
            {password && (
              <div className="strength-meter-container">
                <div className="strength-meter-header">
                  <span>Password Strength:</span>
                  <strong style={{ color: strength.color }}>{strength.label}</strong>
                </div>
                <div className="strength-bar-track">
                  <div
                    className="strength-bar-fill"
                    style={{
                      width: `${strength.percent}%`,
                      backgroundColor: strength.color
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Remember User Checkbox */}
          <div className="form-checkbox-row">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={rememberUser}
                onChange={(e) => setRememberUser(e.target.checked)}
              />
              <span>Remember User</span>
            </label>
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary btn-block">
            Log In &rarr;
          </button>
        </form>
      </div>
    </div>
  );
};
