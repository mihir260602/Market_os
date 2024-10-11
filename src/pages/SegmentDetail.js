// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios"; // For fetching data from the API
// import "./SegmentDetail.css"; // Import CSS for styling

// const SegmentDetail = () => {
//   const { segmentId } = useParams(); // Get the segment ID from URL params
//   const [segment, setSegment] = useState(null); // State to store segment data
//   const [loading, setLoading] = useState(true); // Loading state
//   const [error, setError] = useState(null); // Error state

//   // Fetch segment data by ID when the component mounts
//   useEffect(() => {
//     const fetchSegmentData = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get("http://165.22.11.185:8000/posthog/segments/");
//         const segments = response.data.segments;

//         // Find the segment by index (segmentId)
//         const segmentData = segments[segmentId];

//         if (!segmentData) {
//           throw new Error("Segment not found");
//         }

//         setSegment(segmentData);
//         setLoading(false); // Stop loading
//       } catch (err) {
//         setError(err.message || "Failed to fetch segment data.");
//         setLoading(false); // Stop loading
//       }
//     };

//     fetchSegmentData();
//   }, [segmentId]);

//   // Show loading state
//   if (loading) return <div>Loading...</div>;

//   // Show error state if something went wrong
//   if (error) return <div>{error}</div>;

//   // If no segment data is found, show an error message
//   if (!segment) return <div>Segment not found</div>;

//   // Remove duplicate emails using Set
//   const uniqueEmails = [...new Set(segment.emails)];

//   return (
//     <div className="segment-detail-container">
//       <h2>{segment.segment}</h2>
//       <ul className="emails-list">
//         {uniqueEmails.map((email, index) => (
//           <li key={index} className="email-item">
//             {email}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default SegmentDetail;
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios"; // For fetching data from the API
import "./SegmentDetail.css"; // Import CSS for styling

const SegmentDetail = () => {
  const { segmentId } = useParams(); // Get the segment ID from URL params
  const [segment, setSegment] = useState(null); // State to store segment data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch segment data by ID when the component mounts
  useEffect(() => {
    const fetchSegmentData = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://165.22.11.185:8000/posthog/segments/");
        const segments = response.data.segments;

        // Find the segment by index (segmentId)
        const segmentData = segments[segmentId];

        if (!segmentData) {
          throw new Error("Segment not found");
        }

        setSegment(segmentData);
        setLoading(false); // Stop loading
      } catch (err) {
        setError(err.message || "Failed to fetch segment data.");
        setLoading(false); // Stop loading
      }
    };

    fetchSegmentData();
  }, [segmentId]);

  // Show loading state with spinner
  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading segment data...</p>
      </div>
    );
  }

  // Show error state if something went wrong
  if (error) return <div>{error}</div>;

  // If no segment data is found, show an error message
  if (!segment) return <div>Segment not found</div>;

  // Remove duplicate emails using Set
  const uniqueEmails = [...new Set(segment.emails)];

  return (
    <div className="segment-detail-container">
      <h2>{segment.segment}</h2>
      <ul className="emails-list">
        {uniqueEmails.map((email, index) => (
          <li key={index} className="email-item">
            {email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SegmentDetail;
