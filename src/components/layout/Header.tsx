import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import ImageWithBasePath from "../../components/imageWithBasePath";
import { all_routes } from "../../routes/all_routes";

import NavLinks from "./NavLinks";

const Header: React.FC = () => {

  const [headerClass, setHeaderClass] = useState(
    "header header-custom header-fixed inner-header relative"
  );

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const scrollThreshold = 100;

      if (scrollPosition > scrollThreshold) {
        setHeaderClass(
          "header header-custom header-fixed inner-header relative fixed pharmacy-header"
        );
      } else {
        setHeaderClass(
          "header header-custom header-fixed inner-header relative"
        );
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const onHandleMobileMenu = () => {
    const root = document.getElementsByTagName("html")[0];
    root.classList.add("menu-opened");
  };
  const onHandleCloseMenu = () => {
    const root = document.getElementsByTagName("html")[0];
    root.classList.remove("menu-opened");
  };

  return (
    <div>
      <>
        <div className="header-topbar">
          <div className="container">
            <div className="topbar-info">
              <div className="d-flex align-items-center gap-3 header-info">
                <p>
                  <i className="isax isax-message-text5 me-1" />
                  info@example.com
                </p>
                <p>
                  <i className="isax isax-call5 me-1" />
                  +1 66589 14556
                </p>
              </div>
              <ul>
                {/* <li className="header-theme">
                  <DarkModeToggle />
                </li> */}
                {/* <li className="d-inline-flex align-items-center drop-header">
                  <div className="dropdown dropdown-country me-3">
                    <Link
                      to="#"
                      className="d-inline-flex align-items-center"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <ImageWithBasePath
                        src="assets/img/flags/us-flag.svg"
                        className="me-2"
                        alt="flag"
                      />
                    </Link>
                    <ul className="dropdown-menu p-2 mt-2">
                      <li>
                        <Link
                          className="dropdown-item rounded d-flex align-items-center"
                          to="#"
                        >
                          <ImageWithBasePath
                            src="assets/img/flags/us-flag.svg"
                            className="me-2"
                            alt="flag"
                          />
                          ENG
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item rounded d-flex align-items-center"
                          to="#"
                        >
                          <ImageWithBasePath
                            src="assets/img/flags/arab-flag.svg"
                            className="me-2"
                            alt="flag"
                          />
                          ARA
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item rounded d-flex align-items-center"
                          to="#"
                        >
                          <ImageWithBasePath
                            src="assets/img/flags/france-flag.svg"
                            className="me-2"
                            alt="flag"
                          />
                          FRA
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="dropdown dropdown-amt">
                    <Link
                      to="#"
                      className="dropdown-toggle"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      USD
                    </Link>
                    <ul className="dropdown-menu p-2 mt-2">
                      <li>
                        <Link className="dropdown-item rounded" to="#">
                          USD
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item rounded" to="#">
                          YEN
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item rounded" to="#">
                          EURO
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li> */}
                <li className="social-header">
                  <div className="social-icon">
                    <Link to="#">
                      <i className="fa-brands fa-facebook" />
                    </Link>
                    <Link to="#">
                      <i className="fa-brands fa-x-twitter" />
                    </Link>
                    <Link to="#">
                      <i className="fa-brands fa-instagram" />
                    </Link>
                    <Link to="#">
                      <i className="fa-brands fa-linkedin" />
                    </Link>
                    <Link to="#">
                      <i className="fa-brands fa-pinterest" />
                    </Link>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* Header */}
        <header className={headerClass}>
          <div className="container">
            <nav className="navbar navbar-expand-lg header-nav">
              <div className="navbar-header">
                <Link id="mobile_btn" to="#" onClick={onHandleMobileMenu}>
                  <span className="bar-icon">
                    <span />
                    <span />
                    <span />
                  </span>
                </Link>
                <Link
                  to={all_routes.home}
                  className="navbar-brand logo"
                >
                  <ImageWithBasePath
                    src='/assets/images/nyl/nyl-logo-v2.png'
                    className="img-fluid"
                    alt="Logo"
                  />
                </Link>
              </div>
              <div className="header-menu">
                <div className="main-menu-wrapper">
                  <div className="menu-header">
                    <Link to={all_routes.home} className="menu-logo">
                      <ImageWithBasePath
                        src='/assets/images/nyl/nyl-logo-v2.png'
                        className="img-fluid"
                        alt="Logo"
                      />
                    </Link>
                    <Link
                      id="menu_close"
                      className="menu-close"
                      to="#"
                      onClick={onHandleCloseMenu}
                    >
                      <i className="fas fa-times" />
                    </Link>
                  </div>
                  <NavLinks />
                </div>
              </div>
            </nav>
          </div>
        </header>
      </>
    </div>
  );
};

export default Header;
