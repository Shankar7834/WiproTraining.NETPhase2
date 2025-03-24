// TaskList.js
import { useState, useContext } from 'react';
import TaskCard from './TaskCard';
import { TaskContext } from './TaskContext';

export const TaskList = () => {
    const [show, setShow] = useState(true);
    const { tasks } = useContext(TaskContext);

    return (
        <section className='tasklist'>
            <ul>
                <div className='header'>
                    <h1>Task List</h1>
                    <button className='trigger' onClick={() => setShow(!show)}>
                        {show ? "Hide Tasks" : "Show Tasks"}
                    </button>
                </div>
                {show && tasks.map((task) => (
                    <TaskCard key={task.id} task={task} />
                ))}
            </ul>
        </section>
    );
};

export default TaskList;
