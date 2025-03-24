The important points 
---------------------------
using useState u have to create controlled controls like on change using set method on controls in the design 

using props u have to pass values from dashboard to child components which it is holding here they are not using router if u keep sub elelemts in main container and if i show that main container which is nothing but dashboard then no need of router 

every component check what it is taking from service and that only u implment it there and pass as context sometimes all it will not export
  all only few it will export and some to other components okay 

first go and write reducer code in service file and then go with context 

in components first desing u do it and later on write other codes in return (   ) 

check test file and according  to  that do design

In the dashboard check what components has to be displayed and from dashboad u will only have to send it by props and go to components and see { what they are taking that only send it in dashboard }

make your familair with writing arrow function and map and filter which are used extensively here 




In category list u are doing both adding and deleting 


but  in Tasklist for adding taskinput.js is there and for  and for siaplying tasklist it can be divided 

you should know how to toggle the design  using useState and it done using ternary operator ? true means first value or secod value 

but when it is null value in useState it is reverse means if   ? true means not null so firt will be displayed otherwise second will be desilayed 


go to day 9 and in folder solvingmilestone folder  and download boilerplatecodeinlocal and say npm install now 


CategoryService.js 
------------------
  import { createContext, useContext, useReducer } from 'react';

// Category actions
const ADD_CATEGORY = 'ADD_CATEGORY';
const DELETE_CATEGORY = 'DELETE_CATEGORY';

// Initial state
const initialState = {
    categories: [],
};

// Category reducer
const categoryReducer = (state, action) => {

    switch (action.type)
    {
        case ADD_CATEGORY:

            return { ...state, categories: [...state.categories, action.payload] };
        
        case DELETE_CATEGORY:

            return { ...state, categories: state.categories.filter((category) => category.id !== action.payload) }
        
        default: return state;


    }


};

// Create context
const CategoryContext = createContext();

// Category Provider
export const CategoryProvider = ({ children }) => {

    const [state, dispatch] = useReducer(categoryReducer, initialState);

    const addCategory = (category) => {
        dispatch({ type: ADD_CATEGORY ,payload:category})
    }

    const deleteCategory = (categoryid) => {
        dispatch({ type: DELETE_CATEGORY,payload:categoryid })        

    }

    return (

        <CategoryContext.Provider value={{ categories: state.categories, addCategory, deleteCategory }}>
            
            {children}

        </CategoryContext.Provider>
    )

};

// Custom hook to use category context
export const useCategories = () => {
    return useContext(categoryContext);
};


categoryList.js 
------------------
import React, { useState } from 'react';
import { useCategories } from '../services/CategoryService';

const CategoryList = () => {
    const { categories, addCategory, deleteCategory } = useCategories();
    const [newCategory, setNewCategory] = useState('');

    const handleAddCategory = () => {
        if (newCategory.trim()) {
            addCategory({ id: Date.now(), name: newCategory });
            setNewCategory('');
        }
    };

    const DeleteCategory = (id) => {

        deleteCategory(id);

    }

    return (
        <div>
            <h2>Categories</h2>
            <input type="text" value={newCategory} placeholder='New Category' onChange={(e) => setNewCategory(e.target.value)} />
            <button onClick={handleAddCategory}>Add  Category</button>
            <ul>
                {
                    categories.map((category) => (

                        <li key={category.id}>
                            {category.name}
                            <button onClick={()=>DeleteCategory(category.id)}>Remove Category</button>
                        </li>

                    ))
                }
            </ul>
        </div>
    );
};

export default CategoryList;

Dashboard
--------------
  import React from 'react';
import { useTasks } from '../services/TaskService';
import { useCategories } from '../services/CategoryService';
import TaskInput from './TaskInput';
import TaskList from './TaskList';
import CategoryList from './CategoryList';

const Dashboard = () => {
  // const { tasks } = useTasks();
   const { categories } = useCategories();

  return (
    <div>
      <CategoryList />
    </div>

  );
};

export default Dashboard;

App.js 
--------
  import logo from './logo.svg';
import './App.css';
import Dashboard from './components/Dashboard';
import { CategoryProvider } from './services/CategoryService';
import CategoryList from './components/CategoryList';

function App() {
  return (
  <CategoryProvider>
      <Dashboard />
  </CategoryProvider>
   
    
  );
}

export default App;


TaskService.js
------------------
  import { createContext, useContext, useReducer } from 'react';

// Task actions
const ADD_TASK = 'ADD_TASK';
const EDIT_TASK = 'EDIT_TASK';
const DELETE_TASK = 'DELETE_TASK';
const TOGGLE_TASK_STATUS = 'TOGGLE_TASK_STATUS';

// Initial state
const initialState = {
    tasks: [],
};

