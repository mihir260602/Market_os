import React from "react";
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

const data = [
  { month: "Jan", leads: 400 },
  { month: "Feb", leads: 300 },
  { month: "Mar", leads: 200 },
  { month: "Apr", leads: 278 },
  { month: "May", leads: 189 },
  { month: "Jun", leads: 300 },
];

const BarChartComponent = () => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="leads" fill="#8884d8" />
    </BarChart>
  </ResponsiveContainer>
);

export default BarChartComponent;
