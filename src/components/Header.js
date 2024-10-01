import React, { useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import { FaBell } from "react-icons/fa";
import "./Header.css"; // Make sure to create this CSS file for styling

const Header = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const notifications = 3; // Example notification count

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <div className="header">
            <div className="header-title">Insights</div>
            <div className="search-bar">
                <input type="text" placeholder="Search..." />
            </div>
            <div className="header-right">
                <div className="notifications">
                    <FaBell size={24} title="Notifications" />
                    {notifications > 0 && (
                        <span className="notification-count">{notifications}</span>
                    )}
                </div>
                <div className="user-profile" onClick={toggleDropdown}>
                    <img
                        src="data:image/jpeg;base64,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" // Replace with your avatar image URL
                        alt="User Avatar"
                        className="avatar"
                    />
                    <span className="username">Neeraj Kumar</span>
                    <BsChevronDown className="dropdown-icon" />
                    {dropdownOpen && (
                        <div className="dropdown-menu">
                            <div className="dropdown-item">Profile</div>
                            <div className="dropdown-item">Settings</div>
                            <div className="dropdown-item">Logout</div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Header;
