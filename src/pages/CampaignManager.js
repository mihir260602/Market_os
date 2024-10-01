import React, { useState } from "react";
import "./CampaignManager.css";

const sampleCampaigns = [
  { name: "Spring 2024 Email Blast", status: "Active" },
  { name: "Webinar Promotion", status: "Inactive" },
  { name: "Holiday Sale Campaign", status: "Active" },
];

const CampaignManager = () => {
  const [campaigns, setCampaigns] = useState(sampleCampaigns);
  const [campaignInput, setCampaignInput] = useState("");

  const createCampaign = () => {
    const newCampaign = {
      name: campaignInput,
      status: "Active",
    };
    setCampaigns([...campaigns, newCampaign]);
    setCampaignInput("");
  };

  const toggleCampaignStatus = (index) => {
    const newCampaigns = [...campaigns];
    newCampaigns[index].status =
      newCampaigns[index].status === "Active" ? "Inactive" : "Active";
    setCampaigns(newCampaigns);
  };

  return (
    <div className="campaign-manager">
      <h2>Campaign Manager</h2>
      <input
        type="text"
        placeholder="New Campaign..."
        value={campaignInput}
        onChange={(e) => setCampaignInput(e.target.value)}
      />
      <button onClick={createCampaign}>Create Campaign</button>
      <ul>
        {campaigns.map((campaign, index) => (
          <li key={index}>
            {campaign.name} - {campaign.status}
            <button onClick={() => toggleCampaignStatus(index)}>
              {campaign.status === "Active" ? "Deactivate" : "Activate"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CampaignManager;
