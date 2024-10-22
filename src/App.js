import { CssBaseline, ThemeProvider } from "@mui/material";
import React, { useEffect } from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from "react-router-dom";
import Dashboard from "./Dashboard/Dashboard"; // Import Dashboard from the first file
import Header from "./Dashboard/Header";
import Sidebar from "./Dashboard/Sidebar";
import Home from "./Home/Home";
import Login from "./Login/Login";
import AudienceSegmentation from "./pages/AudienceSegmentation";
import CampaignBuilder from "./pages/CampaignBuilder";
import CampaignManager from "./pages/CampaignManager";
import CampaignOverview from "./pages/CampaignOverview";
import ContactList from "./pages/ContactList";
import DashboardContent from "./pages/DashboardContent";
import EmailAnalytics from "./pages/EmailAnalytics";
import EmailTemplatesPage from "./pages/EmailTemplatesPage";
import LeadActivity from "./pages/LeadActivity";
import LeadAnalysis from "./pages/LeadAnalysis";
import SegmentDetail from "./pages/SegmentDetail";
import LeadScoring from "./pages/LeadScoring";
import ReportDashboard from "./pages/ReportDashboard";
import TaskManager from "./pages/TaskManager";
import WebsiteAnalytics from "./pages/WebsiteAnalytics";
import theme from "./theme/theme";
import CreateContent from "./pages/CreateContent";
import Editunpublishedcontent from "./pages/EditUnpublishedContent";
import MauticForm from "./pages/MauticForm";
import Posteditorpage from "./pages/PostEditorPage";
import Publishcontent from "./pages/PublishedContent";
import Unpublishedcontent from "./pages/UnpublishedContent";
import Tickets from "./Tickets/Tickets";
import PostPage from "./Home/PostPage";
import ContactForm from "./pages/ContactForm";
import Postdata from '../src/Blogdata/Postdata';
import Userdata from "../src/userdata/Userdata";
import VisitorDetails from "./userdata/VisitorDetails";


function Layout({ children }) {
  const location = useLocation();

  // Move the `hideSidebarAndHeader` variable outside of `useEffect`
  const hideSidebarAndHeader =
    ["/", "/Login", "/mform", "/contact"].includes(location.pathname) ||
    location.pathname.startsWith("/post/");

  useEffect(() => {
    // You can add any side effects you need to track the location change here if needed
  }, [location]);

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Conditionally render Sidebar */}
      {!hideSidebarAndHeader && <Sidebar />}
      <main style={{ padding: "0px", width: "100% " }}>
        {/* Conditionally render Header */}
        {!hideSidebarAndHeader && <Header />}
        {children}
      </main>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Layout>
          <Routes>
            <Route path="/postdata" element={<Postdata />} />
            <Route path="/userdata" element={<Userdata />} />
            <Route path="/visitor/:visitorId" element={<VisitorDetails />} /> {/* Detailed data for specific visitor */}
            <Route path="/" element={<Home />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/mform" element={<MauticForm />} />
            <Route path="/dashboard" element={<Dashboard />} />{" "}
            <Route path="/report-dashboard" element={<ReportDashboard />} />
            <Route path="/contact-list" element={<ContactList />} />
            <Route path="/lead-activity" element={<LeadActivity />} />
            <Route path="/task-manager" element={<TaskManager />} />
            <Route path="/email-templates" element={<EmailTemplatesPage />} />
            <Route path="/lead-analysis" element={<LeadAnalysis />} />
            <Route path="/lead-analysis/:segmentId" element={<SegmentDetail />} />
            <Route path="/dashboard-content" element={<DashboardContent />} />
            <Route path="/campaign-manager" element={<CampaignManager />} />
            <Route path="/campaign-overview" element={<CampaignOverview />} />
            <Route path="/lead-scoring" element={<LeadScoring />} />
            <Route path="/tickets" element={<Tickets />} />
            <Route path="/website-analytics" element={<WebsiteAnalytics />} />
            <Route path="/email-analytics" element={<EmailAnalytics />} />
            <Route path="/contact" element={<ContactForm />} />
            <Route path="/audience-segmentation" element={<AudienceSegmentation />} />
            <Route path="/campaign-builder" element={<CampaignBuilder />} />
            <Route path="/create-page" element={<CreateContent />} />
            <Route path="/post-editor" element={<Posteditorpage />} />
            <Route path="/unpublished-content" element={<Unpublishedcontent />} />
            <Route path="/published-content" element={<Publishcontent />} />
            <Route path="/edit-unpublish-content/:id" element={<Editunpublishedcontent />} />
            <Route path="/post/:id/:title" element={<PostPage />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
