import React from "react";
import SidebarNav from "../sidebar";
import Header from "../header";
import "./AdminProfile.css";

const AdminProfile = () => {
  return (
    <>
      <Header />
      <SidebarNav />
      <div className="page-wrapper">
        <div className="content container-fluid">
          <div className="page-header">
            <h3 className="page-title">Manage Profile</h3>
            <p className="breadcrumb-text">
              Dashboard / <span>Profile</span>
            </p>
          </div>

          <div className="profile-card">
            <h5 className="profile-card-title">Admin Account</h5>

            <div className="form-container">
              <div className="form-group">
                <label>Username</label>
                <input type="text" className="form-control" placeholder="Username" />
              </div>

              <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" placeholder="Password" />
              </div>
            </div>

            <div className="update-btn-container">
              <button className="update-btn">Update Data</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminProfile;
