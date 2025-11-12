import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./AdminPatients.css";
import SidebarNav from "../sidebar";
import Header from "../header";
import { clockImage, emergencyImage } from "../imagepath";
import './index.css'
import { Link } from "react-router-dom";

const AdminPatients: React.FC = () => {
  return (
    <>
      <Header />
      <SidebarNav />

      <div className="page-wrapper admin-patients-wrapper">
        <div className="content container-fluid">
          {/* PAGE TITLE */}
          <div className="page-header mb-4">
            <div className="row align-items-center">
              <div className="col-sm-8">
                <h2 className="page-title">Admin Healing</h2>
                <p className="page-subtitle">Dashboard / My Patients</p>
              </div>
            </div>
          </div>

          {/* TOP CARDS */}
          <div className="row mb-4">
            {/* Emergency Healing */}
            <div className="col-md-3">
              <div className="card emergency-card p-3 shadow-sm">
                <div className="d-flex justify-content-between align-items-center">
                  <img
                    src={emergencyImage}
                    alt="Emergency"
                    className="card-icon"
                  />
                  <h3 className="count text-black">6</h3>
                </div>
                <h5 className="mt-3 mb-1 text-black">Emergency Healing</h5>
                <a href="#" className="view-details text-black">
                  View details →
                </a>
              </div>
            </div>

            {/* Sessions Today */}
            <div className="col-md-3">
              <div className="card session-card p-3 shadow-sm">
                <div className="d-flex justify-content-between align-items-center">
                  <img
                    src={clockImage}
                    alt="Sessions"
                    className="card-icon"
                  />
                  <h3 className="count">6</h3>
                </div>
                <h5 className="mt-3 mb-1">Sessions Today</h5>
                <p className="session-date">5 Nov 2025</p>
              </div>
            </div>
          </div>

          {/* ASSIGNED SESSIONS */}
          <div className="row">
            <div className="col-md-4">
              <div className="card assigned-card p-4 shadow-sm">
                <h5 className="mb-3 fw-bold">Assigned Sessions</h5>
                <div className="session-detail">
                  <p className="mb-1 fw-bold">Date</p>
                  <p className="mb-1">
                    <strong>🕒 Time:</strong> 11:00 AM – 11:35 AM
                  </p>
                  <p className="mb-3">
                    <strong>Total Patients:</strong> 50
                  </p>

                  <Link to={'/admin/patient-table'}>
                    <button className="btn btn-dark w-100 rounded-3">
                      View Session Details
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminPatients;
