import { createSlice } from "@reduxjs/toolkit";
import { registerProcess } from "../../api";


export const registerSlice = createSlice({
    name: "register",
    initialState: {
        isLoading: {},
        status: undefined,
        message: {},
    },
    reducers: {
        resetRegister: (state) => {
            state.isLoading = {};
            state.status = undefined;
            state.message = {};
        },
    },
    extraReducers: {
        [registerProcess.pending]: (state) => {
            state.isLoading = { ...state.isLoading, registerProcess: true };
        },
        [registerProcess.fulfilled]: (state, action) => {
            state.isLoading = { ...state.isLoading, registerProcess: false };
            state.status = {
                ...state.status,
                registerProcess: action.payload?.status,
            };
            state.message = {
                ...state.message,
                registerProcess: action.payload?.message,
            };
        },
        [registerProcess.rejected]: (state, action) => {
            state.isLoading = { ...state.isLoading, registerProcess: false };
            state.status = "error";
            state.message = action.error?.message;

        },
    },
});
export const { resetRegister } = registerSlice.actions;
export default registerSlice.reducer;