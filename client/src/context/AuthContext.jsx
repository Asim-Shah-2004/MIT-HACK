// import React from 'react';
import { createContext, useState, useEffect } from "react";
import { jwtDecode } from 'jwt-decode';
import axios from "axios";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const decodedToken = jwtDecode(token);

        const currentTime = Date.now() / 1000;
        if (decodedToken.exp < currentTime) {
          console.error("Token has expired");
          clearAuth();
          setLoading(false);
          return;
        }

        console.log(decodedToken);
        setUser(decodedToken);
      }
      catch (error) {
        console.error("Error decoding token:", error);
        setLoading(false);
        clearAuth();
      }
    };

    fetchUser();
  }, [token]);


  const authenticate = async (url, data) => {
    setLoading(true);
    try {
      const response = await axios.post(url, data, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setUser(response.data.user);
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      setLoading(false);
      return response.data;
    } catch (error) {
      setLoading(false);

      if (error.response) {
        const status = error.response.status;

        if (status === 400) {
          throw new Error("Bad request. Please check your input.");
        } else if (status === 404) {
          throw new Error("Invalid email or password.");
        } else if (status === 500) {
          throw new Error("Server error, please try again later.");
        }
      }

      throw new Error("Network error.");
    }
  };



  const login = (data) => authenticate(`${SERVER_URL}/login`, data);
  const register = (data, type) => authenticate(`${SERVER_URL}/register/${type}`, data);

  const clearAuth = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  };



  const logout = () => clearAuth();

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
