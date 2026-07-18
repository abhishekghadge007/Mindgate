import Navbar from '../components/Navbar';
import AssessmentForm from '../components/AssessmentForm';

export default function StudentDashboard() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold text-slate-800">Student Assessment</h1>
        <p className="text-slate-500 text-sm mb-6">Complete the PHQ-9 and GAD-7 to get your risk evaluation.</p>
        <AssessmentForm />
      </main>
    </div>
  );
}
