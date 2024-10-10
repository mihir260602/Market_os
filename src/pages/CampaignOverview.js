import React, { useState, useEffect } from "react";
import "./CampaignOverview.css";
import { Bar } from "react-chartjs-2"; // Assuming you will use Chart.js for visualizations
import { Line } from "react-chartjs-2";
import axios from "axios";
// Sample data for campaigns
const campaignsData = [
  {
    id: 1,
    title: "Holiday Sale Campaign",
    status: "completed",
    totalSent: 10000,
    opens: 6500,
    clicks: 1200,
    conversions: 300,
    engagementTime: "4",
  },
  {
    id: 2,
    title: "Summer Promo Campaign",
    status: "active",
    totalSent: 8000,
    opens: 5200,
    clicks: 800,
    conversions: 200,
    engagementTime: "3",
  },
  {
    id: 3,
    title: "Winter Clearance Campaign",
    status: "paused",
    totalSent: 5000,
    opens: 2500,
    clicks: 500,
    conversions: 100,
    engagementTime: "2",
  },
];
// Sample data for trend line graph
const trendData = {
  labels: ["Sep 1", "Sep 2", "Sep 3", "Sep 4", "Sep 5"],
  datasets: [
    {
      label: "Opens",
      data: [2000, 2500, 2200, 3000, 4000],
      fill: false,
      backgroundColor: "blue",
      borderColor: "blue",
    },
    {
      label: "Clicks",
      data: [300, 400, 350, 500, 700],
      fill: false,
      backgroundColor: "green",
      borderColor: "green",
    },
    {
      label: "Conversions",
      data: [50, 80, 60, 100, 150],
      fill: false,
      backgroundColor: "orange",
      borderColor: "orange",
    },
  ],
};

// Sample data for heatmap
const heatmapData = [
  { hour: "00:00", activity: 10 },
  { hour: "01:00", activity: 12 },
  { hour: "02:00", activity: 7 },
  { hour: "03:00", activity: 5 },
  { hour: "04:00", activity: 8 },
  { hour: "05:00", activity: 20 },
  { hour: "06:00", activity: 35 },
  { hour: "07:00", activity: 50 },
  { hour: "08:00", activity: 45 },
  { hour: "09:00", activity: 60 },
  { hour: "10:00", activity: 75 },
  { hour: "11:00", activity: 80 },
  { hour: "12:00", activity: 70 },
  { hour: "13:00", activity: 50 },
  { hour: "14:00", activity: 40 },
  { hour: "15:00", activity: 30 },
  { hour: "16:00", activity: 20 },
  { hour: "17:00", activity: 15 },
  { hour: "18:00", activity: 10 },
  { hour: "19:00", activity: 8 },
  { hour: "20:00", activity: 5 },
  { hour: "21:00", activity: 3 },
  { hour: "22:00", activity: 2 },
  { hour: "23:00", activity: 1 },
];

