import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import ResidentDashboard from './pages/resident/Dashboard';
import ResidentComplaints from './pages/resident/Complaints';
import ResidentFacilities from './pages/resident/Facilities';
import ResidentVisitors from './pages/resident/Visitors';
import ResidentMaintenance from './pages/resident/Maintenance';
import AdminDashboard from './pages/admin/Dashboard';
import AdminResidents from './pages/admin/Residents';
import AdminComplaints from './pages/admin/Complaints';
import AdminExpenses from './pages/admin/Expenses';
import GuardDashboard from './pages/guard/Dashboard';
import AdminFacilities from './pages/admin/Facilities';

const ProtectedRoute = ({ children, roles }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/login" />;
  return children;
};

function App() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Resident Routes */}
      <Route path="/resident/dashboard" element={<ProtectedRoute roles={['resident']}><ResidentDashboard /></ProtectedRoute>} />
      <Route path="/resident/complaints" element={<ProtectedRoute roles={['resident']}><ResidentComplaints /></ProtectedRoute>} />
      <Route path="/resident/facilities" element={<ProtectedRoute roles={['resident']}><ResidentFacilities /></ProtectedRoute>} />
      <Route path="/resident/visitors" element={<ProtectedRoute roles={['resident']}><ResidentVisitors /></ProtectedRoute>} />
      <Route path="/resident/maintenance" element={<ProtectedRoute roles={['resident']}><ResidentMaintenance /></ProtectedRoute>} />

      {/* Admin Routes */}
      <Route path="/admin/dashboard" element={<ProtectedRoute roles={['admin']}><AdminDashboard /></ProtectedRoute>} />
      <Route path="/admin/residents" element={<ProtectedRoute roles={['admin']}><AdminResidents /></ProtectedRoute>} />
      <Route path="/admin/complaints" element={<ProtectedRoute roles={['admin']}><AdminComplaints /></ProtectedRoute>} />
      <Route path="/admin/expenses" element={<ProtectedRoute roles={['admin']}><AdminExpenses /></ProtectedRoute>} />
      <Route path="/admin/facilities" element={<ProtectedRoute roles={['admin']}><AdminFacilities /></ProtectedRoute>} />
      
      {/* Guard Routes */}
      <Route path="/guard/dashboard" element={<ProtectedRoute roles={['guard']}><GuardDashboard /></ProtectedRoute>} />

      {/* Default redirect */}
      <Route path="/" element={
        user ? (
          user.role === 'admin' ? <Navigate to="/admin/dashboard" /> :
          user.role === 'guard' ? <Navigate to="/guard/dashboard" /> :
          <Navigate to="/resident/dashboard" />
        ) : <Navigate to="/login" />
      } />
    </Routes>
  );
}

export default App;