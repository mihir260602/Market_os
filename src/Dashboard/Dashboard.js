import React from "react";
import "./Dashboard.css";
// import Sidebar from "./Sidebar";
// import Header from "./Header";

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
// Example data for the charts
const leadData = [
  { name: "Jan", leads: 400 },
  { name: "Feb", leads: 300 },
  { name: "Mar", leads: 500 },
  { name: "Apr", leads: 200 },
  { name: "May", leads: 700 },
  { name: "Jun", leads: 100 },
];

const pieData = [
  { name: "Converted", value: 300 },
  { name: "In Progress", value: 700 },
];

const barData = [
  { name: "Email 1", sent: 400, opened: 240 },
  { name: "Email 2", sent: 300, opened: 139 },
  { name: "Email 3", sent: 200, opened: 980 },
  { name: "Email 4", sent: 278, opened: 390 },
  { name: "Email 5", sent: 189, opened: 480 },
];

const heatMapData = [
  [90, 70, 50, 80],
  [60, 30, 40, 70],
  [50, 90, 60, 40],
  [80, 60, 30, 50],
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF5858"];

const Layout = () => {
  return (
    <div className="app">
      {/* <Sidebar /> */}
      <div className="main-content">
        {/* <Header /> */}
        <div className="analytics-section">
          <div className="analytics-partition">
            <h2>Website Analytics</h2>
          </div>
          <div className="analytics-container">
            <div className="analytics-card">
              {/* <div className="card-icon">📈</div> */}
              <div className="card-content">
                <h3>Total Views</h3>
                <p>50</p>
              </div>
            </div>
            <div className="analytics-card">
              {/* <div className="card-icon"></div> */}
              <div className="card-content">
                <h3>Traffic</h3>
                <p>1,200</p>
              </div>
            </div>
            <div className="analytics-card">
              {/* <div className="card-icon">💵</div> */}
              <div className="card-content">
                <h3>Bounce Rate</h3>
                <p>34</p>
              </div>
            </div>
            <div className="analytics-card">
              {/* <div className="card-icon">👁️</div> */}
              <div className="card-content">
                <h3>Extra</h3>
                <p>8,300</p>
              </div>
            </div>
            <div className="analytics-card">
              {/* <div className="card-icon">👁️</div> */}
              <div className="card-content">
                <h3>Analytics Views</h3>
                <p>8,300</p>
              </div>
            </div>

            <div className="analytics-card">
              {/* <div className="card-icon">👁️</div> */}
              <div className="card-content">
                <h3>Analytics Views</h3>
                <p>8,300</p>
              </div>
            </div>
          </div>
        </div>

        {/* Line and Pie Chart Widgets */}
        <div className="widgets-container">
        <div className="bar-chart-widget">
          <div className="line-chart-widget">
            <h3>Lead Generation Over Time</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={leadData}>
                <Line
                  type="monotone"
                  dataKey="leads"
                  stroke="#8884d8"
                  strokeWidth={2}
                />
                <Tooltip />
              </LineChart>
            </ResponsiveContainer>
          </div>
          </div>
          <div className="bar-chart-widget">
          <div className="pie-chart-widget">
            <h3>Lead Conversion Breakdown</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  animationDuration={800}
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                      onMouseEnter={() =>
                        console.log(`Hovered over: ${entry.name}`)
                      }
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => new Intl.NumberFormat().format(value)}
                />
                <Legend
                  layout="vertical"
                  verticalAlign="middle"
                  align="right"
                  iconType="circle"
                  wrapperStyle={{
                    paddingLeft: "20px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          </div>
        </div>

        <div className="analytics-section">
          <div className="analytics-partition">
            <h2>Email Compaign Analytics</h2>
          </div>
          <div className="analytics-container">
            <div className="analytics-card">
              {/* <div className="card-icon">📈</div> */}
              <div className="card-content">
                <h3>Total Campaigns</h3>
                <p>50</p>
              </div>
            </div>
            <div className="analytics-card">
              {/* <div className="card-icon">📈</div> */}
              <div className="card-content">
                <h3>Click-Through-Rate</h3>
                <p>50</p>
              </div>
            </div>
            <div className="analytics-card">
              {/* <div className="card-icon"></div> */}
              <div className="card-content">
                <h3>New Contacts</h3>
                <p>1,200</p>
              </div>
            </div>
            <div className="analytics-card">
              {/* <div className="card-icon">💵</div> */}
              <div className="card-content">
                <h3>Revenue</h3>
                <p>$3,500</p>
              </div>
            </div>
            <div className="analytics-card">
              {/* <div className="card-icon">👁️</div> */}
              <div className="card-content">
                <h3>Analytics Views</h3>
                <p>8,300</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bar-chart-widget">
          <h3>Email Campaigns</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sent" fill="#82ca9d" />
              <Bar dataKey="opened" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="analytics-section">
          <div className="analytics-partition">
            <h2>Lead Engagement</h2>
          </div>
          <div className="analytics-container">
            <div className="analytics-card">
              {/* <div className="card-icon">📈</div> */}
              <div className="card-content">
                <h3>Engagement Score</h3>
                <p>50</p>
              </div>
            </div>
            <div className="analytics-card">
              {/* <div className="card-icon"></div> */}
              <div className="card-content">
                <h3>Leads Generated</h3>
                <p>1,200</p>
              </div>
            </div>
            <div className="analytics-card">
              {/* <div className="card-icon">💵</div> */}
              <div className="card-content">
                <h3>Total Leads </h3>
                <p>500</p>
              </div>
            </div>
            <div className="analytics-card">
              {/* <div className="card-icon">💵</div> */}
              <div className="card-content">
                <h3>Lead Activity </h3>
                <p>50%</p>
              </div>
            </div>
          </div>
        </div>
        <div class="lead-engagement-widget">
          {/* <!-- Top Performing Leads Table --> */}
          <div class="top-leads-table">
            <h4>Top Performing Leads</h4>
            <table>
              <thead>
                <tr>
                  <th>Lead Name</th>
                  <th>Company</th>
                  <th>Engagement Score</th>
                  <th>Activity Level</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>John Doe</td>
                  <td>ABC Corp</td>
                  <td>95%</td>
                  <td>High</td>
                </tr>
                <tr>
                  <td>Jane Smith</td>
                  <td>XYZ Inc.</td>
                  <td>92%</td>
                  <td>Medium</td>
                </tr>
                <tr>
                  <td>Michael Lee</td>
                  <td>GlobalTech</td>
                  <td>89%</td>
                  <td>High</td>
                </tr>
                <tr>
                  <td>Emily Davis</td>
                  <td>MarketEdge</td>
                  <td>87%</td>
                  <td>Low</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Layout;
