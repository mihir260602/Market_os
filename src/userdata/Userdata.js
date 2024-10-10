// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const UserData = () => {
//     const [visitorData, setVisitorData] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchVisitorData = async () => {
//             try {
//                 const apiKey = process.env.REACT_APP_PERSONAL_API_KEY_NEW; // Use environment variable for API key
//                 const url = 'https://app.posthog.com/api/projects/95663/events/?event=$pageview&limit=1000';

//                 // Make the API call
//                 const response = await axios.get(url, {
//                     headers: {
//                         Authorization: `Bearer ${apiKey}`,
//                         'Content-Type': 'application/json'
//                     }
//                 });

//                 const responseJson = response.data;

//                 // Initialize an object to track visitor metrics
//                 let visitorMetrics = {};

//                 // Check if there are results in the response
//                 if (responseJson.results && responseJson.results.length > 0) {
//                     responseJson.results.forEach(event => {
//                         const distinctId = event.distinct_id; // Get the visitor's distinct ID
//                         const sessionId = event.properties.$session_id || 'unknown_session'; // Get session ID
//                         const timeOnPage = event.properties.$time_spent || 0; // Get time spent on page
//                         const country = event.properties.$geoip_country_name || 'Unknown Country'; // Get country
//                         const region = event.properties.$geoip_region_name || 'Unknown Region'; // Get region
//                         const city = event.properties.$geoip_city_name || 'Unknown City'; // Get city

//                         // Initialize visitor metrics if not already done
//                         if (!visitorMetrics[distinctId]) {
//                             visitorMetrics[distinctId] = {
//                                 sessionId: sessionId,
//                                 pageViews: 0,
//                                 totalTimeSpent: 0,
//                                 location: `${city}, ${country}`, // Store location data
//                                 firstSeen: new Date(event.timestamp), // Record first event timestamp
//                             };
//                         }

//                         // Increment page views for this visitor
//                         visitorMetrics[distinctId].pageViews += 1;

//                         // Add time spent on the page
//                         visitorMetrics[distinctId].totalTimeSpent += timeOnPage;

//                         // Update first seen date if the current event is earlier
//                         const eventDate = new Date(event.timestamp);
//                         if (eventDate < visitorMetrics[distinctId].firstSeen) {
//                             visitorMetrics[distinctId].firstSeen = eventDate;
//                         }
//                     });
//                 } else {
//                     console.log("No results found in the API response.");
//                 }

//                 // Function to format date in 'YYYY-MM-DD'
//                 function formatDate(date) {
//                     return date.toISOString().split('T')[0]; // Extract date part (YYYY-MM-DD)
//                 }

//                 // Convert visitorMetrics object into an array for easier display
//                 const visitorList = Object.entries(visitorMetrics).map(([visitorId, metrics]) => ({
//                     visitorId: visitorId,
//                     sessionId: metrics.sessionId,
//                     pageViews: metrics.pageViews,
//                     totalTimeSpent: metrics.totalTimeSpent,
//                     firstSeenDate: formatDate(metrics.firstSeen),
//                     location: metrics.location
//                 }));

//                 // Set visitor data to state
//                 setVisitorData(visitorList);
//             } catch (err) {
//                 setError(err);
//                 console.error("Error fetching visitor data:", err);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchVisitorData();
//     }, []);

//     if (loading) return <div>Loading...</div>;
//     if (error) return <div>Error fetching data: {error.message}</div>;

//     return (
//         <div>
//             <h1>Visitor Data</h1>
//             <table>
//                 <thead>
//                     <tr>
//                         <th>Visitor ID</th>
//                         <th>Session ID</th>
//                         <th>Page Views</th>
//                         {/* <th>Total Time Spent</th> */}
//                         <th>First Seen Date</th>
//                         <th>Location</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {visitorData.map(visitor => (
//                         <tr key={visitor.visitorId}>
//                             <td>{visitor.visitorId}</td>
//                             <td>{visitor.sessionId}</td>
//                             <td>{visitor.pageViews}</td>
//                             {/* <td>{visitor.totalTimeSpent}</td> */}
//                             <td>{visitor.firstSeenDate}</td>
//                             <td>{visitor.location}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };
// export default UserData;

