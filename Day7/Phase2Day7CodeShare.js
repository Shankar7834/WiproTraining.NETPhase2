npm i react-router-dom@6.4.3

 

CategoryList.js 
------------------
import React, { useState } from 'react';
import { useCategories } from '../services/CategoryService';

const CategoryList = () => {
  const { categories, addCategory, deleteCategory } = useCategories();
  const [newCategory, setNewCategory] = useState('');  

  const handleAddCategory = () => {
    if (newCategory.trim() && !categories.some((cat) => cat.name.toLowerCase() === newCategory.toLowerCase())) {
      addCategory({ id: Date.now(), name: newCategory });
      setNewCategory('');
    }
  };

  return (
    <div>
      <h2>Categories</h2>
      <input 
        type="text" 
        value={newCategory} 
        onChange={(e) => setNewCategory(e.target.value)}
        placeholder="New Category" 
        data-testid="category-input"
      />
      <button onClick={handleAddCategory} data-testid="add-category-button">Add Category</button>
      <ul>
        {categories.map((category) => (
          <li key={category.id} data-testid={`category-${category.id}`}>
            {category.name}
            <button onClick={() => deleteCategory(category.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;

----------------------------------------------
Dashboard.js 
------------
import React from 'react';
import TaskInput from './TaskInput';
import TaskList from './TaskList';
import CategoryList from './CategoryList';

const Dashboard = () => {
  return (
    <div>
      <h1>To-Do List Dashboard</h1>
      <p>Learn React by building a task management app.</p>
      <TaskInput />
      <TaskList />
      <CategoryList />
    </div>
  );
};

export default Dashboard;

-------------------------------------------------------------------
TaskInput.js
---------------
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
    const task = { id: existingTask ? existingTask.id : Date.now(), title, description, dueDate, priority, category };
    existingTask ? editTask(task) : addTask(task);
    if (onEditComplete) onEditComplete();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Task Title" required data-testid="task-title-input"/>
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Task Description" required data-testid="task-description-input"/>
      <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} placeholder="Due Date" required data-testid="task-due-date-input"/>
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option>High</option>
        <option>Medium</option>
        <option>Low</option>
      </select>
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.name}>{cat.name}</option>
        ))}
      </select>
      <button type="submit" data-testid="add-task-button">{existingTask ? 'Edit Task' : 'Add Task'}</button>
    </form>
  );
};

export default TaskInput;

--------------------------------------------------------------------------------
TaskList.js 
------------
import React, { useState } from 'react';
import { useTasks } from '../services/TaskService';
import TaskInput from './TaskInput';

