import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import TaskItem from './TaskItem';

export default function TaskList({ tasks, onReorder, onDelete, onEdit }) {
  const handleDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;
    if (source.index === destination.index) return;

    onReorder(source.index, destination.index);
  };

  const groupedTasks = {
    Frontend: tasks.filter(t => t.category === 'Frontend'),
    Backend: tasks.filter(t => t.category === 'Backend'),
    Database: tasks.filter(t => t.category === 'Database')
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="space-y-6">
        {Object.entries(groupedTasks).map(([category, categoryTasks]) => (
          <div key={category}>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">{category}</h3>
            <Droppable droppableId={category}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`p-4 rounded-lg ${snapshot.isDraggingOver ? 'bg-blue-50' : 'bg-gray-50'}`}
                >
                  {categoryTasks.length > 0 ? (
                    categoryTasks.map((task, index) => (
                      <TaskItem
                        key={task._id || index}
                        task={task}
                        index={tasks.indexOf(task)}
                        onDelete={onDelete}
                        onEdit={onEdit}
                      />
                    ))
                  ) : (
                    <p className="text-gray-400 text-sm">No tasks in this category</p>
                  )}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </div>
    </DragDropContext>
  );
}
