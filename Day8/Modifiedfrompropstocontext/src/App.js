// App.js
import React from 'react';
import TaskList from './components/TaskList';
import { AddTask } from './components/AddTask';
import { TaskProvider } from './components/TaskContext';

export default function App() {
  return (
    <TaskProvider>
      <div className="App">
        <AddTask />
        <TaskList />
      </div>
    </TaskProvider>
  );
}
