import React, { useState } from "react";
import { Table, Input, Button, Modal, Form, Select, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import {
  SearchOutlined,
  SortAscendingOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import SidebarNav from "../sidebar";
import Header from "../header";
import "./healer.css";
import { patient1, patient2, patient3, } from "../imagepath";

const { Option } = Select;

interface ClientData {
  key: number;
  clientId: string;
  clientName: string;
  avatar?: string;
  age?: number;
  address?: string;
  phone?: string;
  email?: string;
  status: "Activate" | "Deactivate";
  totalSessions?: number;
}

const initialData: ClientData[] = [
  {
    key: 1,
    clientId: "#HL457",
    clientName: "John Doe",
    avatar: patient1,
    age: 25,
    address: "Place",
    phone: "+91 1234567890",
    email: "email@gmail.com",
    totalSessions: 23,
    status: "Activate",
  },
  {
    key: 2,
    clientId: "#HL493",
    clientName: "Michel",
    avatar: patient2,
    age: 29,
    address: "Place",
    phone: "+91 23456543222",
    email: "email@gmail.com",
    totalSessions: 29,
    status: "Deactivate",
  },
  {
    key: 3,
    clientId: "#HL498",
    clientName: "Sara",
    avatar: patient3,
    age: 22,
    address: "Place",
    phone: "+91 8976543210",
    email: "email@gmail.com",
    totalSessions: 12,
    status: "Activate",
  },
];

const AdminDocters: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const [isManageModalOpen, setIsManageModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<ClientData | null>(null);
  const [data, setData] = useState<ClientData[]>(initialData);
  const [form] = Form.useForm();
  const [addForm] = Form.useForm();
  const [uploadFileList, setUploadFileList] = useState<any[]>([]);

  const columns: ColumnsType<ClientData> = [
    {
      title: "Healer id",
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
      title: "Healer name",
      dataIndex: "clientName",
      key: "clientName",
      render: (text, record) => (
        <div className="client-cell">
          {record.avatar && (
            <img src={record.avatar} alt={text} className="client-avatar" />
          )}
          <span className="client-name-text">{text}</span>
        </div>
      ),
    },
    {
      title: "Total Sessions",
      dataIndex: "totalSessions",
      key: "totalSessions",
      align: "center",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
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
          className={`status-btn ${status === "Activate" ? "btn-green" : "btn-red"}`}
          size="small"
        >
          {status}
        </Button>
      ),
      align: "center",
    },
  ];

  const handleClientClick = (record: ClientData) => {
    setSelectedClient(record);
    setIsManageModalOpen(true);
    // populate form values for editing
    form.setFieldsValue({
      clientName: record.clientName,
      phone: record.phone,
      age: record.age,
      email: record.email,
      address: record.address,
      totalSessions: record.totalSessions,
      status: record.status,
    });
  };

  const handleManageCancel = () => {
    setIsManageModalOpen(false);
    setSelectedClient(null);
    form.resetFields();
  };

  const handleManageSave = async () => {
    try {
      const values = await form.validateFields();
      if (!selectedClient) return;
      setData((prev) =>
        prev.map((d) =>
          d.key === selectedClient.key ? { ...d, ...values } : d
        )
      );
      message.success("Healer updated");
      handleManageCancel();
    } catch (err) {
      // validation failed
    }
  };

  const openAddModal = () => {
    setIsAddModalOpen(true);
    addForm.resetFields();
    setUploadFileList([]);
  };

  const handleAddCancel = () => {
    setIsAddModalOpen(false);
    addForm.resetFields();
    setUploadFileList([]);
  };

  const handleAddHealer = async () => {
    try {
      const values = await addForm.validateFields();
      const newKey = data.length ? Math.max(...data.map((d) => d.key)) + 1 : 1;
      const newHealer: ClientData = {
        key: newKey,
        clientId: values.clientId || `#HL${1000 + newKey}`,
        clientName: values.clientName,
        email: values.email,
        phone: values.phone,
        age: values.age,
        totalSessions: values.totalSessions || 0,
        address: values.address,
        status: values.status || "Activate",
        avatar:
          uploadFileList.length > 0
            ? (uploadFileList[0].thumbUrl || uploadFileList[0].url)
            : undefined,
      };
      setData((prev) => [newHealer, ...prev]);
      message.success("Healer added");
      handleAddCancel();
    } catch (err) {
      // validation failed
    }
  };

  // const uploadProps = {
  //   onRemove: (file: any) => {
  //     setUploadFileList((current) => {
  //       const index = current.indexOf(file);
  //       const newFileList = current.slice();
  //       newFileList.splice(index, 1);
  //       return newFileList;
  //     });
  //   },
  //   beforeUpload: (file: any) => {
  //     // prevent auto upload
  //     const reader = new FileReader();
  //     reader.onload = (e) => {
  //       // add a thumbnail URL so we can display it later
  //       setUploadFileList((current) => [
  //         ...current,
  //         {
  //           uid: file.uid,
  //           name: file.name,
  //           status: "done",
  //           url: e.target?.result,
  //           thumbUrl: e.target?.result,
  //         },
  //       ]);
  //     };
  //     reader.readAsDataURL(file);
  //     return false;
  //   },
  //   fileList: uploadFileList,
  //   listType: "picture",
  // };

  return (
    <>
      {/* if you use Ant Design globally, ensure antd css imported in index.tsx */}
      <Header />
      <SidebarNav />
      <div className="page-wrapper healers-page">
        <div className="content container-fluid">
          <div className="page-header">
            <h3 className="page-title">Manage Healers</h3>
            <p className="breadcrumb">Dashboard / Healers</p>
          </div>

          <div className="filter-bar d-flex justify-content-between align-items-center mb-3">
            <div className="d-flex align-items-center gap-2">
              <Input
                placeholder="Search"
                prefix={<SearchOutlined />}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                style={{ width: 260 }}
                allowClear
              />
              <Button
                icon={<SortAscendingOutlined />}
                className="sort-btn"
                type="default"
              >
                Sort
              </Button>
            </div>

            <div>
              <Button className="create-btn-black" onClick={openAddModal}>
                <PlusOutlined /> Create New Healer
              </Button>
            </div>
          </div>

          <div className="card p-3 white-panel">
            <Table
              columns={columns}
              dataSource={data.filter((item) =>
                item.clientName.toLowerCase().includes(searchText.toLowerCase())
              )}
              pagination={{
                total: data.length,
                pageSize: 10,
                showSizeChanger: true,
                pageSizeOptions: ["5", "10", "20", "50"],
              }}
              className="client-table"
              rowKey="key"
            />
          </div>
        </div>
      </div>

      {/* Manage Healer Modal (opens when clicking id) */}
      <Modal
        title="Manage Healer"
        open={isManageModalOpen}
        onCancel={handleManageCancel}
        onOk={handleManageSave}
        okText="Save"
        width={760}
        className="client-modal"
      >
        {selectedClient && (
          <div className="client-modal-content">
            <p className="breadcrumb">
              Dashboard / Healers / {selectedClient.clientId}
            </p>
            <div className="modal-card">
              <Form layout="vertical" form={form}>
                <div className="row">
                  <div className="col-md-6">
                    <Form.Item
                      label="Healer Name"
                      name="clientName"
                      rules={[{ required: true, message: "Please input name" }]}
                    >
                      <Input />
                    </Form.Item>
                  </div>
                  <div className="col-md-6">
                    <Form.Item label="Phone Number" name="phone">
                      <Input />
                    </Form.Item>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-4">
                    <Form.Item label="Age" name="age">
                      <Input />
                    </Form.Item>
                  </div>
                  <div className="col-md-4">
                    <Form.Item label="Total Sessions" name="totalSessions">
                      <Input />
                    </Form.Item>
                  </div>
                  <div className="col-md-4">
                    <Form.Item label="Account Status" name="status">
                      <Select>
                        <Option value="Activate">Activate</Option>
                        <Option value="Deactivate">Deactivate</Option>
                      </Select>
                    </Form.Item>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-12">
                    <Form.Item label="Email" name="email">
                      <Input />
                    </Form.Item>
                  </div>
                </div>

                <div style={{ marginTop: 8 }}>
                  <Button danger className="btn-red deactivate-btn">
                    Deactivate Account
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        )}
      </Modal>

      {/* Add Healer Modal */}
      <Modal
        title="Create New Healer"
        open={isAddModalOpen}
        onCancel={handleAddCancel}
        onOk={handleAddHealer}
        okText="Create"
        width={640}
        className="client-modal"
      >
        <Form layout="vertical" form={addForm}>
          <div className="row">
            <div className="col-md-6">
              <Form.Item
                label="Healer Name"
                name="clientName"
                rules={[{ required: true, message: "Please enter healer name" }]}
              >
                <Input />
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item label="Healer ID" name="clientId">
                <Input placeholder="#HLxxx (auto if empty)" />
              </Form.Item>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <Form.Item
                label="Email"
                name="email"
                rules={[{ type: "email", message: "Invalid email" }]}
              >
                <Input />
              </Form.Item>
            </div>

            <div className="col-md-6">
              <Form.Item label="Phone" name="phone">
                <Input />
              </Form.Item>
            </div>
          </div>

          <div className="row">
            <div className="col-md-4">
              <Form.Item label="Age" name="age">
                <Input />
              </Form.Item>
            </div>

            <div className="col-md-4">
              <Form.Item label="Total Sessions" name="totalSessions">
                <Input />
              </Form.Item>
            </div>

            <div className="col-md-4">
              <Form.Item label="Account Status" name="status" initialValue="Activate">
                <Select>
                  <Option value="Activate">Activate</Option>
                  <Option value="Deactivate">Deactivate</Option>
                </Select>
              </Form.Item>
            </div>
          </div>

          <Form.Item label="Avatar / Photo">
            {/* <Upload {...uploadProps}>
              <Button icon={<UploadOutlined />}>Choose File</Button>
            </Upload> */}
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AdminDocters;