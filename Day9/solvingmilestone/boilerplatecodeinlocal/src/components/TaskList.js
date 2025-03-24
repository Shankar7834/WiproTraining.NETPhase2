import React from 'react';
import { useTasks } from '../services/TaskService';
import { useCategories } from '../services/CategoryService';

const TaskList = () => {
    const { tasks, editTask, deleteTask, toggleTaskStatus } = useTasks();
    const { categories } = useCategories();

    return (

  );
};

export default TaskList;
