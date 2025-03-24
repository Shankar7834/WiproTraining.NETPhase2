import React from 'react'

import { useState } from 'react';

export const AddTask = ({ tasks, setTasks }) => {

    const [taskValue, setTaskValue] = useState("");
    const [progress, setProgress] = useState(false);

    const handleChange = (event) => {

        setTaskValue(event.target.value)
    }

    const handleReset = () => {
        setTaskValue("");
    }

    const handleDropdown = (event) => {
        setProgress(event.target.value);
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        const task =
        {
            id: Math.floor(Math.random() * 10000),
            name: taskValue,
            completed: Boolean(progress)
        }
        // console.log(task);
        //setTasks(task) // this will give error as it is list so chnaged like this below
        //setTasks([task])// this will override earlier 3 tasks so finally i will write this we have to follow this rule
        setTasks([...tasks, task])
        handleReset();
    }

    return (

        <section className="addtask">

            <form onSubmit={handleSubmit}>

                <input type="text" onChange={handleChange} name="task" id="task" placeholder='enter task name' autoComplete="off"
                    value={taskValue} />
                <select onChange={handleDropdown} value={progress}>
                    <option value="false">Pending</option>
                    <option value="true">Completed</option>
                </select>
                <button type="submit" style={{ background: "blue" }}>Add task</button><br />

                <button onClick={handleReset} className='reset' style={{ background: "blue", color: "white" }} >Reset</button>
            </form>
            <p> {taskValue}</p>
        </section>

    )
}
