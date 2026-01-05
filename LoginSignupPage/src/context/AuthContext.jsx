import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [sessionValid, setSessionValid] = useState(false);

  const API = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

  // Check session validity with backend
  const verifySession = async () => {
    try {
      const response = await fetch(`${API}/me`, {
        method: "GET",
        credentials: "include", // Send cookies (session)
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success && data.user) {
          setUser(data.user);
          setSessionValid(true);
          localStorage.setItem("user", JSON.stringify(data.user));
          return true;
        }
      }
      // Session invalid or expired
      setSessionValid(false);
      localStorage.removeItem("user");
      setUser(null);
      return false;
    } catch (err) {
      console.error("Session verification failed:", err);
      setSessionValid(false);
      localStorage.removeItem("user");
      setUser(null);
      return false;
    }
  };

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedUser = localStorage.getItem("user");

        // First try to verify session with backend
        const sessionValid = await verifySession();

        // If no valid session, check localStorage as fallback
        if (!sessionValid && storedUser && storedUser !== "undefined") {
          try {
            setUser(JSON.parse(storedUser));
          } catch (err) {
            console.error("Invalid user in localStorage");
            localStorage.removeItem("user");
            setUser(null);
          }
        }
      } catch (err) {
        console.error("Auth initialization error:", err);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const logout = async () => {
    try {
      await fetch(`${API}/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (err) {
      console.error("Logout failed:", err);
    }

    localStorage.removeItem("user");
    setUser(null);
    setSessionValid(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        logout,
        isLoading,
        sessionValid,
        setSessionValid,
        verifySession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return ctx;
};
