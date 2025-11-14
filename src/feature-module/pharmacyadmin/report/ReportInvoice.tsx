
import SidebarNav from "../sidebar";
import Header from "../header";
import "./AdminProfile.css";

const PharmacyProfile = () => {
  return (
    <>
      <Header />
      <SidebarNav />
      <div className="page-wrapper">
        <div className="content container-fluid">
          <div className="page-header">
            <h3 className="page-title">Manage Profile</h3>
            <p className="breadcrumb-text">
              Dashboard / <span>Profile</span>
            </p>
          </div>

          <div className="profile-card">
            <h5 className="profile-card-title">Account Details</h5>

            <div className="form-container">
              <div className="form-group">
                <label>Name</label>
                <input type="text" className="form-control" placeholder="Username" />
              </div>

              <div className="form-group">
                <label>Phone Number</label>
                <input type="password" className="form-control" placeholder="Phone Number" />
              </div>
            </div>
            <div className="form-container">
              <div className="form-group">
                <label>Email ID</label>
                <input type="email" className="form-control" placeholder="Email ID" />
              </div>

              <div className="form-group">
                <label>Address</label>
                <input type="password" className="form-control" placeholder="Address" />
              </div>
            </div>
            <div className="update-btn-container">
              <button className="update-btn">Update Data</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PharmacyProfile;
