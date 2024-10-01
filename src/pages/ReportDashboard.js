import React from "react";
import "./ReportDashboard.css";

const sampleReports = [
  {
    title: "Lead Conversion Rate",
    description: "Percentage of leads converted to customers.",
    total: "23%",
    color: "#4CAF50",
  },
  {
    title: "Total Sales",
    description: "Total sales from all campaigns.",
    total: "$50,000",
    color: "#2196F3",
  },
  {
    title: "Open Rate",
    description: "Percentage of opened email campaigns.",
    total: "35%",
    color: "#FF9800",
  },
  {
    title: "Lead Activity",
    description: "Number of interactions with leads.",
    total: "457",
    color: "#FF5722",
  },
];

const ReportDashboard = () => {
  return (
    <div className="report-dashboard">
      <h2>Report Dashboard</h2>
      <div className="report-cards">
        {sampleReports.map((report, index) => (
          <div
            key={index}
            className="report-card"
            style={{ borderLeft: `8px solid ${report.color}` }}
          >
            <h3>{report.title}</h3>
            <p>{report.description}</p>
            <span>Total: {report.total}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportDashboard;
