import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { loginUser } from "../../services/API/authApi";
import "./Auth.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = () => {
    const user = { email, password };
    loginUser(dispatch, navigate, user);
  };
  return (
    <div className="limiter">
      <div className="container-login100">
        <div className="wrap-login100">
          <span className="login100-form-title mt-5">Login</span>
          <div className="d-flex justify-content-center pb-5"></div>

          <div className="wrap-input100">
            <input
              className="input100"
              type="text"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="wrap-input100">
            <input
              className="input100"
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="login100-form-btn" onClick={handleLogin}>
            Login
          </button>

          <div className="text-center py-4">
            <span className="txt1">Create an account?</span>
            &nbsp;
            <NavLink to="/register" className="txt2">
              Click
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}