const TaskList = () => {
  const { tasks, editTask, deleteTask, toggleTaskStatus } = useTasks();
  const [editingTask, setEditingTask] = useState(null);

  return (
    <div>
      <h2>Task List</h2>
      {editingTask ? (
        <TaskInput existingTask={editingTask} onEditComplete={() => setEditingTask(null)} />
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task.id} data-testid={`task-${task.id}`}>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <p>Due: {task.dueDate}</p>
              <p>Priority: {task.priority}</p>
              <p>Category: {task.category}</p>
              <button onClick={() => toggleTaskStatus(task.id)}>Mark as {task.completed ? 'Incomplete' : 'Complete'}</button>
              <button onClick={() => setEditingTask(task)} data-testid={`edit-task-${task.id}`}>Edit Task</button>
              <button onClick={() => deleteTask(task.id)} data-testid={`delete-task-${task.id}`}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;

-------------------------------------
App.js 
---------
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import { TaskProvider } from './services/TaskService';
import { CategoryProvider } from './services/CategoryService';
import './App.css';

function App() {
  return (
    <TaskProvider>
      <CategoryProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </Router>
      </CategoryProvider>
    </TaskProvider>
  );
}

export default App;



 CategoryService.js
-------------------------
import { createContext, useContext, useReducer } from 'react';

const ADD_CATEGORY = 'ADD_CATEGORY';
const DELETE_CATEGORY = 'DELETE_CATEGORY';

const initialState = {
    categories: [],
};

const categoryReducer = (state, action) => {
    switch (action.type) {
        case ADD_CATEGORY:
            return { ...state, categories: [...state.categories, action.payload] };
        case DELETE_CATEGORY:
            return { ...state, categories: state.categories.filter((cat) => cat.id !== action.payload) };
        default:
            return state;
    }
};

const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
    const [state, dispatch] = useReducer(categoryReducer, initialState);

    const addCategory = (category) => dispatch({ type: ADD_CATEGORY, payload: category });
    const deleteCategory = (id) => dispatch({ type: DELETE_CATEGORY, payload: id });

    return (
        <CategoryContext.Provider value={{ categories: state.categories, addCategory, deleteCategory }}>
            {children}
        </CategoryContext.Provider>
    );
};

export const useCategories = () => useContext(CategoryContext);

 TaskService.js
------------------
import { createContext, useContext, useReducer } from 'react';

const ADD_TASK = 'ADD_TASK';
const EDIT_TASK = 'EDIT_TASK';
const DELETE_TASK = 'DELETE_TASK';
const TOGGLE_TASK_STATUS = 'TOGGLE_TASK_STATUS';

const initialState = {
    tasks: [],
};

const taskReducer = (state, action) => {
    switch (action.type) {
        case ADD_TASK:
            return { ...state, tasks: [...state.tasks, action.payload] };
        case EDIT_TASK:
            return {
                ...state,
                tasks: state.tasks.map((task) => (task.id === action.payload.id ? action.payload : task)),
            };
        case DELETE_TASK:
            return { ...state, tasks: state.tasks.filter((task) => task.id !== action.payload) };
        case TOGGLE_TASK_STATUS:
            return {
                ...state,
                tasks: state.tasks.map((task) =>
                    task.id === action.payload ? { ...task, completed: !task.completed } : task
                ),
            };
        default:
            return state;
    }
};

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
    const [state, dispatch] = useReducer(taskReducer, initialState);

    const addTask = (task) => dispatch({ type: ADD_TASK, payload: task });
    const editTask = (task) => dispatch({ type: EDIT_TASK, payload: task });
    const deleteTask = (id) => dispatch({ type: DELETE_TASK, payload: id });
    const toggleTaskStatus = (id) => dispatch({ type: TOGGLE_TASK_STATUS, payload: id });

    return (
        <TaskContext.Provider value={{ tasks: state.tasks, addTask, editTask, deleteTask, toggleTaskStatus }}>
            {children}
        </TaskContext.Provider>
    );
};

export const useTasks = () => useContext(TaskContext);
____________________________________________________________________________________________________________________________________________
Till now above code was about milestone now I'm continuing with yesterdays security demo app

so open yesterdays Day6projects only now 

Also open sql server also 

I have not used logout post method so now I will do some changes in the layout so that a logout button can appear and I can use the 
 functionality of logout of account controller

Account controller logout code modified 
------------------------------------------
        [HttpPost]
        public async Task<IActionResult> Logout()
        {
            await _signInManager.SignOutAsync();
            return RedirectToAction("Login", "Account");
        }

In layout just put the the code in ul list 
---------------------------------------------
 <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>@ViewData["Title"] - SecureAppDemo</title>
    <link rel="stylesheet" href="~/lib/bootstrap/dist/css/bootstrap.min.css" />
    <link rel="stylesheet" href="~/css/site.css" asp-append-version="true" />
    <link rel="stylesheet" href="~/SecureAppDemo.styles.css" asp-append-version="true" />
</head>
<body>
    <header>
        <nav class="navbar navbar-expand-sm navbar-toggleable-sm navbar-light bg-white border-bottom box-shadow mb-3">
            <div class="container-fluid">
                <a class="navbar-brand" asp-area="" asp-controller="Home" asp-action="Index">SecureAppDemo</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target=".navbar-collapse" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="navbar-collapse collapse d-sm-inline-flex justify-content-between">
                    <ul class="navbar-nav flex-grow-1">

                        <!-- Check if the user is authenticated -->
                        @if (User.Identity.IsAuthenticated)
                        {
                            <!-- Show the username -->
                            <li class="nav-item">
                                <span class="nav-link">Welcome, @User.Identity.Name</span>
                            </li>

                            <!-- Links for users based on roles -->
                            @if (User.IsInRole("Admin"))
                            {
                                <li class="nav-item">
                                    <a class="nav-link" href="@Url.Action("Privacy", "Home")">Privacy</a> <!-- Admin-only link -->
                                </li>
                            }

                          
                            <!-- Logout form with anti-forgery token -->
                            <li class="nav-item">
                                <form asp-controller="Account" asp-action="Logout" method="post" class="form-inline">
                                    <button type="submit" class="btn btn-link nav-link" style="cursor: pointer;">Logout</button>
                                    @Html.AntiForgeryToken()
                                </form>
                            </li>
                        }
                        else
                        {
                            <!-- Links for users who are not authenticated -->
                            <li class="nav-item">
                                <a class="nav-link" href="@Url.Action("Login", "Account")">Login</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="@Url.Action("Register", "Account")">Register</a>
                            </li>
                        }



                    </ul>
                </div>
            </div>
        </nav>
    </header>
    <div class="container">
        <main role="main" class="pb-3">
            @RenderBody()
        </main>
    </div>

    <footer class="border-top footer text-muted">
        <div class="container">
            &copy; 2025 - SecureAppDemo - <a asp-area="" asp-controller="Home" asp-action="Privacy">Privacy</a>
        </div>
    </footer>
    <script src="~/lib/jquery/dist/jquery.min.js"></script>
    <script src="~/lib/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
    <script src="~/js/site.js" asp-append-version="true"></script>
    @await RenderSectionAsync("Scripts", required: false)
</body>
</html>

This is how you can make an app secure using identity package of asp.net core

Now let us move to Web Api concepts 
open one web api project now till now we have seen earlier web api but that web api was not having return type as IActionResult it was normal methods 

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Webapidemo.Controllers
{

    public class Employee
    {

        public int? Id { set; get; }

        public string? Name { set; get; }

        public string  Place { set; get; } = string.Empty;
    }

    [Route("api/[controller]")]
    [ApiController]
    public class EmpController : ControllerBase
    {

        private static List<Employee> emps = new List<Employee>()
            {
                new Employee{Id=1,Name="kiran",Place="bangalore"},
                 new Employee{Id=2,Name="sita",Place="chennai"},
                  new Employee{Id=3,Name="mohan",Place="Hyderabad"},
            };

        [HttpGet]
        public List<Employee> Employees()
        {
            
            return emps;
        }

        [HttpGet("Emp2")]
        public List<Employee> Employees2()
        {
           
            return emps;
        }

        [HttpPost]
        public Employee AddEmployee(Employee emp1)
        {
            emps.Add(emp1);
            return emp1;
        }

        [HttpPost("emppost2")]// same add but after adding returning list of employees
        public List<Employee> AddEmployee2(Employee emp1)
        {
            emps.Add(emp1);
            return emps;
        }

        [HttpPut]
        public Employee UpdateEmployee(Employee emp1)
        {
            var employee1=emps.Find(x=>x.Id==emp1.Id);
            if (employee1 == null)
            {
                return new Employee { Name = "Error", Place = "Employee not found" }; // Returning an Employee object with a message
            }
            employee1.Name = emp1.Name;
            employee1.Place=emp1.Place;
            return employee1;
                 
        }
        [HttpPut("empput2")]
        public List<Employee> UpdateEmployee2(Employee emp1)
        {
            var employee1 = emps.Find(x => x.Id == emp1.Id);
            if (employee1 == null)
            {
                // Return a list with a single Employee object containing the error message
                return new List<Employee>
                {
                    new Employee { Name = "Error", Place = "Employee not found" }
                };
            }
            employee1.Name = emp1.Name;
            employee1.Place = emp1.Place;
            return emps;

        }
        [HttpDelete]
        public Employee DeleteEmployee(int id)
        {
            var employee1 = emps.Find(x => x.Id == id);
            if (employee1 == null)
            {
                return new Employee { Name = "Error", Place = "Employee not found" }; // Returning an Employee object with a message
            }

            emps.Remove(employee1);
            return employee1;

        }

        [HttpDelete("empdelete2")]
        public List<Employee> DeleteEmployee2(int id)
        {
            var employee1 = emps.Find(x => x.Id == id);
            if (employee1 == null)
            {
                // Return a list with a single Employee object containing the error message
                return new List<Employee>
                {
                    new Employee { Name = "Error", Place = "Employee not found" }
                };
            }


            emps.Remove(employee1);
            return emps;

        }

        [HttpGet("{id}")]
        public Employee GetEmployees(int id)
        {
            var employee1 = emps.Find(x => x.Id == id);
            if (employee1 == null)
            {
                return new Employee { Name = "Error", Place = "Employee not found" }; // Returning an Employee object with a message
            }

            return employee1;

        }


    }
}
so if u see all above code which  in phase 1 day 21 i had written these are also web api only but return type is normal method only not I action
result and they are working on collection of employee same i will do now using IActionresult or ActionResult on collecton of employee and using 
entity framework i will connect to database and there  i will crud operation so let us go with the new application now 

also we have written some action methods in asp.net core but those will defnetley will return view but in web api the same action methods 
wont retun view but they retrun json data and view we will generate using react later by taking web api 

Now Open a new webpi aplication with the name WebApiDemo in Day7 fodler and give name Day7Projects for soltuion

select template AP.net core web api now not asp.net core mvc we now moving to web api concepts 

Csharp--allplatforms--web  and .net core 8.0 you have to select

Now add Employee class in the project i am not using any models here as it is web api 

namespace WebApiDemo
{
    public class Employee
    {
        public int? Id { set; get; }

        public string? Name { set; get; }

        public string place { set; get; } = string.Empty;

    }
}

 now add one API controller empty one by going into section API give name as EmpContoller 

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebApiDemo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmpController : ControllerBase
    {
    }
}

