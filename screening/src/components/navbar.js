/*import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from '../images/logo.png';
import { useLogin } from './LoginContext'; // Import useLogin hook

const Navbar = () => {
  const { loggedIn, logout } = useLogin(); // Use loggedIn state from context
  const navigate = useNavigate(); // Hook for navigation
  const [userType, setUserType] = useState(localStorage.getItem('userType'));

  useEffect(() => {
    // Fetch userType from localStorage
    const userType = localStorage.getItem('userType');
    setUserType(userType);
  }, [loggedIn]); // Run useEffect whenever loggedIn changes

  const handleLogout = () => {
    logout();
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <nav className="navbar navbar-expand-lg">
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
                {userType === 'admin' && (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to='/myaccount'>My Profile</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to='/form'>Buy a new Membership</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to='/adddropvolunteer'>Add/Drop Volunteer</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to='/scanner'>Scanner</Link>                      
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to='/addmovie'>Add Movie</Link>
                    </li>
                  </>
                )}
                {userType === 'volunteer' && (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to='/myaccount'>My Profile</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to='/form'>Buy a new Membership</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to='/scanner'>Scanner</Link>                      
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to='/addmovie'>Add Movie</Link>
                    </li>
                  </>
                )}
                {userType === 'standard' && (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to='/myaccount'>My Profile</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to='/form'>Buy a new Membership</Link>
                    </li>
                  </>
                )}
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

export default Navbar;*/

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from '../images/logo.png';
import { useLogin } from './LoginContext'; // Import useLogin hook

const Navbar = () => {
  const { loggedIn, logout } = useLogin(); // Use loggedIn state from context
  const navigate = useNavigate(); // Hook for navigation
  const [userType, setUserType] = useState(localStorage.getItem('userType'));
  const [showMenu, setShowMenu] = useState(false); // State to control menu display

  useEffect(() => {
    // Fetch userType from localStorage
    const userType = localStorage.getItem('userType');
    setUserType(userType);
  }, [loggedIn]); // Run useEffect whenever loggedIn changes

  const handleLogout = () => {
    logout();
    navigate('/login'); // Redirect to login page after logout
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu); // Toggle the menu display
  };

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src={Logo} height="50px" alt="Movies" />
          Movies
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleMenu} // Add onClick event to toggle menu display
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`collapse navbar-collapse ${showMenu ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav ml-auto align-items-center">
            {loggedIn ? (
              <>
                {userType === 'admin' && (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to='/myaccount'>My Profile</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to='/form'>Buy a new Membership</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to='/adddropvolunteer'>Add/Drop Volunteer</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to='/scanner'>Scanner</Link>                      
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to='/addmovie'>Add Movie</Link>
                    </li>
                  </>
                )}
                {userType === 'volunteer' && (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to='/myaccount'>My Profile</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to='/form'>Buy a new Membership</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to='/scanner'>Scanner</Link>                      
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to='/addmovie'>Add Movie</Link>
                    </li>
                  </>
                )}
                {userType === 'standard' && (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to='/myaccount'>My Profile</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to='/form'>Buy a new Membership</Link>
                    </li>
                  </>
                )}
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
