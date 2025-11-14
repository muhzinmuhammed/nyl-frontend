import React, { useState } from "react";
import SidebarNav from "../sidebar";
import Header from "../header";
import { Modal, Button, Form } from "react-bootstrap";
import { dashboardHand, clockImage } from "../imagepath";

interface BookingSummaryCardProps {
  title: string;
  count: string | number;
  linkText: string;
  linkHref: string;
  icon?: string;
}

const BookingSummaryCard: React.FC<BookingSummaryCardProps> = ({
  title,
  count,
  linkText,
  linkHref,
  icon,
}) => (
  <div className="card shadow-sm border-0 rounded-3">
    <div className="card-body d-flex justify-content-between align-items-center">
      <div>
        <h6 className="text-muted mb-2">{title}</h6>
        <h3 className="fw-bold">{count}</h3>
        <a href={linkHref} className="small text-primary text-decoration-none">
          {linkText} →
        </a>
      </div>
      {icon && <img src={icon} alt="icon" width="40" />}
    </div>
  </div>
);

interface Booking {
  id: number;
  name: string;
  time: string;
  amount: string;
  status: string;
  avatar?: string;
}

const BookingTableRow: React.FC<Booking> = ({
  name,
  time,
  amount,
  status,
}) => (
  <tr>
    <td className="align-middle text-start">
      <div className="d-flex align-items-center">
        <div
          className="rounded-circle bg-light me-3"
          style={{ width: "35px", height: "35px" }}
        ></div>
        <strong>{name}</strong>
      </div>
    </td>
    <td className="align-middle">{time}</td>
    <td className="align-middle">
      <Button variant="outline-primary" size="sm">
        View details
      </Button>
    </td>
    <td className="align-middle">
      <span
        className={`badge rounded-pill ${status === "Cash" ? "bg-success" : "bg-secondary"
          }`}
      >
        {status}
      </span>
    </td>
    <td className="align-middle fw-semibold">{amount}</td>
  </tr>
);

const ReceptionDashboard: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  const todaysBookings: Booking[] = [
    {
      id: 1,
      name: "John Doe",
      time: "5 Nov 2025, 11:00 AM - 11:35 AM",
      amount: "₹520",
      status: "Cash",
    },
    {
      id: 2,
      name: "John Doe",
      time: "5 Nov 2025, 11:00 AM - 11:35 AM",
      amount: "₹520",
      status: "Cash",
    },
    {
      id: 3,
      name: "John Doe",
      time: "5 Nov 2025, 11:00 AM - 11:35 AM",
      amount: "₹520",
      status: "Cash",
    },
  ];

  return (
    <div className="page-wrapper d-flex">
      <SidebarNav />
      <div className="flex-grow-1">
        <Header  />

        <div className="content container-fluid py-4">
          <h4 className="fw-bold mb-3">Welcome Reception</h4>
          <p className="text-muted">Dashboard</p>

          {/* Cards */}
          <div className="row mb-4">
            <div className="col-md-6">
              <BookingSummaryCard
                title="Bookings Today"
                count="6"
                linkText="View details"
                linkHref="/booking-history"
                icon={dashboardHand}
              />
            </div>
            <div className="col-md-6">
              <BookingSummaryCard
                title="Booking History"
                count="12 Nov 2025"
                linkText="View details"
                linkHref="/booking-history"
                icon={clockImage}
              />
            </div>
          </div>

          {/* Table */}
          <div className="card border-0 shadow-sm rounded-3">
            <div className="card-header bg-white border-0 d-flex justify-content-between align-items-center">
              <h5 className="mb-0 fw-semibold">Today's Booking</h5>
              <Button variant="dark" onClick={() => setShowModal(true)}>
                + New Booking
              </Button>
            </div>
            <div className="card-body">
              <div className="d-flex justify-content-between mb-3">
                <input
                  type="text"
                  placeholder="Search"
                  className="form-control w-50"
                />
                <Button variant="outline-secondary" size="sm">
                  <i className="feather-filter me-1"></i> Filter
                </Button>
              </div>

              <div className="table-responsive">
                <table className="table table-hover  align-middle text-center">
                  <thead className="table-light">
                    <tr>
                      <th>Patient Name</th>
                      <th>Appointment Time</th>
                      <th>Booking details</th>
                      <th>Payment Mode</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {todaysBookings.map((booking) => (
                      <BookingTableRow key={booking.id} {...booking} />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* New Booking Modal */}
          <Modal style={{ left: 100 }} show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
            <Modal.Header closeButton>
              <Modal.Title>New Booking</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <div className="row g-3">
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

                  <div className="col-md-6">
                    <Form.Group>
                      <Form.Label>Address</Form.Label>
                      <Form.Control type="text" placeholder="Enter address" />
                    </Form.Group>
                  </div>
                  <div className="col-md-3">
                    <Form.Group>
                      <Form.Label>Disease</Form.Label>
                      <Form.Control type="text" placeholder="Enter disease" />
                    </Form.Group>
                  </div>
                  <div className="col-md-3">
                    <Form.Group>
                      <Form.Label>Time Slot</Form.Label>
                      <Form.Select>
                        <option>Select</option>
                        <option>9:00 AM - 9:30 AM</option>
                        <option>9:30 AM - 10:00 AM</option>
                      </Form.Select>
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group>
                      <Form.Label>Image</Form.Label>
                      <Form.Control type="file" placeholder="Enter disease" />
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group>
                      <Form.Label>Medical Reports</Form.Label>
                      <Form.Control type="file" placeholder="Enter disease" />
                    </Form.Group>
                  </div>
                </div>

                <hr />

                <div className="row">
                  <div className="col-md-6">
                    <h6>Payment Info</h6>
                    <ul className="list-unstyled small">
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
                    <Form.Check type="radio" label="Online Transaction" name="paymentMode" />
                    <Form.Check type="radio" label="Cash" name="paymentMode" />
                  </div>
                </div>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Cancel
              </Button>
              <Button style={{ backgroundColor: "#0E82FD" }}>Save Booking</Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default ReceptionDashboard;
