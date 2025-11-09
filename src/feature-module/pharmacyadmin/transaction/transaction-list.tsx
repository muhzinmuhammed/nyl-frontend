import React, { useState } from "react";
import { Table, Input, DatePicker, Button } from "antd";
import type { ColumnsType } from "antd/es/table";
import { SearchOutlined } from "@ant-design/icons";
import SidebarNav from "../sidebar";
import Header from "../header";
import { Link } from "react-router-dom";
import "./PharmacyAdminTransactionList.css";

import {  logo } from "../imagepath";

const { RangePicker } = DatePicker;

interface PaymentData {
  key: number;
  clientId: string;
  clientName: string;
  avatar: string;
  appointmentTime: string;
  modeOfSession?: string;
  amount: string;
  sessionDetails: string;
  payment_mode: string;
}

const PharmacyAdminTransactionList: React.FC = () => {
  const [searchText, setSearchText] = useState("");

  const data: PaymentData[] = [
    {
      key: 1,
      clientId: "#NYL457",
      clientName: "John Doe",
      payment_mode: "Cash",
      avatar: "patient1",
      appointmentTime: "5 Nov 2019\n11:00 AM - 11:35 AM",
      modeOfSession: "Direct healing",
      amount: "₹520",
      sessionDetails: "View details",
    },
    {
      key: 2,
      clientId: "#NYL493",
      clientName: "Michel",
      avatar: "patient2",
      appointmentTime: "5 Nov 2019\n11:00 AM - 11:35 AM",
      modeOfSession: "Direct healing",
      amount: "₹1541",
      sessionDetails: "View details",
      payment_mode: "Cash",
    },
    {
      key: 3,
      clientId: "#NYL457",
      clientName: "John Doe",
      avatar: "patient3",
      appointmentTime: "5 Nov 2019\n11:00 AM - 11:35 AM",
      modeOfSession: "Direct healing",
      amount: "₹520",
      sessionDetails: "View details",
      payment_mode: "Cash",
    },
    {
      key: 4,
      clientId: "#NYL493",
      clientName: "Michel",
      avatar: "patient4",
      appointmentTime: "5 Nov 2019\n11:00 AM - 11:35 AM",
      modeOfSession: "Direct healing",
      amount: "₹1541",
      sessionDetails: "View details",
      payment_mode: "Cash",
    },
  ];

  const columns: ColumnsType<PaymentData> = [
    {
      title: "Patient name",
      dataIndex: "clientName",
      key: "clientName",
      render: (text, record) => (
        <div className="client-cell-left">
          <img src={record.avatar} alt={text} className="client-avatar" />
          <div className="client-meta">
            <div className="client-name">{text}</div>
            <div className="client-id">{record.clientId}</div>
          </div>
        </div>
      ),
    },
    {
      title: "Appointment Time",
      dataIndex: "appointmentTime",
      key: "appointmentTime",
      render: (text: string) => {
        const [date, time] = text.split("\n");
        return (
          <div className="appointment-col">
            <div className="appt-date">{date}</div>
            <div className="appt-time">{time}</div>
          </div>
        );
      },
    },
    {
      title: "Booking details",
      dataIndex: "sessionDetails",
      key: "sessionDetails",
      render: (text) => (
        <Link to="#" className="view-details">
          {text}
        </Link>
      ),
    },
    {
      title: "Payment mode",
      dataIndex: "payment_mode",
      key: "payment_mode",
      render: (text) => <span className="pill payment-pill">{text}</span>,
      align: "center",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (text) => <div className="amount-cell">{text}</div>,
      align: "right",
    },
  ];

  const filteredData = data.filter((item) =>
    item.clientName.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <>
      <Header />
      <div className="nyl-layout">
        <SidebarNav />
        <div className="page-wrapper nyl-page">
          <div className="content container-fluid">
            <div className="page-header nyl-page-header">
              <div className="page-header-left">
                <div>
                  <h3 className="page-title nyl-title">Payments</h3>
                  <p className="breadcrumb nyl-breadcrumb">Dashboard / Payments</p>
                </div>
              </div>

              <div className="header-right-actions">
                <div className="search-and-range">
                  <Input
                    placeholder="Search"
                    prefix={<SearchOutlined />}
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    allowClear
                    className="nyl-search"
                    style={{ width: 280 }}
                  />
                  <RangePicker className="nyl-range" />
                </div>
              </div>
            </div>

            <div className="card nyl-card">
              <Table
                columns={columns}
                dataSource={filteredData}
                pagination={{
                  total: filteredData.length,
                  showSizeChanger: true,
                  pageSizeOptions: ["5", "10", "20"],
                }}
                rowClassName={() => "nyl-table-row"}
                className="payment-table nyl-payment-table"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PharmacyAdminTransactionList;