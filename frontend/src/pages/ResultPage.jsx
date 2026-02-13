import { useState } from 'react';
import TaskList from '../components/TaskList';
import ExportButtons from '../components/ExportButtons';
import EditTaskModal from '../components/EditTaskModal';
import { updateSpec } from '../services/api';

export default function ResultPage({ spec, onBack }) {
  const [tasks, setTasks] = useState(spec.tasks);
  const [editingTask, setEditingTask] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [saving, setSaving] = useState(false);

  const handleReorder = async (sourceIndex, destinationIndex) => {
    const newTasks = Array.from(tasks);
    const [removed] = newTasks.splice(sourceIndex, 1);
    newTasks.splice(destinationIndex, 0, removed);
    
    // Update order field
    newTasks.forEach((task, index) => {
      task.order = index + 1;
    });
    
    setTasks(newTasks);
    await persistChanges(newTasks);
  };

  const handleDeleteTask = async (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
    await persistChanges(newTasks);
  };

  const handleEditTask = (task, index) => {
    setEditingTask(task);
    setEditIndex(index);
  };

  const handleSaveEdit = async (updatedTask) => {
    const newTasks = [...tasks];
    newTasks[editIndex] = updatedTask;
    setTasks(newTasks);
    setEditingTask(null);
    setEditIndex(null);
    await persistChanges(newTasks);
  };

  const persistChanges = async (updatedTasks) => {
    setSaving(true);
    try {
      await updateSpec(spec._id, { tasks: updatedTasks });
    } catch (error) {
      alert('Failed to save changes');
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={onBack}
          className="mb-6 text-blue-600 hover:text-blue-800 font-medium"
        >
          ← Back to Home
        </button>

        <div className="bg-white p-8 rounded-lg shadow-md mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{spec.goal}</h1>
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-6">
            <div><strong>Type:</strong> {spec.type}</div>
            <div><strong>Users:</strong> {spec.users}</div>
            <div><strong>Constraints:</strong> {spec.constraints}</div>
            {spec.risks && <div><strong>Risks:</strong> {spec.risks}</div>}
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">User Stories</h2>
            <ul className="space-y-2">
              {spec.userStories.map((story, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-blue-600 mr-3">•</span>
                  <span className="text-gray-700">{story}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Tasks</h2>
              {saving && <span className="text-sm text-gray-500">Saving...</span>}
            </div>
            <TaskList 
              tasks={tasks} 
              onReorder={handleReorder} 
              onDelete={handleDeleteTask}
              onEdit={handleEditTask}
            />
          </div>

          <ExportButtons spec={{ ...spec, tasks }} />
        </div>
      </div>

      {editingTask && (
        <EditTaskModal
          task={editingTask}
          onSave={handleSaveEdit}
          onCancel={() => {
            setEditingTask(null);
            setEditIndex(null);
          }}
        />
      )}
    </div>
  );
}
