import React from "react";
import { NavLink } from "react-router-dom";

export default function CartEmpty() {
  return (
    <div className=" d-flex flex-column text-center align-items-center my-5">
      <div>
        <img
          src="https://img.freepik.com/premium-vector/online-shop-logo-template_59362-81.jpg?w=360"
          alt="img"
          width={350}
          height={350}
        />
      </div>
      <div>
        <p className="mb-4 font-weight-normal ">
          {" "}
          Bạn chưa có sản phẩm nào trong giỏ hàng
        </p>
        <NavLink
          to="/shop"
          className="text-sm text-center py-3 px-4 border border-dark bg-dark text-white hover-zoom my-5"
        >
          TIẾP TỤC MUA SẮM
        </NavLink>
      </div>
    </div>
  );
}
