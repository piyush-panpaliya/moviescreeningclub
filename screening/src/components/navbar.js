import React from "react";
import { Link, Outlet } from "react-router-dom";
export default function Navbar() {
  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
            Navbar
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item px-3">
                <Link className="text-decoration-none text-black" to='/form'>Foram</Link>
              </li>
              <li class="nav-item">
                <Link className="text-decoration-none text-black" to="/scanner">Scanner</Link>
              </li>
              <li class="nav-item ms-3">
                <Link className="text-decoration-none text-black" to="/login">Login</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
}
