import React from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import notification from "./../Icons/notification.png";
import "./Landingpage.css";
 
const Landingpage = () => {
  return (
    <div>
      <Nav className="d-flex background">
        <div className="ms-1">
          <Nav.Link as={Link} to="/" className="sidenavmargin"  >
            <strong>P</strong> Pintrest
          </Nav.Link>
        </div>
        <div className="ms-3">
          <Nav.Link as={Link} to="home" className="sidenavmargin" >
        
            Home
          </Nav.Link>
        </div>
        <div className="ms-3">
          <Nav.Link as={Link} to="explore" className="sidenavmargin">
            {" "}
            Explore
          </Nav.Link>
        </div>
        <div className="ms-3">
          <Nav.Link as={Link} to="create" className="sidenavmargin">
            {" "}
            Create
          </Nav.Link>
        </div>
        <div className="search-icon">
          <input
            type="text"
            placeholder="Search..."
            className=" searchbarwidth "
          />
        </div>
        <div className="ms-3">
          <Nav.Link as={Link} to="profile" className="sidenavmargin">
            {" "}
            Profile
          </Nav.Link>
        </div>
        <div type="button" className="  notification ">
          <img
            className="notificationicon"
            src={notification}
            alt="notification Logo"
          />
          <div style={{ fontSize: "10px" }}></div>{" "}
          <span className="badge">2</span>
        </div>
        <div className="ms-3">
          <Nav.Link as={Link} to="/" className="sidenavmargin">
            {" "}
            SignOut
          </Nav.Link>
        </div>
      </Nav>
      <div>
        <Outlet />
      </div>
    </div>
  );
};
export default Landingpage;
 