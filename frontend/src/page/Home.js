import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getListProduct } from "../services/API/productApi";
import ProductBigSale from "../components/ProductBigSale";
import ProductForYou from "../components/ProductForYou";

export default function Home() {
  const listProduct = useSelector(
    (state) => state.product.products?.allProduct
  );

  const dispatch = useDispatch();

  useEffect(() => {
    getListProduct(dispatch);
  }, []);

  const productDiscount = listProduct?.filter((product) => {
    return product.promotionPercent >= 20;
  });

  return (
    <div className="page-holder">
      <div className="header bg-white">
        <div className="container">
          <div
            className="hero pb-3 bg-cover bg-center d-flex align-items-center"
            style={{
              backgroundImage: `url("/image/banner1.jpg")`,
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          >
            <div className="container py-5">
              <div className="row px-4 px-lg-5">
                <div className="col-lg-6">
                  <p className="text-muted small text-uppercase mb-2">
                    New Inspiration 2020
                  </p>
                  <h1 className="h2 text-uppercase mb-3">
                    20% off on new season
                  </h1>
                  <a className="btn btn-dark" href="shop.html">
                    Browse collections
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="pt-5">
            <div className="text-center">
              <p className="small text-muted small text-uppercase mb-1">
                Carefully created collections
              </p>
              <h2 className="h5 text-uppercase mb-4">Browse our categories</h2>
            </div>
            <div className="row">
              <div className="col-md-4 mb-4 mb-md-0">
                <NavLink className="category-item" to="/shop">
                  <img
                    className="img-fluid"
                    src="/image/cat-img-1.jpg"
                    alt=""
                  />
                  <strong className="category-item-title">Clothes</strong>
                </NavLink>
              </div>
              <div className="col-md-4 mb-4 mb-md-0">
                <NavLink className="category-item mb-4" to="/shop">
                  <img
                    className="img-fluid"
                    src="/image/cat-img-2.jpg"
                    alt=""
                  />
                  <strong className="category-item-title">Shoes</strong>
                </NavLink>
                <NavLink className="category-item" to="/shop">
                  <img
                    className="img-fluid"
                    src="/image/cat-img-3.jpg"
                    alt=""
                  />
                  <strong className="category-item-title">Watches</strong>
                </NavLink>
              </div>
              <div className="col-md-4">
                <NavLink className="category-item" to="/shop">
                  <img
                    className="img-fluid"
                    src="/image/cat-img-4.jpg"
                    alt=""
                  />
                  <strong className="category-item-title">Electronics</strong>
                </NavLink>
              </div>
            </div>
          </div>
          <div className="py-5" id="section_product">
            <div>
              <p className="small text-muted small text-uppercase mb-1">
                Made the hard way
              </p>
              <h2 className="h5 text-uppercase mb-4">Big Discount Products</h2>
            </div>
            <div className="row d-block">
              <ProductBigSale productDiscount={productDiscount} />
            </div>
          </div>
          <div className="py-5" id="section_product">
            <div>
              <p className="small text-muted small text-uppercase mb-1">
                Made the hard way
              </p>
              <h2 className="h5 text-uppercase mb-4">Product Spend For You</h2>
            </div>
            <div className="row d-block">
              <ProductForYou listProduct={listProduct} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
