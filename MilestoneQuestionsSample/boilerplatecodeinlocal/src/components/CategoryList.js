import React, { useState } from 'react';
import { useCategories } from '../services/CategoryService';

const CategoryList = () => {
    const { categories, addCategory, deleteCategory } = useCategories();
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

export default CategoryList;
