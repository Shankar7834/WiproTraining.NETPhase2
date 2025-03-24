import { createContext, useContext, useReducer } from 'react';

// Event Category actions
const ADD_CATEGORY = 'ADD_CATEGORY';
const DELETE_CATEGORY = 'DELETE_CATEGORY';

// Initial state
const initialState = {
    categories: [],
};

// Event Category reducer
const eventCategoryReducer = (state, action) => {

};

// Create context
const EventCategoryContext = createContext();

// Event Category Provider
export const EventCategoryProvider = ({ children }) => {

};

// Custom hook to use event category context
export const useEventCategories = () => {

};
