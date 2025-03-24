import { createContext, useContext, useReducer } from 'react';

// Category actions
const ADD_CATEGORY = 'ADD_CATEGORY';
const DELETE_CATEGORY = 'DELETE_CATEGORY';

// Initial state
const initialState = {
    categories: [],
};

// Category reducer
const categoryReducer = (state, action) => {

};

// Create context
const CategoryContext = createContext();

// Category Provider
export const CategoryProvider = ({ children }) => {

};

// Custom hook to use category context
export const useCategories = () => {

};
