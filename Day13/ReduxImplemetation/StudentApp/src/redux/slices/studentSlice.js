import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import StudentService from "../../services/StudentService";

// Fetch all students
export const fetchStudents = createAsyncThunk("students/fetchAll", async (_, { rejectWithValue }) => {
    try {
        const response = await StudentService.getAllStudents();
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Failed to fetch students");
    }
});

// Add a new student
export const addStudent = createAsyncThunk("students/add", async (formData, { rejectWithValue }) => {
    try {
        const response = await StudentService.createStudent(formData);
        return response.data; // Return newly added student
    } catch (error) {
        return rejectWithValue(error.response?.data || "Failed to add student");
    }
});

// Update student (only modified fields will be sent)
export const updateStudent = createAsyncThunk("students/update", async ({ id, formData }, { rejectWithValue }) => {
    try {
        console.log("Updating student in API:", id);
        formData.forEach((value, key) => {
            console.log(`${key}: ${value}`); // Debugging log
        });

        const response = await StudentService.updateStudent(id, formData);
        return response.data; // Return updated student
    } catch (error) {
        return rejectWithValue(error.response?.data || "Failed to update student");
    }
});

// Delete student
export const deleteStudent = createAsyncThunk("students/delete", async (id, { rejectWithValue }) => {
    try {
        await StudentService.deleteStudent(id);
        return id; // Return deleted student ID
    } catch (error) {
        return rejectWithValue(error.response?.data || "Failed to delete student");
    }
});

// Student Slice
const studentSlice = createSlice({
    name: "students",
    initialState: {
        students: [], // List of students
        selectedStudent: null, // Selected student for editing
        loading: false, // Loading state
        error: null // Error handling
    },
    reducers: {
        // Set the selected student for editing
        setSelectedStudent: (state, action) => {
            state.selectedStudent = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch students
            .addCase(fetchStudents.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchStudents.fulfilled, (state, action) => {
                state.loading = false;
                state.students = action.payload;
            })
            .addCase(fetchStudents.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Add student
            .addCase(addStudent.pending, (state) => {
                state.loading = true;
            })
            .addCase(addStudent.fulfilled, (state, action) => {
                state.loading = false;
                state.students.push(action.payload); // Append new student to the list
            })
            .addCase(addStudent.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Update student
            .addCase(updateStudent.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateStudent.fulfilled, (state, action) => {
                state.loading = false;
                const updatedStudent = action.payload;

                // Replace only the updated student in Redux state
                state.students = state.students.map(student =>
                    student.id === updatedStudent.id ? { ...student, ...updatedStudent } : student
                );

                state.selectedStudent = null; // Clear selected student after update
            })
            .addCase(updateStudent.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Delete student
            .addCase(deleteStudent.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteStudent.fulfilled, (state, action) => {
                state.loading = false;
                state.students = state.students.filter(student => student.id !== action.payload);
            })
            .addCase(deleteStudent.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { setSelectedStudent } = studentSlice.actions;
export default studentSlice.reducer;
