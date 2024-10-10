import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const VisitorDetails = () => {
    const { visitorId } = useParams(); // Get visitorId from URL params
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const apiKey = process.env.REACT_APP_PERSONAL_API_KEY_NEW;
                const response = await axios.get(`https://app.posthog.com/api/projects/95663/events/?distinct_id=${visitorId}&limit=1000`, {
                    headers: {
                        Authorization: `Bearer ${apiKey}`
                    }
                });

                const responseJson = response.data;

                if (!responseJson.results || responseJson.results.length === 0) {
                    setUserData({});
                    return;
                }

                let userMetrics = {
                    totalViews: 0,
                    totalSessions: 0,
                    pathsVisited: {},
                    last20PathsVisited: [],
                };

                let visitedPaths = new Set();

                responseJson.results.forEach(event => {
                    const url = event.properties.$current_url || "";
                    const sessionId = event.properties.$session_id || "";

                    if (url) {
                        userMetrics.pathsVisited[url] = (userMetrics.pathsVisited[url] || 0) + 1;
                        visitedPaths.add(url);
                        userMetrics.totalViews += 1;

                        if (sessionId) {
                            userMetrics.totalSessions += 1;
                        }
                    }
                });

                userMetrics.last20PathsVisited = Array.from(visitedPaths).slice(-20);
                setUserData(userMetrics);
            } catch (err) {
                setError(err);
                console.error("Error fetching user data:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [visitorId]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error fetching data: {error.message}</div>;

    return (
        <div>
            <h1>User Data for {visitorId}</h1>
            <h2>Total Views: {userData.totalViews}</h2>
            <h2>Total Sessions: {userData.totalSessions}</h2>

            <h3>Last 20 Paths Visited:</h3>
            <ul>
                {userData.last20PathsVisited.map((path, index) => (
                    <li key={index}>{path}</li>
                ))}
            </ul>

            <h3>All Paths Visited:</h3>
            <ul>
                {Object.entries(userData.pathsVisited).map(([path, count]) => (
                    <li key={path}>{path}: {count} times</li>
                ))}
            </ul>
        </div>
    );
};

export default VisitorDetails;
