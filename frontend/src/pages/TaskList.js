const TaskList = ({ tasks }) => {
    return (
      <div className="p-6">
        {tasks.length === 0 ? (
          <div className="text-center text-gray-500 text-lg font-medium">
            No tasks available. Start by adding a new task!
          </div>
        ) : (
          <ul className="space-y-3">
            {tasks.map((task) => (
              <li key={task.id} className="p-4 bg-white shadow-md rounded-md">
                {task.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };
  
export default TaskList;