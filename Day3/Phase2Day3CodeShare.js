
Redux in React
Redux is a state management library for JavaScript applications, commonly used with React. It helps manage application state in a predictable manner by using a centralized store.

Why Use Redux?
React’s built-in state management works well for small applications, but as the app grows, managing shared state between multiple components can become complex. Redux provides:
 
A single source of truth (centralized state)
Predictable state updates using pure functions (reducers)
Easier debugging with tools like Redux DevTools
Scalability for large applications


All of crete a new app in your day 3 folder name reduxopedia and do intial set up means in public copy logo pics into images folder m eans create folder images in src and move the images 
over there and keep index.js and css and app.js and css files and package json files keepand remaining all delete it 

so in public folder index.hmtl and manifest file if u want keep it or remove it but in public folder index.html file should be there 

REDUXOPEDIA
│── node_modules
│── public
│   │── index.html
│   │── manifest.json
│── src
│   │── images
│   │   │── logo192.png
│   │   │── logo512.png
│   │── App.css
│   │── App.js
│   │── index.css
│   │── index.js
│   │── setupTests.js
│── package-lock.json
│── package.json
│── README.md


index.js 
-----------
  import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);



App.js 
---------
  
import './App.css';

function App() {
  return (
    <div className="App">
    <h1>Hello world</h1>
    </div>
  );
}

export default App;

now go to index.html page and paste this whole code below which i am giving it to you 

index.html
--------------
  <!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8" />
  <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="theme-color" content="#000000" />
  <meta name="description" content="Web site created using create-react-app" />
  <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
  
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" />
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>

  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.2/font/bootstrap-icons.css" />

  <title>React App</title>
</head>

<body class="m-0" style="background-color: black">
  <noscript>You need to enable JavaScript to run this app.</noscript>
  <div id="root"></div>
  
</body>

</html>


Now create one folder components in src folder and add there Header.js file like this 

Header.js 
--------------
 import React from "react";
import logo from "../images/logo192.png";
function Header() {
    return (
        <div className="pt-3 pl-2">
            <img src={logo} alt="" style={{ height: "35px", verticalAlign: "top" }} />{" "}
            <span className="h2 pt-4 text-white-50">React Course - ReduxOpedia</span>
        </div>
    );
}
export default Header;
and in index.js 
-----------------
  import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Header from './components/Header';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Header />
   
    
  </React.StrictMode>
);


so you can go to these links and get some knowledge theortially and practically from these links about redux 

 https://react-redux.js.org/ 
https://redux-toolkit.js.org/  

Not that much impotant now what u do in from the terminal means open another terminal and write the below command 


npm install @reduxjs/toolkit react-redux


now then inside src create new folder redux and in that folder again file with the name store.js

store.js 
---------
  import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
   
  },
});


// here i am configurig store so for an application i will create one store and 
//all compoenents will use that store this is like you are using one database kind 
//for all the components okay 
 

Then go to index.js and configure the store means all components should be able to acccess that store for that purpose i am writing liek this 

and this store is mainly wrapped in provider class so index.js file 

index.js 
---------
  import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import Header from './components/Header';
import { store } from './redux/store';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
 
      <Header />
   
    </Provider>
  </React.StrictMode>
);


// so header or any other component will use store that is why kept on the top and 
//also u have to include provider namespace also okay the application will be same
//as still this store i had not used any where okay ..
// so here provider is something which will wrap the complete application 
// through provider u can modify the global store which is store 



Now i want to work on the store which u created above

now create one compoent Counter.js in components folder 

Counter.js 
---------
 import React from "react";

function Counter() {
    return <div>Counter</div>;
}

export default Counter;


Inside redux folder create a new folder which is slice and in that create a file with the name counterSlice.js 

here i am slicing my redux store or you can say i am splitting so there will be different components in the project so


