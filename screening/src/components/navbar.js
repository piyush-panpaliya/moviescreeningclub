/*import React from "react";
import { Link } from "react-router-dom";
import Logo from '../images/logo.png';
import { useLogin } from './LoginContext'; // Import the useLogin hook

const Navbar = () => {
  const { loggedIn, logout } = useLogin(); // Use the loggedIn state and logout function from context

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
                  <Link className="nav-link" to="/" onClick={logout}>Logout</Link>
                </li>
              </>
            ) : (
              // If not logged in, show login link
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
              </>
            )}
            <li className="nav-item">
              <Link className="nav-link" to='/form'>Form</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/scanner">Scanner</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to='/addmovie'>Addmovie</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to='/myaccount'>My Profile</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;*/


// Navbar.js
import React from "react";
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

