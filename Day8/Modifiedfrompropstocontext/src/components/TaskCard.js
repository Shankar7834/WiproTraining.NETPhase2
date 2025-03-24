// TaskCard.js
import React, { useContext } from 'react';
import { TaskContext } from './TaskContext';

export default function TaskCard({ task }) {
    const { deleteTask } = useContext(TaskContext);

    return (
        <li key={task.id} className={task.completed ? "completed" : "incomplete"}>
            <span>{task.id} -- {task.name}</span>
            <button className='delete' onClick={() => deleteTask(task.id)}>Delete</button>
        </li>
    );
}