const CampaignOverview = () => {
  const [campaigns, setCampaigns] = useState([]); // State to store campaigns from API
  const [filteredCampaigns, setFilteredCampaigns] = useState([]); // Filtered campaigns
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/mautic/campaigns"
        ); // Replace with your API URL
        console.log(response.data);
        setCampaigns(response.data); // Store the fetched data
        setFilteredCampaigns(response.data); // Initially set the filtered campaigns to all campaigns
      } catch (error) {
        console.error("Error fetching the campaigns", error);
      }
    };

    fetchCampaigns();
  }, []);

  const handleFilter = () => {
    let filtered = campaignsData;

    if (startDate) {
      filtered = filtered.filter(
        (campaign) => new Date(campaign.date) >= new Date(startDate)
      );
    }

    if (endDate) {
      filtered = filtered.filter(
        (campaign) => new Date(campaign.date) <= new Date(endDate)
      );
    }

    if (selectedStatus) {
      filtered = filtered.filter(
        (campaign) => campaign.status === selectedStatus
      );
    }

    setFilteredCampaigns(filtered);
  };

  const handleClick = (campaign) => {
    alert(
      `Campaign: ${campaign.title}\nStatus: ${campaign.status}\nTotal Sent: ${campaign.totalSent}`
    );
  };

  return (
    <>
      <div className="campaign-overview">
        <h2 className="campaign-heading">Campaign Overview</h2>

        <div className="key-metrics">
          {/* Campaign Performance Summary */}
          <div className="metric-card">
            <i className="fas fa-chart-line"></i>{" "}
            {/* Icon for Campaign Performance */}
            <div className="metric-value">
              {filteredCampaigns.reduce(
                (acc, campaign) => acc + campaign.totalSent,
                0
              )}
            </div>
            <div className="metric-title">Total Sent</div>
            <div className="metric-description">
              Opens:{" "}
              <strong>
                {filteredCampaigns.reduce(
                  (acc, campaign) => acc + campaign.opens,
                  0
                )}
              </strong>
              <br />
              Clicks:{" "}
              <strong>
                {filteredCampaigns.reduce(
                  (acc, campaign) => acc + campaign.clicks,
                  0
                )}
              </strong>
              <br />
              Conversions:{" "}
              <strong>
                {filteredCampaigns.reduce(
                  (acc, campaign) => acc + campaign.conversions,
                  0
                )}
              </strong>
            </div>
          </div>

          {/* Engagement Metrics */}
          <div className="metric-card">
            <i className="fas fa-users"></i> {/* Icon for Engagement Metrics */}
            <div className="metric-value">
              {filteredCampaigns.length > 0
                ? (
                    filteredCampaigns.reduce(
                      (acc, campaign) =>
                        acc + parseInt(campaign.engagementTime),
                      0
                    ) / filteredCampaigns.length
                  ).toFixed(2)
                : 0}{" "}
              minutes
            </div>
            <div className="metric-title">Average Time Reading</div>
            <div className="metric-description">
              Average time spent per campaign.
            </div>
          </div>
        </div>

        <div className="data-visualizations">
          <h3 className="chart-heading">Data Visualizations</h3>
          <div className="charts-grid">
            <div className="chart-container heatmap">
              <h4>Heatmap</h4>
              <Bar
                data={{
                  labels: heatmapData.map((data) => data.hour),
                  datasets: [
                    {
                      label: "User Engagement",
                      data: heatmapData.map((data) => data.activity),
                      backgroundColor: "rgba(75, 192, 192, 0.6)",
                    },
                  ],
                }}
                options={{
                  maintainAspectRatio: false,
                  scales: {
                    y: {
                      beginAtZero: true,
                    },
                  },
                }}
              />
            </div>

            <div className="chart-container trendline">
              <h4>Trend Line Graph</h4>
              <Line data={trendData} options={{ maintainAspectRatio: false }} />
            </div>
          </div>
        </div>

        <div className="filter-options">
          <h3 className="filter-heading">Filter Options</h3>
          <div className="filter-inputs">
            <input
              type="date"
              className="filter-input"
              onChange={(e) => setStartDate(e.target.value)}
            />
            <input
              type="date"
              className="filter-input"
              onChange={(e) => setEndDate(e.target.value)}
            />
            <select
              className="filter-select"
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="">Select Status</option>
              <option value="active">Active</option>
              <option value="paused">Paused</option>
              <option value="completed">Completed</option>
              <option value="deleted">Deleted</option>
            </select>
            <button className="filter-button" onClick={handleFilter}>
              Filter
            </button>
          </div>
        </div>

        <div className="campaign-status">
          <h3 className="campaign-status-heading">Campaign Status List</h3>
          <ul>
            {filteredCampaigns.map((campaign) => (
              <li
                key={campaign.id}
                className={`campaign-item ${
                  campaign.isPublished ? "published" : "draft"
                }`}
                onClick={() => handleClick(campaign)}
              >
                {campaign.name} -{" "}
                <strong>{campaign.isPublished ? "Published" : "Draft"}</strong>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default CampaignOverview;
