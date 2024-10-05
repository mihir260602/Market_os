import { Card, CardContent, Grid, Paper, Typography } from "@mui/material";
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

const data = [
  { name: "Day 1", visits: 400, sessions: 240, bounceRate: 45 },
  { name: "Day 2", visits: 300, sessions: 139, bounceRate: 55 },
  { name: "Day 3", visits: 200, sessions: 980, bounceRate: 65 },
  { name: "Day 4", visits: 278, sessions: 390, bounceRate: 35 },
  { name: "Day 5", visits: 189, sessions: 480, bounceRate: 50 },
];

const trafficData = [
  { name: "Search Engines", value: 60 },
  { name: "Direct", value: 25 },
  { name: "Social Media", value: 10 },
  { name: "Other", value: 5 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

function WebsiteAnalytics() {
  return (
    <Grid
      container
      spacing={2}
      sx={{
        marginLeft: { xs: 0, md: "250px" }, // Adjusted for sidebar
        maxWidth: "calc(100% - 250px)", // Reduce width to accommodate sidebar
        padding: { xs: 1, sm: 2 },
        overflowX: "hidden", // Ensures no horizontal overflow
      }}
    >
      <Grid item xs={12}>
        <Paper
          sx={{
            padding: 3,
            borderRadius: 2,
            boxShadow: 3,
            backgroundColor: "#f5f5f5",
            marginBottom: 2,
            maxWidth: "90%", // Keep it centered
            margin: "0 auto",
          }}
        >
          <Typography
            variant="h4"
            align="center"
            fontWeight="bold"
            color="primary"
          >
            Website Analytics
          </Typography>
          <Typography variant="body1" align="center" color="text.secondary">
            Track and analyze your website performance metrics.
          </Typography>
        </Paper>
      </Grid>

      {/* Metrics Boxes */}
      {[
        {
          title: "Total Visits",
          value: "5,000",
          description: "Total number of visits to the website.",
        },
        {
          title: "Total Sessions",
          value: "1,200",
          description: "Total number of sessions recorded.",
        },
        {
          title: "Bounce Rate",
          value: "45%",
          description:
            "Percentage of visitors who leave after viewing one page.",
        },
        {
          title: "Conversion Rate",
          value: "10%",
          description: "Percentage of visitors who complete a desired action.",
        },
        {
          title: "Avg. Session Duration",
          value: "3:45",
          description: "Average duration of a session in minutes and seconds.",
        },
        {
          title: "Pages per Session",
          value: "4.5",
          description: "Average number of pages viewed per session.",
        },
        {
          title: "New Visitors",
          value: "3,000",
          description: "Number of new visitors to the website.",
        },
        {
          title: "Returning Visitors",
          value: "2,000",
          description: "Number of returning visitors to the website.",
        },
      ].map((metric, index) => (
        <Grid item xs={12} sm={6} lg={4} key={index}>
          <Card
            sx={{
              padding: 2,
              borderRadius: 2,
              boxShadow: 3,
              backgroundColor: "white",
              textAlign: "center",
              width: "100%", // Use full width within grid item
              height: "160px", // Increased height
              margin: "0 auto",
              transition: "transform 0.2s, box-shadow 0.2s",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: 6,
              },
            }}
          >
            <CardContent>
              <Typography
                variant="subtitle1"
                fontWeight="bold"
                color="text.primary"
              >
                {metric.title}
              </Typography>
              <Typography variant="h4" fontWeight="bold" color="primary">
                {metric.value}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {metric.description}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}

      {/* Charts */}
      <Grid item xs={12} md={6}>
        <Paper
          sx={{
            padding: 2,
            borderRadius: 2,
            boxShadow: 3,
            backgroundColor: "white",
            maxWidth: "90%",
            margin: "0 auto",
          }}
        >
          <Typography
            variant="subtitle1"
            fontWeight="bold"
            color="text.primary"
          >
            Visits
          </Typography>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.3)",
                }}
              />
              <Line
                type="monotone"
                dataKey="visits"
                stroke="#8884d8"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </Paper>
      </Grid>

      <Grid item xs={12} md={6}>
        <Paper
          sx={{
            padding: 2,
            borderRadius: 2,
            boxShadow: 3,
            backgroundColor: "white",
            maxWidth: "90%",
            margin: "0 auto",
          }}
        >
          <Typography
            variant="subtitle1"
            fontWeight="bold"
            color="text.primary"
          >
            Bounce Rate
          </Typography>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.3)",
                }}
              />
              <Bar dataKey="bounceRate" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </Paper>
      </Grid>

      <Grid item xs={12} md={6}>
        <Paper
          sx={{
            padding: 2,
            borderRadius: 2,
            boxShadow: 3,
            backgroundColor: "white",
            maxWidth: "90%",
            margin: "0 auto",
          }}
        >
          <Typography
            variant="subtitle1"
            fontWeight="bold"
            color="text.primary"
          >
            Traffic Sources
          </Typography>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={trafficData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {trafficData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Legend verticalAlign="top" align="right" />
            </PieChart>
          </ResponsiveContainer>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default WebsiteAnalytics;
