import { createSlice } from "@reduxjs/toolkit"

const initalSate = { count: 10 }

export const counterSlice = createSlice({
    name: "counter",
    initialState: initalSate,
    
    reducers:
    {

        increment: (state) => {
            state.count =state.count + 1;
        },
        decrement: (state) =>
        {
            state.count = state.count - 1;
        },
        decrementMultiplier: (state, action) => {
            state.count -= action.payload;
        },
        incrementMultiplier: (state, action) => {
            state.count += Number(action.payload);
        },

    },


})

export const { increment, decrement,decrementMultiplier,incrementMultiplier } = counterSlice.actions;
export const counterReducer = counterSlice.reducer;