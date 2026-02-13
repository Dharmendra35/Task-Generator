import { deleteSpec } from '../services/api';

export default function RecentSpecsList({ specs, onDelete, onSelect }) {
  const handleDelete = async (id) => {
    if (window.confirm('Delete this spec?')) {
      try {
        await deleteSpec(id);
        onDelete(id);
      } catch (error) {
        alert('Failed to delete spec');
      }
    }
  };

  return (
    <div className="space-y-3">
      {specs.length === 0 ? (
        <p className="text-gray-500 text-center py-4">No recent specs yet</p>
      ) : (
        specs.map(spec => (
          <div key={spec._id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition">
            <div className="flex justify-between items-start">
              <div className="flex-1 cursor-pointer" onClick={() => onSelect(spec)}>
                <h4 className="font-semibold text-gray-800">{spec.goal}</h4>
                <p className="text-sm text-gray-600">{spec.type} • {new Date(spec.createdAt).toLocaleDateString()}</p>
              </div>
              <button
                onClick={() => handleDelete(spec._id)}
                className="text-red-500 hover:text-red-700 font-bold"
              >
                ✕
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
