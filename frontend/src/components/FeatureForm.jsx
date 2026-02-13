import { useState } from 'react';

export default function FeatureForm({ onSubmit, loading }) {
  const [formData, setFormData] = useState({
    goal: '',
    users: '',
    constraints: '',
    type: 'Web',
    risks: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Goal</label>
        <input
          type="text"
          name="goal"
          value={formData.goal}
          onChange={handleChange}
          placeholder="What do you want to build?"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Target Users</label>
        <input
          type="text"
          name="users"
          value={formData.users}
          onChange={handleChange}
          placeholder="Who will use this?"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Constraints</label>
        <input
          type="text"
          name="constraints"
          value={formData.constraints}
          onChange={handleChange}
          placeholder="Any limitations or requirements?"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Project Type</label>
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="Web">Web</option>
          <option value="Mobile">Mobile</option>
          <option value="Internal Tool">Internal Tool</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Risks / Unknowns (Optional)</label>
        <input
          type="text"
          name="risks"
          value={formData.risks}
          onChange={handleChange}
          placeholder="Any potential risks?"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 transition"
      >
        {loading ? 'Generating...' : 'Generate Spec'}
      </button>
    </form>
  );
}
