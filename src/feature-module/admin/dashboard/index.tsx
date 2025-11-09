import React from "react";
import SidebarNav from "../sidebar";
import Header from "../header";
import LineChart from "./LineChart";
import StatusCharts from "./StatusCharts";
import "./AdminDashboard.css";
import { Card } from "antd";
import { HeartTwoTone } from "@ant-design/icons";

const AdminDashboard: React.FC = () => {
  return (
    <>
      <div className="main-wrapper">
        <Header />
        <SidebarNav />
        {/* Page Wrapper */}
        <div className="page-wrapper">
          <div className="content container-fluid pb-0">
            {/* Hero / Banner */}
            <div className="dashboard-hero">
              <div className="hero-inner">
                <div className="hero-left">
                  <h3 className="hero-title">Welcome Admin!</h3>
                  <p className="hero-subtitle">Dashboard</p>
                </div>
              </div>

              {/* Stat cards that overlap the bottom of the hero */}
              <div className="hero-cards">
                <div className="stat-card stat-card-alert">
                  <div className="stat-card-body">
                    <div className="stat-icon">
                      <i className="feather feather-bell" />
                    </div>
                    <div className="stat-content">
                      <div className="stat-title">New Emergency bookings</div>
                      <div className="stat-value">6</div>
                      <div className="stat-sub">View details →</div>
                    </div>
                  </div>
                </div>

                <div className="stat-card stat-card-revenue">
                  <div className="stat-card-body">
                    <div className="stat-icon">
                      <i className="feather feather-dollar-sign" />
                    </div>
                    <div className="stat-content">
                      <div className="stat-title">Revenue</div>
                      <div className="stat-value">₹1068</div>
                      <div className="stat-sub">View details →</div>
                    </div>
                  </div>
                </div>

                <div className="stat-card stat-card-clients">
                  <div className="stat-card-body">
                    <div className="stat-icon">
                      <i className="feather feather-users" />
                    </div>
                    <div className="stat-content">
                      <div className="stat-title">Active Clients</div>
                      <div className="stat-value">168</div>
                      <div className="stat-sub">View details →</div>
                    </div>
                  </div>
                </div>

                <div className="stat-card stat-card-healers">
                  <div className="stat-card-body">
                    <div className="stat-icon">
                      <i className="feather feather-doctor" />
                    </div>
                    <div className="stat-content">
                      <div className="stat-title">Active Healers</div>
                      <div className="stat-value">10</div>
                      <div className="stat-sub">View details →</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main charts row */}
            <div className="row charts-row mt-5">
              <div className="col-lg-8">
                <div className="card card-chart large-chart">
                  <div className="card-header">
                    <h4 className="card-title">Revenue</h4>
                    <div className="card-sub">08/04/2020 - 08/11/2020</div>
                  </div>
                  <div className="card-body">
                    <LineChart />
                  </div>
                </div>
              </div>

              <div className="col-lg-4">
                <div className="side-cards">
                  <Card
                    className="session-today-card"
                    style={{
                      width: 320,
                      borderRadius: "12px",
                      boxShadow: "0 8px 20px rgba(22,27,39,0.06)",
                      border: "none",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                      <div
                        style={{
                          background: "linear-gradient(180deg, #ff9ab8, #ff5f7a)",
                          width: 56,
                          height: 56,
                          borderRadius: "10px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <HeartTwoTone twoToneColor="#fff" style={{ fontSize: "28px" }} />
                      </div>

                      <div style={{ flex: 1 }}>
                        <h3
                          style={{
                            margin: 0,
                            fontSize: "22px",
                            fontWeight: "700",
                            color: "#111827",
                          }}
                        >
                          6
                        </h3>
                        <p
                          style={{
                            margin: "2px 0",
                            fontSize: "14px",
                            color: "#6b7280",
                            fontWeight: "600",
                          }}
                        >
                          Sessions Today
                        </p>
                        <a
                          href="#"
                          style={{
                            fontSize: "13px",
                            color: "#facc15",
                            textDecoration: "none",
                            fontWeight: "500",
                          }}
                        >
                          View details →
                        </a>
                      </div>
                    </div>
                  </Card>

                  <div className="card small-card sessions-list">
                    <div className="card-body">
                      <h5>Sessions</h5>
                      <div className="segmented-controls">
                        <button className="seg active">Week</button>
                        <button className="seg">Month</button>
                      </div>
                      <div className="bar-chart-placeholder">
                        {/* Use an actual chart or component here if available */}
                        <StatusCharts />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Lists below charts */}
            {/* <div className="row">
              <DoctorListDesboard />
              <PatientsListDesboard />
            </div> */}

            {/* Today’s Appointment */}
            {/* <div className="row">
              <AppointmentList />
            </div> */}
          </div>
        </div>
        {/* /Page Wrapper */}
      </div>
    </>
  );
};

export default AdminDashboard;