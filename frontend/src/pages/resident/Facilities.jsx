import { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import API from '../../api/axios';

const FACILITIES = ['Clubhouse', 'Gym', 'Swimming Pool', 'Conference Room'];

export default function ResidentFacilities() {
  const [bookings, setBookings] = useState([]);
  const [form, setForm] = useState({ name: 'Clubhouse', date: '', startTime: '', endTime: '' });
  const [error, setError] = useState('');

  useEffect(() => { fetchBookings(); }, []);

  const fetchBookings = async () => {
    const { data } = await API.get('/facilities/my');
    setBookings(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await API.post('/facilities', form);
      setForm({ name: 'Clubhouse', date: '', startTime: '', endTime: '' });
      fetchBookings();
    } catch (err) {
      setError(err.response?.data?.message || 'Booking failed');
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">🏊 Facility Booking</h2>

        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Book a Facility</h3>
          {error && <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm mb-4">{error}</div>}
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Facility</label>
              <select value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                {FACILITIES.map(f => <option key={f}>{f}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input type="date" value={form.date} onChange={e => setForm({...form, date: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
              <input type="time" value={form.startTime} onChange={e => setForm({...form, startTime: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
              <input type="time" value={form.endTime} onChange={e => setForm({...form, endTime: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
            </div>
            <div className="col-span-2">
              <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-lg font-medium transition">
                Book Facility
              </button>
            </div>
          </form>
        </div>

        <div className="space-y-4">
          {bookings.map(b => (
            <div key={b._id} className="bg-white rounded-xl shadow-sm p-6 flex justify-between items-center">
              <div>
                <p className="font-semibold text-gray-800">{b.name}</p>
                <p className="text-sm text-gray-500">{b.date} • {b.startTime} - {b.endTime}</p>
              </div>
              <span className={`text-xs font-medium px-3 py-1 rounded-full ${
                b.status === 'Approved' ? 'bg-green-100 text-green-700' :
                b.status === 'Rejected' ? 'bg-red-100 text-red-700' :
                'bg-yellow-100 text-yellow-700'}`}>
                {b.status}
              </span>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}