import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import "./DashboardContent.css"; // Import CSS styles

// Registering components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const ClickRatesChart = () => {
  const data = {
    labels: [
      "Campaign 1",
      "Campaign 2",
      "Campaign 3",
      "Campaign 4",
      "Campaign 5",
      "Campaign 6",
    ],
    datasets: [
      {
        label: "Click Rates",
        data: [30, 25, 15], // Example click rates for each campaign
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: "Campaigns",
        },
      },
      y: {
        title: {
          display: true,
          text: "Click Rate (%)",
        },
        min: 0,
        max: 100,
        ticks: {
          stepSize: 10,
        },
      },
    },
  };

  return (
    <div className="chart-container">
      <Bar data={data} options={options} />
    </div>
  );
};

export default ClickRatesChart;
