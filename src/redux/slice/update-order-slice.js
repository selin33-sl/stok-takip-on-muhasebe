import { updateOrderProcess } from "../../api/index";
import { createSlice } from "@reduxjs/toolkit";

export const updateOrderSlice = createSlice({
    name: "updateOrder",
    initialState: {
        data: undefined,
        status: undefined,
        isLoading: false,
        message: {},

    },
    reducers: {
        resetUpdateOrder: (state) => {
            state.data = undefined;
            state.isLoading = {};
            state.status = {};
            state.message = {};

        },
    },
    extraReducers: {
        [updateOrderProcess.pending]: (state) => {
            state.isLoading = true;
        },
        [updateOrderProcess.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.data =
                action.payload?.updateOrder !== undefined
                    ? action.payload?.updateOrder
                    : action.payload;
            state.status = action.payload?.status;
        },
        [updateOrderProcess.rejected]: (state, action) => {
            state.isLoading = false;
            state.status = "error";
            state.message = action.error?.message

        }
    },
});

export const { resetUpdateOrder } = updateOrderSlice.actions;

export default updateOrderSlice.reducer;