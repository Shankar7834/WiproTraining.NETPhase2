import { createContext, useContext, useReducer } from "react";

const ADD_CATEGORY = "ADD_CATEGORY";
const DELETE_CATEGORY = "DELETE_CATEGORY";

const initialState = {
  categories: [
    { id: 1, name: "Personal" },
    { id: 2, name: "Shopping" }
  ],
};

const categoryReducer = (state, action) => {
  switch (action.type) {
    case ADD_CATEGORY:
      return { ...state, categories: [...state.categories, action.payload] };
    case DELETE_CATEGORY:
      return {
        ...state,
        categories: state.categories.filter(
          (category) => category.id !== action.payload
        ),
      };
    default:
      return state;
  }
};

const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [state, dispatch] = useReducer(categoryReducer, initialState);

  const addCategory = (category) =>
    dispatch({ type: ADD_CATEGORY, payload: category });
  const deleteCategory = (categoryId) =>
    dispatch({ type: DELETE_CATEGORY, payload: categoryId });

  return (
    <CategoryContext.Provider
      value={{ categories: state.categories, addCategory, deleteCategory }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategories = () => {
  return useContext(CategoryContext);
};