REDUXOPEDIA
│── node_modules
│── public
│   │── index.html
│   │── manifest.json
│── src
│   │── components
│   │   │── Counter.js
│   │   │── Header.js
│   │── images
│   │   │── logo192.png
│   │   │── logo512.png
│   │── redux
│   │   │── slice
│   │   │   │── counterSlice.js
│   │   │── store.js
│   │── App.css
│   │── App.js
│   │── index.css
│   │── index.js
│   │── setupTests.js
│── package-lock.json
│── package.json
│── README.md


counterSlice.js
------------------
 import { createSlice } from "@reduxjs/toolkit"

const initalSate = { count: 0 }

export const counterSlice = createSlice({
    name: "counter",
    initialState: initalSate,
    
    reducers:
    {

        increment: (state) => {
            state.count + 1;
        },
        decrement: (state) =>
        {
            state.count - 1;
        }

    },


})

export const { increment, decrement } = counterSlice.actions;
export const counterReducer = counterSlice.reducer;



so above is the code for counterSlice.js so when you are working on store it is a reducer and now when in slice it is reducers so i am having a counterSlice which is having a name as counter and intialstate as some intialstate and then we are seeing here reducers okay 

reducers are nothing but actions methods on counter which is increment and decrement method in counter .

so reducers will have all of those actions which are related to that particular slide .

here state is the state of slice it is not the state  of redux store .it is the slice state which u have right here inside the slice only 

Here the advantage of redux is that here i can directly modify the state without using prevState which we were doing in use State okay 

now come to store.js file 

store.js
----------
 import { configureStore } from "@reduxjs/toolkit";
import { counterReducer } from "./slice/counterSlice";

export const store = configureStore({
    reducer: {

        counterStore:counterReducer

    },
});

console.log(store.getState());
store.dispatch({
    type: "counter/increment",

})

console.log(store.getState());

Now in the counterSlice i will make the value from 0 to 10 

import { createSlice } from "@reduxjs/toolkit"

const initalSate = { count: 10 }

export const counterSlice = createSlice({
    name: "counter",
    initialState: initalSate,
    
    reducers:
    {

        increment: (state) => {
            state.count =state.count + 1;
        },
        decrement: (state) =>
        {
            state.count = state.count - 1;
        }

    },


})

export const { increment, decrement } = counterSlice.actions;
export const counterReducer = counterSlice.reducer;

and again and run and see the effect u will see 10 and then 11 

in console.log you can see here 

here u are testing it in console log now apply your storage to Counter component how to apply let us see 

Next what to do is go to Counter.js

Counter.js 
------------
import React from "react";
import { useSelector } from "react-redux";
function Counter() {
    const count = useSelector((state) => state.counterStore.count);
    return <div style={{color:"white"}}>{count}</div>;
}

export default Counter;


and then call that in index.js file now 

index.js 
-----------
import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./app/layout/Header";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import Counter from "./app/components/Counter";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <div className="text-white">
    <Provider store={store}>
      <Header />
      <Counter />
    </Provider>
  </div>
);


Now i want to put buttons and want to increment and decrement based on buttons in
so in Counter.jsx code changed


Counter.js 
----------
import React from "react";
import { useSelector} from "react-redux";

