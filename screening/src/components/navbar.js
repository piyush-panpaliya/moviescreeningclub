// Navbar.js
/*import React from "react";
import { Link } from "react-router-dom";
import Logo from '../images/logo.png';
import { useLogin } from './LoginContext'; // Import useLogin hook

const Navbar = () => {
  const { loggedIn,logout } = useLogin(); // Use loggedIn state from context

  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src={Logo} height="50px" alt="Movies" />
          Movies
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            {loggedIn ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to='/form'>Form</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/scanner">Scanner</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to='/myaccount'>My Profile</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to='/adddropvolunteer'>Add Drop Volunteer</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/" onClick={logout}>Logout</Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
*/


// Navbar.js
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from '../images/logo.png';
import { useLogin } from './LoginContext'; // Import useLogin hook
const Navbar = () => {
  const { loggedIn, logout } = useLogin(); // Use loggedIn state from context
  const [userType, setUserType] = useState('standard'); // State to store user type
  const navigate = useNavigate(); // Hook for navigation
  

  /*const getUserType = async () => {
    try {
      const loggedInUserEmail = localStorage.getItem('loggedinUserEmail');
      const response = await fetch(`http://localhost:8000/userType/${loggedInUserEmail}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch user type: ${response.statusText}`);
      }
      const data = await response.json();
      setUserType(data.userType);
      console.log(data.userType); // Log user type
    } catch (error) {
      console.error('Error fetching user type:', error);
    }
  };*/
  
  

  // Function to handle logout
  const handleLogout = () => {
    logout();
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src={Logo} height="50px" alt="Movies" />
          Movies
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            {loggedIn ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to='/form'>Form</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to='/adddropvolunteer'>Add Drop Volunteer</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to='/scanner'>Scanner</Link>
                  </li>
                
                <li className="nav-item">
                  <Link className="nav-link" to='/myaccount'>My Profile</Link>
                </li>
                <li className="nav-item">
                  <button className="nav-link btn btn-link" onClick={handleLogout}>Logout</button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

