import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: {
      allProduct: null,
      isFetching: false,
      error: false,
    },
    productDetail: {
      product: null,
      isFetching: false,
      error: false,
    },
    productPanigation: {
      allProductPanigation: null,
      isFetching: false,
      error: false,
    },
    productFilter: {
      allProductFilter: null,
      isFetching: false,
      error: false,
    },
    createProduct: {
      isFetching: false,
      error: false,
      isSuccess: false,
    },
    deleteProduct: {
      isFetching: false,
      error: false,
      isSuccess: false,
    },
  },
  reducers: {
    getProductStart: (state) => {
      state.products.isFetching = true;
    },
    getProductSuccess: (state, action) => {
      state.products.isFetching = false;
      state.products.allProduct = action.payload;
    },
    getProductFailed: (state) => {
      state.products.isFetching = false;
      state.products.error = true;
    },
    getProductDetailStart: (state) => {
      state.productDetail.isFetching = true;
    },
    getProductDetailSuccess: (state, action) => {
      state.productDetail.isFetching = false;
      state.productDetail.product = action.payload;
    },
    getProductDetailFailed: (state) => {
      state.productDetail.isFetching = false;
      state.productDetail.error = true;
    },
    getProductPanigationStart: (state) => {
      state.productPanigation.isFetching = true;
    },
    getProductPanigationSuccess: (state, action) => {
      state.productPanigation.isFetching = false;
      state.productPanigation.allProductPanigation = action.payload;
    },
    getProductPanigationFailed: (state) => {
      state.productPanigation.isFetching = false;
      state.productPanigation.error = true;
    },
    getProductFilterStart: (state) => {
      state.productFilter.isFetching = true;
    },
    getProductFilterSuccess: (state, action) => {
      state.productFilter.isFetching = false;
      state.productFilter.allProductFilter = action.payload;
    },
    getProductFilterFailed: (state) => {
      state.productFilter.isFetching = false;
      state.productFilter.error = true;
    },
    createProductStart: (state) => {
      state.createProduct.isFetching = true;
    },
    createProductSucess: (state) => {
      state.createProduct.isFetching = false;
      state.createProduct.isSuccess = true;
    },
    createProductFailed: (state) => {
      state.createProduct.isFetching = false;
      state.createProduct.error = true;
    },
    deleteProductStart: (state) => {
      state.deleteProduct.isFetching = true;
    },
    deleteProductSuccess: (state) => {
      state.deleteProduct.isFetching = false;
      state.deleteProduct.isSuccess = true;
    },
    deleteProductFailed: (state) => {
      state.deleteProduct.isFetching = false;
      state.deleteProduct.error = true;
    },
  },
});

export const {
  getProductStart,
  getProductSuccess,
  getProductFailed,
  getProductDetailStart,
  getProductDetailSuccess,
  getProductDetailFailed,
  getProductPanigationStart,
  getProductPanigationSuccess,
  getProductPanigationFailed,
  getProductFilterStart,
  getProductFilterSuccess,
  getProductFilterFailed,
  createProductStart,
  createProductSucess,
  createProductFailed,
  deleteProductStart,
  deleteProductSuccess,
  deleteProductFailed,
} = productSlice.actions;

export default productSlice.reducer;