Will look like this boilerplate code

add code like this in the conroller 

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebApiDemo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmpController : ControllerBase
    {

        [HttpGet]
        public List<Employee> GetEmployees()
        {
            var emps = new List<Employee>()
            {
                new Employee{Id=1,Name="kiran",place="Bangalore"},
                new Employee{Id=2,Name="mahesh",place="chennai"},
                new Employee{Id=3,Name="santosh",place="Delhi"},
            };
            return emps;
        }
         

    }
}

Right now this is also like a normal method only add with an attribute http get but will convert this method into async with the return type IActionresult

I want to change the above function in asynchronous format so I have converted the above function in this manner

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebApiDemo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmpController : ControllerBase
    {

        [HttpGet]
        public async Task<List<Employee>> GetEmployees()
        {
            var emps = new List<Employee>()
            {
                new Employee{Id=1,Name="kiran",place="Bangalore"},
                new Employee{Id=2,Name="mahesh",place="chennai"},
                new Employee{Id=3,Name="santosh",place="Delhi"},
            };
            return emps;
        }
         

    }
}

but it showing greeen line means it is not totally asynchrnus it is partially asynhornus i will make it fully Asynchronus when i use EF i will make it fully async   right now let it be like that only 


nexxt Along with the result I want to send status  also like OK Or bad reauest file not found then again keep the in Actionresult the function 
Now along with data returning i want to return status of data also means succes or not found etc success means ok means 200 status 
  
  
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebApiDemo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmpController : ControllerBase
    {

        [HttpGet]
        public async Task< ActionResult< List<Employee>>> GetEmployees()
        {
            var emps = new List<Employee>()
            {
                new Employee{Id=1,Name="kiran",place="Bangalore"},
                new Employee{Id=2,Name="mahesh",place="chennai"},
                new Employee{Id=3,Name="santosh",place="Delhi"},
            };
            return Ok(emps);
        }
         

    }
}
Take the employees outside

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebApiDemo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmpController : ControllerBase
    {
        public static List<Employee> emps = new List<Employee>()
            {
                new Employee{Id=1,Name="kiran",place="Bangalore"},
                new Employee{Id=2,Name="mahesh",place="chennai"},
                new Employee{Id=3,Name="santosh",place="Delhi"},
            };
        [HttpGet]
        public async Task< ActionResult< List<Employee>>> GetEmployees()
        {
          
            return Ok(emps);
        }
         

    }
}
final code with methods of web api 
----------------------------------
 using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Buffers.Text;
