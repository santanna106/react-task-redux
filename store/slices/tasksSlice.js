import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tasks: [],
};

export const taskSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        addTask: (state, action) => {
            const taskWithId = {
                ...action.payload,
                id: Date.now(),
                completed: false
            }
            state.tasks.push(taskWithId);
        },

        toggleTaskComplete: (state, action) => {
            const task = state.tasks.find(task => task.id === action.payload);
            if (task) {
                task.completed = !task.completed;
            }
        },

        editTask: (state, action) => {
            const task = state.tasks.find(task => task.id === action.payload.id);
            if (task) {
                task.name = action.payload.name;
                task.description = action.payload.description;
            }
        },
        deleteTask: (state, action) => {
            state.tasks = state.tasks.filter(task => task.id !== action.payload);
        },
    },
});

export const { addTask, toggleTaskComplete, editTask, deleteTask } = taskSlice.actions;

export const selectTasks = (state) => state.tasks.tasks;
export const selectPendingTasks = (state) => state.tasks.tasks.filter(task => !task.completed);
export const selectCompletedTasks = (state) => state.tasks.tasks.filter(task => task.completed);

export default taskSlice.reducer;