function Counter() {
  const count = useSelector((state) => state.counterStore.count);
 
  return (
    <div
      className=" mt-2 pt-3 pl-2 text-center"
      style={{ borderTop: "1px solid #999" }}
    >
      <div className="text-white pb-2 h4">Counter : {count}</div>
      <div className="row">
        <div className=" p-4 col-12 col-md-6">
          <div className="border p-4">
            <button
              className="btn btn-primary"
              
            >
              Add
            </button>{" "}
            &nbsp;
            <button
              className="btn btn-danger"
             
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Counter;

Now i want to import action methods of counterSlcie as well so Counter.js 

updated code 

Counter.js 
------------
 import React from "react";
import { useSelector,useDispatch } from "react-redux";
import { increment,decrement } from "../redux/slice/counterSlice";
function Counter() {
    const count = useSelector((state) => state.counterStore.count);
    const dispatch = useDispatch();
    return (
        <div
            className=" mt-2 pt-3 pl-2 text-center"
            style={{ borderTop: "1px solid #999" }}
        >
            <div className="text-white pb-2 h4">Counter : {count}</div>
            <div className="row">
                <div className=" p-4 col-12 col-md-6">
                    <div className="border p-4">
                        <button
                            className="btn btn-primary"

                            onClick={()=>dispatch(increment())}

                        >
                            Add
                        </button>{" "}
                        &nbsp;
                        <button
                            className="btn btn-danger"
                            onClick={()=>dispatch(decrement())}

                        >
                            Remove
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Counter;

 Now after remove button and after another two divisions add  this desing in the Counter.js file 


<div className=" p-4 col-12 col-md-6">
          <div className="border p-4">
            <h4 className="text-success pb-2">Multiplier Counter</h4>
            <div className="row">
              <div className="col-4 p-1">
                <input
                  type="text"
                  placeholder="multipler..."
                  className="form-control"
                 
                />
              </div>
              <div className="col-4 p-1">
                <button
                  className="btn btn-primary form-control"
                 
                >
                  Add
                </button>
              </div>
              <div className="col-4 p-1">
                <button
                  className="btn btn-danger form-control"
                 
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>


********************************************
*  React Course - ReduxOpedia              *
********************************************
                   Counter : 11            

--------------------------------------------
|                                          |
|         [ Add ]      [ Remove ]          |
|                                          |
--------------------------------------------

--------------------------------------------
|           Multiplier Counter             |
|  --------------------------------------  |
|  | multiplier...  | [ Add ] [ Remove ]  |
|  --------------------------------------  |
--------------------------------------------


 so you are getting like this 
now in the textbox i will enter some value say 12 then counter should be incremnt by 12 andn if clicke 
 remove what ever present value of counter that has to decemented y 12
now go to counterSlice.js 

and add some methods for taking payload values 

counterSlice.js 
---------------
 import { createSlice } from "@reduxjs/toolkit"

const initalSate = { count: 10 }

export const counterSlice = createSlice({
    name: "counter",
    initialState: initalSate,
    
    reducers:
    {

        increment: (state) => {
            state.count =state.count + 1;
        },
        decrement: (state) =>
        {
            state.count = state.count - 1;
        },
        decrementMultiplier: (state, action) => {
            state.count -= action.payload;
        },
        incrementMultiplier: (state, action) => {
            state.count += Number(action.payload);
        },

    },


})

export const { increment, decrement,decrementMultiplier,incrementMultiplier } = counterSlice.actions;
export const counterReducer = counterSlice.reducer;

Now come to Counter.js 

------------------------

 import React from "react";
import { useSelector,useDispatch } from "react-redux";
import { increment, decrement,decrementMultiplier,incrementMultiplier } from "../redux/slice/counterSlice";
import { useState } from "react";
function Counter() {
    const count = useSelector((state) => state.counterStore.count);
    const dispatch = useDispatch();
    const [multiplier, setMultiplier] = useState(10);
    return (
        <div
            className=" mt-2 pt-3 pl-2 text-center"
            style={{ borderTop: "1px solid #999" }}
        >
            <div className="text-white pb-2 h4">Counter : {count}</div>
            <div className="row">
                <div className=" p-4 col-12 col-md-6">
                    <div className="border p-4">
                        <button
                            className="btn btn-primary"

                            onClick={()=>dispatch(increment())}

                        >
                            Add
                        </button>{" "}
                        &nbsp;
                        <button
                            className="btn btn-danger"
                            onClick={()=>dispatch(decrement())}

                        >
                            Remove
                        </button>
                    </div>
                </div>

                <div className=" p-4 col-12 col-md-6">
                    <div className="border p-4">
                        <h4 className="text-success pb-2">Multiplier Counter</h4>
                        <div className="row">
                            <div className="col-4 p-1">
                                <input
                                    type="text"
                                    placeholder="multipler..."
                                    className="form-control"
                                    value={multiplier} 
                                    onChange={(e)=>setMultiplier(e.target.value)}
                                

                                />
                                <span style={{ color: "white" }}> {multiplier }</span> 
                            </div>
                            <div className="col-4 p-1">
                                <button
                                    className="btn btn-primary form-control"
                                     onClick={()=>dispatch(incrementMultiplier(multiplier))}
                                >
                                    Add
                                </button>
                            </div>
                            <div className="col-4 p-1">
                                <button
                                    className="btn btn-danger form-control"
                                    onClick={() => dispatch(decrementMultiplier(multiplier))}
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    </div>  
                    </div>


            </div>
        </div>
    )
}

export default Counter;


in the slice folder create a new file destinationSlice.js file and code  is like this 

destinationSlice.js 
--------------------
 import { createSlice } from "@reduxjs/toolkit";

const initalState = () => {
  return {
    destinations: [
      {
        name: "Hong Kong",
        days: 7,
        fact: "World's longest covered escalator",
      },
      {
        name: "Japan",
        days: 10,
        fact: "Japan is mostly mountains",
      },
      {
        name: "New Zealand",
        days: 14,
        fact: "Last country in the world to be inhabited by humans",
      },
    ],
  };
};

export const destinationSlice = createSlice({
  name: "destination",
  initialState: initalState,
  reducers: {},
});

export const destinationReducer = destinationSlice.reducer;


store.js 
----------
 import { configureStore } from "@reduxjs/toolkit";
import { counterReducer } from "./slice/counterSlice";
import { destinationReducer } from "./slice/destinationSlice";

export const store = configureStore({
    reducer: {

        counterStore: counterReducer,
        destinationStore:destinationReducer

    },
});

console.log(store.getState());
store.dispatch({
    type: "counter/increment",

})

console.log(store.getState());


now in componenets folder create DestinationList.js file 

DestinationList.js 
-------------------
 import React from "react";
import { useSelector } from "react-redux";

function DestinationList() {
  const destinationList = useSelector(
    (state) => state.destinationStore.destinations
  );
  return destinationList.map((destination, index) => {
    return (
      <div
        className="text-center text-white row"
        style={{ borderBottom: "1px solid #333" }}
        key={index}
      >
        <div className="col-8 col-md-3 offset-md-3 pt-2">
          {destination.name}
        </div>
        <div className="col-4 col-md-2">
          <button className="btn btn-success form-control m-1">Details</button>
        </div>
      </div>
    );
  });
}

export default DestinationList;
 

index.js 
----------
 
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import Header from './components/Header';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import Counter from './components/Counter';
import DestinationList from './components/DestinationList';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
 
      <Header />
      <Counter />
      <DestinationList/>
    </Provider>
  </React.StrictMode>
);

Now on click of details button i want to retrieve the values 

so go to destinationSlice.js file and the updated code is 

destionationSlice.js 
---------------------
 import { createSlice } from "@reduxjs/toolkit";

const initalState = () => {
    return {
        destinations: [
            {
                name: "Hong Kong",
                days: 7,
                fact: "World's longest covered escalator",
            },
            {
                name: "Japan",
                days: 10,
                fact: "Japan is mostly mountains",
            },
            {
                name: "New Zealand",
                days: 14,
                fact: "Last country in the world to be inhabited by humans",
            },
        ],
        destinationSelected: null,
    };
};




export const destinationSlice = createSlice({
    name: "destination",
    initialState: initalState,
    reducers: {

        destinationClicked: (state, action) => {
            state.destinationSelected = action.payload;
            console.log(action);
        },


    },
});
export const { destinationClicked } = destinationSlice.actions;
export const destinationReducer = destinationSlice.reducer;


DestinationList.js 
-------------------
import React from "react";
import { useSelector,useDispatch } from "react-redux";
import { destinationClicked } from "../redux/slice/destinationSlice";

function DestinationList() {
    const destinationList = useSelector(
        (state) => state.destinationStore.destinations
    );
    const dispatch = useDispatch();
    return destinationList.map((destination, index) => {
        return (
            <div
                className="text-center text-white row"
                style={{ borderBottom: "1px solid #333" }}
                key={index}
            >
                <div className="col-8 col-md-3 offset-md-3 pt-2">
                    {destination.name}
                </div>
                <div className="col-4 col-md-2">
                    <button className="btn btn-success form-control m-1"
                    onClick={()=>dispatch(destinationClicked(destination))}
                    >Details</button>
                </div>
            </div>
        );
    });
}

export default DestinationList;

 now i have to show this value in anoher component so create one component DestinationFact.js in components fodler 

DestinationFact.js 
-----------------
import React from "react";
import { useSelector } from "react-redux";

function DestinationFact() {
    const selectedDestination = useSelector(
        (state) => state.destinationStore.destinationSelected
    );
    if (selectedDestination == undefined) {
        return (
            <div className="text-center pt-4 text-warning">Select a Destination</div>
        );
    } else {
        return (
            <div className="text-center border p-3 m-3">
                <h4 className="text-success">{selectedDestination.name}</h4>
                <span style={{color:"white"}}>   Days Recommened : {selectedDestination.days}</span> <br />
                <span style={{ color: "white" }}>     Fun Fact : {selectedDestination.fact}</span> <br />
            </div>
        );
    }
}

export default DestinationFact;

index.js 
-----------
 import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import Header from './components/Header';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import Counter from './components/Counter'; 
import DestinationList from './components/DestinationList';
import DestinationFact from './components/DestinationFact';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
 
      <Header />
      <Counter />
      <DestinationList />
      <DestinationFact/>
    </Provider>
  </React.StrictMode>
);
Custom Hook
***********
A custom hook in React is a reusable function that contains logic using built-in hooks (useState, useEffect, etc.). Custom hooks allow you to extract reusable logic from components, making them cleaner and more maintainable.

When to Use Custom Hooks?
When multiple components share the same logic.
To abstract API calls, authentication, or form handling.
To separate concerns and keep components cleaner.


 in the above program only i will add one js file with the name UserList.js in componenets folder 

 A code without custom hook

UserList.js
---------------------------

 import React, { useState, useEffect } from "react";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        return response.json();
      })
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name} - {user.email}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
 index.js file 
