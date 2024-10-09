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

const RecentCampaignsTable = ({ campaigns }) => {
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
                <TableCell>
                  {campaign.isPublished ? "Published" : "Not Published"}
                </TableCell>{" "}
                {/* Conditional rendering */}
                <TableCell>{campaign.openRate}</TableCell>
                <TableCell>{campaign.clickRate}</TableCell>
                <TableCell>{campaign.dateAdded}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default RecentCampaignsTable;
