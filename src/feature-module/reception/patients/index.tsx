import React, { useState } from "react";
import {
  Table,
  Input,
  Button,
  Space,
  Modal,
  Form,
  Select,
  Upload,
  message,
} from "antd";
import type { UploadFile } from "antd/es/upload/interface";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-daterangepicker/daterangepicker.css";
import "./AdminPatients.css";
import SidebarNav from "../sidebar";
import { itemRender, onShowSizeChange } from "../paginationfunction";
import {
  patient1,
  patient10,
  patient11,
  patient12,
  patient13,
  patient14,
  patient15,
  patient2,
  patient3,
  patient4,
  patient5,
  patient6,
  patient7,
  patient8,
  patient9,
} from "../imagepath";
import { Link } from "react-router-dom";
import Header from "../header";

const { Search } = Input;
const { Option } = Select;

type Patient = {
  id: number;
  PatientID: string;
  PatientName: string;
  Age: string;
  Address: string;
  Phone: string;
  VisitLast: string;
  Paid: string;
  image: string;
};

const AdminPatients: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selected, setSelected] = useState<Patient | null>(null);
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [imageList, setImageList] = useState<UploadFile[]>([]);

  const data: Patient[] = [
    {
      id: 1,
      PatientID: "#PT001",
      PatientName: "Charlene Reed",
      Age: "29",
      Address: "4417 Goosetown Drive, Taylorsville, North Carolina, 28681",
      Phone: "8286329170",
      VisitLast: "20 Oct 2019",
      Paid: "$100.00",
      image: patient1,
    },
    /* ... other rows (kept same as your dataset) ... */
    {
      id: 15,
      PatientID: "#PT015",
      PatientName: "Jessica Garza",
      Age: "10",
      Address: "4672 Rose Street, Schaumburg, Illinois, 60173 ",
      Phone: "7082788201",
      VisitLast: "6 Nov 2019",
      Paid: "$310.00",
      image: patient15,
    },
  ];

  const openModal = (record: Patient) => {
    setSelected(record);
    // set form values from record
    form.setFieldsValue({
      clientName: record.PatientName,
      phoneNumber: record.Phone,
      age: record.Age,
      email: "",
      modeOfSession: "Distant healing",
      place: "",
      district: "",
      diseases: "",
      previousTreatment: "",
    });
    setFileList([]);
    setImageList([]);
    setModalVisible(true);
  };

  const handleCancel = () => {
    setModalVisible(false);
    form.resetFields();
  };

  const onFinish = (values: any) => {
    // values + fileList + imageList available here
    console.log("Form submit:", values, {
      files: fileList,
      images: imageList,
      selected,
    });
    message.success("Session info saved (demo).");
    setModalVisible(false);
    form.resetFields();
  };

  // Upload helper: prevent automatic upload, keep file list in state
  const beforeUpload = (file: UploadFile) => {
    // prevent upload, just store file in state
    return false;
  };

  const fileProps = {
    beforeUpload: (file: UploadFile) => {
      setFileList((prev) => [...prev, file]);
      return false;
    },
    onRemove: (file: UploadFile) => {
      setFileList((prev) => prev.filter((f) => f.uid !== file.uid));
    },
    fileList,
  };

  const imageProps = {
    listType: "picture",
    beforeUpload: (file: UploadFile) => {
      setImageList((prev) => [...prev, file]);
      return false;
    },
    onRemove: (file: UploadFile) => {
      setImageList((prev) => prev.filter((f) => f.uid !== file.uid));
    },
    fileList: imageList,
  };

  const columns = [
    {
      title: "Client ID",
      dataIndex: "PatientID",
      key: "PatientID",
      sorter: (a: any, b: any) => a.PatientID.length - b.PatientID.length,
      width: 120,
    },
    {
      title: "Client name",
      dataIndex: "PatientName",
      key: "PatientName",
      render: (text: any, record: any) => (
        <div className="client-cell">
          <Link className="avatar mx-2" to="/admin/profile">
            <img className="rounded-circle" src={record.image} alt={text} />
          </Link>
          <Link to="/admin/profile">{text}</Link>
        </div>
      ),
      sorter: (a: any, b: any) => a.PatientName.length - b.PatientName.length,
      width: 200,
    },
    {
      title: "Appointment Time",
      dataIndex: "VisitLast",
      key: "VisitLast",
      render: (text: any) => (
        <div className="appointment-time">
          <div>{text}</div>
          <div className="small muted">11.00 AM - 11.35 AM</div>
        </div>
      ),
      sorter: (a: any, b: any) => a.VisitLast.length - b.VisitLast.length,
      width: 180,
    },
    {
      title: "Disease",
      dataIndex: "Address",
      key: "Address",
      render: (text: any) => <span className="wrap-col">{text.split(",")[0]}</span>,
      sorter: (a: any, b: any) => a.Address.length - b.Address.length,
      width: 180,
    },
    {
      title: "Session Details",
      dataIndex: "Phone",
      key: "Phone",
      render: (_: any, record: Patient) => (
        <a
          href="#more"
          onClick={(e) => {
            e.preventDefault();
            openModal(record);
          }}
        >
          More info
        </a>
      ),
      width: 120,
    },
    {
      title: "Booking Type",
      dataIndex: "Paid",
      key: "Paid",
      render: (text: any) => <span className="badge">Normal</span>,
      sorter: (a: any, b: any) => a.Paid.length - b.Paid.length,
      width: 120,
    },
  ];

  return (
    <>
      <Header />
      <SidebarNav />
      <div className="page-wrapper admin-patients-wrapper">
        <div className="content container-fluid">
          <div className="page-header">
            <div className="row align-items-center">
              <div className="col-sm-8">
                <h3 className="page-title">Admin Healing</h3>
                <p className="page-subtitle">Dashboard / My Patients</p>
              </div>
              <div className="col-sm-4 text-sm-right">
                <Link to="/admin/healing" >
                  <Button type="primary" className="start-btn">
                    Start Healing
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          <div className="card patients-card">
            <div className="card-body">
              <div className="patients-toolbar">
                <Space direction="horizontal" size="middle">
                  <Search
                    placeholder="Search or type command..."
                    onSearch={(value) => console.log("search:", value)}
                    style={{ width: 300 }}
                    allowClear
                  />
                  <Button className="sort-btn">Sort</Button>
                </Space>
              </div>

              <div className="table-responsive">
                <Table
                  className="admin-table"
                  pagination={{
                    total: data.length,
                    showTotal: (total, range) =>
                      `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                    showSizeChanger: true,
                    onShowSizeChange: onShowSizeChange,
                    itemRender: itemRender,
                    pageSize: 10,
                  }}
                  style={{ overflowX: "auto" }}
                  columns={columns}
                  dataSource={data}
                  rowKey={(record) => record.id}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for "More info" */}
      <Modal
        title="Session Info"
        visible={modalVisible}
        onCancel={handleCancel}
        footer={null}
        width={760}
        destroyOnClose
      >
        <Form
          layout="vertical"
          form={form}
          onFinish={onFinish}
          initialValues={{ modeOfSession: "Distant healing" }}
        >
          <div className="session-top-row">
            <Form.Item label="Session Name" name="sessionName">
              <Input placeholder="Healing Session" />
            </Form.Item>
            <Form.Item label="Date & Time" name="dateTime">
              <Input placeholder="10:00 - 11:00 AM, 15 Oct" />
            </Form.Item>
            <Form.Item label="Booking Type" name="bookingType">
              <Select>
                <Option value="Normal">Normal</Option>
                <Option value="Urgent">Urgent</Option>
              </Select>
            </Form.Item>
          </div>

          <div className="session-grid">
            <Form.Item
              label="Client Name"
              name="clientName"
              rules={[{ required: true, message: "Please enter client name" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Phone Number"
              name="phoneNumber"
              rules={[{ required: true, message: "Please enter phone number" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item label="Age" name="age">
              <Input />
            </Form.Item>

            <Form.Item label="Email Address" name="email">
              <Input />
            </Form.Item>
            <Form.Item label="Mode of Session" name="modeOfSession">
              <Select>
                <Option value="Distant healing">Distant healing</Option>
                <Option value="In person">In person</Option>
              </Select>
            </Form.Item>
            <Form.Item label="Place" name="place">
              <Input />
            </Form.Item>

            <Form.Item label="District" name="district">
              <Input />
            </Form.Item>
          </div>

          <Form.Item label="Diseases" name="diseases">
            <Input />
          </Form.Item>

          <Form.Item label="Previous Treatment (if any)" name="previousTreatment">
            <Input />
          </Form.Item>

          <Form.Item label="Scanning / Test Reports">
            <Upload {...fileProps}>
              <Button>Choose File</Button>
            </Upload>
            <div className="hint">Upload up to 10 supported files. Max 100 MB per file.</div>
          </Form.Item>

          <Form.Item label="Upload Images">
            <Upload {...imageProps} accept="image/*">
              <Button>Choose File</Button>
            </Upload>
          </Form.Item>

          <Form.Item className="text-right">
            <Space>
              <Button onClick={handleCancel}>Cancel</Button>
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AdminPatients;