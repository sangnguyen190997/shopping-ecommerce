import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

export default function Products({ productPanigation, sort }) {
  if (!productPanigation) {
    return;
  }
  const productSort = [...productPanigation];

  if (sort === "DownToUp") {
    productSort.sort((a, b) => {
      return a.price - b.price;
    });
  }

  if (sort === "UpToDown") {
    productSort.sort((a, b) => {
      return b.price - a.price;
    });
  }

  return (
    <div className="row">
      {productSort?.map((item, index) => (
        <div className="col-lg-4 col-sm-6 Section_Category mb-5" key={index}>
          <div className="product text-center">
            <div className="position-relative mb-3">
              <div className="badge text-white badge-"></div>
              <NavLink className="d-block" to={`/detail/${item.id}`}>
                <img className="img-fluid w-100" src={item.img1} alt="..." />
              </NavLink>
              <div className="product-overlay">
                <ul className="mb-0 list-inline">
                  <li className="list-inline-item m-0 p-0">
                    <a className="btn btn-sm btn-outline-dark" href="#">
                      <i className="far fa-heart"></i>
                    </a>
                  </li>
                  <li className="list-inline-item m-0 p-0">
                    <NavLink
                      className="btn btn-sm btn-dark"
                      to={`/detail/${item.id}`}
                    >
                      Add to cart
                    </NavLink>
                  </li>
                  <li className="list-inline-item mr-0">
                    {/* Dùng Modal phải có href để nó hiện ra thằng đó và thuộc tính data-toggle="modal" để mở modal*/}
                    <a
                      className="btn btn-sm btn-outline-dark"
                      href={`#product_${item.id}`}
                      data-toggle="modal"
                    >
                      <i className="fas fa-expand"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <h6>
              <a className="reset-anchor">{item.name}</a>
            </h6>
            <p className="small text-muted">${item.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
