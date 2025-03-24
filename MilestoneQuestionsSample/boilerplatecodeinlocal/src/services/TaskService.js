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

};

// Create context
const TaskContext = createContext();

// Task Provider
export const TaskProvider = ({ children }) => {

};

// Custom hook to use task context
export const useTasks = () => {
    return useContext(TaskContext);
};
