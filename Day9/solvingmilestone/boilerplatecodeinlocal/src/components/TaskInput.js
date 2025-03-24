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

    };

    return (

  );
};

export default TaskInput;
