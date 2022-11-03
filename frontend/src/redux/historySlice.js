import { createSlice } from "@reduxjs/toolkit";

const historySlice = createSlice({
  name: "history",
  initialState: {
    historyUser: {
      isFetching: false,
      isSuccess: false,
      isError: false,
    },
    listHistory: {
      histories: [],
      isFetching: false,
      isError: false,
    },
  },
  reducers: {
    getHistoryStart: (state) => {
      state.historyUser.isFetching = true;
    },
    getHistorySuccess: (state) => {
      state.historyUser.isFetching = false;
      state.historyUser.isSuccess = true;
    },
    getHistoryFailed: (state) => {
      state.historyUser.isFetching = false;
      state.historyUser.isError = true;
    },
    getListHistoryStart: (state) => {
      state.listHistory.isFetching = true;
    },
    getListHistorySucess: (state, action) => {
      state.listHistory.isFetching = false;
      state.listHistory.histories = action.payload;
    },
    getListHistoryFailed: (state) => {
      state.listHistory.isFetching = false;
      state.listHistory.isError = true;
    },
  },
});

export const {
  getHistoryStart,
  getHistorySuccess,
  getHistoryFailed,
  getListHistoryStart,
  getListHistorySucess,
  getListHistoryFailed,
} = historySlice.actions;
export default historySlice.reducer;
