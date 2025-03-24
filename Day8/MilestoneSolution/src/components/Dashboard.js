import React, { useState } from "react";
import { useTasks } from "../services/TaskService";
import CategoryList from "./CategoryList";
import TaskInput from "./TaskInput";
import TaskList from "./TaskList";

const Dashboard = () => {
  const { tasks } = useTasks();
  const [editingTask, setEditingTask] = useState(null);

  const handleEdit = (task) => {
    setEditingTask(task);
  };

  const handleEditComplete = () => {
    setEditingTask(null);
  };

  return (
    <div>
      <h1>To-Do List Dashboard</h1>

      {/* Categories */}
      <div>
        <h2>Categories</h2>
        <CategoryList />
      </div>

      {/* Task Form */}
      <div>
        <h2>{editingTask ? "Edit Task" : "Add a New Task"}</h2>
        <TaskInput existingTask={editingTask} onEditComplete={handleEditComplete} />
      </div>

      {/* Task List */}
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
