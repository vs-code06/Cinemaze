'use client';

import { createContext, useContext, useState } from 'react';
import { signup, login } from '../utils/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const handleSignup = async (name, email, password) => {
    const newUser = await signup(name, email, password);
  }  

  const handleLogin = async (email, password) => {
    const loggedInUser = await login(email, password);
    setUser(loggedInUser);
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, handleSignup, handleLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
