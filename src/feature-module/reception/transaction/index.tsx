import React, { useState } from "react";
import { Table, Input, DatePicker, Button } from "antd";
import type { ColumnsType } from "antd/es/table";
import { SearchOutlined } from "@ant-design/icons";
import SidebarNav from "../sidebar";
import Header from "../header";
import { Link } from "react-router-dom";
import "./AdminPayments.css";

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

const { RangePicker } = DatePicker;

interface PaymentData {
  key: number;
  clientId: string;
  clientName: string;
  avatar: string;
  appointmentTime: string;
  modeOfSession: string;
  amount: string;
  sessionDetails: string;
  paymentStatus: string;
}

const AdminPayments: React.FC = () => {
  const [searchText, setSearchText] = useState("");

  const data: PaymentData[] = [
    {
      key: 1,
      clientId: "#NYL457",
      clientName: "John Doe",
      avatar: patient1,
      appointmentTime: "5 Nov 2019 • 11:00 AM – 11:35 AM",
      modeOfSession: "Direct healing",
      amount: "₹520",
      sessionDetails: "More info",
      paymentStatus: "Done",
    },
    {
      key: 2,
      clientId: "#NYL493",
      clientName: "Michel",
      avatar: patient2,
      appointmentTime: "5 Nov 2019 • 11:00 AM – 11:35 AM",
      modeOfSession: "Direct healing",
      amount: "₹1541",
      sessionDetails: "More info",
      paymentStatus: "Not Done",
    },
    {
      key: 3,
      clientId: "#NYL457",
      clientName: "John Doe",
      avatar: patient3,
      appointmentTime: "5 Nov 2019 • 11:00 AM – 11:35 AM",
      modeOfSession: "Direct healing",
      amount: "₹520",
      sessionDetails: "More info",
      paymentStatus: "Done",
    },
    {
      key: 4,
      clientId: "#NYL493",
      clientName: "Michel",
      avatar: patient4,
      appointmentTime: "5 Nov 2019 • 11:00 AM – 11:35 AM",
      modeOfSession: "Direct healing",
      amount: "₹1541",
      sessionDetails: "More info",
      paymentStatus: "Not Done",
    },
  ];

  const columns: ColumnsType<PaymentData> = [
    {
      title: "Client Id",
      dataIndex: "clientId",
      key: "clientId",
    },
    {
      title: "Client Name",
      dataIndex: "clientName",
      key: "clientName",
      render: (text, record) => (
        <div className="client-cell">
          <img src={record.avatar} alt={text} className="client-avatar" />
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: "Appointment Time",
      dataIndex: "appointmentTime",
      key: "appointmentTime",
    },
    {
      title: "Mode of Session",
      dataIndex: "modeOfSession",
      key: "modeOfSession",
      render: (text) => <span className="session-mode">{text}</span>,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Session Details",
      dataIndex: "sessionDetails",
      key: "sessionDetails",
      render: () => (
        <Button className="more-info-btn" size="small">
          More Info
        </Button>
      ),
    },
    {
      title: "Payment Status",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
      render: (text) => (
        <span
          className={`status-badge ${
            text === "Done" ? "status-done" : "status-notdone"
          }`}
        >
          {text}
        </span>
      ),
    },
  ];

  return (
    <>
      <Header />
      <SidebarNav />
      <div className="page-wrapper">
        <div className="content container-fluid">
          <div className="page-header">
            <h3 className="page-title">Payments</h3>
            <p className="breadcrumb">Dashboard / Payments</p>
          </div>

          <div className="filter-bar d-flex justify-content-between align-items-center mb-3">
            <Input
              placeholder="Search"
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{ width: 250 }}
            />
            <RangePicker />
          </div>

          <div className="card p-3">
            <Table
              columns={columns}
              dataSource={data.filter((item) =>
                item.clientName.toLowerCase().includes(searchText.toLowerCase())
              )}
              pagination={{
                total: data.length,
                showSizeChanger: true,
              }}
              className="payment-table"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminPayments;