// --------------------------------------

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const UserData = () => {
//     const visitorId = 'kushagra@valuebound.com'; // Visitor ID
//     const [userData, setUserData] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchUserData = async () => {
//             try {
//                 const apiKey = process.env.REACT_APP_PERSONAL_API_KEY_NEW; // Use environment variable for API key
//                 const response = await axios.get(`https://app.posthog.com/api/projects/95663/events/?distinct_id=${visitorId}&limit=1000`, {
//                     headers: {
//                         Authorization: `Bearer ${apiKey}`
//                     }
//                 });

//                 const responseJson = response.data; // Correctly extract the JSON data
//                 console.log(responseJson); // Log the full response to check the structure

//                 if (!responseJson.results || responseJson.results.length === 0) {
//                     console.log("No results found in the response.");
//                     setUserData({});
//                     return;
//                 }

//                 // Initialize user metrics
//                 let userMetrics = {
//                     totalViews: 0,
//                     totalSessions: 0,
//                     pathsVisited: {},
//                     last20PathsVisited: [],
//                     location: '' // Placeholder for user location
//                 };

//                 // Initialize a set to track unique paths for sessions
//                 let visitedPaths = new Set();

//                 responseJson.results.forEach(event => {
//                     const url = event.properties.$current_url || "";
//                     const sessionId = event.properties.$session_id || ""; // Adjust this based on your data structure
//                     const location = event.properties.location || ''; // Adjust this field based on your API structure

//                     // Count paths visited
//                     if (url) {
//                         userMetrics.pathsVisited[url] = (userMetrics.pathsVisited[url] || 0) + 1;
//                         visitedPaths.add(url); // Add to set of unique paths
//                         userMetrics.totalViews += 1; // Increment total views

//                         // Increment session count (only count unique sessions)
//                         if (sessionId) {
//                             userMetrics.totalSessions += 1;
//                         }

//                         // Store the last known location
//                         if (location) {
//                             userMetrics.location = location; // Capture the location
//                         }
//                     }
//                 });

//                 // Keep only the last 20 unique paths visited
//                 userMetrics.last20PathsVisited = Array.from(visitedPaths).slice(-20);

//                 setUserData(userMetrics);
//             } catch (err) {
//                 setError(err);
//                 console.error("Error fetching user data:", err);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchUserData();
//     }, []);

//     if (loading) return <div>Loading...</div>;
//     if (error) return <div>Error fetching data: {error.message}</div>;

//     return (
//         <div>
//             <h1>User Data for {visitorId}</h1>
//             <h2>Total Views: {userData.totalViews}</h2>
//             {/* <h3>Location: {userData.location || 'Location not available'}</h3> Display user location */}
//             <h2>Total Sessions: {userData.totalSessions}</h2>
//             <h3>Last 20 Paths Visited:</h3>
//             <ul>
//                 {userData.last20PathsVisited.map((path, index) => (
//                     <li key={index}>{path}</li>
//                 ))}
//             </ul>

//             <h3>All Paths Visited:</h3>
//             <ul>
//                 {Object.entries(userData.pathsVisited).map(([path, count]) => (
//                     <li key={path}>{path}: {count} times</li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default UserData;

// --------------------------------------------------------------------------
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Userdata.css';

const VisitorList = () => {
    const [visitorData, setVisitorData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchVisitorData = async () => {
            try {
                const apiKey = process.env.REACT_APP_PERSONAL_API_KEY_NEW;
                const url = 'https://app.posthog.com/api/projects/95663/events/?event=$pageview&limit=1000';

                const response = await axios.get(url, {
                    headers: {
                        Authorization: `Bearer ${apiKey}`,
                        'Content-Type': 'application/json'
                    }
                });

                const responseJson = response.data;
                let visitorMetrics = {};

                if (responseJson.results && responseJson.results.length > 0) {
                    responseJson.results.forEach(event => {
                        const distinctId = event.distinct_id;
                        const sessionId = event.properties.$session_id || 'unknown_session';
                        const timeOnPage = event.properties.$time_spent || 0;
                        const country = event.properties.$geoip_country_name || 'Unknown Country';
                        const region = event.properties.$geoip_region_name || 'Unknown Region';
                        const city = event.properties.$geoip_city_name || 'Unknown City';

                        if (!visitorMetrics[distinctId]) {
                            visitorMetrics[distinctId] = {
                                sessionId: sessionId,
                                pageViews: 0,
                                totalTimeSpent: 0,
                                location: `${city}, ${country}`,
                                firstSeen: new Date(event.timestamp),
                            };
                        }

                        visitorMetrics[distinctId].pageViews += 1;
                        visitorMetrics[distinctId].totalTimeSpent += timeOnPage;

                        const eventDate = new Date(event.timestamp);
                        if (eventDate < visitorMetrics[distinctId].firstSeen) {
                            visitorMetrics[distinctId].firstSeen = eventDate;
                        }
                    });
                } else {
                    console.log("No results found in the API response.");
                }

                function formatDate(date) {
                    return date.toISOString().split('T')[0];
                }

                const visitorList = Object.entries(visitorMetrics).map(([visitorId, metrics]) => ({
                    visitorId: visitorId,
                    sessionId: metrics.sessionId,
                    pageViews: metrics.pageViews,
                    totalTimeSpent: metrics.totalTimeSpent,
                    firstSeenDate: formatDate(metrics.firstSeen),
                    location: metrics.location
                }));

                setVisitorData(visitorList);
            } catch (err) {
                setError(err);
                console.error("Error fetching visitor data:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchVisitorData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error fetching data: {error.message}</div>;

    return (
            <div className="user-data-outer-container">
            <div className="user-data-table-container ">
            <h1>Visitor Data</h1>
            <table>
                <thead>
                    <tr>
                        <th>Visitor ID</th>
                        <th>Session ID</th>
                        <th>Page Views</th>
                        <th>First Seen Date</th>
                        <th>Location</th>
                    </tr>
                </thead>
                <tbody>
                    {visitorData.map(visitor => (
                        <tr key={visitor.visitorId}>
                            <td><Link to={`/visitor/${visitor.visitorId}`}>{visitor.visitorId}</Link></td> {/* Link to visitor details */}
                            <td>{visitor.sessionId}</td>
                            <td>{visitor.pageViews}</td>
                            <td>{visitor.firstSeenDate}</td>
                            <td>{visitor.location}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </div>
        
    );
};

export default VisitorList;
