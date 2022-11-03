import { createSlice } from "@reduxjs/toolkit";

const messengerSlice = createSlice({
  name: "messenger",
  initialState: {
    messengers: {
      isFetching: false,
      isSuccess: false,
      isError: false,
    },
    listmessage: {
      isFetching: false,
      messages: null,
      isError: false,
    },
  },
  reducers: {
    sendMessengerStart: (state) => {
      state.messengers.isFetching = true;
    },
    sendMessengerSuccess: (state) => {
      state.messengers.isFetching = false;
      state.messengers.isSuccess = true;
    },
    sendMessengerFailed: (state) => {
      state.messengers.isFetching = false;
      state.messengers.isError = true;
    },
    getListMessageStart: (state) => {
      state.listmessage.isFetching = true;
    },
    getListMessageSuccess: (state, action) => {
      state.listmessage.isFetching = false;
      state.listmessage.messages = action.payload;
    },
    getListMessageFailed: (state) => {
      state.listmessage.isFetching = false;
      state.listmessage.isError = true;
    },
  },
});

export const {
  sendMessengerStart,
  sendMessengerSuccess,
  sendMessengerFailed,
  getListMessageStart,
  getListMessageSuccess,
  getListMessageFailed,
} = messengerSlice.actions;

export default messengerSlice.reducer;
