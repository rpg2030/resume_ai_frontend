// src/AuthProvider.jsx
import React, { createContext, useState, useEffect } from "react";
import { me } from "./authClient";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));

//   useEffect(() => {
//     if (token) {
//       me(token).then((d) => {
//         setUser(d);
//       }).catch(() => {
//         setUser(null);
//         setToken(null);
//         localStorage.removeItem("token");
//       });
//     }
//   }, [token]);

   useEffect(() => {
  
    setLoading(false);
    }, []);

  const login = (token, userData) => {
    localStorage.setItem("token", token);
    setToken(token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
