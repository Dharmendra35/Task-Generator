import { Draggable } from 'react-beautiful-dnd';

export default function TaskItem({ task, index, onDelete, onEdit }) {
  const categoryColors = {
    Frontend: 'bg-blue-100 text-blue-800',
    Backend: 'bg-green-100 text-green-800',
    Database: 'bg-purple-100 text-purple-800'
  };

  return (
    <Draggable draggableId={`task-${task._id || index}`} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`p-4 bg-white border border-gray-200 rounded-lg mb-2 ${
            snapshot.isDragging ? 'shadow-lg bg-gray-50' : ''
          }`}
        >
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <p className="font-medium text-gray-800">{task.title}</p>
              <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium ${categoryColors[task.category]}`}>
                {task.category}
              </span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => onEdit(task, index)}
                className="text-blue-500 hover:text-blue-700 font-bold"
                title="Edit task"
              >
                ✎
              </button>
              <button
                onClick={() => onDelete(index)}
                className="text-red-500 hover:text-red-700 font-bold"
                title="Delete task"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
}
