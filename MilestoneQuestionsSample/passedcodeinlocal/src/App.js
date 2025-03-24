import React from "react";
import { CategoryProvider } from "./services/CategoryService";
import { TaskProvider } from "./services/TaskService";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <CategoryProvider>
      <TaskProvider>
        <Dashboard />
        <a
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: "block", marginTop: "20px" }}
        >
          learn react
        </a>
      </TaskProvider>
    </CategoryProvider>
  );
}

export default App;

