import { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import API from '../../api/axios';

export default function GuardDashboard() {
  const [visitors, setVisitors] = useState([]);
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => { fetchVisitors(); }, []);

  const fetchVisitors = async () => {
    const { data } = await API.get('/visitors/today');
    setVisitors(data);
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setMessage(''); setError('');
    try {
      const { data } = await API.post('/visitors/verify-entry', { otp });
      setMessage(`✅ ${data.visitor.visitorName} entry logged!`);
      setOtp('');
      fetchVisitors();
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid OTP');
    }
  };

  const handleExit = async (id) => {
    await API.put(`/visitors/exit/${id}`);
    fetchVisitors();
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">🔐 Guard Dashboard</h2>

        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Verify Visitor OTP</h3>
          {message && <div className="bg-green-50 text-green-700 px-4 py-3 rounded-lg mb-4">{message}</div>}
          {error && <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg mb-4">{error}</div>}
          <form onSubmit={handleVerify} className="flex gap-4">
            <input
              value={otp}
              onChange={e => setOtp(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-2xl tracking-widest w-48"
              placeholder="OTP"
              maxLength={6}
              required
            />
            <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-lg font-medium transition">
              Verify & Log Entry
            </button>
          </form>
        </div>

        <h3 className="text-lg font-semibold text-gray-700 mb-4">Today's Visitors</h3>
        <div className="space-y-4">
          {visitors.length === 0 ? (
            <p className="text-gray-400">No visitors today</p>
          ) : (
            visitors.map(v => (
              <div key={v._id} className="bg-white rounded-xl shadow-sm p-6 flex justify-between items-center">
                <div>
                  <p className="font-semibold text-gray-800">{v.visitorName}</p>
                  <p className="text-sm text-gray-500">{v.visitorPhone} • {v.vehicleNumber}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    Visiting: {v.resident?.name} (Flat {v.resident?.flatNumber})
                  </p>
                  {v.entryTime && <p className="text-xs text-green-600">Entry: {new Date(v.entryTime).toLocaleTimeString()}</p>}
                  {v.exitTime && <p className="text-xs text-gray-500">Exit: {new Date(v.exitTime).toLocaleTimeString()}</p>}
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className={`text-xs font-medium px-3 py-1 rounded-full ${
                    v.status === 'Entered' ? 'bg-blue-100 text-blue-700' :
                    v.status === 'Exited' ? 'bg-gray-100 text-gray-700' :
                    'bg-green-100 text-green-700'}`}>
                    {v.status}
                  </span>
                  {v.status === 'Entered' && (
                    <button onClick={() => handleExit(v._id)}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1 rounded-lg text-xs transition">
                      Log Exit
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}