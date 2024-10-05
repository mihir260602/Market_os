import React from "react";
import { Box, Typography, Grid, Card, CardContent } from "@mui/material";
import OpenRatesChart from "./OpenRatesChart";
import ClickRatesChart from "./ClickRatesChart";
import SubscriberDemographics from "./SubscriberDemographics";
import RecentCampaignsTable from "./RecentCampaignsTable";
import "./DashboardContent.css"; // Import CSS styles

const DashboardContent = () => {
  return (
    <>
      {/* <SideNav /> */}
      <Box className="dashboard-container">
        {/* Dashboard Heading */}
        <Typography variant="h3" className="dashboard-heading" gutterBottom>
          Dashboard
        </Typography>

        {/* Key Metrics Section */}
        <Grid container spacing={3} className="key-metrics">
          <Grid item xs={12} sm={6} md={4}>
            <Card className="metric-card">
              <CardContent>
                <Typography variant="h5" className="metric-title">
                  Total Active Campaigns
                </Typography>
                <Typography variant="h6">10</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card className="metric-card">
              <CardContent>
                <Typography variant="h5" className="metric-title">
                  Total Subscribers
                </Typography>
                <Typography variant="h6">5,000</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card className="metric-card">
              <CardContent>
                <Typography variant="h5" className="metric-title">
                  Open Rate
                </Typography>
                <Typography variant="h6">75%</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card className="metric-card">
              <CardContent>
                <Typography variant="h5" className="metric-title">
                  Click Rate
                </Typography>
                <Typography variant="h6">30%</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card className="metric-card">
              <CardContent>
                <Typography variant="h5" className="metric-title">
                  Conversion Rate
                </Typography>
                <Typography variant="h6">5%</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card className="metric-card">
              <CardContent>
                <Typography variant="h5" className="metric-title">
                  Bounce Rate
                </Typography>
                <Typography variant="h6">5%</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Data Visualizations */}
        <section
          id="data-visualizations-section"
          className="data-visualizations"
        >
          <Typography variant="h4" className="chart-heading">
            Data Visualizations
          </Typography>
          <Grid container spacing={3} className="charts-grid">
            {/* Each chart in a separate grid item for full width */}
            <Grid item xs={12}>
              <OpenRatesChart />
            </Grid>
            <Grid item xs={12}>
              <ClickRatesChart />
            </Grid>
            <Grid item xs={12}>
              <SubscriberDemographics />
            </Grid>
          </Grid>
        </section>

        {/* Recent Campaigns Table */}
        <section id="recent-campaigns-section" className="recent-campaigns">
          <Typography variant="h4" className="recent-campaigns-heading">
            Recent Campaigns
          </Typography>
          <RecentCampaignsTable />
        </section>
      </Box>
    </>
  );
};

export default DashboardContent;
