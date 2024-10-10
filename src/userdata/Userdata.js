import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserData = () => {
    const [visitorData, setVisitorData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchVisitorData = async () => {
            try {
                const apiKey = process.env.REACT_APP_PERSONAL_API_KEY_NEW; // Use environment variable for API key
                const url = 'https://app.posthog.com/api/projects/95663/events/?event=$pageview&limit=1000';

                // Make the API call
                const response = await axios.get(url, {
                    headers: {
                        Authorization: `Bearer ${apiKey}`,
                        'Content-Type': 'application/json'
                    }
                });

                const responseJson = response.data;

                // Initialize an object to track visitor metrics
                let visitorMetrics = {};

                // Check if there are results in the response
                if (responseJson.results && responseJson.results.length > 0) {
                    responseJson.results.forEach(event => {
                        const distinctId = event.distinct_id; // Get the visitor's distinct ID
                        const sessionId = event.properties.$session_id || 'unknown_session'; // Get session ID
                        const timeOnPage = event.properties.$time_spent || 0; // Get time spent on page
                        const country = event.properties.$geoip_country_name || 'Unknown Country'; // Get country
                        const region = event.properties.$geoip_region_name || 'Unknown Region'; // Get region
                        const city = event.properties.$geoip_city_name || 'Unknown City'; // Get city

                        // Initialize visitor metrics if not already done
                        if (!visitorMetrics[distinctId]) {
                            visitorMetrics[distinctId] = {
                                sessionId: sessionId,
                                pageViews: 0,
                                totalTimeSpent: 0,
                                location: `${city}, ${country}`, // Store location data
                                firstSeen: new Date(event.timestamp), // Record first event timestamp
                            };
                        }

                        // Increment page views for this visitor
                        visitorMetrics[distinctId].pageViews += 1;

                        // Add time spent on the page
                        visitorMetrics[distinctId].totalTimeSpent += timeOnPage;

                        // Update first seen date if the current event is earlier
                        const eventDate = new Date(event.timestamp);
                        if (eventDate < visitorMetrics[distinctId].firstSeen) {
                            visitorMetrics[distinctId].firstSeen = eventDate;
                        }
                    });
                } else {
                    console.log("No results found in the API response.");
                }

                // Function to format date in 'YYYY-MM-DD'
                function formatDate(date) {
                    return date.toISOString().split('T')[0]; // Extract date part (YYYY-MM-DD)
                }

                // Convert visitorMetrics object into an array for easier display
                const visitorList = Object.entries(visitorMetrics).map(([visitorId, metrics]) => ({
                    visitorId: visitorId,
                    sessionId: metrics.sessionId,
                    pageViews: metrics.pageViews,
                    totalTimeSpent: metrics.totalTimeSpent,
                    firstSeenDate: formatDate(metrics.firstSeen),
                    location: metrics.location
                }));

                // Set visitor data to state
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
        <div>
            <h1>Visitor Data</h1>
            <table>
                <thead>
                    <tr>
                        <th>Visitor ID</th>
                        <th>Session ID</th>
                        <th>Page Views</th>
                        {/* <th>Total Time Spent</th> */}
                        <th>First Seen Date</th>
                        <th>Location</th>
                    </tr>
                </thead>
                <tbody>
                    {visitorData.map(visitor => (
                        <tr key={visitor.visitorId}>
                            <td>{visitor.visitorId}</td>
                            <td>{visitor.sessionId}</td>
                            <td>{visitor.pageViews}</td>
                            {/* <td>{visitor.totalTimeSpent}</td> */}
                            <td>{visitor.firstSeenDate}</td>
                            <td>{visitor.location}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserData;
