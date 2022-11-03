import axios from "axios";
import {
  createProductFailed,
  createProductStart,
  createProductSucess,
  deleteProductFailed,
  deleteProductStart,
  deleteProductSuccess,
  getProductDetailFailed,
  getProductDetailStart,
  getProductDetailSuccess,
  getProductFailed,
  getProductFilterFailed,
  getProductFilterStart,
  getProductFilterSuccess,
  getProductPanigationFailed,
  getProductPanigationStart,
  getProductPanigationSuccess,
  getProductStart,
  getProductSuccess,
} from "../../redux/productSlice";
import { DOMAIN } from "../../utils/settings/config";

export const getListProduct = async (dispatch, params) => {
  dispatch(getProductStart());
  try {
    const response = await axios.get(`${DOMAIN}/api/v1/products/`, { params });
    dispatch(getProductSuccess(response.data));
  } catch (err) {
    dispatch(getProductFailed(err));
  }
};

export const getListProductPanigation = async (dispatch, params) => {
  dispatch(getProductPanigationStart());
  try {
    const response = await axios.get(`${DOMAIN}/api/v1/products/${params}`);
    dispatch(getProductPanigationSuccess(response.data));
  } catch (err) {
    dispatch(getProductPanigationFailed(err));
  }
};

export const getListProductFilter = async (dispatch, params) => {
  dispatch(getProductFilterStart());
  try {
    const response = await axios.get(`${DOMAIN}/api/v1/products/${params}`);
    dispatch(getProductFilterSuccess(response.data));
  } catch (err) {
    dispatch(getProductFilterFailed(err));
  }
};

export const getProductById = async (dispatch, id) => {
  dispatch(getProductDetailStart());
  try {
    const response = await axios.get(`${DOMAIN}/api/v1/products/${id}`);
    dispatch(getProductDetailSuccess(response.data));
  } catch (err) {
    dispatch(getProductDetailFailed(err.response.data));
  }
};

export const createProduct = async (dispatch, params) => {
  dispatch(createProductStart());
  try {
    await axios.post(`${DOMAIN}/api/v1/products`, params);
    dispatch(createProductSucess());
  } catch (err) {
    dispatch(createProductFailed(err));
  }
};

export const deleteProduct = async (dispatch, id) => {
  dispatch(deleteProductStart());
  try {
    await axios.delete(`${DOMAIN}/api/v1/products/${id}`);
    dispatch(deleteProductSuccess());
  } catch (err) {
    dispatch(deleteProductFailed(err));
  }
};