// Task reducer
const taskReducer = (state, action) => {

    switch (action.type)
    {
        case ADD_TASK:
            return { ...state, tasks: [...state.tasks, action.payload] };
        
        case EDIT_TASK:
            return {
                ...state,
                tasks: state.tasks.map((task) =>task.id===action.payload.id?{...task,...action.payload}:task)
            };
        
        case DELETE_TASK:
            return {
                ...state,
                tasks:state.tasks.filter((task)=>task.id!==action.payload)

            }
        case TOGGLE_TASK_STATUS:
            return            {
                ...state,
    tasks: state.tasks.map((task) => task.id === action.payload ? { ...task, completed: !task.completed } : task)
                    
            }
        
        default:
            return state;
    }

};

// Create context
const TaskContext = createContext(taskReducer,initialState);

// Task Provider
export const TaskProvider = ({ children }) => {

    const [state, dispatch] = useReducer(taskReducer, initialState)
    
    const addTask = (task) => {
        
        dispatch({ type: ADD_TASK, payload: task });
    }

    const editTask = (id,taskData) => {
        dispatch({ type: EDIT_TASK ,payload:{id,...taskData}})
    }

    const deleteTask = (taskid) => {
        dispatch({ type: DELETE_TASK ,payload:taskid})
    }

    const toggleTaskStatus = (taskid) => {
        dispatch({ type: TOGGLE_TASK_STATUS ,payload:taskid})
    }

    return (
        <TaskContext.Provider value={{ tasks: state.tasks, addTask, editTask, deleteTask, toggleTaskStatus }}>
         
            {children}

        </TaskContext.Provider>


    )

};

// Custom hook to use task context
export const useTasks = () => {
    return useContext(TaskContext);
};

next see what it is exporting who is using which component is using and what using 

TaskInput.js 
------------
  import React, { useState } from 'react';
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

    const handleSubmit = (e) => {
      e.preventDefault();
      const taskData = { title, description, dueDate, priority, category }
      addTask({ id:Date.now(),...taskData,completed: false })
      console.log(taskData.title);
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

      <button type="submit">Add Task</button>
       
   </form>

  )
};

export default TaskInput;

Dashboard.js 
----------------
  import React from 'react';
import { useTasks } from '../services/TaskService';
import { useCategories } from '../services/CategoryService';
import TaskInput from './TaskInput';
import TaskList from './TaskList';
import CategoryList from './CategoryList';

const Dashboard = () => {
  const { tasks } = useTasks();
   const { categories } = useCategories();

  return (
    <div>

      <h1>To-Do List Dashboard</h1>
      <div>
        <CategoryList   />
      </div>
      <div>
        <TaskInput />
       </div>
    </div>

  );
};

export default Dashboard;

App.js
---------
  import logo from './logo.svg';
import './App.css';
import Dashboard from './components/Dashboard';
import { CategoryProvider } from './services/CategoryService';
import CategoryList from './components/CategoryList';
import { TaskProvider } from './services/TaskService';

function App() {
  return (
    <TaskProvider>
  <CategoryProvider>
      <Dashboard />
  </CategoryProvider>
    </TaskProvider>
    
  );
}

export default App;

Right now I'm sending some value from the dashboard to task input which is edit task
  it is null only so null value is passed and kept in each of the controls you can see in task input
So who will make the Existing task has some value so null is there every where how that props will not be null

if i send exisistintask="hello" from dashboard and first title use state  i  const [title, setTitle] = useState(existingTask ? existingTask : '');

instead of title then hello will be shown as it not null so i am keeping it null and and sending to taskinput my question is who will make
the existingtask from null to some value 

And now from dashboard it is sending one  function as props onEdit to TaskList where i am calling a fuction to make task from null to some task 
by taking paramter as task 
 <TaskList onEdit={handleEdit}

 const [editingTask, setEditingTask] = useState(null);

    const handleEdit = (task) => {
        setEditingTask(task);
    };

now that tasklist will take this as props 
TaskList = ({ onEdit })

so i will do the desing only list in tasklist and put one delete button and will call the onEdit function 
  as i am in list one by one it will take one object only which u clicke that is passed 


and apply it to edit buttonn and will call there in this way existingtask will be some object task 

  and dashboard is also having tasks from use tasks and if tasks.length > 0 means if tasks are there if u click on anyone task
    of edit i will take task object here by taking that taskobject i am setting the exisitingtask to some object from null
    
chnages in code 
---------------
Dashboard.js
-------------
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

  then go to TaskList it is also taking tasks as from use tasks 

  TaskList.js 
  ------------
import React from 'react';
import { useTasks } from '../services/TaskService';
import { useCategories } from '../services/CategoryService';

const TaskList = ( { onEdit }) => {
    const { tasks, editTask, deleteTask, toggleTaskStatus } = useTasks();
    const { categories } = useCategories();

  return (
      
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <strong>{task.title}</strong> - {task.description} - {task.category} -{" "}
          {task.dueDate} - {task.priority}
        
          <button onClick={() => onEdit(task)}>Edit Task</button>
          <button onClick={() => deleteTask(task.id)}>Delete</button>
        </li>
      ))}
    </ul>

  );
};

export default TaskList;

TaskInput.js 
-----------
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

so till now what code i had written for that out 5 cases 4 are passing and now dont write further code if all your test cases are passed you 
can give submit exam so i am stopping here class u prepare for the exam another is left out you can check later 


  
