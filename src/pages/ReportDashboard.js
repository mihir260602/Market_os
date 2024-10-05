import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import "./ReportDashboard.css";

const sampleReports = [
  {
    title: "Lead Conversion Rate",
    description: "Percentage of leads converted to customers.",
    total: "23%",
    color: "#4CAF50",
  },
  {
    title: "Total Leads",
    description: "Total leads from all campaigns.",
    total: "700",
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

// Sample data for the charts
const chartData = [
  { name: "Jan", leads: 4000, sales: 2400, conversions: 2400, activities: 2000 },
  { name: "Feb", leads: 3000, sales: 1398, conversions: 2210, activities: 1200 },
  { name: "Mar", leads: 2000, sales: 9800, conversions: 2290, activities: 3000 },
  { name: "Apr", leads: 2780, sales: 3908, conversions: 2000, activities: 1500 },
  { name: "May", leads: 1890, sales: 4800, conversions: 2181, activities: 2500 },
  { name: "Jun", leads: 6000, sales: 11000, conversions: 6000, activities: 3000 },
  { name: "Jul", leads: 3490, sales: 4300, conversions: 2100, activities: 1800 },
  { name: "Aug", leads: 2000, sales: 9800, conversions: 2290, activities: 3000 },
  { name: "Sep", leads: 2780, sales: 3908, conversions: 2000, activities: 1500 },
  { name: "Oct", leads: 2002, sales: 4800, conversions: 2181, activities: 2500 },
  { name: "Nov", leads: 3333, sales: 3800, conversions: 2500, activities: 3000 },
  { name: "Dec", leads: 3490, sales: 4300, conversions: 2100, activities: 1800 },
];

const pieData = [
  { name: "Converted", value: 400 },
  { name: "Not Converted", value: 300 },
];

// Define colors for the pie chart
const COLORS = ["#0088FE", "#FFBB28"];

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

      <h3>Lead Activity and Sales Over Time</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="leads" fill="#8884d8" name="Leads" />
          <Bar dataKey="sales" fill="#82ca9d" name="Sales" />
          <Bar dataKey="activities" fill="#ff7300" name="Activities" />
        </BarChart>
      </ResponsiveContainer>

      <h3>Lead Conversions and Sales Over Time</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="conversions" stroke="#ff7300" name="Conversions" />
          <Line type="monotone" dataKey="sales" stroke="#8884d8" name="Sales" />
          <Line type="monotone" dataKey="activities" stroke="#82ca9d" name="Activities" />
        </LineChart>
      </ResponsiveContainer>

      <h3>Lead Conversion Rate</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ReportDashboard;