using System;

namespace WebApiDemo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmpController : ControllerBase
    {
        public static List<Employee> emps = new List<Employee>()
            {
                new Employee{Id=1,Name="kiran",place="Bangalore"},
                new Employee{Id=2,Name="mahesh",place="chennai"},
                new Employee{Id=3,Name="santosh",place="Delhi"},
            };
        [HttpGet]
        public async Task< ActionResult< List<Employee>>> GetEmployees()
        {
          
            return Ok(emps);
        }

        //two post methods based on return type for employee
        [HttpPost]
        public async Task<ActionResult<List<Employee>>> AddEmployee(Employee employee)
        {
            emps.Add(employee);
            return Ok(emps);
        }

        [HttpPost("emp_Post2")]
        public async Task<ActionResult<Employee>> AddEmployee2(Employee employee)
        {
            emps.Add(employee);
            return Ok(employee);
        }

        //I want to search one employee base on empid the code is like this 
        [HttpGet("{id}")]
        public async Task<ActionResult<Employee>> GetEmployee(int id)
        {
            var employee = emps.Find(x => x.Id == id);
            if (employee == null)
            {
                return BadRequest("Employee Not Found");
            }
            else
            {
                return Ok(employee);
            }
        }

//        Now i want to update any employee which is nothing but put method again here based on 
//return type of method i will write two put methods and also i will give url different to avoid confusion to swagger ui
//one put is returing that employee which is modified after modifying and another put is modifying and tellig us to see that i am giving a list check there
//whether modified or not okay

 [HttpPut]
 public async Task<ActionResult<List<Employee>>> UpdateEmployee(Employee employee)
        {
            var employee1 = emps.Find(x => x.Id == employee.Id);
            if (employee1 == null)
            {
                return BadRequest("Employee Not Found");
            }
            employee1.Name = employee.Name;
            employee1.place = employee.place;
            return Ok(emps);
        }

        [HttpPut("put2")]
        public async Task<ActionResult<Employee>> UpdateEmployee2(Employee employee)
        {
            var employee1 = emps.Find(x => x.Id == employee.Id);
            if (employee1 == null)
            {
                return BadRequest("Employee Not Found");
            }
            employee1.Name = employee.Name;
            employee1.place = employee.place;
            return Ok(employee1);
        }

//        Now code for delete based on id

//Now i want to delete any employee which is nothing but delete method again here based on 
//return type of method i will write two delete methods and also i will give url different to avoid confusion to swagger ui
//one delete is returing that employee which is deleted after deleting and another delete  is deleting and tellig us to see that i am giving a list check there
//whether deleetd  or not okay

 [HttpDelete("{id}")]
 public async Task<ActionResult<Employee>> DeleteEmployee(int id)
        {
            var employee1 = emps.Find(x => x.Id == id);
            if (employee1 == null)
            {
                return BadRequest("Employee Not Found");
            }
            emps.Remove(employee1);
            return Ok(employee1);
        }
        [HttpDelete("del2/{id}")] 
        public async Task<ActionResult<List<Employee>>> DeleteEmployee2(int id)
        { 
            var employee1 = emps.Find(x => x.Id == id);
            if (employee1 == null)
            {
                return BadRequest("Employee Not Found");
            }
            emps.Remove(employee1);
            return Ok(emps);
        }


    }
}

 Now i want to use Entity Framework so add one Data folder in the project and add one class EmpContext which will look like this 

