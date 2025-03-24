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

  );
};

export default Dashboard;
