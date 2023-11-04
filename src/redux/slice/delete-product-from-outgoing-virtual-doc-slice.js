import { createSlice } from '@reduxjs/toolkit';
import { deleteProductFromOutgoingVirtualDocProcess } from '../../api';


export const deleteProductFromOutgoingVirtualDocSlice = createSlice({
    name: 'removeProductfromOutgoingDocvirtualDoc',
    initialState: {
        isLoading: {},
        status: {},
        message: {},
    },
    reducers: {
        resetDeleteProductFromOutgoingVirtualDoc: state => {
            state.isLoading = {};
            state.status = {};
            state.message = {};
        },
    },
    extraReducers: {
        [deleteProductFromOutgoingVirtualDocProcess.pending]: state => {
            state.isLoading = { ...state.isLoading, deleteProductFromOutgoingVirtualDocProcess: true };
        },
        [deleteProductFromOutgoingVirtualDocProcess.fulfilled]: (state, action) => {
            state.isLoading = { ...state.isLoading, deleteProductFromOutgoingVirtualDocProcess: false };
            state.status = {
                ...state.status,
                deleteProductFromOutgoingVirtualDocProcess: action.payload?.status,
            };
            state.message = {
                ...state.message,
                deleteProductFromOutgoingVirtualDocProcess: action.payload?.message,
            };

        },
        [deleteProductFromOutgoingVirtualDocProcess.rejected]: (state, action) => {
            state.isLoading = { ...state.isLoading, deleteProductFromOutgoingVirtualDocProcess: false };
            state.status = "error";
        },
    },
});


export const { resetDeleteProductFromOutgoingVirtualDoc } = deleteProductFromOutgoingVirtualDocSlice.actions;
export default deleteProductFromOutgoingVirtualDocSlice.reducer;