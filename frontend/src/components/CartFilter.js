import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  addToCart,
  decrementItem,
  removeItem,
  showQuantity,
} from "../redux/cartSlice";
import { toast } from "react-toastify";

export default function CartFilter() {
  const carts = useSelector((state) => state.cart.carts);
  const dispatch = useDispatch();

  const handleRemove = (product) => {
    dispatch(removeItem(product));
    toast.success("Delete Cart Success", {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const handleShowQuantity = (product, quantity) => {
    dispatch(showQuantity(product, quantity));
  };
  const handleIncrement = (product) => {
    dispatch(addToCart(product));
    toast.success("Add Product Success", {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const handleDecrement = (product) => {
    dispatch(decrementItem(product));
    toast.success("Delete Product Success", {
      position: "bottom-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  return (
    <div className="table-responsive mb-4">
      <table className="table">
        <thead className="bg-light">
          <tr className="text-center">
            <th className="border-0" scope="col">
              {" "}
              <strong className="text-small text-uppercase">Image</strong>
            </th>
            <th className="border-0" scope="col">
              {" "}
              <strong className="text-small text-uppercase">Product</strong>
            </th>
            <th className="border-0" scope="col">
              {" "}
              <strong className="text-small text-uppercase">Price</strong>
            </th>
            <th className="border-0" scope="col">
              {" "}
              <strong className="text-small text-uppercase">Quantity</strong>
            </th>
            <th className="border-0" scope="col">
              {" "}
              <strong className="text-small text-uppercase">Total</strong>
            </th>
            <th className="border-0" scope="col">
              {" "}
              <strong className="text-small text-uppercase">Remove</strong>
            </th>
          </tr>
        </thead>
        <tbody>
          {carts.map((item, index) => (
            <Fragment key={index}>
              <tr className="text-center">
                <td className="pl-0 border-0">
                  <div className="media align-items-center justify-content-center">
                    <NavLink
                      className="reset-anchor d-block animsition-link"
                      to={`/detail/${item.product.id}`}
                    >
                      <img
                        src={item.product.img1}
                        alt={item.product.img1}
                        width="70"
                      />
                    </NavLink>
                  </div>
                </td>
                <td className="align-middle border-0">
                  <div className="media align-items-center justify-content-center">
                    <NavLink
                      className="reset-anchor h6 animsition-link"
                      to={`/detail/${item.product.id}`}
                    >
                      {item.product.name}
                    </NavLink>
                  </div>
                </td>

                <td className="align-middle border-0">
                  <p className="mb-0 small">${item.product.price}</p>
                </td>
                <td className="align-middle border-0">
                  <div className="quantity justify-content-center">
                    <button
                      className="dec-btn p-0"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleDecrement(item)}
                    >
                      <i className="fas fa-caret-left"></i>
                    </button>
                    <input
                      className="form-control form-control-sm border-0 shadow-0 p-0"
                      type="text"
                      value={item.quantity}
                      onChange={() => handleShowQuantity(item, item.quantity)}
                    />
                    <button
                      className="inc-btn p-0"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleIncrement(item)}
                    >
                      <i className="fas fa-caret-right"></i>
                    </button>
                  </div>
                </td>
                <td className="align-middle border-0">
                  <p className="mb-0 small">
                    ${parseInt(item.quantity) * parseInt(item.product.price)}
                  </p>
                </td>
                <td className="align-middle border-0">
                  <a
                    className="reset-anchor remove_cart"
                    style={{ cursor: "pointer" }}
                  >
                    <i
                      className="fas fa-trash-alt small text-muted"
                      onClick={() => handleRemove(item.product.id)}
                    ></i>
                  </a>
                </td>
              </tr>
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}
