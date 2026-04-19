import { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import API from '../../api/axios';

export default function ResidentVisitors() {
  const [visitors, setVisitors] = useState([]);
  const [form, setForm] = useState({ visitorName: '', visitorPhone: '', vehicleNumber: '', expectedArrival: '' });
  const [newVisitor, setNewVisitor] = useState(null);

  useEffect(() => { fetchVisitors(); }, []);

  const fetchVisitors = async () => {
    const { data } = await API.get('/visitors/my');
    setVisitors(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post('/visitors/preapprove', form);
      setNewVisitor(data);
      setForm({ visitorName: '', visitorPhone: '', vehicleNumber: '', expectedArrival: '' });
      fetchVisitors();
    } catch (err) { console.error(err); }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">👥 Visitor Management</h2>

        {newVisitor && (
          <div className="bg-green-50 border border-green-300 rounded-xl p-6 mb-6">
            <p className="text-green-700 font-semibold text-lg">✅ Visitor Pre-Approved!</p>
            <p className="text-gray-600 mt-1">Share this OTP with your visitor:</p>
            <p className="text-4xl font-bold text-green-600 mt-2 tracking-widest">{newVisitor.visitor.otp}</p>
            <button onClick={() => setNewVisitor(null)} className="mt-3 text-sm text-gray-500 underline">Dismiss</button>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Pre-Approve a Visitor</h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Visitor Name</label>
              <input value={form.visitorName} onChange={e => setForm({...form, visitorName: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="John Doe" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input value={form.visitorPhone} onChange={e => setForm({...form, visitorPhone: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="9999999999" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Number</label>
              <input value={form.vehicleNumber} onChange={e => setForm({...form, vehicleNumber: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="AS01AB1234" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Expected Arrival</label>
              <input type="datetime-local" value={form.expectedArrival} onChange={e => setForm({...form, expectedArrival: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div className="col-span-2">
              <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-lg font-medium transition">
                Generate OTP
              </button>
            </div>
          </form>
        </div>

        <div className="space-y-4">
          {visitors.map(v => (
            <div key={v._id} className="bg-white rounded-xl shadow-sm p-6 flex justify-between items-center">
              <div>
                <p className="font-semibold text-gray-800">{v.visitorName}</p>
                <p className="text-sm text-gray-500">{v.visitorPhone} • {v.vehicleNumber}</p>
                <p className="text-xs text-gray-400 mt-1">{new Date(v.createdAt).toLocaleDateString()}</p>
              </div>
              <div className="text-right">
                <span className={`text-xs font-medium px-3 py-1 rounded-full ${
                  v.status === 'Entered' ? 'bg-blue-100 text-blue-700' :
                  v.status === 'Exited' ? 'bg-gray-100 text-gray-700' :
                  'bg-green-100 text-green-700'}`}>
                  {v.status}
                </span>
                {!v.otpVerified && <p className="text-xs text-gray-400 mt-1">OTP: {v.otp}</p>}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}