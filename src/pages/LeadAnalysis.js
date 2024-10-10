// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom"; // For redirecting
// import "./LeadAnalysis.css";

// const LeadAnalysis = () => {
//   const [segments, setSegments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate(); // Hook to programmatically navigate

//   // Fetch data from the API
//   // useEffect(() => {
//   //   const fetchSegments = async () => {
//   //     try {
//   //       const response = await axios.get("https://your-api-endpoint.com/api/segments"); // Replace with actual API endpoint
//   //       setSegments(response.data.segments); // Assuming the response has a `segments` field
//   //       setLoading(false);
//   //     } catch (err) {
//   //       setError("Failed to fetch lead segments.");
//   //       setLoading(false);
//   //     }
//   //   };

//   //   fetchSegments();
//   // }, []);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>;

//   // Redirect to the lead's detail page when clicking an email
//   const handleEmailClick = (email) => {
//     navigate(`/leads/${encodeURIComponent(email)}`); // Redirect to the lead's detailed page
//   };

//   return (
//     <div className="lead-analysis-container">
//       <h2>Lead Segments Overview</h2>
//       <div className="lead-description">
//         <p>
//           This page provides a comprehensive analysis of leads by segment and user activity. Each segment contains users' email addresses who fall under different categories of lead engagement.
//         </p>
//       </div>

//       <h3>Leads Overview</h3>
//       <div className="segments-list">
//         {segments.map((segment, index) => (
//           <div key={index} className="segment-card">
//             <h4>{segment.segment}</h4>
//             <ul>
//               {segment.emails.map((email, emailIndex) => (
//                 <li 
//                   key={emailIndex} 
//                   className="email-item" 
//                   onClick={() => handleEmailClick(email)} // Navigate to email details on click
//                 >
//                   {email}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default LeadAnalysis;

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom"; // For redirecting
// import "./LeadAnalysis.css";

// // Dummy data to simulate the API response
// const dummyData = {
//   segments:[
//   {
//     segment: "Active Indian Web App User",
//     emails: ["prakarsh@valuebound.com", "prakarsh@valuebound.com", "prakarsh@valuebound.com"],
//   },
//   {
//     segment: "Active Indore-based User with frequent visits",
//     emails: ["raunak@valuebound.com", "raunak@valuebound.com", "raunak@valuebound.com"],
//   },
//   {
//     segment: "Active User from Indore, India",
//     emails: ["mahavir@valuebound.com", "mahavir@valuebound.com", "mahavir@valuebound.com"],
//   },
//   {
//     segment: "Frequent India-based Webpage Visitor",
//     emails: ["jaiminiraunak30@gmail.com", "jaiminiraunak30@gmail.com", "jaiminiraunak30@gmail.com"],
//   },
//   {
//     segment: "New Delhi-based Infrequent Visitor",
//     emails: ["vivek@valuebound.com", "vivek@valuebound.com", "vivek@valuebound.com"],
//   },
//   {
//     segment: "Frequent Mumbai-based Web User",
//     emails: ["rahul@valuebound.com", "rahul@valuebound.com", "rahul@valuebound.com"],
//   },
//   {
//     segment: "Active User from Bangalore, India",
//     emails: ["sanjay@valuebound.com", "sanjay@valuebound.com", "sanjay@valuebound.com"],
//   },
//   {
//     segment: "Frequent Web App User from Pune",
//     emails: ["raj@valuebound.com", "raj@valuebound.com", "raj@valuebound.com"],
//   },
//   {
//     segment: "Occasional Web User from Hyderabad",
//     emails: ["neha@valuebound.com", "neha@valuebound.com", "neha@valuebound.com"],
//   },
//   {
//     segment: "Webpage Visitor from Chennai",
//     emails: ["anil@valuebound.com", "anil@valuebound.com", "anil@valuebound.com"],
//   },
//   {
//     segment: "Frequent Visitor from Kolkata",
//     emails: ["amit@valuebound.com", "amit@valuebound.com", "amit@valuebound.com"],
//   },
//   {
//     segment: "Infrequent User from Jaipur",
//     emails: ["ankita@valuebound.com", "ankita@valuebound.com", "ankita@valuebound.com"],
//   },
//   {
//     segment: "Active User from Ahmedabad",
//     emails: ["deepak@valuebound.com", "deepak@valuebound.com", "deepak@valuebound.com"],
//   },
//   {
//     segment: "Frequent Lucknow-based Visitor",
//     emails: ["surbhi@valuebound.com", "surbhi@valuebound.com", "surbhi@valuebound.com"],
//   },
//   {
//     segment: "Active User from Surat, India",
//     emails: ["gautam@valuebound.com", "gautam@valuebound.com", "gautam@valuebound.com"],
//   },
//   {
//     segment: "Frequent Web App User from Kanpur",
//     emails: ["pankaj@valuebound.com", "pankaj@valuebound.com", "pankaj@valuebound.com"],
//   },
//   {
//     segment: "Occasional Web Visitor from Nagpur",
//     emails: ["jyoti@valuebound.com", "jyoti@valuebound.com", "jyoti@valuebound.com"],
//   },
//   {
//     segment: "Frequent Jaipur-based Web Visitor",
//     emails: ["shubham@valuebound.com", "shubham@valuebound.com", "shubham@valuebound.com"],
//   },
//   {
//     segment: "Active User from Bhopal, India",
//     emails: ["vinay@valuebound.com", "vinay@valuebound.com", "vinay@valuebound.com"],
//   },
//   {
//     segment: "Frequent User from Varanasi",
//     emails: ["alok@valuebound.com", "alok@valuebound.com", "alok@valuebound.com"],
//   },
//   {
//     segment: "Occasional Web User from Patna",
//     emails: ["nilesh@valuebound.com", "nilesh@valuebound.com", "nilesh@valuebound.com"],
//   },
//   {
//     segment: "Active Web App User from Agra",
//     emails: ["karan@valuebound.com", "karan@valuebound.com", "karan@valuebound.com"],
//   },
//   {
//     segment: "Frequent Coimbatore-based Visitor",
//     emails: ["raghav@valuebound.com", "raghav@valuebound.com", "raghav@valuebound.com"],
//   },
//   {
//     segment: "Active User from Amritsar, India",
//     emails: ["manish@valuebound.com", "manish@valuebound.com", "manish@valuebound.com"],
//   },
//   {
//     segment: "Frequent Web Visitor from Ranchi",
//     emails: ["harish@valuebound.com", "harish@valuebound.com", "harish@valuebound.com"],
//   },
//   {
//     segment: "Occasional Web User from Vadodara",
//     emails: ["mohit@valuebound.com", "mohit@valuebound.com", "mohit@valuebound.com"],
//   },
//   {
//     segment: "Frequent Web App User from Ludhiana",
//     emails: ["ritesh@valuebound.com", "ritesh@valuebound.com", "ritesh@valuebound.com"],
//   },
//   {
//     segment: "Active User from Guwahati, India",
//     emails: ["ankur@valuebound.com", "ankur@valuebound.com", "ankur@valuebound.com"],
//   },
//   {
//     segment: "Frequent User from Nashik",
//     emails: ["ashish@valuebound.com", "ashish@valuebound.com", "ashish@valuebound.com"],
//   },
//   {
//     segment: "Occasional Web Visitor from Kochi",
//     emails: ["vishal@valuebound.com", "vishal@valuebound.com", "vishal@valuebound.com"],
//   },
//   {
//     segment: "Active User from Gwalior",
//     emails: ["mukesh@valuebound.com", "mukesh@valuebound.com", "mukesh@valuebound.com"],
//   },
//   {
//     segment: "Frequent Web App Visitor from Raipur",
//     emails: ["akshay@valuebound.com", "akshay@valuebound.com", "akshay@valuebound.com"],
//   },
// ],

