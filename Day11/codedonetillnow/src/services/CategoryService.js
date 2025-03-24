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

    switch (action.type)
    {
        case ADD_CATEGORY:

            return { ...state, categories: [...state.categories, action.payload] };
        
        case DELETE_CATEGORY:

            return { ...state, categories: state.categories.filter((category) => category.id !== action.payload) }
        
        default: return state;


    }


};

// Create context
const CategoryContext = createContext();

// Category Provider
export const CategoryProvider = ({ children }) => {

    const [state, dispatch] = useReducer(categoryReducer, initialState);

    const addCategory = (category) => {
        dispatch({ type: ADD_CATEGORY ,payload:category})
    }

    const deleteCategory = (categoryid) => {
        dispatch({ type: DELETE_CATEGORY,payload:categoryid })        

    }

    return (

        <CategoryContext.Provider value={{ categories: state.categories, addCategory, deleteCategory }}>
            
            {children}

        </CategoryContext.Provider>
    )

};

// Custom hook to use category context
export const useCategories = () => {
    return useContext(CategoryContext);
};
