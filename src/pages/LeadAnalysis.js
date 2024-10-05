import React, { useState } from "react";
import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import "./LeadAnalysis.css";

// Sample data for the lead analysis
const sampleLeads = [
  { name: "John Doe", region: "North", user: "Alice", score: 85, status: "Won", details: "Converted to customer after 3 follow-ups." },
  { name: "Jane Smith", region: "South", user: "Bob", score: 90, status: "Lost", details: "Lost interest due to pricing issues." },
  { name: "Emily Johnson", region: "East", user: "Charlie", score: 70, status: "New", details: "Initial contact, needs follow-up." },
  { name: "Michael Brown", region: "West", user: "David", score: 95, status: "Won", details: "Signed contract after demo." },
  { name: "Sarah Davis", region: "North", user: "Eve", score: 88, status: "Assigned", details: "Waiting for the customer's decision." },
];

const regionData = [
  { name: "North", leads: 3, conversions: 2 },
  { name: "South", leads: 1, conversions: 0 },
  { name: "East", leads: 1, conversions: 0 },
  { name: "West", leads: 1, conversions: 1 },
];

const LeadAnalysis = () => {
  const [selectedStatus, setSelectedStatus] = useState("All");

  // Filter sample leads based on the selected status
  const filteredLeads = selectedStatus === "All"
    ? sampleLeads
    : sampleLeads.filter((lead) => lead.status === selectedStatus);

  // Calculate leads by user
  const userAnalysis = filteredLeads.reduce((acc, lead) => {
    acc[lead.user] = acc[lead.user] || { totalLeads: 0, conversions: 0 };
    acc[lead.user].totalLeads += 1;
    if (lead.score >= 80) acc[lead.user].conversions += 1; // Sample conversion logic
    return acc;
  }, {});

  return (
    <div className="lead-analysis-container">
      <h2>Lead Analysis</h2>
      <div className="lead-description">
        <p>
          This page provides a comprehensive analysis of leads in our system. Each lead is evaluated based on various parameters including their region, the user responsible for managing them, and their scoring metrics. This analysis helps in understanding the distribution of leads and conversion rates across different segments, enabling better decision-making and strategy formulation.
        </p>
      </div>

      {/* Filter Dropdown */}
      <div className="filter-container">
        <label htmlFor="status-filter">Filter by Status: </label>
        <select
          id="status-filter"
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Won">Won</option>
          <option value="Lost">Lost</option>
          <option value="New">New</option>
          <option value="Assigned">Assigned</option>
        </select>
      </div>

      <h3>Leads Overview</h3>
      <div className="leads-list">
        {filteredLeads.map((lead, index) => (
          <div key={index} className="lead-card">
            <h4>{lead.name}</h4>
            <p><strong>Region:</strong> {lead.region}</p>
            <p><strong>User:</strong> {lead.user}</p>
            <p><strong>Score:</strong> {lead.score}</p>
            <p><strong>Status:</strong> {lead.status}</p>
            <p><strong>Details:</strong> {lead.details}</p>
          </div>
        ))}
      </div>

      <h3>Leads by Region</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={regionData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="leads" fill="#8884d8" name="Total Leads" />
          <Bar dataKey="conversions" fill="#82ca9d" name="Conversions" />
        </BarChart>
      </ResponsiveContainer>

      <h3>Leads by User</h3>
      <div className="user-analysis">
        {Object.entries(userAnalysis).map(([user, metrics], index) => (
          <div key={index} className="user-card">
            <h4>{user}</h4>
            <p>Total Leads: {metrics.totalLeads}</p>
            <p>Conversions: {metrics.conversions}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeadAnalysis;
