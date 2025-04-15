import React, { createContext, useState, useEffect } from 'react';
import { getLocalStorage, setLocalStorage } from '../../utils/LocalStorage';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    employees: [],
    admin: [],
    currentUser: null,
    username: null,
  });

  useEffect(() => {
    const storedData = getLocalStorage();
    if (!storedData.employees || !storedData.admin) {
      setLocalStorage();
    }
    setUserData({ ...storedData, currentUser: null, username: null });
  }, []);

  useEffect(() => {
    if (userData.currentUser) {
      localStorage.setItem("userData", JSON.stringify(userData));
    }
  }, [userData]);

  const logout = () => {
    localStorage.removeItem("userData");
    setUserData({ ...userData, currentUser: null, username: null });
  };

  return (
    <AuthContext.Provider value={{ userData, setUserData, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
