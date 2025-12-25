import { useState } from 'react';

const API = import.meta.env.API || 'http://localhost:8500';

function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setFeedback('');
    setLoading(true);

    try {
      const res = await fetch(`${API}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Signup failed');
      }
      setFeedback(data.message || 'Signup success');
    } catch (err) {
      setFeedback(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-8 shadow-xl backdrop-blur">
        <h1 className="text-2xl font-semibold">Sign up</h1>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="space-y-2">
            <label className="text-sm text-blue-100/90" htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-white outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-blue-100/90" htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-white outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-blue-100/90" htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-white outline-none focus:border-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            disabled={!name || !email || !password || loading}
            className="w-full rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-500 disabled:opacity-60 disabled:hover:bg-blue-600"
          >
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignupPage;
