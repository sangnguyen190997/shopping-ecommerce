import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: {
      isFeching: false,
      isSuccess: false,
      isError: false,
    },
    email: {
      isFeching: false,
      isSuccess: false,
      isError: false,
    },
  },
  reducers: {
    checkOutStart: (state) => {
      state.cart.isFeching = true;
    },
    checkOutSuccess: (state) => {
      state.cart.isFeching = false;
      state.cart.isSuccess = true;
    },
    checkOutFailed: (state) => {
      state.cart.isFeching = false;
      state.cart.isError = true;
    },
    sendMailStart: (state) => {
      state.cart.isFeching = true;
    },
    sendMailSuccess: (state) => {
      state.cart.isFeching = false;
      state.cart.isSuccess = true;
    },
    sendMailFailed: (state) => {
      state.cart.isFeching = false;
      state.cart.isError = true;
    },
  },
});

export const {
  checkOutStart,
  checkOutSuccess,
  checkOutFailed,
  sendMailStart,
  sendMailSuccess,
  sendMailFailed,
} = cartSlice.actions;
export default cartSlice.reducer;
