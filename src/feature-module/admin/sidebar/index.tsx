import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import "overlayscrollbars/overlayscrollbars.css";
import { Appcontext } from "../../admin/context/AppContext";
import { useLocation } from "react-router-dom";
import { 
  Home, 
  Layout, 
  Users, 
  UserPlus, 
  User, 
  Star, 
  Activity, 
  Settings, 
  FileText, 
  AlertTriangle, 
  File, 
  Code, 
  Table 
} from "react-feather";
import './index.css'

const SidebarNav = () => {

  const location = useLocation();
  const pathname = location.pathname;

  const { setIsAuth } = useContext(Appcontext);
  const [isSideMenu, setSideMenu] = useState("");
  const [isSideMenuNew, setSideMenuNew] = useState("");
  const [isSideMenuNew2, setSideMenuNew2] = useState("");

  const toggleSidebar = (value: any) => {
    setSideMenu(value);
  };

  const toggleSidebarNew = (value: any) => {
    setSideMenuNew(value);
  };

  const toggleSidebarNew2 = (value: any) => {
    setSideMenuNew2(value);
  };

   
  const [isSidebarExpanded, _setSidebarExpanded] = useState(false);
  const [isMouseOverSidebar, setMouseOverSidebar] = useState(false);

  useEffect(() => {
    if (
      isMouseOverSidebar &&
      document.body.classList.contains("mini-sidebar")
    ) {
      document.body.classList.add("expand-menu");
      return;
    }
    document.body.classList.remove("expand-menu");
  }, [isMouseOverSidebar]);

  const HandleMouseEnter = () => {
    setMouseOverSidebar(true);
  };

  const HandleMouseLeave = () => {
    setMouseOverSidebar(false);
  };

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
              theme: "os-theme-dark"
            },
            overflow: {
              x: "hidden",
              y: "scroll"
            }
          }}
          // style={{ height: "95vh" }}
        >
          <div className="sidebar-inner slimscroll">
            <div id="sidebar-menu" className="sidebar-menu">
              <ul>
                <li className={pathname === "/admin" ? "active" : ""}>
                  <Link to="/admin">
                    <Home size={18} />
                    <span style={{fontWeight:800,fontFamily:'sans-serif'}}>Dashboard</span>
                  </Link>
                </li>
                <li
                  className={
                    pathname?.includes("/admin/appointment-list")
                      ? "active"
                      : ""
                  }
                >
                  <Link to="/admin/appointment-list">
                    <Layout size={18} /> <span>Appointments</span>
                  </Link>
                </li>
                <li
                  className={pathname?.includes("patient") ? "active" : ""}
                >
                  <Link to="/admin/patient-list">
                    <Users size={18} /> <span>My Patients</span>
                  </Link>
                </li>
                <li
                  className={pathname?.includes("payment") ? "active" : ""}
                >
                  <Link to="/admin/transactions-list">
                    <Activity size={18} />
                    <span>Payments</span>
                  </Link>
                </li>
                <li
                  className={pathname?.includes("client") ? "active" : ""}
                >
                  <Link to="/admin/patient-list">
                    <User size={18} /> <span>Clients</span>
                  </Link>
                </li>
                <li
                  className={pathname?.includes("healer") ? "active" : ""}
                >
                  <Link to="/admin/doctor-list">
                    <Star size={18} /> <span>Healers</span>
                  </Link>
                </li>
                <li className={pathname?.includes("profile") ? "active" : ""}>
                  <Link to="/admin/profile">
                    <UserPlus size={18} /> <span>Profile</span>
                  </Link>
                </li>
                <li
                  className={pathname?.includes("manage-branch") ? "active" : ""}
                >
                  <Link to="/admin/doctor-list">
                    <Settings size={18} />
                    <span>Manage Branches</span>
                  </Link>
                </li>
                <li className={pathname?.includes("logout") ? "active" : ""}>
                  <Link to="/admin/logout">
                    <FileText size={18} /> <span>Logout</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </OverlayScrollbarsComponent>
      </div>
      {/* <!-- /Sidebar --> */}
    </>
  );
};

export default SidebarNav;