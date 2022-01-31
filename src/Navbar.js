import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar navbar-dark bg-dark">
      <h1 className="navbar-brand mb-0 h1">Coach buddy</h1>
      <Link to="/" className="nav-link " style={{ color: "white" }}>
        Home
      </Link>
      <Link to="/enroll" className="nav-link " style={{ color: "white" }}>
        Enroll
      </Link>
    </div>
  );
};

export default Navbar;
