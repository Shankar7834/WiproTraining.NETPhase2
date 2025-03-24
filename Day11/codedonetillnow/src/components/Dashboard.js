import React  from 'react';
import { useTasks } from '../services/TaskService';
import { useCategories } from '../services/CategoryService';
import TaskInput from './TaskInput';
import TaskList from './TaskList';
import CategoryList from './CategoryList';
import { useState } from 'react';

const Dashboard = () => {
  const { tasks } = useTasks();
  const { categories } = useCategories();
  const [editingTask, setEditingTask] = useState(null);
  
  const handleEdit=(task)=>
  {
    setEditingTask(task);
  }

  return (
    <div>

      <h1>To-Do List Dashboard</h1>
      <div>
        <CategoryList   />
      </div>
      <div>
        <TaskInput existingTask={editingTask} />
      </div>
      <div>
        <h2>Task List</h2>
        {tasks.length > 0 ? (
          <TaskList onEdit={handleEdit} />
        ) : (
          <p>No tasks available. Add a task to get started!</p>
        )}
      </div>
    </div>

  );
};

export default Dashboard;
