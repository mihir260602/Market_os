// import React, { useState } from "react";
// import { BsChevronDown } from "react-icons/bs";
// import { FaBell } from "react-icons/fa";
// import "./Header.css";

// const Header = () => {
//   const [notifications] = useState(5);
//   const [dropdownOpen, setDropdownOpen] = useState(false);

//   const toggleDropdown = () => {
//     setDropdownOpen(!dropdownOpen);
//   };

//   return (
//     <div className="custom-header">
//       <div className="custom-header-title">Valuebound</div>
//       <div className="custom-search-bar">
//         <input type="text" placeholder="Search..." />
//       </div>
//       <div className="custom-header-right">
//         <div className="custom-notifications">
//           <FaBell size={24} title="Notifications" />
//           {notifications > 0 && <span className="custom-notification-count">{notifications}</span>}
//         </div>
//         <div className="custom-user-profile" onClick={toggleDropdown}>
//         <img
//             alt="User Avatar"
//             className="custom-avatar"
//             src="https://media.licdn.com/dms/image/D5603AQHHtekOv-0uhQ/profile-displayphoto-shrink_200_200/0/1689660242798?e=2147483647&v=beta&t=8h8ex5-P1eoPjSD2chLERIfsD_crwDS2_WrpWiK97V0" // Replace with your actual image URL
//           />
//           <span className="custom-username">Neeraj Kumar</span>
//           <BsChevronDown className="custom-dropdown-icon" />
//           {dropdownOpen && (
//             <div className="custom-dropdown-menu">
              
//               <div className="custom-dropdown-item">Logout</div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Header;

import React, { useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import { FaBell } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Import for navigation
import "./Header.css";

const Header = () => {
  const [notifications] = useState(5);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate(); // Hook for navigation

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    // Remove the auth token from localStorage
    localStorage.removeItem("auth_token");

    // Optionally, navigate to the login page or home page
    navigate("/"); // Redirect to login page after logout
  };

  return (
    <div className="custom-header">
      <div className="custom-header-title">Valuebound</div>
      <div className="custom-search-bar">
        <input type="text" placeholder="Search..." />
      </div>
      <div className="custom-header-right">
        <div className="custom-notifications">
          <FaBell size={24} title="Notifications" />
          {notifications > 0 && (
            <span className="custom-notification-count">{notifications}</span>
          )}
        </div>
        <div className="custom-user-profile" onClick={toggleDropdown}>
          <img
            alt="User Avatar"
            className="custom-avatar"
            src="https://media.licdn.com/dms/image/D5603AQHHtekOv-0uhQ/profile-displayphoto-shrink_200_200/0/1689660242798?e=2147483647&v=beta&t=8h8ex5-P1eoPjSD2chLERIfsD_crwDS2_WrpWiK97V0" // Replace with your actual image URL
          />
          <span className="custom-username">Neeraj Kumar</span>
          <BsChevronDown className="custom-dropdown-icon" />
          {dropdownOpen && (
            <div className="custom-dropdown-menu">
              <div className="custom-dropdown-item" onClick={handleLogout}>
                Logout
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
