import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

const NavBar = () => {
  const logOut = () => {
    return localStorage.clear();
  };

  return (
    <div className="nav-bar-container">
      <div className="nav-bar">
        <div className="nav-logo">Replate</div>
        <div className="nav-links">
          {localStorage.getItem("jwt") ? (
            <Link to="/login" onClick={logOut}>
              Log Out
            </Link>
          ) : (
            <div>
              <Link to="/login">Log In</Link>
              <Link to="/sign-up">Sign Up</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
