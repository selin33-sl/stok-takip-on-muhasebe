import { createSlice } from '@reduxjs/toolkit';
import { deleteProductFromIncomingVirtualDocProcess } from '../../api';


export const deleteProductFromIncomingVirtualDocSlice = createSlice({
    name: 'removeProductfromIncomingvirtualDoc',
    initialState: {
        isLoading: {},
        status: {},
        message: {},
    },
    reducers: {
        resetDeleteProductFromIncomingVirtualDoc: state => {
            state.isLoading = {};
            state.status = {};
            state.message = {};
        },
    },
    extraReducers: {
        [deleteProductFromIncomingVirtualDocProcess.pending]: state => {
            state.isLoading = { ...state.isLoading, deleteProductFromIncomingVirtualDocProcess: true };
        },
        [deleteProductFromIncomingVirtualDocProcess.fulfilled]: (state, action) => {
            state.isLoading = { ...state.isLoading, deleteProductFromIncomingVirtualDocProcess: false };
            state.status = {
                ...state.status,
                deleteProductFromIncomingVirtualDocProcess: action.payload?.status,
            };
            state.message = {
                ...state.message,
                deleteProductFromIncomingVirtualDocProcess: action.payload?.message,
            };

        },
        [deleteProductFromIncomingVirtualDocProcess.rejected]: (state, action) => {
            state.isLoading = { ...state.isLoading, deleteProductFromIncomingVirtualDocProcess: false };
            state.status = "error";
        },
    },
});


export const { resetDeleteProductFromIncomingVirtualDoc } = deleteProductFromIncomingVirtualDocSlice.actions;
export default deleteProductFromIncomingVirtualDocSlice.reducer;