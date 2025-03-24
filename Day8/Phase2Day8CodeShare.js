Just check where i had used Use context programming Phase2Day4CodeShare.cs file in Day4 of drive 
https://drive.google.com/drive/folders/1AKrv_IbdPOVkZJsZ9W1ESrUkK5lHnZ7c?usp=sharing
there once go through ContextApi and createcontext and useContext demos 
 
just analize the authcontext code there 

Earlier we have used props to transfer properties or some information from parent component to child component
 the same thing I can do with using createContext and useContext hooks from react 
Here you have to first create the context where certain properties or functions you are exporting to all the child components 
 so here I will use create context hook for creating a context Then then then immediately what context you have created create that context provider 
  and export the values and you have to configure the auth provider in the app js as a main parent
  component so that all child components can take the properties and functionalities of Oregon the context class which you have created

<anyname>Context=createContext

<anyname>Provider = ({ children })

in return 
<anyname>ContextProvider.value export it 


so while creating context and 

who is using that context 

impor the file
and will use useContext(<anyname>Context)

so will take the proeprties and and display 

Now go to drive phase 2 Day 8 fodler and download demowithprops folder and do npm install and then just open the application and let us understand

so what I am Do is that this programme which is written in props I will convert into context usage

so you can see here i am sending values in the form of props from App.js to TaskList.js and AddTask.js and from TaskList.js 
to TaskCard as well 

so i want to do this using createContext and useContext i dont want to use props here 

Now in the components folder add TaskContext.js file 
TaskContext.js
--------------
 import { createContext, useState } from "react";

//create a context

export const TaskContext = createContext();

// provider component

export const TaskProvider = ({ children }) => {
    
    const [tasks, setTasks] = useState([
        { id: 5271, name: "Record React Lectures", completed: true },
        { id: 7825, name: "Edit React Lectures", completed: false },
        { id: 8391, name: "Watch Lectures", completed: false }
      ]);
    
    // function to add a new task
    const addTask = (task) =>    {
        setTasks([...tasks,task]);
    }

    // funtion to delete a task

    const deleteTask = (id) =>
    {
        setTasks(tasks.filter((task) => task.id !== id));
    }

    return (

        <TaskContext.Provider value={{ tasks, addTask, deleteTask }}>
            {children}
        </TaskContext.Provider>
    )

}
next thing is App.js i have to configure this context on top so that all can use my features 

App.js 
----------
 

import React from 'react'
import { useState } from 'react';
import TaskList from './components/TaskList';
import { AddTask } from './components/AddTask';
import { TaskProvider } from './components/TaskContext';

export default function App() {

  return (  
    <TaskProvider>
    <div className="App">
 
      <AddTask  />
      <TaskList  />

      </div>
    </TaskProvider>
  )
}
Next we have TaskList.js go there use useConext and change the code like this 

TaskList.js 
-----------
import { useState,useContext } from 'react';
import TaskCard from './TaskCard';
import { TaskContext } from './TaskContext';


export const TaskList = () => {

    const [show, setShow] = useState(true);
       const {tasks}=  useContext(TaskContext)
   
    return (
        <section className='tasklist'>
            <ul>
                <div className='header'>
                    <h1>TaskList</h1>
                    <button className='trigger' onClick={() => setShow(!show)}>{show ? "Hide Tasks" : "Show Tasks"}</button>
                </div>
                {show && tasks.map((task) => (
                    <TaskCard key={task.id} task={task}  />
                ))}
            </ul>
        </section>
    )
}

export default TaskList
Now to to TaskCard.js 
---------------------
 
import React, { useContext } from 'react'
import { TaskContext } from './TaskContext'

export default function TaskCard({ task }) {
   const { deleteTask}= useContext(TaskContext);
    return (

        <li key={task.id} className={task.completed ? "completed" : "incomplete"}>


            <span>{task.id} -- {task.name}</span>
            <button className='delete' onClick={() => deleteTask(task.id)} >Delete</button>
        </li>

    )
}


Now go to AddTask.js 
----------------------
import React from 'react'

import { useState, useContext } from 'react';

import { TaskContext } from './TaskContext';
 
