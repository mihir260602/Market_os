import { CssBaseline, ThemeProvider } from "@mui/material";
import React, { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Header from "./components/Header"; // Import the Header component
import Sidebar from "./components/Sidebar";
import CampaignManager from "./pages/CampaignManager";
import ContactList from "./pages/ContactList";
import LeadActivity from "./pages/LeadActivity";
import LeadScoring from "./pages/LeadScoring";
import ReportDashboard from "./pages/ReportDashboard";
import SalesPipeline from "./pages/SalesPipeline";
import TaskManager from "./pages/TaskManager";
import theme from "./theme/theme";

function App() {
  const [selectedPage, setSelectedPage] = useState("Contact List");

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div style={{ display: "flex", height: "100vh" }}>
          <Sidebar
            selectedPage={selectedPage}
            setSelectedPage={setSelectedPage}
          />
          <main style={{ padding: "20px", width: "100%", overflowY: "auto" }}>
            <Header /> {/* Add the Header component here */}
            <Routes>
              <Route path="/" element={<ReportDashboard />} />
              <Route path="/contact-list" element={<ContactList />} />
              <Route path="/lead-activity" element={<LeadActivity />} />
              <Route path="/task-manager" element={<TaskManager />} />
              <Route path="/campaign-manager" element={<CampaignManager />} />
              <Route path="/sales-pipeline" element={<SalesPipeline />} />
              <Route path="/lead-scoring" element={<LeadScoring />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
