import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    login: {
      currentUser: null,
      isFetching: false,
      error: false,
    },
    register: {
      isFetching: false,
      isSuccess: false,
      error: false,
    },
  },
  reducers: {
    loginStart: (state) => {
      state.login.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.login.isFetching = false;
      state.login.currentUser = action.payload;
    },
    loginFailed: (state) => {
      state.login.isFetching = false;
      state.login.error = true;
    },
    registerStart: (state) => {
      state.register.isFetching = true;
    },
    registerSuccess: (state) => {
      state.register.isFetching = false;
      state.register.isSuccess = true;
      state.register.error = false;
    },
    registerFailed: (state) => {
      state.register.isSuccess = false;
      state.register.error = true;
    },
    logoutUserStart: (state) => {
      state.login.isFetching = true;
    },
    logoutUserSuccess: (state) => {
      state.login.isFetching = false;
      state.login.currentUser = null;
    },
    logoutUserFailed: (state) => {
      state.login.isFetching = false;
      state.login.error = true;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailed,
  registerStart,
  registerSuccess,
  registerFailed,
  logoutUserStart,
  logoutUserSuccess,
  logoutUserFailed,
} = authSlice.actions;
export default authSlice.reducer;
