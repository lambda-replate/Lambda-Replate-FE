import React from 'react'
import { Link } from 'react-router-dom';

const NavBar = () => {
    return(
        <div className="nav-bar-container">
            <div className="nav-bar">
                <div className="nav-logo">Replate</div>
                <div className="nav-links">
                    <Link to="/login">Log In</Link>
                    <Link to="/business-sign-up">Business Sign Up</Link>
                </div>
            </div>
        </div>
    )
}
     
export default NavBar;