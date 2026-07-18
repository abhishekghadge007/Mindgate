import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AuthShell, Field } from './StudentLogin';

export default function CounselorLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setErr(''); setBusy(true);
    try { await login(email, password, 'counselor'); navigate('/counselor'); }
    catch (error) { setErr(error.message.replace('Firebase: ', '')); }
    finally { setBusy(false); }
  }

  return (
    <AuthShell title="Counselor Login" accentClass="text-indigo-700">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Field label="Email" type="email" value={email} onChange={setEmail} />
        <Field label="Password" type="password" value={password} onChange={setPassword} />
        {err && <p className="text-sm text-red-600">{err}</p>}
        <button disabled={busy} className="w-full py-2.5 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 disabled:opacity-60">
          {busy ? 'Signing in...' : 'Sign In'}
        </button>
        <p className="text-sm text-slate-500 text-center">
          New here? <Link to="/counselor/signup" className="text-indigo-700 font-medium">Create an account</Link>
        </p>
      </form>
    </AuthShell>
  );
}