export const AddTask = () => {

    const [taskValue, setTaskValue] = useState("");
    const [progress, setProgress] = useState(false);

    const { addTask } = useContext(TaskContext);

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
        addTask(task)
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

Now Let us understand the concept of use reducer I can use Use state also instead of Use reduer but Use reducer is dynamic
 I didn't have to write multiple times use state and it has dynamically I can transfer the values transition is good in use reducer

Now create an app now give name as counterappwithusestate in Folder Day 8 only create 

do inital set up means remove some file in public and some in src 

now first add one file App1.js in src folder and write the below code like this of counter logic 

App1.js 
-------
import { useState } from 'react';
import './App.css';


function App1() {

    const [count, setCount] = useState(0);

    function handleAdd() {
        //count = count + 1;
        console.log(count);
        setCount(count + 1);
    }

    function handleSub() {
        setCount(count - 1);
    }

    function handleReset() {
        setCount(0);
    }


    return (
        <div className="App">

            <div className='box'>

                <p>{count}</p>
                <button onClick={handleAdd} className='add' >ADD</button>
                <button onClick={handleSub} className='sub' >SUB</button>
                <button onClick={handleReset} className='reset' >RESET</button>


            </div>

        </div>
    );
}

export default App1;

index.js 
--------
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App1 from './App1';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App1 />
  </React.StrictMode>
);

now i will use useReducer instead of usestaate 

updated App1.js 
-------------
 import { useReducer } from 'react';
import './App.css';

function countReducer(state,action)
{
    switch (action.type)
    {
        case 'increment':
            return {
                count: state.count + 1,
               
             };
        case 'decrement':
            return { count: state.count - 1 };
        case 'reset':
            return { count: 0 };
        default:
            return state;

    }
}

function App1() {

    const [state,dispatch] = useReducer(countReducer,{ count: 0});

       return (
        <div className="App">

            <div className='box'>

                <p>{state.count}</p>
                <button onClick={()=>dispatch({type:'increment'})} className='add' >ADD</button>
                <button onClick={() => dispatch({ type: 'decrement' })} className='sub' >SUB</button>
                <button onClick={() => dispatch({ type: 'reset' }) } className='reset' >RESET</button>


            </div>

        </div>
    );
}

export default App1;

Explanation:
useReducer instead of useState:

useReducer takes a reducer function (countReducer) and an initial state ({ count: 0 }).
It returns [state, dispatch], where:
state holds the current state.
dispatch is used to trigger state updates.
Reducer Function (countReducer):

This function determines how the state should change based on the action type (increment, decrement, or reset).
Dispatching Actions:

The dispatch function is used to send action objects { type: 'increment' }, { type: 'decrement' }, or { type: 'reset' }.
This approach makes state management more structured and scalable, especially useful for complex state logic

Now I want to modify the state not directly but using some text box I want to modify the state of component

moified App1.js 
--------------
import { useReducer,useState } from 'react';
import './App.css';

function countReducer(state,action)
{
    switch (action.type)
    {
        case 'increment':
            return {
                count: state.count + action.payload,
               
             };
        case 'decrement':
            return { count: state.count - action.payload };
        case 'reset':
            return { count: 0 };
        default:
            return state;

    }

   
}

function App1() {

    const [state,dispatch] = useReducer(countReducer,{ count: 0});

    const [inputValue, setInputValue] = useState(1);
    

    


    return (
        <div className="App">

            <div className='box'>

                <p>{state.count}</p>
                <input type="number" value={inputValue} onChange={(e)=>setInputValue(Number(e.target.value))} />
                <button onClick={()=>dispatch({type:'increment',payload:inputValue})} className='add' >ADD</button>
                <button onClick={() => dispatch({ type: 'decrement',payload:inputValue })} className='sub' >SUB</button>
                <button onClick={() => dispatch({ type: 'reset' }) } className='reset' >RESET</button>
              
            </div>

        </div>
    );
}

export default App1;

Here in the above code I am I am making a text box as a controlled 
 component means whenever I am changing anything in the text box 
  using Use state whatever value I write in the text box will go inside the inputvalue of Use state
now in In dispatch method I am passing a payload value of the text box only from the text box 
 whatever is changed is kept in the input value and as a payload that input value is sent
In the earlier code I was hard coding the value of state using one or minus one but right 
 now it is now plus payload or minus payload
Use payload whenever you're using a form or you're using some input controls to pass inside the reducer

IDENTITY_DEMO_WITH_JWTTOKEN 
***************************







 

