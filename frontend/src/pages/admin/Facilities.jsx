import { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import API from '../../api/axios';

export default function AdminFacilities() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => { fetchBookings(); }, []);

  const fetchBookings = async () => {
    const { data } = await API.get('/facilities/all');
    setBookings(data);
  };

  const updateStatus = async (id, status) => {
    await API.put(`/facilities/${id}`, { status });
    fetchBookings();
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">🏊 Facility Bookings</h2>
        <div className="space-y-4">
          {bookings.length === 0 ? (
            <p className="text-gray-400">No bookings yet</p>
          ) : (
            bookings.map(b => (
              <div key={b._id} className="bg-white rounded-xl shadow-sm p-6 flex justify-between items-center">
                <div>
                  <p className="font-semibold text-gray-800">{b.name}</p>
                  <p className="text-sm text-gray-500">{b.date} • {b.startTime} - {b.endTime}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    By {b.bookedBy?.name} • Flat {b.bookedBy?.flatNumber}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs font-medium px-3 py-1 rounded-full ${
                    b.status === 'Approved' ? 'bg-green-100 text-green-700' :
                    b.status === 'Rejected' ? 'bg-red-100 text-red-700' :
                    'bg-yellow-100 text-yellow-700'}`}>
                    {b.status}
                  </span>
                  {b.status === 'Pending' && (
                    <div className="flex gap-2">
                      <button onClick={() => updateStatus(b._id, 'Approved')}
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 rounded-lg text-sm">
                        Approve
                      </button>
                      <button onClick={() => updateStatus(b._id, 'Rejected')}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-sm">
                        Reject
                      </button>
                    </div>
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