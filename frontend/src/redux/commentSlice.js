import { createSlice } from "@reduxjs/toolkit";

const commentSlice = createSlice({
  name: "comment",
  initialState: {
    comments: {
      isFetching: false,
      isSuccess: false,
      isError: false,
    },
    loadComment: {
      listComment: [],
      isFetching: false,
      isError: false,
    },
  },
  reducers: {
    createCommentStart: (state) => {
      state.comments.isFetching = true;
      state.comments.isSuccess = false;
      state.comments.isError = false;
    },
    createCommentSuccess: (state) => {
      state.comments.isFetching = false;
      state.comments.isSuccess = true;
    },
    createCommentFailed: (state) => {
      state.comments.isFetching = false;
      state.comments.isError = true;
    },
    getCommentStart: (state) => {
      state.loadComment.isFetching = true;
      state.loadComment.isError = false;
    },
    getCommentSuccess: (state, action) => {
      state.loadComment.isFetching = false;
      state.loadComment.listComment = action.payload;
      state.loadComment.isError = false;
    },
    getCommentFailed: (state) => {
      state.loadComment.isFetching = false;
      state.loadComment.isError = true;
    },
  },
});

export const {
  createCommentStart,
  createCommentSuccess,
  createCommentFailed,
  getCommentStart,
  getCommentSuccess,
  getCommentFailed,
} = commentSlice.actions;

export default commentSlice.reducer;
