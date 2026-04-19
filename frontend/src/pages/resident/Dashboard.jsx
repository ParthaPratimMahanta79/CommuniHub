import { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import API from '../../api/axios';
import { useAuth } from '../../context/AuthContext';

export default function ResidentDashboard() {
  const { user } = useAuth();
  const [bills, setBills] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    API.get('/maintenance/my').then(r => setBills(r.data));
    API.get('/complaints/my').then(r => setComplaints(r.data));
    API.get('/notices').then(r => setNotices(r.data));
  }, []);

  const pendingBills = bills.filter(b => b.status === 'Pending');
  const openComplaints = complaints.filter(c => c.status !== 'Resolved');

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Welcome back, {user?.name} 👋
        </h2>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-indigo-500">
            <p className="text-sm text-gray-500">Pending Bills</p>
            <p className="text-3xl font-bold text-indigo-600 mt-1">{pendingBills.length}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-yellow-500">
            <p className="text-sm text-gray-500">Open Complaints</p>
            <p className="text-3xl font-bold text-yellow-600 mt-1">{openComplaints.length}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-green-500">
            <p className="text-sm text-gray-500">Notices</p>
            <p className="text-3xl font-bold text-green-600 mt-1">{notices.length}</p>
          </div>
        </div>

        {/* Notices */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">📢 Latest Notices</h3>
          {notices.length === 0 ? (
            <p className="text-gray-400 text-sm">No notices yet</p>
          ) : (
            <div className="space-y-3">
              {notices.slice(0, 3).map(n => (
                <div key={n._id} className="border-l-4 border-indigo-400 pl-4 py-2">
                  <p className="font-medium text-gray-800">{n.title}</p>
                  <p className="text-sm text-gray-500">{n.content}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    By {n.postedBy?.name} • {new Date(n.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Pending Bills */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">💰 Pending Bills</h3>
          {pendingBills.length === 0 ? (
            <p className="text-gray-400 text-sm">No pending bills 🎉</p>
          ) : (
            <div className="space-y-3">
              {pendingBills.map(b => (
                <div key={b._id} className="flex justify-between items-center p-4 bg-red-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-800">{b.month} {b.year}</p>
                    <p className="text-sm text-gray-500">Maintenance + Water + Parking</p>
                  </div>
                  <p className="font-bold text-red-600 text-lg">₹{b.totalAmount}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}