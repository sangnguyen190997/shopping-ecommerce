import axios from "axios";
import {
  deleteUserFailed,
  deleteUserStart,
  deleteUserSuccess,
  getUserFailed,
  getUserStart,
  getUserSuccess,
} from "../../redux/userSlice";
import { DOMAIN } from "../../utils/settings/config";

export const getListUser = async (dispatch, accessToken) => {
  dispatch(getUserStart());
  try {
    const response = await axios.get(`${DOMAIN}/api/v1/users/`, {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    });
    dispatch(getUserSuccess(response.data));
  } catch (err) {
    dispatch(getUserFailed(err));
  }
};

export const updateUser = async (dispatch, id, accessToken, user) => {
  dispatch(getUserStart());
  try {
    await axios.put(`${DOMAIN}/api/v1/users/${id}`, user, {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    });
    dispatch(getUserSuccess());
  } catch (err) {
    dispatch(getUserFailed(err));
  }
};

export const deleteUser = async (dispatch, id, accessToken) => {
  dispatch(deleteUserStart());
  try {
    const response = await axios.delete(`${DOMAIN}/api/v1/users/${id}`, {
      headers: {
        token: `Bearer ${accessToken}`,
      },
    });
    dispatch(deleteUserSuccess(response.data));
  } catch (err) {
    dispatch(deleteUserFailed(err));
  }
};
