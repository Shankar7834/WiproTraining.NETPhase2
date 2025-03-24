import React from 'react';
import { useTasks } from '../services/TaskService';
import { useCategories } from '../services/CategoryService';

const TaskList = ({ onEdit }) => {
  const { tasks, editTask, deleteTask, toggleTaskStatus } = useTasks();
  const { categories } = useCategories();

  return (

    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <strong>{task.title}</strong> - {task.description} - {task.category} -{" "}
          {task.dueDate} - {task.priority}

          <button onClick={() => onEdit(task)}>Edit Task</button>
          <button onClick={() => deleteTask(task.id)}>Delete</button>
        </li>
      ))}
    </ul>

  );
};

export default TaskList;
