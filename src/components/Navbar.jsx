import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, role, logout } = useAuth();
  const navigate = useNavigate();
  async function handleLogout() { await logout(); navigate('/'); }

  return (
    <header className="bg-white border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-slate-800">MINDGATE</h1>
          <p className="text-xs text-slate-400 capitalize">{role} portal</p>
        </div>
        {user && (
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-600">{user.email}</span>
            <button onClick={handleLogout} className="px-3 py-1.5 rounded-lg border border-slate-200 text-sm text-slate-700 hover:bg-slate-50">
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
