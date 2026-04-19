import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const residentLinks = [
  { path: '/resident/dashboard', label: '🏠 Dashboard' },
  { path: '/resident/maintenance', label: '💰 Maintenance' },
  { path: '/resident/complaints', label: '📋 Complaints' },
  { path: '/resident/facilities', label: '🏊 Facilities' },
  { path: '/resident/visitors', label: '👥 Visitors' },
];

const adminLinks = [
  { path: '/admin/dashboard', label: '🏠 Dashboard' },
  { path: '/admin/residents', label: '👥 Residents' },
  { path: '/admin/complaints', label: '📋 Complaints' },
  { path: '/admin/expenses', label: '💰 Expenses' },
];

const guardLinks = [
  { path: '/guard/dashboard', label: '🏠 Dashboard' },
];

export default function Sidebar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const links = user?.role === 'admin' ? adminLinks :
                user?.role === 'guard' ? guardLinks : residentLinks;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="w-64 min-h-screen bg-indigo-900 text-white flex flex-col">
      <div className="p-6 border-b border-indigo-700">
        <h1 className="text-xl font-bold">🏢 CommuniHub</h1>
        <p className="text-indigo-300 text-sm mt-1">{user?.society}</p>
      </div>

      <div className="p-4 border-b border-indigo-700">
        <p className="text-sm font-semibold">{user?.name}</p>
        <p className="text-indigo-300 text-xs capitalize">{user?.role} {user?.flatNumber ? `• ${user.flatNumber}` : ''}</p>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {links.map(link => (
          <Link
            key={link.path}
            to={link.path}
            className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition ${
              location.pathname === link.path
                ? 'bg-indigo-600 text-white'
                : 'text-indigo-200 hover:bg-indigo-700'
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="p-4">
        <button
          onClick={handleLogout}
          className="w-full bg-indigo-700 hover:bg-indigo-600 text-white py-2 rounded-lg text-sm transition"
        >
          🚪 Logout
        </button>
      </div>
    </div>
  );
}