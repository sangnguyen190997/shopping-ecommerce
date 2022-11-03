import axios from "axios";
import {
  createCommentFailed,
  createCommentStart,
  createCommentSuccess,
  getCommentFailed,
  getCommentStart,
  getCommentSuccess,
} from "../../redux/commentSlice";
import { DOMAIN } from "../../utils/settings/config";

export const createComment = async (dispatch, params, accessToken) => {
  dispatch(createCommentStart());
  try {
    await axios.post(`${DOMAIN}/api/v1/comments`, params, {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    });
    dispatch(createCommentSuccess());
  } catch (err) {
    dispatch(createCommentFailed());
  }
};

export const getCommentProduct = async (dispatch, idProduct) => {
  dispatch(getCommentStart());
  try {
    const response = await axios.get(`${DOMAIN}/api/v1/comments/${idProduct}`);
    dispatch(getCommentSuccess(response.data));
  } catch (err) {
    dispatch(getCommentFailed(err));
  }
};
