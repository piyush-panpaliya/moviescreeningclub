import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../images/logo2.jpg";
import { useLogin } from "./LoginContext";
import axios from "axios";
import { useMembershipContext } from "./MembershipContext";
import { SERVERIP } from "../config";

const Navbar = () => {
  const { loggedIn, logout } = useLogin();
  const { hasMembership, updateMembershipStatus } = useMembershipContext();
  const navigate = useNavigate();
  const [userType, setUserType] = useState(localStorage.getItem("userType"));
  const [showMenu, setShowMenu] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const userType = localStorage.getItem("userType");
    setUserType(userType);
  }, [loggedIn]);

  useEffect(() => {
    const checkMembership = async () => {
      try {
        const email = localStorage.getItem("loggedInUserEmail"); // Get user's email from localStorage
        const response = await axios.get(
          `${SERVERIP}/memrouter/checkMembership/${email}`
        );
        if (response.data.hasMembership) {
          updateMembershipStatus(response.data.hasMembership);
        }
      } catch (error) {
        console.error("Error checking membership:", error);
      }
    };
    checkMembership();
  }, [updateMembershipStatus]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    // Add event listener when the dropdown is shown
    if (showMenu) {
      document.addEventListener("click", handleOutsideClick);
    } else {
      // Remove event listener when the dropdown is hidden
      document.removeEventListener("click", handleOutsideClick);
    }

    // Cleanup function to remove event listener when the component unmounts
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [showMenu]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const toggleMenu = (event) => {
    if (event) {
      event.stopPropagation();
    }
    setShowMenu((prevState) => !prevState);
  };

  return (
    <nav className="bg-gray-800 w-full md:sticky top-0 z-20 p-1">
      <div className="w-full mx-auto">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/">
                <img className="h-14 ml-3 w-auto" src={Logo} alt="Movies" />
              </Link>
            </div>
          </div>

          <div className="flex items-center">
            {loggedIn ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="white"
                className="w-7 h-7 cursor-pointer"
                onClick={handleLogout}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
                />
              </svg>
            ) : (
              <Link to="/login">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="white"
                  className="w-7 h-7"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25"
                  />
                </svg>
              </Link>
            )}

            <div className="flex">
              <div className="-mr-2 flex items-center mx-2">
                <button
                  onClick={toggleMenu}
                  type="button"
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white transition duration-150 ease-in-out"
                  aria-label="Main menu"
                  aria-expanded="false"
                >
                  <svg
                    className="block h-6 w-6"
                    stroke="white"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                  {/* Heroicon name: menu */}
                  <svg
                    className="hidden h-6 w-6"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          ref={dropdownRef}
          className={`${
            showMenu
              ? "block absolute right-0 mt-2 w-1/4 bg-gray-800 mr-2 max-sm:w-1/2 z-20 rounded-md font-monts"
              : "hidden"
          }`}
        >
          <div className="px-2 pt-2 pb-3">
            {loggedIn ? (
              <>
                {userType === "admin" && (
                  <>
                    <NavItem to="/myaccount" toggleMenu={toggleMenu}>
                      My Profile
                    </NavItem>
                    {!hasMembership && (
                      <NavItem to="/form" toggleMenu={toggleMenu}>
                        Buy a new Membership
                      </NavItem>
                    )}
                    <NavItem to="/adddropvolunteer" toggleMenu={toggleMenu}>
                      Add/Drop Volunteer
                    </NavItem>
                    <NavItem to="/scanner" toggleMenu={toggleMenu}>
                      Scanner
                    </NavItem>
                    <NavItem to="/modifymovie" toggleMenu={toggleMenu}>
                      Modify Movie
                    </NavItem>
                    <NavItem to="/addmovie" toggleMenu={toggleMenu}>
                      Add Movie
                    </NavItem>
                  </>
                )}
                {userType === "ticketvolunteer" && (
                  <>
                    <NavItem to="/myaccount" toggleMenu={toggleMenu}>
                      My Profile
                    </NavItem>
                    {!hasMembership && (
                      <NavItem to="/form" toggleMenu={toggleMenu}>
                        Buy a new Membership
                      </NavItem>
                    )}
                    <NavItem to="/scanner" toggleMenu={toggleMenu}>
                      Scanner
                    </NavItem>
                  </>
                )}
                {userType === "volunteer" && (
                  <>
                    <NavItem to="/myaccount" toggleMenu={toggleMenu}>
                      My Profile
                    </NavItem>
                    {!hasMembership && (
                      <NavItem to="/form" toggleMenu={toggleMenu}>
                        Buy a new Membership
                      </NavItem>
                    )}
                    <NavItem to="/modifymovie" toggleMenu={toggleMenu}>
                      Modify Movie
                    </NavItem>
                    <NavItem to="/addmovie" toggleMenu={toggleMenu}>
                      Add Movie
                    </NavItem>
                    <NavItem to="/scanner" toggleMenu={toggleMenu}>
                      Scanner
                    </NavItem>
                  </>
                )}
                {userType === "movievolunteer" && (
                  <>
                    <NavItem to="/myaccount" toggleMenu={toggleMenu}>
                      My Profile
                    </NavItem>
                    {!hasMembership && (
                      <NavItem to="/form" toggleMenu={toggleMenu}>
                        Buy a new Membership
                      </NavItem>
                    )}
                    <NavItem to="/modifymovie" toggleMenu={toggleMenu}>
                      Modify Movie
                    </NavItem>
                    <NavItem to="/addmovie" toggleMenu={toggleMenu}>
                      Add Movie
                    </NavItem>
                  </>
                )}
                {userType === "standard" && (
                  <>
                    <NavItem to="/myaccount" toggleMenu={toggleMenu}>
                      My Profile
                    </NavItem>
                    {!hasMembership && (
                      <NavItem to="/form" toggleMenu={toggleMenu}>
                        Buy a new Membership
                      </NavItem>
                    )}
                  </>
                )}
              </>
            ) : (
              <>
                {" "}
                <NavItem disabled>My Profile</NavItem>
                <NavItem disabled>Buy a new Membership</NavItem>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

const NavItem = ({ to, children, toggleMenu, disabled }) => {
  const handleClick = () => {
    if (!disabled) {
      toggleMenu();
    }
  };

  return (
    <Link
      to={to}
      onClick={disabled ? null : handleClick}
      className={`block px-3 py-2 rounded-md text-base font-medium text-white hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
      aria-disabled={disabled}
    >
      {children}
    </Link>
  );
};

export default Navbar;
