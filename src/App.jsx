import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

import Landing from './pages/Landing';
import StudentLogin from './pages/StudentLogin';
import StudentSignup from './pages/StudentSignup';
import CounselorLogin from './pages/CounselorLogin';
import CounselorSignup from './pages/CounselorSignup';
import StudentDashboard from './pages/StudentDashboard';
import CounselorDashboard from './pages/CounselorDashboard';

function Protected({ children, requiredRole }) {
  const { user, role } = useAuth();
  if (!user) return <Navigate to="/" replace />;
  if (role !== requiredRole) return <Navigate to="/" replace />;
  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/student/login" element={<StudentLogin />} />
        <Route path="/student/signup" element={<StudentSignup />} />
        <Route path="/student" element={<Protected requiredRole="student"><StudentDashboard /></Protected>} />
        <Route path="/counselor/login" element={<CounselorLogin />} />
        <Route path="/counselor/signup" element={<CounselorSignup />} />
        <Route path="/counselor" element={<Protected requiredRole="counselor"><CounselorDashboard /></Protected>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
