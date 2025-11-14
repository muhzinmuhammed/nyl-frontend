
import { Link } from "react-router-dom";
import { logoWhite } from "../imagepath";
import "./AdminLogin.css";

const AdminLogin = () => {
  return (
    <div className="admin-login-page">
      <div className="login-card">
        <div className="login-logo">
          <img src={logoWhite} alt="Logo" />
        </div>
        <h2 className="login-title">Login To Your Account</h2>
        <p className="login-subtitle">
          Enter your username and password to access dashboard
        </p>

        <form>
          <div className="input-group">
            <i className="fa fa-user"></i>
            <input type="text" placeholder="Username" />
          </div>

          <div className="input-group">
            <i className="fa fa-lock"></i>
            <input type="password" placeholder="Enter your Password" />
          </div>

          <button type="submit" className="login-btn">
            Login
          </button>
        </form>

        <div className="forgot-password">
          <Link to="/admin/forgotpassword">Forgot Password?</Link>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
