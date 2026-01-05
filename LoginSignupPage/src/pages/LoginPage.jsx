import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // 👈 IMPORTANT

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState("");

  const API = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";
  const navigate = useNavigate();
  const { user, setUser, isLoading, sessionValid, setSessionValid } = useAuth();

  // ✅ Redirect if already logged in and session confirmed
  useEffect(() => {
    if (!isLoading && user && sessionValid) {
      navigate("/", { replace: true });
    }
  }, [user, navigate, isLoading, sessionValid]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFeedback("");
    setLoading(true);

    try {
      const res = await fetch(`${API}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // required for session/cookies
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Login failed");
      }

      // Persist user and session is maintained by backend
      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);
      setSessionValid(true);

      setFeedback("Login successful 🎉");

      setTimeout(() => {
        navigate("/", { replace: true });
      }, 600);
    } catch (err) {
      setFeedback(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Show loading while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Checking session...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-md border">
        <h1 className="text-2xl font-semibold text-center">Login</h1>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm text-slate-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border px-3 py-2 outline-none focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-slate-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border px-3 py-2 outline-none focus:border-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading || !email || !password}
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-500 disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Continue"}
          </button>
        </form>

        {feedback && (
          <p className="mt-4 text-sm text-center text-slate-700">{feedback}</p>
        )}

        <p className="mt-4 text-sm text-center text-slate-600">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
