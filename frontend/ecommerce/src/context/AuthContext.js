import React, { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();
const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsAuthenticated(!!token);
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using AuthContext easily
export const useAuth = () => useContext(AuthContext);
