import React, { useState } from "react";
import { useTasks } from "../services/TaskService";

const TaskList = ({ onEdit }) => {
  const { tasks, deleteTask, toggleTaskStatus } = useTasks();
  const [filter, setFilter] = useState("All");
  const [sortBy, setSortBy] = useState("dueDate");

  const filteredTasks =
    filter === "All" ? tasks : tasks.filter((task) => task.category === filter);

  const sortedTasks = [...filteredTasks].sort((a, b) =>
    a[sortBy] > b[sortBy] ? 1 : -1
  );

  return (
    <div>
      <h2>Task List</h2>

      <div>
        <label>Filter by Category:</label>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="All">All</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>

      <div>
        <label>Sort by:</label>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="dueDate">Due Date</option>
          <option value="priority">Priority</option>
          <option value="creationDate">Creation Date</option>
        </select>
      </div>

      <ul>
        {sortedTasks.map((task) => (
          <li key={task.id}>
            <strong>{task.title}</strong> - {task.description} - {task.category} -{" "}
            {task.dueDate} - {task.priority}
            <button onClick={() => toggleTaskStatus(task.id)}>
              {task.completed ? "Mark Incomplete" : "Mark Complete"}
            </button>
            <button onClick={() => onEdit(task)}>Edit Task</button>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
