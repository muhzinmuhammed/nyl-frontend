import React, { useState } from "react";
import SidebarNav from "../sidebar";
import Header from "../header/index";
import { Modal, Button, Form } from "react-bootstrap";

const BookingSummaryCard = ({ title, count, linkText, linkHref }) => (
  <div className="card-body">
    <h4 className="card-title mb-3">{title}</h4>
    <div className="d-flex justify-content-between align-items-center">
      <h3>{count}</h3>
      <a href={linkHref} className="text-muted small">
        {linkText}
      </a>
    </div>
  </div>
);

const BookingTableRow = ({
  patientName,
  time,
  detailsLink,
  paymentLink,
  amount,
  status,
}) => (
  <tr>
    <td>
      <div className="d-flex align-items-center">
        <div
          className="avatar-sm me-3 bg-secondary rounded-circle"
          style={{ width: "30px", height: "30px" }}
        ></div>
        <h2 className="table-avatar">
          <a href="#">{patientName}</a>
        </h2>
      </div>
    </td>
    <td>{time}</td>
    <td>
      <a href={detailsLink} className="btn btn-sm btn-outline-info">
        View details
      </a>
    </td>
    <td>
      <a
        href={paymentLink}
        className={`btn btn-sm btn-success ${status === "Cash" ? "bg-success" : "bg-secondary"
          }`}
      >
        {status}
      </a>
    </td>
    <td>{amount}</td>
  </tr>
);

const ReceptionDashboard = () => {
  const [showModal, setShowModal] = useState(false);

  const todaysBookings = [
    {
      id: 1,
      name: "John Doe",
      time: "9 Nov 2019, 9:00 AM - 9:20 AM",
      amount: "₹120",
      status: "Cash",
    },
    {
      id: 2,
      name: "John Doe",
      time: "9 Nov 2019, 9:20 AM - 9:40 AM",
      amount: "₹120",
      status: "Cash",
    },
    {
      id: 3,
      name: "John Doe",
      time: "9 Nov 2019, 9:40 AM - 10:00 AM",
      amount: "₹120",
      status: "Cash",
    },
  ];

  return (
    <>
      <div className="page-wrapper">
        <Header location={{ pathname: "reception-overview" }} />
        <SidebarNav />

        <div className="content container-fluid">
          {/* Page Header */}
          <div className="page-header">
            <div className="row">
              <div className="col-sm-12">
                <h3 className="page-title">Welcome Reception</h3>
                <ul className="breadcrumb">
                  <li className="breadcrumb-item active">Dashboard</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Cards */}
          <div className="row">
            <div className="col-lg-6 col-md-12">
              <div className="card">
                <BookingSummaryCard
                  title="Bookings Today"
                  count="6"
                  linkText="View details"
                  linkHref="/booking-history"
                />
              </div>
            </div>
            <div className="col-lg-6 col-md-12">
              <div className="card">
                <BookingSummaryCard
                  title="Booking History"
                  count="12 Nov 2025"
                  linkText="View details"
                  linkHref="/booking-history"
                />
              </div>
            </div>
          </div>

          {/* Table Section */}
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <h4 className="card-title">Today's Booking</h4>
                  <button
                    className="btn btn-dark"
                    type="button"
                    onClick={() => setShowModal(true)}
                  >
                    + New Booking
                  </button>
                </div>
                <div className="card-body">
                  <div className="d-flex justify-content-between mb-3">
                    <div className="search-box">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search"
                      />
                    </div>
                    <button
                      className="btn btn-outline-secondary btn-sm"
                      type="button"
                    >
                      <i className="feather feather-filter me-1"></i> Filter
                    </button>
                  </div>

                  <div className="table-responsive">
                    <table className="table table-hover table-center mb-0">
                      <thead>
                        <tr className="text-center">
                          <th>Patient Name</th>
                          <th>Appointment Time</th>
                          <th>Booking details</th>
                          <th>Payment Mode</th>
                          <th>Amount</th>
                        </tr>
                      </thead>
                      <tbody className="text-center">
                        {todaysBookings.map((booking) => (
                          <BookingTableRow
                            key={booking.id}
                            patientName={booking.name}
                            time={booking.time}
                            detailsLink={`/booking/${booking.id}`}
                            paymentLink={`/payment/${booking.id}`}
                            amount={booking.amount}
                            status={booking.status}
                          />
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Modal */}
          <Modal
            show={showModal}
            onHide={() => setShowModal(false)}
            size="lg"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>New Booking</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <div className="row">
                  <div className="col-md-4">
                    <Form.Group>
                      <Form.Label>Patient Name</Form.Label>
                      <Form.Control type="text" placeholder="Enter name" />
                    </Form.Group>
                  </div>
                  <div className="col-md-4">
                    <Form.Group>
                      <Form.Label>Phone Number</Form.Label>
                      <Form.Control type="text" placeholder="Enter number" />
                    </Form.Group>
                  </div>
                  <div className="col-md-4">
                    <Form.Group>
                      <Form.Label>Age</Form.Label>
                      <Form.Control type="number" placeholder="Enter age" />
                    </Form.Group>
                  </div>

                  <div className="col-md-6 mt-3">
                    <Form.Group>
                      <Form.Label>Address</Form.Label>
                      <Form.Control type="text" placeholder="Enter address" />
                    </Form.Group>
                  </div>
                  <div className="col-md-3 mt-3">
                    <Form.Group>
                      <Form.Label>Disease</Form.Label>
                      <Form.Control type="text" placeholder="Enter disease" />
                    </Form.Group>
                  </div>
                  <div className="col-md-3 mt-3">
                    <Form.Group>
                      <Form.Label>Time Slot</Form.Label>
                      <Form.Select>
                        <option>Select</option>
                        <option>9:00 AM - 9:30 AM</option>
                        <option>9:30 AM - 10:00 AM</option>
                      </Form.Select>
                    </Form.Group>
                  </div>

                  <div className="col-md-6 mt-3">
                    <Form.Group>
                      <Form.Label>Image</Form.Label>
                      <Form.Control type="file" />
                    </Form.Group>
                  </div>
                  <div className="col-md-6 mt-3">
                    <Form.Group>
                      <Form.Label>Medical Reports</Form.Label>
                      <Form.Control type="file" />
                    </Form.Group>
                  </div>
                </div>

                <hr className="my-4" />

                <div className="row">
                  <div className="col-md-6">
                    <h6>Payment Info</h6>
                    <ul className="list-unstyled">
                      <li>Booking Fees: ₹500</li>
                      <li>Tax: ₹2</li>
                      <li>Discount: -₹100</li>
                      <li>
                        <strong>Grand Total: ₹402</strong>
                      </li>
                    </ul>
                  </div>
                  <div className="col-md-6">
                    <h6>Payment Mode</h6>
                    <Form.Check
                      type="radio"
                      label="Online Transaction"
                      name="paymentMode"
                      defaultChecked
                    />
                    <Form.Check
                      type="radio"
                      label="Cash"
                      name="paymentMode"
                    />
                  </div>
                </div>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Cancel
              </Button>
              <Button style={{backgroundColor:'#0E82FD'}} >Save Booking</Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default ReceptionDashboard;
