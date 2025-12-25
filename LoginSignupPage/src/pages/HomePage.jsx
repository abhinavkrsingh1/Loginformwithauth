import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex items-center justify-center px-4">
      <div className="w-full max-w-xl rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-semibold">Welcome</h1>
        <p className="mt-2 text-sm text-slate-600">Choose how you want to continue.</p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link
            to="/login"
            className="flex-1 rounded-lg bg-blue-600 px-4 py-3 text-center font-semibold text-white transition hover:bg-blue-500"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="flex-1 rounded-lg border border-slate-200 px-4 py-3 text-center font-semibold text-slate-700 transition hover:border-slate-300"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
