import Navbar from '../components/Navbar';
import StudentList from '../components/StudentList';

export default function CounselorDashboard() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="max-w-6xl mx-auto p-6">
        <h1 className="text-2xl font-bold text-slate-800">Counselor Dashboard</h1>
        <p className="text-slate-500 text-sm mb-6">Prioritized student queue with allocation suggestions.</p>
        <StudentList />
      </main>
    </div>  );
}
