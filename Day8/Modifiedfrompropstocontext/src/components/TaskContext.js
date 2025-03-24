// TaskContext.js
import { createContext, useState } from "react";

// Create a context
export const TaskContext = createContext();

// Provider component
export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([
        { id: 5271, name: "Record React Lectures", completed: true },
        { id: 7825, name: "Edit React Lectures", completed: false },
        { id: 8391, name: "Watch Lectures", completed: false },
    ]);

    // Function to add a new task
    const addTask = (task) => {
        setTasks([...tasks, task]);
    };

    // Function to delete a task
    const deleteTask = (id) => {
        setTasks(tasks.filter((task) => task.id !== id));
    };

    return (
        <TaskContext.Provider value={{ tasks, addTask, deleteTask }}>
            {children}
        </TaskContext.Provider>
    );
};
