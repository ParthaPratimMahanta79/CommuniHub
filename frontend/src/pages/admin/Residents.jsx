import { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import API from '../../api/axios';

export default function AdminResidents() {
  const [residents, setResidents] = useState([]);

  useEffect(() => {
    API.get('/residents').then(r => setResidents(r.data));
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">👥 Residents</h2>
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Email</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Flat</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Phone</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {residents.map(r => (
                <tr key={r._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-800">{r.name}</td>
                  <td className="px-6 py-4 text-gray-500">{r.email}</td>
                  <td className="px-6 py-4 text-gray-500">{r.flatNumber || '—'}</td>
                  <td className="px-6 py-4 text-gray-500">{r.phone || '—'}</td>
                  <td className="px-6 py-4 text-gray-500">{new Date(r.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}