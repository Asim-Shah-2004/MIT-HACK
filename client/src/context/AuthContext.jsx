import React, { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const token = Cookies.get("authToken");
      
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get("http://localhost:3000/user", { withCredentials: true });
        setUser(response.data);
        console.log("User data fetched:", response.data);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        clearAuth();
      } finally {
        setLoading(false);
      }
    };

    
    fetchUser();
  }, []);

  const authenticate = async (url, data) => {
    setLoading(true);
    const response = await axios.post(url, data, { withCredentials: true });
    setUser(response.data.user);
    setLoading(false);
    return response.data;
  };

  const login = (data) => authenticate("http://localhost:3000/login", data);
  const register = (data) => authenticate("http://localhost:3000/register", data);

  const clearAuth = () => {
    setUser(null);
    Cookies.remove("authToken");
  };

  const logout = () => clearAuth();

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
