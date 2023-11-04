import { createSlice } from "@reduxjs/toolkit";
import { addNewCategoryProcess } from "../../api";

export const addNewCategorySlice = createSlice({
    name: "newCategory",
    initialState: {
        data: undefined,
        status: {},
        isLoading: false,
        message: {}
    },
    reducers: {
        resetAddCategory: (state) => {
            state.data = undefined;
            state.isLoading = {};
            state.status = {};
            state.message = {};

        },
    },
    extraReducers: {
        [addNewCategoryProcess.pending]: (state) => {
            state.isLoading = true;
        },
        [addNewCategoryProcess.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.data =
                action.payload?.data !== undefined
                    ? action.payload?.data
                    : action.payload;
            state.status = action.payload?.status;

        },
        [addNewCategoryProcess.rejected]: (state, action) => {
            state.isLoading = false;
            state.status = "error";
            state.message = action.error?.message
        },
    },
});

export const { resetAddCategory } = addNewCategorySlice.actions;
export default addNewCategorySlice.reducer;