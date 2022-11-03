import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { loginSuccess } from "../redux/authSlice";
import { getTotalPrice } from "../redux/cartSlice";
import { logoutUser } from "../services/API/authApi";
import { createAxios } from "../services/API/createInstanceApi";

export default function Header() {
  const user = useSelector((state) => state.auth.login.currentUser);
  const carts = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const axiosJWT = createAxios(user, dispatch, loginSuccess);

  const handleLogout = () => {
    logoutUser(dispatch, user.id, user.token, navigate, axiosJWT);
  };

  const handleManage = () => {
    navigate("/manage");
  };
  const handleHistory = () => {
    navigate("/historyUser");
  };

  return (
    <div className="container px-0 px-lg-3">
      <nav className="navbar navbar-expand-lg navbar-light py-3 px-lg-0">
        <NavLink to="/" className="navbar-brand">
          <span className="font-weight-bold text-uppercase text-dark">
            Boutique
          </span>
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/shop">
                Shop
              </NavLink>
            </li>
          </ul>
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/cart">
                <i className="fas fa-dolly-flatbed mr-1 text-gray position-relative"></i>
                Cart
                {/* <span
                  className="position-absolute px-1 text-xs text-white bg-danger rounded-circle"
                  style={{ top: "18px" }}
                >
                  {carts.cartToTalProduct}
                </span> */}
              </NavLink>
            </li>
            {user ? (
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  style={{ cursor: "pointer" }}
                  id="pagesDropdown"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i className="fas fa-user-alt mr-1 text-gray"></i>
                  {user.fullname}
                </a>
                <div
                  className="dropdown-menu mt-3"
                  aria-labelledby="pagesDropdown"
                >
                  <button
                    className="dropdown-item border-0 transition-link"
                    onClick={handleManage}
                  >
                    Manage
                  </button>
                  <button
                    className="dropdown-item border-0 transition-link"
                    onClick={handleHistory}
                  >
                    History
                  </button>
                  <button
                    className="dropdown-item border-0 transition-link"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              </li>
            ) : (
              <li className="nav-item">
                <NavLink className="nav-link" to="/login">
                  <i className="fas fa-user-alt mr-1 text-gray"></i>Login
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
}
