import React from "react";
import { NavLink } from "react-router-dom";
import "./index.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <NavLink to="/" className="nav-logo">
          Hostel Management
        </NavLink>
        <ul className="nav-menu">
        <li><NavLink to="/custom-query" activeClassName="active">Custom Query</NavLink></li>
          <li><NavLink to="/" activeClassName="active">Home</NavLink></li>
          <li><NavLink to="/add-student" activeClassName="active">Add Student</NavLink></li>
          <li><NavLink to="/update" activeClassName="active">Update</NavLink></li>
          <li><NavLink to="/delete" activeClassName="active">Delete</NavLink></li>
          
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
