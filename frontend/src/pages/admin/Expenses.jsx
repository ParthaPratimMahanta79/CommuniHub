import { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import API from '../../api/axios';

const CATEGORIES = ['Lift Maintenance', 'Garden', 'Security Staff', 'Cleaning', 'Electricity', 'Other'];

export default function AdminExpenses() {
  const [expenses, setExpenses] = useState([]);
  const [form, setForm] = useState({ category: 'Security Staff', description: '', amount: '' });

  useEffect(() => { fetchExpenses(); }, []);

  const fetchExpenses = async () => {
    const { data } = await API.get('/expenses');
    setExpenses(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post('/expenses', form);
    setForm({ category: 'Security Staff', description: '', amount: '' });
    fetchExpenses();
  };

  const handleDelete = async (id) => {
    await API.delete(`/expenses/${id}`);
    fetchExpenses();
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">💰 Expense Tracker</h2>

        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Add Expense</h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select value={form.category} onChange={e => setForm({...form, category: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                {CATEGORIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <input value={form.description} onChange={e => setForm({...form, description: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Description" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Amount (₹)</label>
              <input type="number" value={form.amount} onChange={e => setForm({...form, amount: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="5000" required />
            </div>
            <div className="col-span-3">
              <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-lg font-medium transition">
                Add Expense
              </button>
            </div>
          </form>
        </div>

        <div className="space-y-3">
          {expenses.map(e => (
            <div key={e._id} className="bg-white rounded-xl shadow-sm p-5 flex justify-between items-center">
              <div>
                <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded">{e.category}</span>
                <p className="font-medium text-gray-800 mt-1">{e.description}</p>
                <p className="text-xs text-gray-400">{new Date(e.date).toLocaleDateString()}</p>
              </div>
              <div className="flex items-center gap-4">
                <p className="font-bold text-gray-800 text-lg">₹{e.amount}</p>
                <button onClick={() => handleDelete(e._id)} className="text-red-500 hover:text-red-700 text-sm">🗑️</button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}