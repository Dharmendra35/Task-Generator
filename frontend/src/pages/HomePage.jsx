import { useState, useEffect } from 'react';
import FeatureForm from '../components/FeatureForm';
import RecentSpecsList from '../components/RecentSpecsList';
import { generateSpec, getRecentSpecs } from '../services/api';

export default function HomePage({ user, onLogout, onSpecGenerated }) {
  const [loading, setLoading] = useState(false);
  const [recentSpecs, setRecentSpecs] = useState([]);

  useEffect(() => {
    fetchRecentSpecs();
  }, []);

  const fetchRecentSpecs = async () => {
    try {
      const specs = await getRecentSpecs();
      setRecentSpecs(specs);
    } catch (error) {
      console.error('Failed to fetch recent specs:', error);
    }
  };

  const handleFormSubmit = async (formData) => {
    setLoading(true);
    try {
      const spec = await generateSpec(formData);
      onSpecGenerated(spec);
      fetchRecentSpecs();
    } catch (error) {
      alert('Failed to generate spec');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectSpec = (spec) => {
    onSpecGenerated(spec);
  };

  const handleDeleteSpec = (id) => {
    setRecentSpecs(recentSpecs.filter(s => s._id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800">Task Generator</h1>
            <p className="text-gray-600">Generate user stories and tasks for your project</p>
          </div>
          <div className="text-right">
            <p className="text-gray-700 font-medium">Welcome, {user.name}</p>
            <button
              onClick={onLogout}
              className="mt-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <FeatureForm onSubmit={handleFormSubmit} loading={loading} />
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Specs</h2>
            <RecentSpecsList
              specs={recentSpecs}
              onDelete={handleDeleteSpec}
              onSelect={handleSelectSpec}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
