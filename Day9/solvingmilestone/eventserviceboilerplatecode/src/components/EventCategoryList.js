import React, { useState } from 'react';
import { useEventCategories } from '../services/EventCategoryService';

const EventCategoryList = () => {
    const { categories, addCategory, deleteCategory } = useEventCategories();
    const [newCategory, setNewCategory] = useState('');

    const handleAddCategory = () => {
        if (newCategory) {
            addCategory({ id: Date.now(), name: newCategory });
            setNewCategory('');
        }
    };

    return (

    );
};

export default EventCategoryList;
