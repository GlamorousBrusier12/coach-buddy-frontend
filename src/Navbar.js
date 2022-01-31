import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar-container">
      <h1>Coach buddy</h1>
      <ul className="nav-links">
        <Link to="/">
          <li>Home</li>
        </Link>
        <Link to="/enroll">
          <li>Enroll</li>
        </Link>
      </ul>
    </div>
  );
};

export default Navbar;
