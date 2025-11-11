import { useState, useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import "overlayscrollbars/overlayscrollbars.css";
import { Appcontext } from "../../admin/context/AppContext";
import {
  Home,
  Layout,
  Users,
  UserPlus,
  User,
  Star,
  Activity,
  FileText,
} from "react-feather";
import "./index.css";

const SidebarNav = () => {
  const location = useLocation();
  const pathname = location.pathname;

  const { setIsAuth } = useContext(Appcontext);
  const [isSideMenu, setSideMenu] = useState("");
  const [isSidebarExpanded, _setSidebarExpanded] = useState(false);
  const [isMouseOverSidebar, setMouseOverSidebar] = useState(false);

  useEffect(() => {
    if (isMouseOverSidebar && document.body.classList.contains("mini-sidebar")) {
      document.body.classList.add("expand-menu");
      return;
    }
    document.body.classList.remove("expand-menu");
  }, [isMouseOverSidebar]);

  const HandleMouseEnter = () => setMouseOverSidebar(true);
  const HandleMouseLeave = () => setMouseOverSidebar(false);

  return (
    <>
      {/* <!-- Sidebar --> */}
      <div
        className={`sidebar modern-sidebar ${isSidebarExpanded ? "" : "hidden"}`}
        id="sidebar"
        onMouseEnter={HandleMouseEnter}
        onMouseLeave={HandleMouseLeave}
      >
        <OverlayScrollbarsComponent
          options={{
            scrollbars: {
              autoHide: "scroll",
              autoHideDelay: 1000,
              theme: "os-theme-dark",
            },
            overflow: { x: "hidden", y: "scroll" },
          }}
        >
          <div className="sidebar-inner slimscroll">
            <div id="sidebar-menu" className="sidebar-menu">
              <ul>
                <li className={pathname === "/admin" ? "active" : ""}>
                  <Link to="/admin">
                    <Home size={18} />
                    <span>Dashboard</span>
                  </Link>
                </li>
                <li
                  className={
                    pathname?.includes("/admin/appointment-list") ? "active" : ""
                  }
                >
                  <Link to="/admin/appointment-list">
                    <Layout size={18} /> <span>Appointments</span>
                  </Link>
                </li>
                <li className={pathname?.includes("patient") ? "active" : ""}>
                  <Link to="/admin/patient-list">
                    <Users size={18} /> <span>My Patients</span>
                  </Link>
                </li>
                <li
                  className={
                    pathname?.includes("transactions-list") ? "active" : ""
                  }
                >
                  <Link to="/admin/transactions-list">
                    <Activity size={18} /> <span>Payments</span>
                  </Link>
                </li>
                <li className={pathname?.includes("client") ? "active" : ""}>
                  <Link to="/admin/client-list">
                    <User size={18} /> <span>Clients</span>
                  </Link>
                </li>
                <li className={pathname?.includes("healer") ? "active" : ""}>
                  <Link to="/admin/healer-list">
                    <Star size={18} /> <span>Healers</span>
                  </Link>
                </li>
                <li className={pathname?.includes("profile") ? "active" : ""}>
                  <Link to="/admin/profile">
                    <UserPlus size={18} /> <span>Profile</span>
                  </Link>
                </li>
                {/* <li className={pathname?.includes("logout") ? "active" : ""}>
                  <Link to="/admin/logout">
                    <FileText size={18} /> <span>Logout</span>
                  </Link>
                </li> */}
              </ul>
            </div>

            {/*  Support Card at the bottom */}
            <div className="support-card">
              <div className="support-content">
                <div className="support-avatar">
                  <i className="feather feather-user"></i>
                </div>
                <p className="support-title">Having any issues?</p>
                <p className="support-desc">
                  Contact our supporting team to sort out your issue quickly
                </p>
                <button className="support-btn">Contact us</button>
              </div>
            </div>
          </div>
        </OverlayScrollbarsComponent>
      </div>
      {/* <!-- /Sidebar --> */}
    </>
  );
};

export default SidebarNav;
