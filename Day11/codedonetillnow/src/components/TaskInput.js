import React, { useState,useEffect } from 'react';
import { useTasks } from '../services/TaskService';
import { useCategories } from '../services/CategoryService';

const TaskInput = ({ existingTask, onEditComplete }) => {
    const { addTask, editTask } = useTasks();
    const { categories } = useCategories();

    const [title, setTitle] = useState(existingTask ? existingTask.title : '');
    const [description, setDescription] = useState(existingTask ? existingTask.description : '');
    const [dueDate, setDueDate] = useState(existingTask ? existingTask.dueDate : '');
    const [priority, setPriority] = useState(existingTask ? existingTask.priority : 'Medium');
  const [category, setCategory] = useState(existingTask ? existingTask.category : categories[0]?.name || '');
  

  useEffect(() => {
    if (existingTask) {
      setTitle(existingTask.title);
      setDescription(existingTask.description);
      setDueDate(existingTask.dueDate);
      setPriority(existingTask.priority);
      setCategory(existingTask.category);
    } else {
      setTitle("");
      setDescription("");
      setDueDate("");
      setPriority("Medium");
      setCategory(categories[0]?.name || "");
    }
  }, [existingTask, categories]);


    const handleSubmit = (e) => {
      e.preventDefault();
      const taskData = { title, description, dueDate, priority, category }

      if (existingTask) {
        editTask(existingTask.id, taskData);
        
      } else {
        addTask({ id: Date.now(), ...taskData, completed: false });
      }
      
    };

  return (
      
    <form onSubmit={handleSubmit}>
      
      <input type="text" placeholder='Task Title' value={title} onChange={(e) => setTitle(e.target.value)} required />
      <input type="text" placeholder='Task Description' value={description} onChange={(e) => setDescription(e.target.value)}  />
      <input type="date" placeholder='Due Date' value={dueDate} onChange={(e) => setDueDate(e.target.value)}  required/>
      <label>Priority</label>
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
      <label>category</label>
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
       
      </select>

      <button type="submit">
        {existingTask ? "Edit Task" : "Add Task"}
      </button>
   </form>

  )
};

export default TaskInput;
