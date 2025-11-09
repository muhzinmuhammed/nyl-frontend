import React, { useState } from "react";
import { Table, Input, Button, Modal, Form, Upload } from "antd";
import type { ColumnsType } from "antd/es/table";
import { SearchOutlined, SortAscendingOutlined, UploadOutlined } from "@ant-design/icons";
import SidebarNav from "../sidebar";
import Header from "../header";
import "./customer.css";
import { patient1, patient2, patient3, patient4, patient5 } from "../imagepath";

interface ClientData {
  key: number;
  clientId: string;
  clientName: string;
  avatar: string;
  age: number;
  address: string;
  phone: string;
  status: string;
}

const AdminClient: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<ClientData | null>(null);

  const data: ClientData[] = [
    {
      key: 1,
      clientId: "#NYL457",
      clientName: "John Doe",
      avatar: patient1,
      age: 25,
      address: "Place",
      phone: "+91 1234567890",
      status: "Activate",
    },
    {
      key: 2,
      clientId: "#NYL493",
      clientName: "Michel",
      avatar: patient2,
      age: 29,
      address: "Place",
      phone: "+91 23456543222",
      status: "Deactivate",
    },
    {
      key: 3,
      clientId: "#NYL498",
      clientName: "Sara",
      avatar: patient3,
      age: 22,
      address: "Place",
      phone: "+91 8976543210",
      status: "Activate",
    },
  ];

  const columns: ColumnsType<ClientData> = [
    {
      title: "Client id",
      dataIndex: "clientId",
      key: "clientId",
      render: (text, record) => (
        <span
          className="clickable-id"
          onClick={() => handleClientClick(record)}
        >
          {text}
        </span>
      ),
    },
    {
      title: "Client name",
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
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Phone number",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Account status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Button
          className={`status-btn ${status === "Activate" ? "btn-green" : "btn-red"
            }`}
          size="small"
        >
          {status}
        </Button>
      ),
    },
  ];

  const handleClientClick = (record: ClientData) => {
    setSelectedClient(record);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedClient(null);
  };

  return (
    <>
      <Header />
      <SidebarNav />
      <div className="page-wrapper">
        <div className="content container-fluid">
          <div className="page-header">
            <h3 className="page-title">Manage Clients</h3>
            <p className="breadcrumb">Dashboard / Clients</p>
          </div>

          <div className="filter-bar d-flex justify-content-between align-items-center mb-3">
            <div className="d-flex align-items-center gap-2">
              <Input
                placeholder="Search"
                prefix={<SearchOutlined />}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                style={{ width: 250 }}
              />
              <Button
                icon={<SortAscendingOutlined />}
                className="sort-btn"
                type="default"
              >
                Sort
              </Button>
            </div>
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
              className="client-table"
            />
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal style={{ left: 50 }}
        title="Manage Client"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        width={800}
        className="client-modal"
      >
        {selectedClient && (
          <div className="client-modal-content">
            <p className="breadcrumb">Dashboard / Clients / {selectedClient.clientId}</p>
            <div className="modal-card">
              <Form layout="vertical">
                <div className="row">
                  <div className="col-md-4">
                    <Form.Item label="Client Name">
                      <Input value={selectedClient.clientName} />
                    </Form.Item>
                  </div>
                  <div className="col-md-4">
                    <Form.Item label="Phone Number">
                      <Input value={selectedClient.phone} />
                    </Form.Item>
                  </div>
                  <div className="col-md-4">
                    <Form.Item label="Age">
                      <Input value={selectedClient.age} />
                    </Form.Item>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <Form.Item label="Email Address">
                      <Input placeholder="mail@address.com" />
                    </Form.Item>
                  </div>
                  <div className="col-md-3">
                    <Form.Item label="Place">
                      <Input placeholder="Place" />
                    </Form.Item>
                  </div>
                  <div className="col-md-3">
                    <Form.Item label="District">
                      <Input placeholder="District" />
                    </Form.Item>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-4">
                    <Form.Item label="No of Sessions Attended">
                      <Input placeholder="20" />
                    </Form.Item>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <Form.Item label="Diseases">
                      <Input placeholder="Disease name" />
                    </Form.Item>
                  </div>
                  <div className="col-md-6">
                    <Form.Item label="Previous Treatment if any">
                      <Input placeholder="Previous treatment details" />
                    </Form.Item>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-12">
                    <Form.Item label="Scanning / Test Reports">
                      <Upload>
                        <Button icon={<UploadOutlined />}>Choose File</Button>
                      </Upload>
                      <span className="file-note">Report file.pdf</span>
                    </Form.Item>
                  </div>
                </div>

                <Button className="btn-red deactivate-btn">
                  Deactivate Account
                </Button>
              </Form>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default AdminClient;
