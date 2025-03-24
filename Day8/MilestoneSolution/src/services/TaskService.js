import { createContext, useContext, useReducer } from "react";

const ADD_TASK = "ADD_TASK";
const EDIT_TASK = "EDIT_TASK";
const DELETE_TASK = "DELETE_TASK";
const TOGGLE_TASK_STATUS = "TOGGLE_TASK_STATUS";

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
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? { ...task, ...action.payload } : task
        ),
      };
    case DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    case TOGGLE_TASK_STATUS:
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload
            ? { ...task, completed: !task.completed }
            : task
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
  const editTask = (id, taskData) =>
    dispatch({ type: EDIT_TASK, payload: { id, ...taskData } });
  const deleteTask = (taskId) =>
    dispatch({ type: DELETE_TASK, payload: taskId });
  const toggleTaskStatus = (taskId) =>
    dispatch({ type: TOGGLE_TASK_STATUS, payload: taskId });

  return (
    <TaskContext.Provider
      value={{
        tasks: state.tasks,
        addTask,
        editTask,
        deleteTask,
        toggleTaskStatus,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  return useContext(TaskContext);
};
