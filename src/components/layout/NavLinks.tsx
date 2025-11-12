import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { all_routes } from '../../routes/all_routes';
import Button from '../../common/Button';

const NavLinks: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname;


  return (
   <ul className="main-nav"> 
      
      {/* Home */}
      <li className={pathnames === all_routes.home ? "active" : ""}>
        <Link to={all_routes.home}>Home</Link>
      </li>

      {/* About Us */}
      <li className={pathnames === all_routes.about ? "active" : ""}>
        <Link to={all_routes.about}>About Us</Link>
      </li>

      {/* Contact */}
      <li className={pathnames === all_routes.contact ? "active" : ""}>
        <Link to={all_routes.contact}>Contact Us</Link>
      </li>

      {/* Session Details */}
      <li className={pathnames === all_routes.sessionDetails ? "active" : ""}>
        <Link to={all_routes.sessionDetails}>Session Details</Link>
      </li>


      {/* My Profile */}
      <li className={pathnames === all_routes.login ? "active" : ""}>
        <Link to={all_routes.login}>My Profile</Link>
      </li>

      {/* Book Session Button  */}
      <li className="nav-item-btn">
        <Link to={all_routes.bookSession}>
          <Button type="button">Book Session</Button>
        </Link>
      </li>

    </ul>
  );
};

export default NavLinks;