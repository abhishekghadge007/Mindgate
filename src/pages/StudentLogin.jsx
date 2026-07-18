import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function AuthShell({ title, accentClass, children }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
        <Link to="/" className="text-xs text-slate-400 hover:text-slate-600">← Back</Link>
        <h1 className={`mt-2 text-2xl font-bold ${accentClass}`}>{title}</h1>
        <p className="text-sm text-slate-500 mb-6">Welcome to MINDGATE</p>
        {children}
      </div>
    </div>
  );
}

export function Field({ label, type, value, onChange }) {
  return (
    <div>
      <label className="block text-sm text-slate-600 mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
        className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-300"
      />
    </div>
  );
}

export default function StudentLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setErr(''); setBusy(true);
    try { await login(email, password, 'student'); navigate('/student'); }
    catch (error) { setErr(error.message.replace('Firebase: ', '')); }
    finally { setBusy(false); }
  }

  return (
    <AuthShell title="Student Login" accentClass="text-emerald-700">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Field label="Email" type="email" value={email} onChange={setEmail} />
        <Field label="Password" type="password" value={password} onChange={setPassword} />
        {err && <p className="text-sm text-red-600">{err}</p>}
        <button disabled={busy} className="w-full py-2.5 rounded-lg bg-emerald-600 text-white font-medium hover:bg-emerald-700 disabled:opacity-60">
          {busy ? 'Signing in...' : 'Sign In'}
        </button>
        <p className="text-sm text-slate-500 text-center">
          New here? <Link to="/student/signup" className="text-emerald-700 font-medium">Create an account</Link>
        </p>
      </form>
    </AuthShell>
  );
}
