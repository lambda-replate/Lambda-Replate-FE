import React from "react";
import { NavLink } from "react-router-dom";
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
            <NavLink to="/login" onClick={logOut}>
              Log Out
            </NavLink>
          ) : (
            <div>
              <NavLink to="/login">Log In</NavLink>
              <NavLink to="/sign-up">Sign Up</NavLink>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
