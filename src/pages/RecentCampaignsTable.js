import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import "./DashboardContent.css"; 

const RecentCampaignsTable = () => {
  const campaigns = [
    {
      name: "Campaign 1",
      status: "Sent",
      openRate: "75%",
      clickRate: "30%",
      createdDate: "2024-09-20",
    },
    {
      name: "Campaign 2",
      status: "Scheduled",
      openRate: "60%",
      clickRate: "25%",
      createdDate: "2024-09-18",
    },
    {
      name: "Campaign 3",
      status: "Draft",
      openRate: "N/A",
      clickRate: "N/A",
      createdDate: "2024-09-15",
    },
  ];

  return (
    <div className="table-container">
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Campaign Name</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Open Rate</TableCell>
              <TableCell>Click Rate</TableCell>
              <TableCell>Created Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {campaigns.map((campaign, index) => (
              <TableRow key={index}>
                <TableCell>{campaign.name}</TableCell>
                <TableCell>{campaign.status}</TableCell>
                <TableCell>{campaign.openRate}</TableCell>
                <TableCell>{campaign.clickRate}</TableCell>
                <TableCell>{campaign.createdDate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default RecentCampaignsTable;
