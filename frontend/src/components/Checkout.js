import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import queryString from "query-string";
import { checkoutProduct, sendMailCheckout } from "../services/API/checkoutApi";
import "../css/checkout.css";
import { createHistoryUser } from "../services/API/historyApi";
import io from "socket.io-client";
const socket = io("http://localhost:3000");

export default function Checkout() {
  const { carts, cartTotalPrice } = useSelector((state) => state.cart);
  const { currentUser } = useSelector((state) => state.auth.login);
  const dispatch = useDispatch();
  const [success, setSuccess] = useState(false);
  const [load, setLoad] = useState(false);

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string()
        .matches(
          "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
            "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
            "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$",
          "Fullname is invalid"
        )
        .min(10)
        .max(20),
      email: Yup.string()
        .required("Required")
        .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Email is invalid")
        .min(10),
      phone: Yup.string()
        .required("Required")
        .matches(/^[0-9]+$/, "Number phone is invalid")
        .min(10)
        .max(10),
      address: Yup.string()
        .required("Required")
        .matches(
          "^[/0-9a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
            "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
            "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$",
          "Address is invalid"
        )
        .max(30),
    }),
    onSubmit: async (values) => {
      for (let item of carts) {
        const params = {
          idProduct: item.product.id,
          productCount: item.quantity,
        };
        const query = "?" + queryString.stringify(params);

        await checkoutProduct(
          dispatch,
          query,
          currentUser.token,
          currentUser.id
        );

        const paramsHistory = {
          idUser: currentUser.id,
          phone: values.phone,
          address: values.address,
          fullname: values.fullName,
          total: cartTotalPrice,
        };
        await createHistoryUser(dispatch, paramsHistory);
      }

      //send data to server
      socket.emit("send_order", currentUser.id);

      await sendMailCheckout(dispatch, values, currentUser.token);
      setLoad(!load);
      setTimeout(() => {
        setLoad(false);
        setSuccess(!success);
      }, 4000);
    },
  });

  return (
    <div>
      {load && (
        <div className="wrapper_loader">
          <div className="loader"></div>
        </div>
      )}
      <div className="container">
        <section className="py-5 bg-light">
          <div className="container">
            <div className="row px-4 px-lg-5 py-lg-4 align-items-center">
              <div className="col-lg-6">
                <h1 className="h2 text-uppercase mb-0">Checkout</h1>
              </div>
              <div className="col-lg-6 text-lg-right">
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb justify-content-lg-end mb-0 px-0">
                    <li className="breadcrumb-item">
                      <a href="index.html">Home</a>
                    </li>
                    <li className="breadcrumb-item">
                      <a href="cart.html">Cart</a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Checkout
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </section>

        {!success && (
          <section className="py-5">
            <h2 className="h5 text-uppercase mb-4">Billing details</h2>
            <div className="row">
              <div className="col-lg-8">
                <form onSubmit={formik.handleSubmit}>
                  <div className="row">
                    <div className="col-lg-12 form-group m-0">
                      <label
                        className="text-small text-uppercase"
                        htmlFor="Fullname"
                      >
                        Full Name:
                      </label>
                      <input
                        className="form-control form-control-lg"
                        type="text"
                        placeholder="Enter Your Full Name Here!"
                        id="fullName"
                        name="fullName"
                        value={formik.values.fullName}
                        onChange={formik.handleChange}
                      />
                      <p className="text-2xs text-danger">
                        {formik.errors.fullName}
                      </p>
                    </div>
                    <div className="col-lg-12 form-group m-0">
                      <label
                        className="text-small text-uppercase"
                        htmlFor="Email"
                      >
                        Email:{" "}
                      </label>
                      <input
                        className="form-control form-control-lg"
                        type="text"
                        placeholder="Enter Your Email Here!"
                        id="email"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                      />
                      <p className="text-2xs text-danger">
                        {formik.errors.email}
                      </p>
                    </div>
                    <div className="col-lg-12 form-group m-0">
                      <label
                        className="text-small text-uppercase"
                        htmlFor="Phone"
                      >
                        Phone Number:{" "}
                      </label>
                      <input
                        className="form-control form-control-lg"
                        type="text"
                        placeholder="Enter Your Phone Number Here!"
                        id="phone"
                        name="phone"
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                      />
                      <p className="text-2xs text-danger">
                        {formik.errors.phone}
                      </p>
                    </div>
                    <div className="col-lg-12 form-group m-0">
                      <label
                        className="text-small text-uppercase"
                        htmlFor="Address"
                      >
                        Address:{" "}
                      </label>
                      <input
                        className="form-control form-control-lg"
                        type="text"
                        placeholder="Enter Your Address Here!"
                        id="address"
                        name="address"
                        value={formik.values.address}
                        onChange={formik.handleChange}
                      />
                      <p className="text-2xs text-danger">
                        {formik.errors.address}
                      </p>
                    </div>
                    <div className="col-lg-12 form-group m-0">
                      <button
                        className="btn btn-dark"
                        style={{ color: "white" }}
                        type="submit"
                      >
                        Place order
                      </button>
                    </div>
                  </div>
                </form>
              </div>
              <div className="col-lg-4">
                <div className="card border-0 rounded-0 p-lg-4 bg-light">
                  <div className="card-body">
                    <h5 className="text-uppercase mb-4">Your order</h5>
                    <ul className="list-unstyled mb-0">
                      {carts.map((item, index) => (
                        <div key={index}>
                          <li className="d-flex align-items-center justify-content-between">
                            <strong className="small font-weight-bold">
                              {item.product.name}
                            </strong>
                            <span className="text-muted small">
                              ${item.product.price} x {item.quantity}
                            </span>
                          </li>
                          <li className="border-bottom my-2"></li>
                        </div>
                      ))}
                      <li className="d-flex align-items-center justify-content-between">
                        <strong className="text-uppercase small font-weight-bold">
                          Total
                        </strong>
                        <span>${cartTotalPrice}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {success && (
          <section className="py-5">
            <div className="p-5">
              <h1>You Have Successfully Ordered!</h1>
              <p style={{ fontSize: "1.2rem" }}>Please Check Your Email.</p>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
