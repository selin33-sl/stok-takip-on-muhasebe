import { updateCategoryProcess } from '../../api';
import { createSlice } from "@reduxjs/toolkit";

export const updateCategorySlice = createSlice({
    name: "updateCategory",
    initialState: {
        data: undefined,
        status: undefined,
        isLoading: false,
    },
    reducers: {
        resetUpdateCategory: state => {
            state.isLoading = {};
            state.status = undefined;
            state.message = {};
        },
    },
    extraReducers: {
        [updateCategoryProcess.pending]: (state) => {
            state.isLoading = true;
        },
        [updateCategoryProcess.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.data =
                action.payload?.data !== undefined
                    ? action.payload?.data
                    : action.payload;
            state.status = "success";
        },
        [updateCategoryProcess.rejected]: (state) => {
            state.isLoading = false;
            state.status = "error";
        }
    },
});

export const { resetUpdateCategory } = updateCategorySlice.actions;

export default updateCategorySlice.reducer;