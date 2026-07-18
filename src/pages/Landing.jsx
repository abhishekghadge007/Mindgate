import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="max-w-3xl w-full text-center">
        <h1 className="text-5xl font-bold text-slate-800">MINDGATE</h1>
        <p className="mt-3 text-slate-500">Mental Health Triage & Resource Allocation Engine</p>
        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
            <h2 className="text-xl font-semibold text-slate-800">I'm a Student</h2>
            <p className="text-sm text-slate-500 mt-2">Take an assessment and get support.</p>
            <div className="mt-6 flex gap-3 justify-center">
              <Link to="/student/login" className="px-4 py-2 rounded-lg bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700">Login</Link>
              <Link to="/student/signup" className="px-4 py-2 rounded-lg border border-slate-200 text-slate-700 text-sm font-medium hover:bg-slate-50">Sign up</Link>
            </div>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
            <h2 className="text-xl font-semibold text-slate-800">I'm a Counselor</h2>
            <p className="text-sm text-slate-500 mt-2">Review the queue and allocate slots.</p>
            <div className="mt-6 flex gap-3 justify-center">
              <Link to="/counselor/login" className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700">Login</Link>
              <Link to="/counselor/signup" className="px-4 py-2 rounded-lg border border-slate-200 text-slate-700 text-sm font-medium hover:bg-slate-50">Sign up</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
