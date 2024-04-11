import React, { useState } from 'react';
//import './styles.css'; // Import your CSS file for styling

function Test() {
  // State to manage the visibility of the dropdown menu
  const [showDropdown, setShowDropdown] = useState(false);

  // Function to toggle the visibility of the dropdown menu
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className="navbar">
      {/* Hamburger icon button */}
      <button className="navbar-toggler" onClick={toggleDropdown}>
        <span className="navbar-toggler-icon">&#9776;</span>
      </button>
      {/* Dropdown menu */}
      <div className={`dropdown-menu ${showDropdown ? 'show' : ''}`}>
        {/* Dropdown menu items */}
        <a href="#">Item 1</a>
        <a href="#">Item 2</a>
        <a href="#">Item 3</a>
      </div>
    </div>
  );
}

export default Test;
