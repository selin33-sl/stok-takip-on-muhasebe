import { createSlice } from "@reduxjs/toolkit";
import { addOutgoingProductWithProductsProcess } from "../../api";

export const addOutgoingProductWithProductsSlice = createSlice({
    name: "addOutgoingProductWithProducts",
    initialState: {
        data: undefined,
        status: undefined,
        isLoading: false,
        products: [],
    },
    reducers: {
        resetAddOutgoingProductWithProducts: (state) => {
            state.data = undefined;
            state.isLoading = {};
            state.status = {};
            state.message = {};
        },

    },
    extraReducers: {
        [addOutgoingProductWithProductsProcess.pending]: (state) => {
            state.isLoading = true;
        },
        [addOutgoingProductWithProductsProcess.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.data =
                action.payload?.data !== undefined
                    ? action.payload?.data
                    : action.payload;
            state.status = "success";
        },
        [addOutgoingProductWithProductsProcess.rejected]: (state, action) => {
            state.isLoading = false;
            state.status = "error";
            state.message = action.error?.message;
        },
    },
});

export const {
    resetAddOutgoingProductWithProducts,
    addProduct,
    resetProducts,
    removeProduct,
    updateProduct
} = addOutgoingProductWithProductsSlice.actions;
export default addOutgoingProductWithProductsSlice.reducer;