namespace WebApiDemo.Data
{
    public class EmpContext
    {
    }
}

so ths is class which will be modified before that add dependencies add it verson  8.0.13


Microsoft.EntityFrameworkCore  
Microsoft.EntityFrameworkCore.SqlServer and also 
Microsoft.EntityFrameworkCore.Tools 



Now go to app settins 

 "ConnectionStrings": {
    "constring": "Data Source=LAPTOP-4G8BHPK9\\SQLEXPRESS;initial catalog=EmpDb;Integrated Security=true;"
  }
  
  
  so the code will be like this i mean to say total code 
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*",
  "ConnectionStrings": {
    "constring": "Data Source=LAPTOP-4G8BHPK9\\SQLEXPRESS;initial catalog=EmployeeDb;Integrated Security=true;TrustServerCertificate=True;"
  }

}


updated EmpContext class accoring to your namespace 
using Microsoft.EntityFrameworkCore;

namespace WebApiDemo.Data
{
    public class EmpContext:DbContext
    {
        public EmpContext(DbContextOptions<EmpContext> options) : base(options)

        {

        }

        public DbSet<Employee> Employees { get; set; }

    }
}

then in Program.cs file 
builder.Services.AddControllers();// this is already there mean after this put it 
 builder.Services.AddDbContext<EmpContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("constring")));


once build the solution 

Now add migrations 

PM> add-migration 'initiempdb'
Build started...
Build succeeded.
Microsoft.EntityFrameworkCore.Infrastructure[10403]
      Entity Framework Core 6.0.33 initialized 'EmpContext' using provider 'Microsoft.EntityFrameworkCore.SqlServer:6.0.33' with options: None
To undo this action, use Remove-Migration.
PM> update-database 

PM> 


check the database now 

now identity will be there in the table what ever i am writing earlier was going in collection now whatver i write will go in table database 

now go to web api which is using collection so i will commment collection code and put EF code here there

EmpController 
----------------
 using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Buffers.Text;
