import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels"; 
import "./DashboardContent.css"; 

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels); 

const SubscriberDemographics = () => {
  const data = {
    labels: ["Age 18-24", "Age 25-34", "Age 35-44", "Age 45+"],
    datasets: [
      {
        data: [300, 500, 200, 100],
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top", 
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw}`; 
          },
        },
      },
      datalabels: {
        formatter: (value, context) => {
          return value; 
        },
        color: "#fff", 
      },
    },
  };

  return (
    <div className="chart-container">
      <Pie data={data} options={options} width={200} height={200} />{" "}
    </div>
  );
};

export default SubscriberDemographics;
