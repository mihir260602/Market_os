// import { Divider, List, ListItem, ListItemText } from "@mui/material";
// import React from "react";
// import './LeadActivity.css'; // Import the CSS file

// // Updated lead activity with random emails
// const leadActivity = [
//   { activity: "Opened email", email: "john.doe@example.com", timestamp: "2024-09-30 10:00 AM" },
//   { activity: "Visited website", email: "jane.smith@example.com", timestamp: "2024-09-30 10:30 AM" },
//   { activity: "Submitted contact form", email: "alice.jones@example.com", timestamp: "2024-09-30 11:00 AM" },
//   { activity: "Clicked on newsletter link", email: "bob.brown@example.com", timestamp: "2024-09-30 11:30 AM" },
//   { activity: "Requested a demo", email: "charlie.white@example.com", timestamp: "2024-09-30 12:00 PM" },
//   { activity: "Followed on social media", email: "david.green@example.com", timestamp: "2024-09-30 12:30 PM" },
// ];

// const LeadActivity = () => {
//   return (
//     <div className="lead-activity-container">
//       <h2>Lead Activity Timeline</h2>
//       <p>Real-Time Interaction Feed: Provides insight into the lead’s journey.</p>
//       <List>
//         {leadActivity.map((event, index) => (
//           <div key={index}>
//             <ListItem>
//               <ListItemText
//                 primary={`${event.activity} by ${event.email}`} // Displaying email with activity
//                 secondary={event.timestamp}
//               />
//             </ListItem>
//             <Divider />
//           </div>
//         ))}
//       </List>
//     </div>
//   );
// };

// export default LeadActivity;

import { Divider, List, ListItem, ListItemText } from "@mui/material";
import React from "react";
import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import './LeadActivity.css'; // Import the CSS file

// Sample lead activity data
const leadActivity = [
  { activity: "Opened email", email: "john.doe@example.com", timestamp: "2024-09-30 10:00 AM" },
  { activity: "Visited website", email: "jane.smith@example.com", timestamp: "2024-09-30 10:30 AM" },
  { activity: "Submitted contact form", email: "alice.jones@example.com", timestamp: "2024-09-30 11:00 AM" },
  { activity: "Clicked on newsletter link", email: "bob.brown@example.com", timestamp: "2024-09-30 11:30 AM" },
  { activity: "Requested a demo", email: "charlie.white@example.com", timestamp: "2024-09-30 12:00 PM" },
  { activity: "Followed on social media", email: "david.green@example.com", timestamp: "2024-09-30 12:30 PM" },
];

// Sample data for the pie chart (Leads by Source)
const pieData = [
  { name: 'Email', value: 18.75 },
  { name: 'Call', value: 12.50 },
  { name: 'Web Site', value: 18.75 },
  { name: 'Partner', value: 12.50 },
  { name: 'Public Relations', value: 12.50 },
  { name: 'Existing Customer', value: 18.75 },
  { name: 'Campaign', value: 6.25 },
];

// Sample data for the bar chart (Leads by Status)
const barData = [
  { name: 'New', leads: 6 },
  { name: 'Assigned', leads: 5 },
  { name: 'In Process', leads: 6 },
  {name: 'Done', leads: 3}
];

// Colors for the pie chart slices
const COLORS = ['#ff9800', '#ff5722', '#8bc34a', '#00bcd4', '#9c27b0', '#ffc107', '#03a9f4'];

const LeadActivity = () => {
  return (
    <div className="lead-activity-container">
      <h2>Lead Activity Timeline</h2>
      <p>Real-Time Interaction Feed: Provides insight into the lead’s journey.</p>

      {/* Lead Activity List */}
      <List>
        {leadActivity.map((event, index) => (
          <div key={index}>
            <ListItem>
              <ListItemText
                primary={`${event.activity} by ${event.email}`} // Displaying email with activity
                secondary={event.timestamp}
              />
            </ListItem>
            <Divider />
          </div>
        ))}
      </List>

      {/* Charts Section */}
      <div className="charts-container">
        <div className="chart">
          <h3>Leads by Source</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label>
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart">
          <h3>Leads by Status</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis type="category" dataKey="name" />
              <Tooltip />
              <Bar dataKey="leads" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default LeadActivity;