using System;
using WebApiDemo.Data;
using Microsoft.EntityFrameworkCore;

namespace WebApiDemo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmpController : ControllerBase
    {

        private readonly EmpContext _context;
        public EmpController(EmpContext context)
        {
            _context = context;
        }
        public static List<Employee> emps = new List<Employee>()
            {
                new Employee{Id=1,Name="kiran",place="Bangalore"},
                new Employee{Id=2,Name="mahesh",place="chennai"},
                new Employee{Id=3,Name="santosh",place="Delhi"},
            };
        [HttpGet]
        public async Task< ActionResult< List<Employee>>> GetEmployees()
        {

            // return Ok(emps);
            return Ok(await _context.Employees.ToListAsync());
        }

        //two post methods based on return type for employee
        [HttpPost]
        public async Task<ActionResult<List<Employee>>> AddEmployee(Employee employee)
        {
           // emps.Add(employee);
           _context.Employees.Add(employee);
            await _context.SaveChangesAsync();
            //return Ok(emps);
            return Ok(await _context.Employees.ToListAsync());
        }

        [HttpPost("emp_Post2")]
        public async Task<ActionResult<Employee>> AddEmployee2(Employee employee)
        {
            _context.Employees.Add(employee);
            await _context.SaveChangesAsync();
            // emps.Add(employee);
            return Ok(employee);
        }

        //I want to search one employee base on empid the code is like this 
        [HttpGet("{id}")]
        public async Task<ActionResult<Employee>> GetEmployee(int id)
        {
            //  var employee=emps.Find(x => x.Id == id);
            var employee = await _context.Employees.FindAsync(id);
            if (employee == null)
            {
                return BadRequest("Employee Not Found");
            }
            else
            {
                return Ok(employee);
            }
        }

//        Now i want to update any employee which is nothing but put method again here based on 
//return type of method i will write two put methods and also i will give url different to avoid confusion to swagger ui
//one put is returing that employee which is modified after modifying and another put is modifying and tellig us to see that i am giving a list check there
//whether modified or not okay

 [HttpPut]
 public async Task<ActionResult<List<Employee>>> UpdateEmployee(Employee employee)
        {
            //  var employee1 = emps.Find(x => x.Id == employee.Id);
            var employee1 = await _context.Employees.FindAsync(employee.Id);
            if (employee1 == null)
            {
                return BadRequest("Employee Not Found");
            }
            employee1.Name = employee.Name;
            employee1.place = employee.place;
            await _context.SaveChangesAsync();
            return Ok(await _context.Employees.ToListAsync());
        }

        [HttpPut("put2")]
        public async Task<ActionResult<Employee>> UpdateEmployee2(Employee employee)
        {
            // var employee1 = emps.Find(x => x.Id == employee.Id);
            var employee1 = await _context.Employees.FindAsync(employee.Id);
            if (employee1 == null)
            {
                return BadRequest("Employee Not Found");
            }
            employee1.Name = employee.Name;
            employee1.place = employee.place;
            await _context.SaveChangesAsync();
            return Ok(employee1);
        }

//        Now code for delete based on id

//Now i want to delete any employee which is nothing but delete method again here based on 
//return type of method i will write two delete methods and also i will give url different to avoid confusion to swagger ui
//one delete is returing that employee which is deleted after deleting and another delete  is deleting and tellig us to see that i am giving a list check there
//whether deleetd  or not okay

 [HttpDelete("{id}")]
 public async Task<ActionResult<Employee>> DeleteEmployee(int id)
        {
            var employee1 = await _context.Employees.FindAsync(id);
            //  var employee1 = emps.Find(x => x.Id == id);
            if (employee1 == null)
            {
                return BadRequest("Employee Not Found");
            }
            emps.Remove(employee1);
            await _context.SaveChangesAsync();
            return Ok(employee1);
        }
        [HttpDelete("del2/{id}")]
        public async Task<ActionResult<List<Employee>>> DeleteEmployee2(int id)
        {
            //  var employee1 = emps.Find(x => x.Id == id);
            var employee1 = await _context.Employees.FindAsync(id);
            if (employee1 == null)
            {
                return BadRequest("Employee Not Found");
            }
            emps.Remove(employee1);
            await _context.SaveChangesAsync();
            return Ok(await _context.Employees.ToListAsync());
        }


    }
}

run the web api and see that u are able to insert,update and delete and seelct emp table note dont enter id valeus as they are identity 

