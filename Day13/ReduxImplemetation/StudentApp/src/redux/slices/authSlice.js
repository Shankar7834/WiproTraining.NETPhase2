import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AuthService from "../../services/AuthService";

// Async action for login
export const loginUser = createAsyncThunk("auth/login", async (userData, { rejectWithValue }) => {
    try {
        const response = await AuthService.login(userData);
        return response; // Contains user data with token
    } catch (error) {
        return rejectWithValue("Invalid credentials");
    }
});

const authSlice = createSlice({
    name: "auth",
    initialState: { user: JSON.parse(localStorage.getItem("user")) || null, error: null },
    reducers: {
        logout: (state) => {
            state.user = null;
            localStorage.removeItem("user");
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.fulfilled, (state, action) => {
                state.user = action.payload; // Set logged-in user
                localStorage.setItem("user", JSON.stringify(action.payload));
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.error = action.payload;
            });
    },
});

export const { logout } = authSlice.actions;
export const logoutUser = () => (dispatch) => {
    AuthService.logout();
    dispatch(logout());
};

export default authSlice.reducer;
