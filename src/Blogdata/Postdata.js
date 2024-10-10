import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Postdata.css";
const Blogdata = () => {
  const [postMetrics, setPostMetrics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const apiKey = process.env.REACT_APP_PERSONAL_API_KEY_NEW; // Use environment variable for API key
        const response = await axios.get(
          `https://app.posthog.com/api/projects/95663/events/?event=$pageview&limit=1000`,
          {
            headers: {
              Authorization: `Bearer ${apiKey}`,
            },
          }
        );
        const responseJson = response.data;

        // Regular expression to capture the post ID and title from the URL
        const postUrlRegex = /\/post\/(\d+)\/-(.*)/;

        let postMetrics = {};

        if (!responseJson.results || responseJson.results.length === 0) {
          console.log("No results found in the response.");
          setPostMetrics([]);
          return;
        }

        // Loop through the results to gather metrics per post and visitor
        responseJson.results.forEach((event) => {
          const url = event.properties.$current_url || "";
          const match = postUrlRegex.exec(url);

          if (match) {
            const postId = match[1];
            const postTitle = decodeURIComponent(match[2]);
            const distinctId = event.distinct_id;
            const sessionId = event.properties.$session_id || "unknown_session";
            const timeOnPage = event.properties.$time_spent || 0;
            const country =
              event.properties.$geoip_country_name || "Unknown Country";
            const region =
              event.properties.$geoip_region_name || "Unknown Region";
            const city = event.properties.$geoip_city_name || "Unknown City";

            // Initialize metrics for this post if not already done
            if (!postMetrics[postId]) {
              postMetrics[postId] = {
                title: postTitle,
                visitors: {},
              };
            }

            // Initialize visitor metrics if not already done
            if (!postMetrics[postId].visitors[distinctId]) {
              postMetrics[postId].visitors[distinctId] = {
                sessionId: sessionId,
                pageViews: 0,
                totalTimeSpent: 0,
                firstSeen: new Date(event.timestamp),
                location: `${city}, ${country}`, // Add location
              };
            }

            // Increment page views for the visitor
            postMetrics[postId].visitors[distinctId].pageViews += 1;

            // Add time spent on the page
            postMetrics[postId].visitors[distinctId].totalTimeSpent +=
              timeOnPage;

            // Check if this event is earlier than the recorded first seen date
            const eventDate = new Date(event.timestamp);
            if (
              eventDate < postMetrics[postId].visitors[distinctId].firstSeen
            ) {
              postMetrics[postId].visitors[distinctId].firstSeen = eventDate;
            }
          }
        });

        // Format the post metrics into an array to easily display
        const formattedPostMetrics = Object.entries(postMetrics).map(
          ([postId, metrics]) => {
            const visitorsArray = Object.entries(metrics.visitors).map(
              ([visitorId, visitorMetrics]) => ({
                visitorId: visitorId,
                sessionId: visitorMetrics.sessionId,
                pageViews: visitorMetrics.pageViews,
                totalTimeSpent: visitorMetrics.totalTimeSpent, // Time in seconds
                firstSeenDate: visitorMetrics.firstSeen
                  .toISOString()
                  .split("T")[0],
                location: visitorMetrics.location, // Display location
              })
            );

            return {
              postId: postId,
              title: metrics.title,
              visitors: visitorsArray,
            };
          }
        );

        setPostMetrics(formattedPostMetrics);
      } catch (err) {
        setError(err);
        console.error("Error fetching post data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPostData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data: {error.message}</div>;

  return (
    <div className="container-out">
    <div className="container">
      <h1>Post Data</h1>
      {postMetrics.length === 0 ? (
        <p>No data available.</p>
      ) : (
        postMetrics.map((post) => (
          <div key={post.postId} style={{ marginBottom: "30px" }}>
            <h3 className="titleheading">Title: {post.title}</h3>
            <table border="1">
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
            {post.visitors.map((visitor) => (
                <tr key={visitor.visitorId}>
                <td data-label="Visitor ID">{visitor.visitorId}</td>
                <td data-label="Session ID">{visitor.sessionId}</td>
                <td data-label="Page Views">{visitor.pageViews}</td>
                <td data-label="First Seen Date">{visitor.firstSeenDate}</td>
                <td data-label="Location">{visitor.location}</td>
                </tr>
            ))}
            </tbody>
            </table>
          </div>
        ))
      )}
    </div>
    </div>
  );
};

export default Blogdata;
