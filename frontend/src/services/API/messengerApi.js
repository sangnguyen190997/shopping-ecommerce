import axios from "axios";
import {
  getListMessageFailed,
  getListMessageStart,
  getListMessageSuccess,
  sendMessengerFailed,
  sendMessengerStart,
  sendMessengerSuccess,
} from "../../redux/messengerSlice";
import { DOMAIN } from "../../utils/settings/config";

export const createMessage = async (dispatch, params) => {
  dispatch(sendMessengerStart());
  try {
    await axios.post(`${DOMAIN}/api/v1/messengers`, params);
    dispatch(sendMessengerSuccess());
  } catch (err) {
    dispatch(sendMessengerFailed(err));
  }
};

export const getListMessage = async (dispatch, params) => {
  dispatch(getListMessageStart());
  try {
    const response = await axios.get(`${DOMAIN}/api/v1/messengers${params}`);
    dispatch(getListMessageSuccess(response.data));
  } catch (err) {
    dispatch(getListMessageFailed(err));
  }
};
