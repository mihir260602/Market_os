import { Card, CardContent, Grid, Slider, Typography } from "@mui/material";
import React from "react";
import "./LeadScoring.css"; // Import the CSS file

const leadScores = [
  { name: "Alice Johnson", emailOpens: 60, websiteVisits: 80 },
  { name: "Mark Smith", emailOpens: 40, websiteVisits: 20 },
  { name: "Jane Doe", emailOpens: 70, websiteVisits: 50 },
];

const LeadScoring = () => {
  return (
    <div className="lead-scoring-container">
      <h2>Lead Scoring Settings</h2>
      <Grid container spacing={2}>
        {leadScores.map((lead, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <Card className="lead-card">
              <CardContent>
                <Typography variant="h6">{lead.name}</Typography>
                <Typography gutterBottom>Email Opens</Typography>
                <Slider
                  defaultValue={lead.emailOpens}
                  min={0}
                  max={100}
                  valueLabelDisplay="auto"
                />
                <Typography gutterBottom>Website Visits</Typography>
                <Slider
                  defaultValue={lead.websiteVisits}
                  min={0}
                  max={100}
                  valueLabelDisplay="auto"
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default LeadScoring;
