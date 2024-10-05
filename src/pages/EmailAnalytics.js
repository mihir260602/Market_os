import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { Line, Bar, Pie } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { Email, OpenInNew, BarChart, Cancel } from "@mui/icons-material";

// Register Chart.js components
Chart.register(...registerables);

// Dummy data for individual metrics
const openRateData = {
  labels: ["Campaign 1", "Campaign 2", "Campaign 3", "Campaign 4"],
  datasets: [
    {
      label: "Open Rate",
      data: [65, 70, 75, 80],
      backgroundColor: [
        "rgba(255,99,132,0.6)",
        "rgba(54,162,235,0.6)",
        "rgba(255,206,86,0.6)",
        "rgba(75,192,192,0.6)",
      ],
    },
  ],
};

const clickRateData = {
  labels: ["Campaign 1", "Campaign 2", "Campaign 3", "Campaign 4"],
  datasets: [
    {
      label: "Click Rate",
      data: [40, 50, 55, 60],
      backgroundColor: "rgba(153,102,255,0.6)",
    },
  ],
};

const bounceRateData = {
  labels: ["Campaign 1", "Campaign 2", "Campaign 3", "Campaign 4"],
  datasets: [
    {
      label: "Bounce Rate",
      data: [5, 7, 6, 8],
      borderColor: "rgba(255,99,132,0.6)",
      borderWidth: 2,
      fill: false,
    },
  ],
};

const unsubscribeRateData = {
  labels: ["Campaign 1", "Campaign 2", "Campaign 3", "Campaign 4"],
  datasets: [
    {
      label: "Unsubscribe Rate",
      data: [2, 3, 4, 5],
      borderColor: "rgba(75,192,192,0.6)",
      borderWidth: 2,
      fill: false,
    },
  ],
};

const EmailAnalytics = () => {
  // Dummy data for summary stats
  const summaryStats = {
    totalEmailsSent: 1000,
    totalOpens: 800,
    totalClicks: 300,
    totalUnsubscribes: 50,
  };

  // Dummy data for top-performing campaigns
  const topCampaigns = [
    { name: "Campaign 1", openRate: "80%", clickRate: "60%" },
    { name: "Campaign 2", openRate: "75%", clickRate: "55%" },
    { name: "Campaign 3", openRate: "70%", clickRate: "50%" },
    { name: "Campaign 4", openRate: "65%", clickRate: "45%" },
  ];

  return (
    <Box
      sx={{
        padding: { xs: "10px", sm: "20px" },
        backgroundColor: "#f4f4f4",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          marginBottom: "20px",
          fontWeight: "bold",
          color: "#333",
          textAlign: "center",
          backgroundColor: "rgba(0, 123, 255, 0.1)",
          padding: "10px",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          width: { xs: "90%", sm: "80%" },
          fontSize: { xs: "1.5rem", sm: "2.5rem" },
        }}
      >
        Email Marketing Analytics
      </Typography>

      <Grid container spacing={4} sx={{ width: "100%", maxWidth: "1200px" }}>
        {/* Summary Stats */}
        <Grid item xs={12}>
          <Typography
            variant="h5"
            sx={{
              marginBottom: "20px",
              textAlign: "center",
              fontWeight: "bold",
              color: "#ff5722",
              textTransform: "uppercase",
              "&::after": {
                content: '""',
                display: "block",
                width: "50px",
                height: "4px",
                backgroundColor: "#ff5722",
                margin: "10px auto",
                borderRadius: "2px",
              },
            }}
          >
            Summary Statistics
          </Typography>
        </Grid>

        {/* Cards for stats */}
        <Grid container spacing={2}>
          {[
            {
              label: "Total Emails Sent",
              value: summaryStats.totalEmailsSent,
              icon: <Email sx={{ fontSize: 40, color: "orange" }} />,
              bgColor: "#e3f2fd",
            },
            {
              label: "Total Opens",
              value: summaryStats.totalOpens,
              icon: <OpenInNew sx={{ fontSize: 40, color: "#ff9800" }} />,
              bgColor: "#ffe0b2",
            },
            {
              label: "Total Clicks",
              value: summaryStats.totalClicks,
              icon: <BarChart sx={{ fontSize: 40, color: "#4caf50" }} />,
              bgColor: "#c8e6c9",
            },
            {
              label: "Total Unsubscribes",
              value: summaryStats.totalUnsubscribes,
              icon: <Cancel sx={{ fontSize: 40, color: "#f44336" }} />,
              bgColor: "#ffccbc",
            },
          ].map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  padding: "16px",
                  backgroundColor: stat.bgColor,
                  boxShadow: 3,
                }}
              >
                <CardContent>
                  {stat.icon}
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    {stat.value}
                  </Typography>
                  <Typography>{stat.label}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Charts */}
        <Grid item xs={12}>
          <Grid container spacing={4}>
            {[
              {
                title: "Open Rate by Campaign",
                chart: (
                  <Pie
                    data={openRateData}
                    options={{ responsive: true, maintainAspectRatio: true }}
                  />
                ),
              },
              {
                title: "Click Rate by Campaign",
                chart: (
                  <Bar
                    data={clickRateData}
                    options={{ responsive: true, maintainAspectRatio: true }}
                  />
                ),
              },
              {
                title: "Bounce Rate by Campaign",
                chart: (
                  <Line
                    data={bounceRateData}
                    options={{ responsive: true, maintainAspectRatio: true }}
                  />
                ),
              },
              {
                title: "Unsubscribe Rate by Campaign",
                chart: (
                  <Line
                    data={unsubscribeRateData}
                    options={{ responsive: true, maintainAspectRatio: true }}
                  />
                ),
              },
            ].map((chart, index) => (
              <Grid item xs={12} sm={6} md={6} key={index}>
                <Card sx={{ height: "100%" }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {chart.title}
                    </Typography>
                    <Box sx={{ height: { xs: "300px", sm: "400px" } }}>
                      {chart.chart}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Top Campaigns Table */}
        <Grid item xs={12}>
          <Typography
            variant="h5"
            sx={{
              marginBottom: "20px",
              textAlign: "center",
              fontWeight: "bold",
              color: "#ff5722",
              textTransform: "uppercase",
              "&::after": {
                content: '""',
                display: "block",
                width: "50px",
                height: "4px",
                backgroundColor: "#ff5722",
                margin: "10px auto",
                borderRadius: "2px",
              },
            }}
          >
            Top Performing Campaigns
          </Typography>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Campaign Name</TableCell>
                  <TableCell>Open Rate</TableCell>
                  <TableCell>Click Rate</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {topCampaigns.map((campaign, index) => (
                  <TableRow key={index}>
                    <TableCell>{campaign.name}</TableCell>
                    <TableCell>{campaign.openRate}</TableCell>
                    <TableCell>{campaign.clickRate}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EmailAnalytics;