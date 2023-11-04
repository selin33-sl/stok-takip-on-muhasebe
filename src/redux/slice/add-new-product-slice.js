import { addNewProductProcess } from "../../api/index";
import { createSlice } from "@reduxjs/toolkit";

export const addNewProductSlice = createSlice({
    name: "addNewProduct",
    initialState: {
        data: undefined,
        status: undefined,
        isLoading: false,
        error: null,
        message: undefined,

    },
    reducers: {
        resetAddProduct: state => {
            state.data = undefined;
            state.isLoading = false;
            state.status = undefined;
            state.error = null;
            state.message = {};
        },
    },
    extraReducers: {
        // İşlem başladığında (pending)
        [addNewProductProcess.pending]: (state) => {
            state.isLoading = true;
        },
        // İşlem tamamlandığında (fulfilled)
        [addNewProductProcess.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.data = action.payload; // Assuming the response data contains the necessary data, including 'status'.
            state.status = action.payload?.status; // Safely access 'status' property using optional chaining.
            state.message = action.payload?.message
        },
        // İşlem başarısız olduğunda (rejected)
        [addNewProductProcess.rejected]: (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
            state.status = "error";
            state.message = action.error?.message;
        },
    },
});


export const { resetAddProduct } = addNewProductSlice.actions;

export default addNewProductSlice.reducer;