import { createSlice } from "@reduxjs/toolkit";
import { authLogOut, authLogin } from "../../api";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    accessToken: null,
    status: undefined,
    isAuthenticated: '-1',
    isLoading: {},
    message: undefined,


  },
  //   reducers: {
  //     setCredentials: (state, action) => {
  //       const { accessToken } = action.payload;
  //       state.token = accessToken;
  //     },
  //     logOut: (state, action) => {
  //       state.token = null;
  //     },
  //   },
  reducers: {
    changeAuthentication: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    resetAuth: (state) => {
      state.status = undefined;
      state.isLoading = {}
      state.isAuthenticated = '0';
      state.message = {};

    }
  },
  extraReducers: {
    [authLogin.pending]: (state) => {
      state.isLoading = true;
    },
    [authLogin.fulfilled]: (state, action) => {
      state.accesToken = action.payload;
      state.status = "success";
      state.isAuthenticated = '1'
      state.isLoading = false;
      state.message = action.payload?.message

    },
    [authLogin.rejected]: (state, action) => {
      state.status = "error";
      state.isAuthenticated = '0';
      state.isLoading = false;
      state.message = action.error?.message;


    },
    [authLogOut.pending]: (state) => {
      state.isLoading = true;
    },
    [authLogOut.fulfilled]: (state, action) => {
      state.isLoading = false;
      // state.data =
      //   action.payload?.data !== undefined
      //     ? action.payload?.data
      //     : action.payload;
      state.status = "success";
      state.isAuthenticated = '0';

    },
    [authLogOut.rejected]: (state) => {
      // state.isLoading = false;
      state.status = "error";
    },
  },
});

export const { resetAuth, changeAuthentication } = authSlice.actions;


export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentToken = (state) => state.auth.token;