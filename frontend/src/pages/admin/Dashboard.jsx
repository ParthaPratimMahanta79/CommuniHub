import { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import API from '../../api/axios';

export default function AdminDashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [residents, setResidents] = useState([]);
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    API.get('/expenses/dashboard').then(r => setDashboard(r.data));
    API.get('/residents').then(r => setResidents(r.data));
    API.get('/complaints/all').then(r => setComplaints(r.data));
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">🏠 Admin Dashboard</h2>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-indigo-500">
            <p className="text-sm text-gray-500">Total Residents</p>
            <p className="text-3xl font-bold text-indigo-600 mt-1">{residents.length}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-yellow-500">
            <p className="text-sm text-gray-500">Open Complaints</p>
            <p className="text-3xl font-bold text-yellow-600 mt-1">
              {complaints.filter(c => c.status !== 'Resolved').length}
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-green-500">
            <p className="text-sm text-gray-500">Total Income</p>
            <p className="text-3xl font-bold text-green-600 mt-1">₹{dashboard?.totalIncome || 0}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-red-500">
            <p className="text-sm text-gray-500">Total Expenses</p>
            <p className="text-3xl font-bold text-red-600 mt-1">₹{dashboard?.totalExpense || 0}</p>
          </div>
        </div>

        {/* Balance */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">💰 Society Balance</h3>
          <p className={`text-4xl font-bold ${dashboard?.balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            ₹{dashboard?.balance || 0}
          </p>
        </div>

        {/* Recent Complaints */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">📋 Recent Complaints</h3>
          <div className="space-y-3">
            {complaints.slice(0, 5).map(c => (
              <div key={c._id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-800">{c.description}</p>
                  <p className="text-xs text-gray-500">{c.resident?.name} • Flat {c.resident?.flatNumber} • {c.category}</p>
                </div>
                <span className={`text-xs font-medium px-3 py-1 rounded-full ${
                  c.status === 'Resolved' ? 'bg-green-100 text-green-700' :
                  c.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                  'bg-red-100 text-red-700'}`}>
                  {c.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}