import React, {useState} from "react";
import "./Header.css";
import { Link } from "react-router-dom";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    alert("Logged Out!"); // Later you can replace this with actual logout logic
  };
  return (
    <header className="header">
      <div className="logo">
        <img src="/images/logo.jpg" alt="Logo" className="logo-image" />
      </div>
      <nav className="nav-links">
        <Link to="/home" className="nav-link">Home</Link>
        <Link to="/tutorial" className="nav-link">Tutorial</Link>
        <Link to="/contact" className="nav-link">Contact</Link>
        <Link to="/history" className="nav-link">History</Link>
      </nav>
      <div className="profile-container">
        <div className="profile-icon" onClick={toggleDropdown}>
          <img src="/images/profile.png" alt="Profile" className="profile-image" />
        </div>

        {isDropdownOpen && (
          <div className="dropdown-menu">
            <div className="username">Hello, User</div>
            <button className="logout-button" onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;