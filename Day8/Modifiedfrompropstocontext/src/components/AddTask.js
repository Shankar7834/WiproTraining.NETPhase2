// AddTask.js
import React, { useState, useContext } from 'react';
import { TaskContext } from './TaskContext';

export const AddTask = () => {
    const [taskValue, setTaskValue] = useState("");
    const [progress, setProgress] = useState(false);

    const { addTask } = useContext(TaskContext);

    const handleChange = (event) => {
        setTaskValue(event.target.value);
    };

    const handleReset = () => {
        setTaskValue("");
    };

    const handleDropdown = (event) => {
        setProgress(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const task = {
            id: Math.floor(Math.random() * 10000),
            name: taskValue,
            completed: Boolean(progress),
        };
        addTask(task);
        handleReset();
    };

    return (
        <section className="addtask">
            <form onSubmit={handleSubmit}>
                <input type="text" onChange={handleChange} name="task" id="task" placeholder='Enter task name' autoComplete="off" value={taskValue} />
                <select onChange={handleDropdown} value={progress}>
                    <option value="false">Pending</option>
                    <option value="true">Completed</option>
                </select>
                <button type="submit" style={{ background: "blue" }}>Add Task</button><br />
                <button onClick={handleReset} className='reset' style={{ background: "blue", color: "white" }}>Reset</button>
            </form>
            <p>{taskValue}</p>
        </section>
    );
};
