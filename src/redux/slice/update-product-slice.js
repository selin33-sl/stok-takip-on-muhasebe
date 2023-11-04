import { updateProductProcess } from "../../api/index";
import { createSlice } from "@reduxjs/toolkit";

export const updateProductSlice = createSlice({
    name: "productUpdate",
    initialState: {
        data: undefined,
        status: undefined,
        isLoading: false,
        message: {},
    },
    reducers: {
        resetUpdateProduct: (state) => {
            state.data = undefined;
            state.status = undefined;
            state.isLoading = false;
            state.message = {};

        },
    },
    extraReducers: {
        [updateProductProcess.pending]: (state) => {
            state.isLoading = true;
        },
        [updateProductProcess.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.data =
                action.payload?.updatedProduct !== undefined
                    ? action.payload?.updatedProduct
                    : action.payload;
            state.status = action.payload?.status;
        },
        [updateProductProcess.rejected]: (state, action) => {
            state.isLoading = false;
            state.status = "error";
            state.message = action.error?.message
        },
    },
});

export const { resetUpdateProduct } = updateProductSlice.actions;
export default updateProductSlice.reducer;