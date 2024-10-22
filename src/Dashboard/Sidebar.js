import React, { useState } from "react";
import "./Sidebar.css";

const Sidebar = () => {
  const [openDropdowns, setOpenDropdowns] = useState({});

  const toggleDropdown = (key) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="sidebar">
      <div className="logo">
        <a href="http://172.105.47.241:3001/MarketOS/">
          <img src="data:image/png;base64,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"
          alt="Company Logo" />
        </a>
      </div>

      <ul className="sidebar-links">
        <li>
          <a href="/dashboard">Dashboard</a>
        </li>

        <li>
          <a href="#" onClick={() => toggleDropdown("contentManagement")}>
            Content Management
          </a>
          <ul
            className={`subfields ${
              openDropdowns.contentManagement ? "open" : ""
            }`}
          >
            <li>
              <a href="/create-page">Create Content</a>
            </li>
            <li>
              <a href="/unpublished-content">Unpublished Content</a>
            </li>
            <li>
              <a href="/published-content">Published Content</a>
            </li>
            <li>
              <a href="/tickets">Tickets</a>
            </li>

            <li>
              <a href="/website-analytics">CMS Analytics</a>
            </li>
            <li>
              <a href="/postdata">Post Analytics</a>
            </li>
            
          </ul>
        </li>

        <li>
          <a href="#" onClick={() => toggleDropdown("emailMarketing")}>
            Email Marketing
          </a>
          <ul
            className={`subfields ${
              openDropdowns.emailMarketing ? "open" : ""
            }`}
          >
            <li>
              <a href="/dashboard-content">Dashboard</a>
            </li>
            <li>
              <a href="/campaign-overview">Campaign Overview</a>
            </li>
            {/* <li>
              <a href="/campaign-builder">Campaign Builder</a>
            </li> */}
            <li>
              <a href="/audience-segmentation">Audience Segmentation</a>
            </li>
            {/* <li>
              <a href="/email-templates">Email Templates</a>
            </li> */}
          </ul>
        </li>

        <li>
          <a href="#" onClick={() => toggleDropdown("leadManagement")}>
            Lead Management
          </a>
          <ul
            className={`subfields ${
              openDropdowns.leadManagement ? "open" : ""
            }`}
          >
            <li>
              <a href="/report-dashboard">Report Dashboard</a>
            </li>
            <li>
              <a href="/contact-list">Contact List</a>
            </li>
            <li>
              <a href="/userdata">Visiter Data</a>
            </li>
            {/* <li>
              <a href="/lead-activity">Lead Activity Timeline</a>
            </li> */}
            {/* <li>
              <a href="/sales-pipeline">Sales Pipeline</a>
            </li> */}
            <li>
              <a href="/lead-analysis">Lead Segmentation</a>
            </li>
            {/* <li>
              <a href="/lead-scoring">Lead Scoring Settings</a>
            </li> */}
            {/* <li>
              <a href="/task-manager">Task Manager</a>
            </li>
            <li>
              <a href="/campaign-manager">Campaign Manager</a>
            </li> */}
          </ul>
        </li>


      </ul>
      <hr className="sidebar-divider" />
      <div className="quick-action-panel">
        <h4>Quick Action Panel</h4>
        <ul className="sidebar-links">
          {/* <li>
            <a href="/create-campaign">Create Campaign</a>
          </li> */}
          <li>
            <a href="/create-page">Create Blog Post</a>
          </li>
          {/* <li>
            <a href="/add-contact">Add Contact</a>
          </li> */}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
