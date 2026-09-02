import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const AUTH_STORAGE_KEY = 'portfolio_alif_admin_session_v1';

export const DEMO_CREDENTIALS = {
  username: 'admin',
  email: 'admin@portfolio.dev',
  password: 'admin123',
  displayName: 'Admin (Stefan Alif)',
  role: 'Portfolio Owner & Editor'
};

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem(AUTH_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Error reading auth session from storage:', e);
    }
    return null;
  });

  const isAuthenticated = !!currentUser;

  const login = (usernameOrEmail, password) => {
    const trimmedUser = (usernameOrEmail || '').trim().toLowerCase();
    const trimmedPass = (password || '').trim();

    // Check against demo credentials or admin shortcuts
    if (
      (trimmedUser === DEMO_CREDENTIALS.username || trimmedUser === DEMO_CREDENTIALS.email) &&
      (trimmedPass === DEMO_CREDENTIALS.password || trimmedPass === 'admin')
    ) {
      const user = {
        username: DEMO_CREDENTIALS.username,
        email: DEMO_CREDENTIALS.email,
        displayName: DEMO_CREDENTIALS.displayName,
        role: DEMO_CREDENTIALS.role,
        avatar: '/assets/alip-real-photo.jpg',
        loginTime: new Date().toISOString()
      };
      setCurrentUser(user);
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
      return { success: true };
    }

    return { 
      success: false, 
      message: 'Invalid credentials. Use admin / admin123 (or click "Fill Demo Credentials")' 
    };
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, currentUser, login, logout, demoCredentials: DEMO_CREDENTIALS }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