------------
 import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import Header from './components/Header';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import Counter from './components/Counter';
import DestinationList from './components/DestinationList';
import DestinationFact from './components/DestinationFact';
import UserList from './components/UserList';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
 
      <Header />
      <Counter />
      <DestinationList />
      <DestinationFact />
      <UserList/>
    </Provider>
  </React.StrictMode>
);


Problem: The fetching logic is inside the component, making it harder to reuse.

Refactored Code (Using a Custom Hook useFetch)
Now, we extract the data fetching logic into a separate function called useFetch.

now add another file useFetch.js into compoennts foldr 

and logic for usefecth.js 
---------------------------

import React, { useState, useEffect } from "react";

const useFetch = (url) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
            fetch(url)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Failed to fetch users");
                    }
                    return response.json();
                })
                .then((data) => {
                    setData(data);
                    setLoading(false);
                })
                .catch((err) => {
                    setError(err.message);
                    setLoading(false);
                });
        }, [url]);

    return { data ,loading,error}
}

export default useFetch;
 
Then userlist using custom hook useFetch

UserList.js 
----------------
import React, { useState, useEffect } from "react";
import useFetch from "./useFetch";

const UserList = () => {
    const { data, loading, error } = useFetch("https://jsonplaceholder.typicode.com/users");
   

    if (loading) return <p>Loading users...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div style={{color:"white"}}>
            <h2>User List</h2>
            <ul>
                {data.map((user) => (
                    <li key={user.id}>{user.name} - {user.email}</li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;

so u can see the function is retuning 3 values if success data if error erro and if not successs and no error then it is loading so all those values  I am destrucrring 
into tuple varibale and displaying it 
 
