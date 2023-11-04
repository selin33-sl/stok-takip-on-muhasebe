import { createSlice } from "@reduxjs/toolkit";
import { addIncomingProductWithProductsProcess } from "../../api";

export const addIncomingProductWithProductsSlice = createSlice({
    name: "addIncomingProductWithProducts",
    initialState: {
        data: undefined,
        status: undefined,
        isLoading: false,
        products: [],
    },
    reducers: {
        resetAddIncomingProductWithProducts: (state) => {
            state.data = undefined;
            state.isLoading = {};
            state.status = {};
            state.message = {};
        },

    },
    extraReducers: {
        [addIncomingProductWithProductsProcess.pending]: (state) => {
            state.isLoading = true;
        },
        [addIncomingProductWithProductsProcess.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.data =
                action.payload?.data !== undefined
                    ? action.payload?.data
                    : action.payload;
            state.status = "success";
        },
        [addIncomingProductWithProductsProcess.rejected]: (state, action) => {
            state.isLoading = false;
            state.status = "error";
            state.message = action.error?.message;
        },
    },
});

export const {
    resetAddIncomingProductWithProducts,
    addProduct,
    resetProducts,
    removeProduct,
    updateProduct
} = addIncomingProductWithProductsSlice.actions;
export default addIncomingProductWithProductsSlice.reducer;