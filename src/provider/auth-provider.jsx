import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

const API = "http://localhost:5599";

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("accessToken"));
  const [user, setUser] = useState(
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null
  );
  const [loading, setLoading] = useState(false);

  // ----------------------------
  // Persist token
  // ----------------------------
  useEffect(() => {
    if (token) localStorage.setItem("accessToken", token);
    else localStorage.removeItem("accessToken");
  }, [token]);

  // ----------------------------
  // Persist user
  // ----------------------------
  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [user]);

  // -------------------------------------
  //           REGISTER
  // -------------------------------------
  const register = async (data) => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (result.status === "success") {
        const accessToken = result.data.accessToken;
        setToken(accessToken);

        const payload = JSON.parse(atob(accessToken.split(".")[1]));

        setUser({
          userId: payload.sub,
          businessName: payload.businessName,
        });
      }

      return result;
    } catch (error) {
      return { status: "error", message: "Network error" };
    } finally {
      setLoading(false);
    }
  };

  // -------------------------------------
  //           LOGIN
  // -------------------------------------
  const login = async (data) => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (result.status === "success") {
        const accessToken = result.data.accessToken;
        setToken(accessToken);

        const payload = JSON.parse(atob(accessToken.split(".")[1]));

        setUser({
          userId: payload.sub,
          businessName: payload.businessName,
        });
      }

      return result;
    } catch (error) {
      return { status: "error", message: "Network error" };
    } finally {
      setLoading(false);
    }
  };

  // -------------------------------------
  //           LOGOUT
  // -------------------------------------
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.clear();
  };

  // -------------------------------------
  //   AUTH FETCH (SECURE REQUESTS)
  // -------------------------------------
  const authFetch = async (url, options = {}) => {
    const res = await fetch(`${API}${url}`, {
      ...options,
      headers: {
        ...(options.headers || {}),
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return res.json();
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        loading,
        register,
        login,
        logout,
        authFetch,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
