import "chart.js/auto";
import React, { useState } from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import "./AudienceSegmentation.css";

const AudienceSegmentation = () => {
  const [segments, setSegments] = useState([
    { name: "Youth (18-24)", openRate: 50, clickRate: 20, subscribers: 2000 },
    { name: "Adults (25-34)", openRate: 60, clickRate: 30, subscribers: 3000 },
    { name: "Seniors (35+)", openRate: 40, clickRate: 15, subscribers: 1500 },
  ]);

  const [recentActivity, setRecentActivity] = useState([
    'New segment created: Name: "Youth (18-24)", Demographics: age, Behavior: purchase-history, Engagement: open-rate, Subscribers: 1000.',
    'New segment created: Name: "Adults (25-34)", Demographics: gender, Behavior: email-engagement, Engagement: click-rate, Subscribers: 1050.',
    'New segment created: Name: "Seniors (35+)", Demographics: income-level, Behavior: website-interaction, Engagement: conversion-rate, Subscribers: 4500.',
  ]);

  // State variables for segment criteria
  const [demographics, setDemographics] = useState("age");
  const [behavior, setBehavior] = useState("purchase-history");
  const [engagement, setEngagement] = useState("open-rate");
  const [segmentName, setSegmentName] = useState(""); // New state for segment name

  // Calculate total subscribers
  const totalSubscribers = segments.reduce(
    (acc, segment) => acc + segment.subscribers,
    0
  );

  const barData = {
    labels: segments.map((segment) => segment.name),
    datasets: [
      {
        label: "Open Rate (%)",
        data: segments.map((segment) => segment.openRate),
        backgroundColor: "rgba(255, 152, 0, 0.8)",
        borderColor: "#f57c00",
        borderWidth: 2,
      },
    ],
  };

  const donutData = {
    labels: segments.map((segment) => segment.name),
    datasets: [
      {
        data: segments.map(
          (segment) => (segment.subscribers / totalSubscribers) * 100
        ),
        backgroundColor: ["#ff9800", "#ffb74d", "#ffe0b2"],
      },
    ],
  };

  const handleAddSegment = (e) => {
    e.preventDefault();

    // Create a new segment object
    const newSegment = {
      name: segmentName || `Segment ${recentActivity.length + 1}`, // Default name if none provided
      demographics,
      behavior,
      engagement,
      subscribers: Math.floor(Math.random() * 1000) + 1000, // Random subscribers for demonstration
    };

    // Update recent activity with the new segment details
    const newActivity = `New segment created: Name: "${newSegment.name}", Demographics: ${newSegment.demographics}, Behavior: ${newSegment.behavior}, Engagement: ${newSegment.engagement}, Subscribers: ${newSegment.subscribers}.`;
    setRecentActivity([...recentActivity, newActivity]);

    // Optionally, add the new segment to the segments state
    setSegments([...segments, newSegment]);

    // Clear input fields
    setSegmentName("");
    setDemographics("age");
    setBehavior("purchase-history");
    setEngagement("open-rate");
  };

  return (
    <div className="audience-segmentation">
      <h1>Audience Segmentation Dashboard</h1>
      <div className="key-metrics">
        <h2>Key Metrics</h2>
        <div className="metrics-grid">
          <div className="metric-item">
            <h3>Total Segments</h3>
            <p>{segments.length}</p>
          </div>
          <div className="metric-item">
            <h3>Total Subscribers</h3>
            <p>{totalSubscribers}</p>
          </div>
        </div>
      </div>

      <div className="data-visualizations">
        <h2>Data Visualizations</h2>
        <div className="charts-grid">
          <div className="chart-item">
            <h3>Engagement Rates (Open Rate)</h3>
            <Bar data={barData} />
          </div>
          <div className="chart-item">
            <h3>Subscriber Distribution</h3>
            <Doughnut data={donutData} />
          </div>
        </div>
      </div>

      <div className="segmentation-criteria">
        <h2>Segmentation Criteria</h2>
        <form onSubmit={handleAddSegment}>
          <label>
            Segment Name:
            <input
              type="text"
              value={segmentName}
              onChange={(e) => setSegmentName(e.target.value)}
              placeholder="Enter segment name"
              required
            />
          </label>
          <label>
            Demographics:
            <select
              value={demographics}
              onChange={(e) => setDemographics(e.target.value)}
            >
              <option value="age">Age</option>
              <option value="gender">Gender</option>
              <option value="income">Income Level</option>
              <option value="location">Geographic Location</option>
              <option value="education">Education Level</option>
            </select>
          </label>
          <label>
            Behavior:
            <select
              value={behavior}
              onChange={(e) => setBehavior(e.target.value)}
            >
              <option value="purchase-history">Purchase History</option>
              <option value="website-interaction">Website Interaction</option>
              <option value="email-engagement">Email Engagement</option>
              <option value="social-media">Social Media Activity</option>
              <option value="loyalty-status">Loyalty Program Status</option>
            </select>
          </label>
          <label>
            Engagement:
            <select
              value={engagement}
              onChange={(e) => setEngagement(e.target.value)}
            >
              <option value="open-rate">Open Rate</option>
              <option value="click-rate">Click Rate</option>
              <option value="conversion-rate">Conversion Rate</option>
              <option value="session-duration">Session Duration</option>
              <option value="return-visitor">Return Visitor Rate</option>
            </select>
          </label>
          <button type="submit">Create Segment</button>
        </form>
      </div>

      <section class="recent-segment-activity">
        <div class="recent-segment-activity-header">
          <h2>Recent Segment Activity</h2>
          <p>Stay updated with the latest activities in your segments</p>
        </div>
        <div class="segment-list">
          <div class="segment-item">
            <h3>Segment 1: High-value customers</h3>
            <p>
              Engaged with email campaigns resulting in a 20% increase in
              click-through rates.
            </p>
            <div class="activity-meta">Last activity: 2 days ago</div>
          </div>
          <div class="segment-item">
            <h3>Segment 2: New subscribers</h3>
            <p>
              Completed the onboarding sequence and showed a 15% higher
              retention rate.
            </p>
            <div class="activity-meta">Last activity: 1 week ago</div>
          </div>
          <div class="segment-item">
            <h3>Segment 3: Inactive users</h3>
            <p>
              Re-engagement campaign triggered, with 12% of users returning to
              the platform.
            </p>
            <div class="activity-meta">Last activity: 5 days ago</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AudienceSegmentation;
