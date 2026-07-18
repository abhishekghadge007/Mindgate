import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AuthShell, Field } from './StudentLogin';

export default function CounselorSignup() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setErr(''); setBusy(true);
    try { await signup(email, password, name, 'counselor'); navigate('/counselor'); }
    catch (error) { setErr(error.message.replace('Firebase: ', '')); }
    finally { setBusy(false); }
  }

  return (
    <AuthShell title="Counselor Sign Up" accentClass="text-indigo-700">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Field label="Full name" type="text" value={name} onChange={setName} />
        <Field label="Email" type="email" value={email} onChange={setEmail} />
        <Field label="Password (min 6 chars)" type="password" value={password} onChange={setPassword} />
        {err && <p className="text-sm text-red-600">{err}</p>}
        <button disabled={busy} className="w-full py-2.5 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 disabled:opacity-60">
          {busy ? 'Creating...' : 'Create Account'}
        </button>
        <p className="text-sm text-slate-500 text-center">
          Already have an account? <Link to="/counselor/login" className="text-indigo-700 font-medium">Login</Link>
        </p>
      </form>
    </AuthShell>
  );
}
