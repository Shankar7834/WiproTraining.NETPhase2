import { createContext, useContext, useReducer } from 'react';

// Event actions
const ADD_EVENT = 'ADD_EVENT';
const EDIT_EVENT = 'EDIT_EVENT';
const DELETE_EVENT = 'DELETE_EVENT';
const TOGGLE_EVENT_STATUS = 'TOGGLE_EVENT_STATUS';

// Initial state
const initialState = {
    events: [],
};

// Event reducer
const eventReducer = (state, action) => {

};

// Create context
const EventContext = createContext();

// Event Provider
export const EventProvider = ({ children }) => {

};

// Custom hook to use event context
export const useEvents = () => {

};
