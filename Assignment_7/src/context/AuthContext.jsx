import React, { createContext, useContext, useState, useEffect } from 'react';
import { createSimulatedJwt, decodeSimulatedJwt } from '../utils/jwt';

const AuthContext = createContext();

const STORAGE_TOKEN = 'assignment7_jwt_token';
const STORAGE_USER = 'assignment7_user';
const STORAGE_REMEMBERED = 'assignment7_remembered_username';

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => {
    return localStorage.getItem(STORAGE_TOKEN) || null;
  });

  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_USER);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [rememberedUsername, setRememberedUsername] = useState(() => {
    return localStorage.getItem(STORAGE_REMEMBERED) || '';
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const savedToken = localStorage.getItem(STORAGE_TOKEN);
    if (!savedToken) return false;
    const decoded = decodeSimulatedJwt(savedToken);
    return decoded ? decoded.isValid : false;
  });

  // Decode JWT whenever token changes
  const tokenData = token ? decodeSimulatedJwt(token) : null;

  const login = (username, password, rememberUser = true) => {
    const userProfile = {
      username: username.trim(),
      name: username.trim()
    };

    // Generate simulated JWT Token
    const jwtString = createSimulatedJwt(userProfile, 7200);

    setToken(jwtString);
    setUser(userProfile);
    setIsAuthenticated(true);

    localStorage.setItem(STORAGE_TOKEN, jwtString);
    localStorage.setItem(STORAGE_USER, JSON.stringify(userProfile));

    if (rememberUser) {
      localStorage.setItem(STORAGE_REMEMBERED, username.trim());
      setRememberedUsername(username.trim());
    } else {
      localStorage.removeItem(STORAGE_REMEMBERED);
      setRememberedUsername('');
    }

    return true;
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem(STORAGE_TOKEN);
    localStorage.removeItem(STORAGE_USER);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        token,
        tokenData,
        rememberedUsername,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
