import { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import API from '../../api/axios';

const STATUS_COLORS = {
  Raised: 'bg-red-100 text-red-700',
  Assigned: 'bg-yellow-100 text-yellow-700',
  'In Progress': 'bg-blue-100 text-blue-700',
  Resolved: 'bg-green-100 text-green-700',
};

const CATEGORIES = ['Plumbing', 'Electrical', 'Cleanliness', 'Security', 'Noise', 'Other'];

export default function ResidentComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [form, setForm] = useState({ description: '', category: 'Plumbing' });
  const [aiSuggestion, setAiSuggestion] = useState(null);
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    const { data } = await API.get('/complaints/my');
    setComplaints(data);
  };

  const handleAiCategorise = async () => {
    if (!form.description) return;
    setAiLoading(true);
    try {
      const { data } = await API.post('/ai/categorise', { description: form.description });
      setAiSuggestion(data);
      setForm(f => ({ ...f, category: data.category }));
    } catch (err) {
      console.error(err);
    } finally {
      setAiLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post('/complaints', form);
      setForm({ description: '', category: 'Plumbing' });
      setAiSuggestion(null);
      fetchComplaints();
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
        <h2 className="text-2xl font-bold text-gray-800 mb-6">📋 My Complaints</h2>

        {/* Raise Complaint Form */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Raise a New Complaint</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={form.description}
                onChange={e => setForm({...form, description: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                rows={3}
                placeholder="Describe your complaint in plain English..."
                required
              />
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleAiCategorise}
                disabled={aiLoading || !form.description}
                className="bg-purple-100 hover:bg-purple-200 text-purple-700 px-4 py-2 rounded-lg text-sm font-medium transition disabled:opacity-50"
              >
                {aiLoading ? 'Analysing...' : '🤖 AI Categorise'}
              </button>
            </div>

            {aiSuggestion && (
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <p className="text-sm font-medium text-purple-700">🤖 AI Suggestion</p>
                <p className="text-sm text-gray-600 mt-1">Category: <strong>{aiSuggestion.category}</strong> • Priority: <strong>{aiSuggestion.priority}</strong></p>
                <p className="text-sm text-gray-500">{aiSuggestion.summary}</p>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                value={form.category}
                onChange={e => setForm({...form, category: e.target.value})}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {CATEGORIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-lg font-medium transition disabled:opacity-50"
            >
              {loading ? 'Submitting...' : 'Submit Complaint'}
            </button>
          </form>
        </div>

        {/* Complaints List */}
        <div className="space-y-4">
          {complaints.length === 0 ? (
            <p className="text-gray-400">No complaints raised yet</p>
          ) : (
            complaints.map(c => (
              <div key={c._id} className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xs font-medium bg-indigo-100 text-indigo-700 px-2 py-1 rounded">{c.category}</span>
                    <p className="text-gray-800 mt-2">{c.description}</p>
                    <p className="text-xs text-gray-400 mt-1">{new Date(c.createdAt).toLocaleDateString()}</p>
                  </div>
                  <span className={`text-xs font-medium px-3 py-1 rounded-full ${STATUS_COLORS[c.status]}`}>
                    {c.status}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}