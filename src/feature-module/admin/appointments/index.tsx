import { Table } from "antd";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-daterangepicker/daterangepicker.css";
import { itemRender, onShowSizeChange } from "../paginationfunction";
import SidebarNav from "../sidebar";
import './index.css';
import {
  patient1,
  patient2,
  patient3,
  patient4,
  patient5,
  patient6,
  patient7,
  patient8,
  patient9,
  patient10,
} from "../imagepath";
import { Link } from "react-router-dom";
import Header from "../header";

const AdminAppointments = () => {
  const [activeTab, setActiveTab] = useState("todays-booking");
  const [searchText, setSearchText] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]); // Add thi

  // === All Appointments Data ===
  const allData = [
    {
      id: 1,
      DoctorName: "John Doe",
      PatientName: "John Doe",
      BookingType: "Emergency",
      Date: "5 Nov 2019",
      time: "11:00 AM - 11:35 AM",
      Amount: "₹520",
      images1: patient2,
      Status: "In Progress",
      ModeOfSession: "Distant Healing",
      HealerName: "Travis Trimble",
      isToday: true,
      isNew: false,
      isHistory: true,
    },
    {
      id: 2,
      DoctorName: "Michel",
      PatientName: "Michel",
      BookingType: "Normal",
      Date: "6 Nov 2019",
      time: "12:00 PM - 12:15 PM",
      Amount: "₹151",
      images1: patient3,
      Status: "Completed",
      ModeOfSession: "Distant Healing",
      HealerName: "Travis Trimble",
      isToday: true,
      isNew: true,
      isHistory: true,
    },
    {
      id: 3,
      DoctorName: "Walter Roberson",
      PatientName: "Walter Roberson",
      BookingType: "Emergency",
      Date: "7 Nov 2019",
      time: "01:10 PM - 01:35 PM",
      Amount: "₹520",
      images1: patient4,
      Status: "Not Started",
      ModeOfSession: "Distant Healing",
      HealerName: "Carl Kelly",
      isToday: false,
      isNew: false,
      isHistory: true,
    },
    {
      id: 4,
      DoctorName: "Elsie Gilley",
      PatientName: "Elsie Gilley",
      BookingType: "Normal",
      Date: "8 Nov 2019",
      time: "02:00 PM - 02:30 PM",
      Amount: "₹250",
      images1: patient5,
      Status: "Completed",
      ModeOfSession: "Direct Healing",
      HealerName: "Joan Gardner",
      isToday: false,
      isNew: true,
      isHistory: true,
    },
    {
      id: 5,
      DoctorName: "John Doe",
      PatientName: "John Doe",
      BookingType: "Emergency",
      Date: "5 Nov 2019",
      time: "11:00 AM - 11:35 AM",
      Amount: "₹520",
      images1: patient2,
      Status: "In Progress",
      ModeOfSession: "Distant Healing",
      HealerName: "Travis Trimble",
      isToday: false,
      isNew: false,
      isHistory: false,
    },
  ];

  // === Get Data Based on Active Tab ===
  const getTableData = () => {
    let filtered = allData;

    switch (activeTab) {
      case "todays-booking":
        filtered = allData.filter((item) => item.isToday);
        break;
      case "new-bookings":
        filtered = allData.filter((item) => item.isNew);
        break;
      case "session-history":
        filtered = allData.filter((item) => item.isHistory);
        break;
      case "emergency":
        filtered = allData.filter((item) => item.BookingType === "Emergency");
        break;
      default:
        filtered = allData;
    }

    // Apply search filter
    if (searchText) {
      filtered = filtered.filter(
        (item) =>
          item.DoctorName.toLowerCase().includes(searchText.toLowerCase()) ||
          item.HealerName.toLowerCase().includes(searchText.toLowerCase()) ||
          item.ModeOfSession.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    return filtered;
  };

  // === Columns for Table ===
  const columns = [
    {
      title: "Client Name",
      dataIndex: "DoctorName",
      render: (text, record) => (
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <img
            src={record.images1}
            alt={text}
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
          <span style={{ fontWeight: 500, color: "#1a1a1a" }}>{text}</span>
        </div>
      ),
      sorter: (a, b) => a.DoctorName.localeCompare(b.DoctorName),
    },
    {
      title: "Appointment Time",
      dataIndex: "time",
      render: (text, record) => (
        <div>
          <div style={{ fontWeight: 500, color: "#1a1a1a" }}>{record.Date}</div>
          <div style={{ fontSize: "12px", color: "#666" }}>{text}</div>
        </div>
      ),
      sorter: (a, b) => a.Date.localeCompare(b.Date),
    },
    {
      title: "Booking Type",
      dataIndex: "BookingType",
      render: (text) => (
        <span
          style={{
            padding: "4px 12px",
            borderRadius: "12px",
            fontSize: "12px",
            fontWeight: 500,
            backgroundColor: text === "Emergency" ? "#FF4444" : "#E8E8E8",
            color: text === "Emergency" ? "#fff" : "#666",
          }}
        >
          {text}
        </span>
      ),
      sorter: (a, b) => a.BookingType.localeCompare(b.BookingType),
    },
    {
      title: "Mode of Session",
      dataIndex: "ModeOfSession",
      render: (text) => (
        <span style={{ color: "#4318FF", fontWeight: 500, fontSize: "14px" }}>
          {text}
        </span>
      ),
      sorter: (a, b) => a.ModeOfSession.localeCompare(b.ModeOfSession),
    },
    {
      title: "Healer Name",
      dataIndex: "HealerName",
      render: (text) => (
        <span style={{ fontWeight: 500, color: "#1a1a1a" }}>{text}</span>
      ),
      sorter: (a, b) => a.HealerName.localeCompare(b.HealerName),
    },
    {
      title: "Amount",
      dataIndex: "Amount",
      render: (text) => (
        <span style={{ fontWeight: 600, color: "#1a1a1a" }}>{text}</span>
      ),
      sorter: (a, b) =>
        parseInt(a.Amount.replace(/\D/g, "")) -
        parseInt(b.Amount.replace(/\D/g, "")),
    },
    {
      title: "Session Details",
      render: () => (
        <button
          style={{
            padding: "6px 16px",
            backgroundColor: "#000",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            fontSize: "12px",
            fontWeight: 500,
            cursor: "pointer",
          }}
        >
          More Info
        </button>
      ),
    },
    {
      title: "Status",
      dataIndex: "Status",
      render: (text) => {
        const statusColors = {
          "In Progress": { bg: "#4318FF", color: "#fff" },
          Completed: { bg: "#04BD6C", color: "#fff" },
          "Not Started": { bg: "#E8E8E8", color: "#666" },
        };
        const style = statusColors[text] || statusColors["Not Started"];
        return (
          <span
            style={{
              padding: "6px 16px",
              borderRadius: "16px",
              fontSize: "12px",
              fontWeight: 500,
              backgroundColor: style.bg,
              color: style.color,
            }}
          >
            {text}
          </span>
        );
      },
      sorter: (a, b) => a.Status.localeCompare(b.Status),
    },
  ];

  // Tab configuration
  const tabs = [
    { label: "Today's Booking", key: "todays-booking" },
    { label: "New Bookings", key: "new-bookings" },
    { label: "Session History", key: "session-history" },
    { label: "Emergency", key: "emergency" },
  ];
  // === Columns for Table ===
  const getColumns = () => {
    const baseColumns = [
      {
        title: "Client Name",
        dataIndex: "DoctorName",
        render: (text, record) => (
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <img
              src={record.images1}
              alt={text}
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
            <span style={{ fontWeight: 500, color: "#1a1a1a" }}>{text}</span>
          </div>
        ),
        sorter: (a: any, b: any) => a.DoctorName.localeCompare(b.DoctorName),
      },
      {
        title: "Appointment Time",
        dataIndex: "time",
        render: (text, record) => (
          <div>
            <div style={{ fontWeight: 500, color: "#1a1a1a" }}>{record.Date}</div>
            <div style={{ fontSize: "12px", color: "#666" }}>{text}</div>
          </div>
        ),
        sorter: (a, b) => a.Date.localeCompare(b.Date),
      },
      {
        title: "Booking Type",
        dataIndex: "BookingType",
        render: (text) => (
          <span
            style={{
              padding: "4px 12px",
              borderRadius: "12px",
              fontSize: "12px",
              fontWeight: 500,
              backgroundColor: text === "Emergency" ? "#FF4444" : "#E8E8E8",
              color: text === "Emergency" ? "#fff" : "#666",
            }}
          >
            {text}
          </span>
        ),
        sorter: (a, b) => a.BookingType.localeCompare(b.BookingType),
      },
      {
        title: "Mode of Session",
        dataIndex: "ModeOfSession",
        render: (text) => (
          <span style={{ color: "#4318FF", fontWeight: 500, fontSize: "14px" }}>
            {text}
          </span>
        ),
        sorter: (a, b) => a.ModeOfSession.localeCompare(b.ModeOfSession),
      },
    ];

    // Add Healer Name column for non-new-bookings tabs
    if (activeTab !== "new-bookings") {
      baseColumns.push({
        title: "Healer Name",
        dataIndex: "HealerName",
        render: (text) => (
          <span style={{ fontWeight: 500, color: "#1a1a1a" }}>{text}</span>
        ),
        sorter: (a, b) => a.HealerName.localeCompare(b.HealerName),
      });
    }

    baseColumns.push(
      {
        title: "Amount",
        dataIndex: "Amount",
        render: (text) => (
          <span style={{ fontWeight: 600, color: "#1a1a1a" }}>{text}</span>
        ),
        sorter: (a, b) =>
          parseInt(a.Amount.replace(/\D/g, "")) -
          parseInt(b.Amount.replace(/\D/g, "")),
      },
      {
        title: "Session Details",
        render: () => (
          <button
            style={{
              padding: "6px 16px",
              backgroundColor: "#000",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              fontSize: "12px",
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            More Info
          </button>
        ),
      }
    );

    // Add Assign Healer column for new-bookings tab
    if (activeTab === "new-bookings") {
      baseColumns.push({
        title: "Assign Healer",
        render: () => (
          <button
            style={{
              padding: "6px 16px",
              backgroundColor: "#000",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              fontSize: "12px",
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            Assign
          </button>
        ),
      });
    } else {
      // Add Status column for other tabs
      baseColumns.push({
        title: "Status",
        dataIndex: "Status",
        render: (text) => {
          const statusColors = {
            "In Progress": { bg: "#4318FF", color: "#fff" },
            Completed: { bg: "#04BD6C", color: "#fff" },
            "Not Started": { bg: "#E8E8E8", color: "#666" },
          };
          const style = statusColors[text] || statusColors["Not Started"];
          return (
            <span
              style={{
                padding: "6px 16px",
                borderRadius: "16px",
                fontSize: "12px",
                fontWeight: 500,
                backgroundColor: style.bg,
                color: style.color,
              }}
            >
              {text}
            </span>
          );
        },
        sorter: (a, b) => a.Status.localeCompare(b.Status),
      });
    }

    return baseColumns;
  };
  const components = {
  header: {
    cell: (props) => (
      <th
        {...props}
        style={{
          backgroundColor: "rgb(19, 129, 250)",
          color: "#fff",
          textAlign: "center",
          fontWeight: 600,
          fontSize: "14px",
          border: "1px solid #e8e8e8",
          padding: "10px",
        }}
      />
    ),
  },
};

  const rowSelection = activeTab === "new-bookings" ? {
    selectedRowKeys,
    onChange: (selectedKeys:any) => {
      setSelectedRowKeys(selectedKeys);
    },
  } : undefined;

  return (
    <>
      <Header />
      <SidebarNav />

      <div className="page-wrapper" style={{ marginLeft: "200px", padding: "20px" }}>
        <div className="content container-fluid">
          {/* Page Header */}
          <div style={{ marginBottom: "24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <div>
                <h2 style={{ fontSize: "24px", fontWeight: 600, margin: 0, marginTop: "24px" }}>
                  Appointments
                </h2>
                <div style={{ fontSize: "14px", color: "#666", marginTop: "4px" }}>
                  <Link to="/admin" style={{ color: "#4318FF", textDecoration: "none" }}>
                    Dashboard
                  </Link>
                  <span style={{ margin: "0 8px" }}>/</span>
                  <span>Appointments</span>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div style={{ display: "flex", gap: "12px", marginBottom: "20px" }}>
              {tabs.map((tab) => {
                const isActive = activeTab === tab.key;
                return (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    style={{
                      padding: "10px 20px",
                      border: "none",
                      background: isActive ? "rgb(19, 129, 250)" : "transparent",
                      fontSize: "14px",
                      fontWeight: 500,
                      color: isActive ? "#ffffff" : "#666",
                      borderRadius: "8px",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) e.currentTarget.style.background = "#F3F4F6";
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) e.currentTarget.style.background = "transparent";
                    }}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Search & Filter */}
            {/* Search & Filter */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <div style={{ display: "flex", gap: "12px" }}>
                <div style={{ position: "relative", maxWidth: "300px" }}>
                  <input
                    type="text"
                    placeholder="Search"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "8px 12px 8px 36px",
                      border: "1px solid #E8E8E8",
                      borderRadius: "6px",
                      fontSize: "14px",
                    }}
                  />
                  <span style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#666" }}>
                    🔍
                  </span>
                </div>
                <button
                  style={{
                    padding: "8px 16px",
                    border: "1px solid #E8E8E8",
                    borderRadius: "6px",
                    fontSize: "14px",
                    fontWeight: 500,
                    backgroundColor: "#fff",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <span>☰</span> Filter
                </button>
                {activeTab === "new-bookings" && (
                  <>
                    <button
                      style={{
                        padding: "8px 16px",
                        border: "1px solid #E8E8E8",
                        borderRadius: "6px",
                        fontSize: "14px",
                        fontWeight: 500,
                        backgroundColor: "#fff",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <span>\-/</span> Count wise filter
                    </button>
                  </>
                )}
              </div>

              {/* Show Assign Healer button only for new-bookings tab */}
              {activeTab === "new-bookings" && (
                <button
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "rgb(19, 129, 250)",
                    color: "#fff",
                    border: "none",
                    borderRadius: "6px",
                    fontSize: "14px",
                    fontWeight: 500,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                  onClick={() => {
                    if (selectedRowKeys.length > 0) {
                      console.log("Assign healer to:", selectedRowKeys);
                      // Add your assign healer logic here
                    } else {
                      alert("Please select at least one appointment");
                    }
                  }}
                >
                  Assign Healer
                </button>
              )}
            </div>
          </div>

          {/* Table Section */}
          <div className="row">
            <div className="col-sm-12">
              <div className="card" style={{ border: "1px solid #E8E8E8", borderRadius: "8px", boxShadow: "none" }}>
                <div className="card-body" style={{ padding: "0" }}>
                  <div className="table-responsive">
                    <Table
                      rowSelection={rowSelection}  // Add this line
                      pagination={{
                        total: getTableData().length,
                        showTotal: (total, range) =>
                          `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                        showSizeChanger: true,
                        onShowSizeChange: onShowSizeChange,
                        itemRender: itemRender,
                        position: ["bottomCenter"],
                      }}
                      style={{ overflowX: "auto" }}
                       components={components}
                      columns={getColumns()}  // Change from columns to getColumns()
                      dataSource={getTableData()}
                      rowKey={(record) => record.id}
                      className="modern-table"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminAppointments;