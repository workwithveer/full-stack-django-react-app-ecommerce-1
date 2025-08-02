import { useState, useEffect } from "react";
import type { User } from "../types/navigation";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in (localStorage, cookies, etc.)
    const token = localStorage.getItem("authToken");
    if (token) {
      // Validate token and set user
      setUser({
        id: "1",
        username: "demo_user",
        email: "demo@example.com",
        isAuthenticated: true,
      });
    }
    setLoading(false);
  }, []);

  const login = (credentials: { username: string; password: string }) => {
    // Implement login logic
    setUser({
      id: "1",
      username: credentials.username,
      email: "demo@example.com",
      isAuthenticated: true,
    });
    localStorage.setItem("authToken", "demo-token");
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("authToken");
  };

  return { user, loading, login, logout };
};
