import { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import API from '../../api/axios';

const STATUS_COLORS = {
  Raised: 'bg-red-100 text-red-700',
  Assigned: 'bg-yellow-100 text-yellow-700',
  'In Progress': 'bg-blue-100 text-blue-700',
  Resolved: 'bg-green-100 text-green-700',
};

export default function AdminComplaints() {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => { fetchComplaints(); }, []);

  const fetchComplaints = async () => {
    const { data } = await API.get('/complaints/all');
    setComplaints(data);
  };

  const updateStatus = async (id, status) => {
    await API.put(`/complaints/${id}`, { status });
    fetchComplaints();
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">📋 All Complaints</h2>
        <div className="space-y-4">
          {complaints.map(c => (
            <div key={c._id} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex gap-2 mb-2">
                    <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded">{c.category}</span>
                    <span className={`text-xs px-2 py-1 rounded ${STATUS_COLORS[c.status]}`}>{c.status}</span>
                  </div>
                  <p className="text-gray-800 font-medium">{c.description}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    By {c.resident?.name} • Flat {c.resident?.flatNumber} • {new Date(c.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <select
                  value={c.status}
                  onChange={e => updateStatus(c._id, e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option>Raised</option>
                  <option>Assigned</option>
                  <option>In Progress</option>
                  <option>Resolved</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}