import { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import API from '../../api/axios';

const STATUS_COLORS = {
  Pending: 'bg-yellow-100 text-yellow-700',
  Paid: 'bg-green-100 text-green-700',
  Overdue: 'bg-red-100 text-red-700',
};

export default function ResidentMaintenance() {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => { fetchBills(); }, []);

  const fetchBills = async () => {
    const { data } = await API.get('/maintenance/my');
    setBills(data);
  };

  const handlePay = async (id) => {
    setLoading(true);
    try {
      await API.put(`/maintenance/pay/${id}`);
      fetchBills();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">💰 Maintenance Bills</h2>
        <div className="space-y-4">
          {bills.length === 0 ? (
            <p className="text-gray-400">No bills yet</p>
          ) : (
            bills.map(b => (
              <div key={b._id} className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-gray-800 text-lg">{b.month} {b.year}</h3>
                    <div className="flex gap-4 mt-2 text-sm text-gray-500">
                      <span>Maintenance: ₹{b.breakdown.maintenance}</span>
                      <span>Water: ₹{b.breakdown.water}</span>
                      <span>Parking: ₹{b.breakdown.parking}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-800">₹{b.totalAmount}</p>
                    <span className={`text-xs font-medium px-3 py-1 rounded-full ${STATUS_COLORS[b.status]}`}>
                      {b.status}
                    </span>
                    {b.status === 'Pending' && (
                      <button
                        onClick={() => handlePay(b._id)}
                        disabled={loading}
                        className="block mt-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-1.5 rounded-lg text-sm transition"
                      >
                        Pay Now
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}