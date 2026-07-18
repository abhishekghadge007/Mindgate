import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AuthShell, Field } from './StudentLogin';

export default function StudentSignup() {
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
    try { await signup(email, password, name, 'student'); navigate('/student'); }
    catch (error) { setErr(error.message.replace('Firebase: ', '')); }
    finally { setBusy(false); }
  }

  return (
    <AuthShell title="Student Sign Up" accentClass="text-emerald-700">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Field label="Full name" type="text" value={name} onChange={setName} />
        <Field label="Email" type="email" value={email} onChange={setEmail} />
        <Field label="Password (min 6 chars)" type="password" value={password} onChange={setPassword} />
        {err && <p className="text-sm text-red-600">{err}</p>}
        <button disabled={busy} className="w-full py-2.5 rounded-lg bg-emerald-600 text-white font-medium hover:bg-emerald-700 disabled:opacity-60">
          {busy ? 'Creating...' : 'Create Account'}
        </button>
        <p className="text-sm text-slate-500 text-center">
          Already have an account? <Link to="/student/login" className="text-emerald-700 font-medium">Login</Link>
        </p>
      </form>
    </AuthShell>
  );
}