// };

// const LeadAnalysis = () => {
//   const [segments, setSegments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate(); // Hook to programmatically navigate

//   // Simulate data fetching with dummy data
//   useEffect(() => {
//     const fetchSegments = async () => {
//       try {
//         // Simulate loading and then set the dummy data
//         await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate API delay
//         setSegments(dummyData.segments); // Use dummy data instead of API
//         setLoading(false);
//       } catch (err) {
//         setError("Failed to fetch lead segments.");
//         setLoading(false);
//       }
//     };

//     fetchSegments();
//   }, []);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>;

//   // Redirect to the segment's detail page when clicking a segment
//   const handleSegmentClick = (segmentIndex) => {
//     navigate(`/lead-analysis/${segmentIndex}`); // Redirect to the segment's detailed page
//   };

//   return (
//     <div className="lead-analysis-outer-container">
//       <div className="lead-analysis-container">
//         <h2>Lead Segments</h2>
//         <ul className="segments-list">
//           {segments.map((segment, index) => (
//             <li
//               key={index}
//               className="segment-item"
//               onClick={() => handleSegmentClick(index)} // Navigate to segment details on click
//             >
//               {segment.segment}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default LeadAnalysis;
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./LeadAnalysis.css";

// Service to fetch the segments data
const fetchSegments = async () => {
  const response = await axios.get("http://165.22.11.185:8000/posthog/segments/");
  if (response.status !== 200) {
    throw new Error(`Error: Received status code ${response.status}`);
  }
  return response.data.segments;
};

const LeadAnalysis = () => {
  const [segments, setSegments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch the segments data when the component mounts
  const getSegments = useCallback(async () => {
    setLoading(true); // Start loading
    setError(null); // Reset any previous errors
    try {
      const fetchedSegments = await fetchSegments();
      setSegments(fetchedSegments);
      setLoading(false); // Stop loading spinner
    } catch (err) {
      setError(err.message || "Failed to fetch lead segments.");
      setLoading(false); // Stop loading spinner
    }
  }, []);

  useEffect(() => {
    getSegments(); // Initial data fetch
  }, [getSegments]);

  // Handle click on a segment to navigate to its detailed page
  const handleSegmentClick = (segmentIndex) => {
    navigate(`/lead-analysis/${segmentIndex}`); // Navigate to segment detail page
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading segments...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p>{error}</p>
        <button onClick={getSegments}>Retry</button>
      </div>
    );
  }

  return (
    <div className="lead-analysis-outer-container">
      <div className="lead-analysis-container">
        <h2>Lead Segments</h2>
        <ul className="segments-list">
          {segments.length === 0 ? (
            <li>No segments available.</li>
          ) : (
            segments.map((segment, index) => (
              <li
                key={index}
                className="segment-item"
                onClick={() => handleSegmentClick(index)}
                style={{ cursor: "pointer" }}
              >
                {segment.segment || "Unnamed Segment"}
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default LeadAnalysis;
