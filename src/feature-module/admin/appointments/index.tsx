import React, { useMemo, useState, useEffect } from "react";
import {
  Table,
  Tabs,
  Input,
  Button,
  Avatar,
  Tag,
  Space,
  Modal,
  Form,
  Row,
  Col,
  Upload,
  DatePicker,
} from "antd";
import { SearchOutlined, FilterOutlined, UploadOutlined } from "@ant-design/icons";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-daterangepicker/daterangepicker.css";
import { itemRender, onShowSizeChange } from "../paginationfunction";
import SidebarNav from "../sidebar";
import "./index.css";
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

const { TabPane } = Tabs;

const AdminAppointments = () => {
  const [activeTab, setActiveTab] = useState("todays-booking");
  const [searchText, setSearchText] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  // Modal state
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [form] = Form.useForm();

  // === All Appointments Data ===
  const allData = useMemo(
    () => [
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
        phone: "+91 99999 99999",
        age: "32",
        email: "john@example.com",
        place: "City",
        district: "District A",
        disease: "Back pain",
        previousTreatment: "Physiotherapy",
        sessionName: "Healing Session",
        dateTime: "10:00 - 11:00 AM, 15 Oct",
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
        phone: "+91 88888 88888",
        age: "28",
        email: "michel@example.com",
        place: "Town",
        district: "District B",
        disease: "Migraine",
        previousTreatment: "",
        sessionName: "Consultation",
        dateTime: "12:00 - 12:15 PM, 06 Nov",
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
        phone: "+91 77777 77777",
        age: "40",
        email: "walter@example.com",
        place: "Village",
        district: "District C",
        disease: "Allergy",
        previousTreatment: "Antihistamines",
        sessionName: "Healing Session",
        dateTime: "01:10 - 01:35 PM, 07 Nov",
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
        phone: "+91 66666 66666",
        age: "26",
        email: "elsie@example.com",
        place: "Metro",
        district: "District D",
        disease: "",
        previousTreatment: "",
        sessionName: "Direct Healing",
        dateTime: "02:00 - 02:30 PM, 08 Nov",
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
        phone: "+91 99999 99998",
        age: "35",
        email: "john2@example.com",
        place: "City",
        district: "District A",
        disease: "Knee pain",
        previousTreatment: "",
        sessionName: "Healing Session",
        dateTime: "11:00 - 11:35 AM, 05 Nov",
      },
    ],
    []
  );

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

    if (searchText) {
      filtered = filtered.filter(
        (item) =>
          item.DoctorName.toLowerCase().includes(searchText.toLowerCase()) ||
          (item.HealerName || "").toLowerCase().includes(searchText.toLowerCase()) ||
          (item.ModeOfSession || "").toLowerCase().includes(searchText.toLowerCase())
      );
    }

    return filtered;
  };

  // Open modal & set selected record
  const openMoreInfo = (record) => {
    setSelectedRecord(record);
    setModalVisible(true);
    // populate form when showing
    form.setFieldsValue({
      sessionName: record.sessionName || "",
      healerDetails: record.HealerName || "",
      dateTime: record.dateTime || `${record.Date} ${record.time}`,
      bookingType: record.BookingType || "",
      clientName: record.PatientName || record.DoctorName || "",
      phone: record.phone || "",
      age: record.age || "",
      email: record.email || "",
      modeOfSession: record.ModeOfSession || "",
      place: record.place || "",
      district: record.district || "",
      disease: record.disease || "",
      previousTreatment: record.previousTreatment || "",
    });
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedRecord(null);
    form.resetFields();
  };

  // columns generator (keeps your logic but uses Antd components for nicer look)
  const getColumns = () => {
    const baseColumns = [
      {
        title: "Client Name",
        dataIndex: "DoctorName",
        key: "DoctorName",
        render: (text, record) => (
          <Space align="center">
            <Avatar src={record.images1} size={36} />
            <span className="client-name">{text}</span>
          </Space>
        ),
        sorter: (a, b) => a.DoctorName.localeCompare(b.DoctorName),
      },
      {
        title: "Appointment Time",
        dataIndex: "time",
        key: "time",
        render: (text, record) => (
          <div>
            <div className="appointment-date">{record.Date}</div>
            <div className="appointment-time">{text}</div>
          </div>
        ),
        sorter: (a, b) => a.Date.localeCompare(b.Date),
      },
      {
        title: "Booking Type",
        dataIndex: "BookingType",
        key: "BookingType",
        render: (text) => (
          <Tag
            className={`booking-type-badge ${text === "Emergency" ? "booking-emergency" : "booking-normal"}`}
          >
            {text}
          </Tag>
        ),
        sorter: (a, b) => a.BookingType.localeCompare(b.BookingType),
      },
      {
        title: "Mode of Session",
        dataIndex: "ModeOfSession",
        key: "ModeOfSession",
        render: (text) => (
          <span style={{ color: "#4318FF", fontWeight: 600 }}>{text}</span>
        ),
        sorter: (a, b) => a.ModeOfSession.localeCompare(b.ModeOfSession),
      },
    ];

    if (activeTab !== "new-bookings") {
      baseColumns.push({
        title: "Healer Name",
        dataIndex: "HealerName",
        key: "HealerName",
        render: (text) => <span style={{ fontWeight: 500 }}>{text}</span>,
        sorter: (a, b) => a.HealerName.localeCompare(b.HealerName),
      });
    }

    baseColumns.push({
      title: "Amount",
      dataIndex: "Amount",
      key: "Amount",
      render: (text) => <strong>{text}</strong>,
      sorter: (a, b) =>
        parseInt(a.Amount.replace(/\D/g, "")) -
        parseInt(b.Amount.replace(/\D/g, "")),
    });

    if (activeTab !== "session-history") {
      baseColumns.push({
        title: "Session Details",
        dataIndex: "sessionDetails",
        key: "sessionDetails",
        render: (_, record) => (
          <Button className="more-info-btn" size="small" onClick={() => openMoreInfo(record)}>
            More info
          </Button>
        ),
      });
    }

    if (activeTab === "new-bookings") {
      baseColumns.push({
        title: "Assign Healer",
        key: "assign",
        render: (_, record) => (
          <Button size="small" type="primary" onClick={() => console.log("Assign", record.id)}>
            Assign
          </Button>
        ),
      });
    } else {
      baseColumns.push({
        title: "Status",
        dataIndex: "Status",
        key: "Status",
        render: (text) => {
          const statusColors = {
            "In Progress": { color: "white", background: "#4318FF" },
            Completed: { color: "white", background: "#04BD6C" },
            "Not Started": { color: "#666", background: "#E8E8E8" },
          };
          const style = statusColors[text] || statusColors["Not Started"];
          return (
            <span
              className="status-badge"
              style={{ background: style.background, color: style.color }}
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
            backgroundColor: "#4318FF",
            color: "#fff",
            textAlign: "center",
            fontWeight: 600,
            fontSize: "13px",
            border: "none",
            padding: "12px",
          }}
        />
      ),
    },
  };

  const rowSelection = activeTab === "new-bookings"
    ? {
      selectedRowKeys,
      onChange: (keys) => setSelectedRowKeys(keys),
    }
    : undefined;

  // Upload props for demo (no actual upload handler here)
  const uploadProps = {
    beforeUpload: (file) => {
      // prevent auto upload; keep file in list (for demo)
      return false;
    },
  };

  return (
    <>
      <Header />
      <SidebarNav />

      <div className="page-wrapper">
        <div className="content container-fluid">
          <div style={{ marginBottom: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <div>
                <h2 className="page-title">Appointments</h2>
                <div className="breadcrumb">
                  <Link to="/admin" className="breadcrumb-link">Dashboard</Link>
                  <span className="breadcrumb-sep">/</span>
                  <span>Appointments</span>
                </div>
              </div>
            </div>

            <div style={{ marginBottom: 20 }}>
              <Tabs
                activeKey={activeTab}
                onChange={(key) => {
                  setActiveTab(key);
                  setSelectedRowKeys([]); // reset selection when changing tab
                }}
                className="custom-tabs"
              >
                <TabPane tab="Today's Booking" key="todays-booking" />
                <TabPane tab="New Bookings" key="new-bookings" />
                <TabPane tab="Session History" key="session-history" />
                <TabPane tab="Emergency" key="emergency" />
              </Tabs>
            </div>

            <div className="controls-row" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <Input
                  placeholder="Search"
                  prefix={<SearchOutlined />}
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  style={{ width: 320, borderRadius: 6 }}
                />
                <Button icon={<FilterOutlined />}>Filter</Button>
                {activeTab === "new-bookings" && (
                  <Button>Count-wise filter</Button>
                )}
              </div>

              {activeTab === "new-bookings" && (
                <Button
                  type="primary"
                  onClick={() => {
                    if (selectedRowKeys.length > 0) {
                      console.log("Assign healer to:", selectedRowKeys);
                    } else {
                      alert("Please select at least one appointment");
                    }
                  }}
                >
                  Assign Healer
                </Button>
              )}
            </div>
          </div>

          <div className="card">
            <div className="card-body" style={{ padding: 0 }}>
              <div className="table-responsive">
                <Table
                  rowSelection={rowSelection}
                  pagination={{
                    total: getTableData().length,
                    showTotal: (total, range) => `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                    showSizeChanger: true,
                    onShowSizeChange: onShowSizeChange,
                    itemRender: itemRender,
                    position: ["bottomCenter"],
                  }}
                  style={{ overflowX: "auto" }}
                  components={components}
                  columns={getColumns()}
                  dataSource={getTableData()}
                  rowKey={(record) => record.id}
                  className="modern-table"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* More Info Modal */}
      <Modal style={{left:'70px',top:'30px'}}
        title={null}
        visible={modalVisible}
        onCancel={closeModal}
        footer={[
          <Button key="close" onClick={closeModal}>
            Close
          </Button>,
        ]}
        width={920}
        className="detail-modal"
        centered
        destroyOnClose
      >
        <div className="session-info-header">
          <div>
            <div className="session-info-title">Session Info</div>
            <div className="session-subrow">
              <span className="session-label">Session Name</span>
              <span className="session-value">{selectedRecord?.sessionName}</span>
            </div>
          </div>

          <div style={{ textAlign: "right" }}>
            <div style={{ marginBottom: 8 }}>
              <a className="healer-link">{selectedRecord?.HealerName}</a>
            </div>
            <div style={{ marginBottom: 8 }}>{selectedRecord?.dateTime}</div>
            <Tag className={`booking-type-badge ${selectedRecord?.BookingType === "Emergency" ? "booking-emergency" : "booking-normal"}`}>
              {selectedRecord?.BookingType}
            </Tag>
          </div>
        </div>

        <Form form={form} layout="vertical">
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label="Client Name" name="clientName">
                <Input disabled />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Phone Number" name="phone">
                <Input disabled />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Age" name="age">
                <Input disabled />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label="Email Address" name="email">
                <Input disabled />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Mode of Session" name="modeOfSession">
                <Input disabled />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Place" name="place">
                <Input disabled />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label="District" name="district">
                <Input disabled />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Diseases" name="disease">
                <Input.TextArea rows={1} disabled />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Previous Treatment if any" name="previousTreatment">
                <Input disabled />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Scanning / Test Reports">
                <Upload {...uploadProps} fileList={[]}>
                  <Button icon={<UploadOutlined />}>Choose File</Button>
                </Upload>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label="Upload Images">
                <Upload {...uploadProps} listType="picture">
                  <Button icon={<UploadOutlined />}>Choose Image</Button>
                </Upload>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default AdminAppointments;