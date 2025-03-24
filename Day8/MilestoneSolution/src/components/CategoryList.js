import React, { useState } from "react";
import { useCategories } from "../services/CategoryService";

const CategoryList = () => {
  const { categories, addCategory, deleteCategory } = useCategories();
  const [newCategory, setNewCategory] = useState("");

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      addCategory({ id: Date.now(), name: newCategory });
      setNewCategory("");
    }
  };

  return (
    <div>
      <h2>Categories</h2>
      <input
        type="text"
        value={newCategory}
        onChange={(e) => setNewCategory(e.target.value)}
        placeholder="New Category"
      />
      <button onClick={handleAddCategory}>Add Category</button>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>
            {category.name}
            <button onClick={() => deleteCategory(category.id)}>
              Remove Category
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
