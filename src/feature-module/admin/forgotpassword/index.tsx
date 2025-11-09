import React from "react";
import { Link } from "react-router-dom";
import { logoWhite } from "../imagepath";
import "./AdminForgot.css";

const AdminForgotPassword = () => {
  return (
    <div className="admin-login-page">
      <div className="login-card">
        <div className="login-logo">
          <img src={logoWhite} alt="Logo" />
        </div>
        <h2 className="login-title">Forgot Password</h2>
        <p className="login-subtitle">
          Enter your Email to get a password reset link
        </p>

        <form>
          <div className="input-group">
            <i className="fa fa-user"></i>
            <input type="text" placeholder="Username" />
          </div>

          {/* <div className="input-group">
            <i className="fa fa-lock"></i>
            <input type="password" placeholder="Enter your Password" />
          </div> */}

          <button type="submit" className="login-btn">
            Submit
          </button>
        </form>

        {/* <div className="forgot-password">
          <Link to="/admin/forgotpassword">Forgot Password?</Link>
        </div> */}
      </div>
    </div>
  );
};

export default AdminForgotPassword;
