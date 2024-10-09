import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
// Example data for the charts
const leadData = [
  { name: "Jan", leads: 400 },
  { name: "Feb", leads: 300 },
  { name: "Mar", leads: 500 },
  { name: "Apr", leads: 200 },
  { name: "May", leads: 700 },
  { name: "Jun", leads: 100 },
];

const pieData = [
  { name: "Converted", value: 300 },
  { name: "In Progress", value: 700 },
];

const barData = [
  { name: "Email 1", sent: 400, opened: 240 },
  { name: "Email 2", sent: 300, opened: 139 },
  { name: "Email 3", sent: 200, opened: 980 },
  { name: "Email 4", sent: 278, opened: 390 },
  { name: "Email 5", sent: 189, opened: 480 },
];

// const heatMapData = [
//   [90, 70, 50, 80],
//   [60, 30, 40, 70],
//   [50, 90, 60, 40],
//   [80, 60, 30, 50],
// ];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF5858"];

const Layout = () => {
  const [totalPageViews, setTotalPageViews] = useState(0);
  const [totalVisitors, setTotalVisitors] = useState(0);
  const [pathData, setPathData] = useState([]);
  const [osData, setOsData] = useState([]);
  const [cityData, setCityData] = useState([]);
  const [channelData, setChannelData] = useState([]);
  const [totalSessions, setTotalSessions] = useState(0);
  const [uniqueSessions, setUniqueSessions] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lineGraphData, setLineGraphData] = useState([]);
  const [filter, setFilter] = useState("hour");
  const [pageViewData, setPageViewData] = useState([]);

  // Default filter // State to hold OS data

  // ---------------------------
  const fetchPageViewsForGraph = async () => {
    let pageViewData = [];
    let timeAggregatedViews = {};
    let totalPageViews = 0;
    let nextUrl =
      "https://app.posthog.com/api/projects/95663/events/?event=$pageview&limit=1000";
    const headers = {
      Authorization: `Bearer ${process.env.REACT_APP_PERSONAL_API_KEY_NEW}`,
    };

  const [sortDirection, setSortDirection] = useState('asc');

  const [sortConfig, setSortConfig] = useState({
    key: 'views',  // Default sorting by views
    direction: 'asc', // Default ascending order
  });
  const handleSort = (field) => {
    let sortedData = [...pathData];
    const isAsc = sortConfig.key === field && sortConfig.direction === 'asc';

    sortedData.sort((a, b) => {
      if (isAsc) {
        return a[field] - b[field];
      } else {
        return b[field] - a[field];
      }
    });
    
    setSortConfig({
      key: field,
      direction: isAsc ? 'desc' : 'asc',
    });

    setPathData(sortedData);
  };
  // const handleFilterChange = (newFilter) => {
  //   setFilter(newFilter);
  // };
// Default filter // State to hold OS data

// ---------------------------
const fetchPageViewsForGraph = async () => {
  let pageViewData = [];
  let timeAggregatedViews = {};
  let totalPageViews = 0;
  let nextUrl =
    "https://app.posthog.com/api/projects/95663/events/?event=$pageview&limit=10000";
  const headers = {
    Authorization: `Bearer ${process.env.REACT_APP_PERSONAL_API_KEY_NEW}`,
  };


    // Function to process events and extract timestamps
    const processEvents = (events) => {
      events.forEach((event) => {
        const timestamp = event.timestamp;
        if (timestamp) {
          pageViewData.push(new Date(timestamp));
        }
      });
    };

    const fetchNextPage = async (nextUrl) => {
      try {
        const response = await axios.get(nextUrl, { headers });
        processEvents(response.data.results);
        totalPageViews += response.data.results.length;

        if (response.data.next) {
          await fetchNextPage(response.data.next); // Recursive call to fetch all pages
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching line graph data.");
      }
    };

    try {
      await fetchNextPage(nextUrl); // Start fetching from the first page

      // Aggregating page views based on the filter (minute/hour/day)
      const aggregatePageViews = () => {
        pageViewData.forEach((timestamp) => {
          let timeUnit;
          if (filter === "month") {
            timeUnit = timestamp.toISOString().slice(0, 7); // "YYYY-MM-DDTHH:MM"
          } else if (filter === "hour") {
            timeUnit = timestamp.toISOString().slice(0, 13); // "YYYY-MM-DDTHH"
          } else if (filter === "day") {
            timeUnit = timestamp.toISOString().slice(0, 10); // "YYYY-MM-DD"
          } else if (filter === "year") {
            timeUnit = timestamp.getFullYear(); // "YYYY-MM-DD"
          } else if (filter === "week") {
            timeUnit = getWeekNumber(timestamp); // "YYYY-MM-DD"
          }

          if (!timeAggregatedViews[timeUnit]) {
            timeAggregatedViews[timeUnit] = 0;
          }

          timeAggregatedViews[timeUnit] += 1;
        });

        // Formatting data for the line graph
        const formattedData = Object.keys(timeAggregatedViews).map(
          (timeUnit) => ({
            time: timeUnit,
            views: timeAggregatedViews[timeUnit],
          })
        );

        setLineGraphData(formattedData);
        setTotalPageViews(totalPageViews); // Set the total page views
      };

      aggregatePageViews(); // Call the aggregation function after fetching data
    } catch (error) {
      console.error("Error fetching page view data:", error);
    }
  };

  const getWeekNumber = (date) => {
    const start = new Date(date.getFullYear(), 0, 1);
    const days = Math.floor((date - start) / (24 * 60 * 60 * 1000));
    return `Week ${Math.ceil(days / 7)} of ${date.getFullYear()}`;
  };

  // ==========================

  const fetchSessionData = async () => {
    setLoading(true);
    const sessionSet = new Set(); // To hold unique session IDs
    let totalProcessedSessions = 0; // To track total sessions processed

    try {
      // Fetch the first page of results
      const response = await axios.get(
        "https://app.posthog.com/api/projects/95663/events/?event=$pageview&limit=10000",
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_PERSONAL_API_KEY_NEW}`, // Replace with your actual API key
          },
        }
      );

      // Function to process events from the response
      const processEvents = (events) => {
        events.forEach((event) => {
          const sessionId = event.properties?.$session_id; // Extract session ID
          if (sessionId) {
            sessionSet.add(sessionId); // Add session ID to the set for uniqueness
          }
        });
        totalProcessedSessions += events.length; // Increment total sessions count
      };

      // Process the first page of results
      if (response.data.results) {
        processEvents(response.data.results);

        // Check for pagination
        let nextUrl = response.data.next;
        while (nextUrl) {
          const nextResponse = await axios.get(nextUrl, {
            headers: {
              Authorization: `Bearer ${process.env.REACT_APP_PERSONAL_API_KEY_NEW}`, // Replace with your actual API key
            },
          });

          processEvents(nextResponse.data.results);
          nextUrl = nextResponse.data.next; // Get the next page URL
        }
      }

      // Update state with the results
      setUniqueSessions(sessionSet.size); // Unique sessions
      setTotalSessions(totalProcessedSessions); // Total sessions processed
    } catch (error) {
      console.error("Error fetching session data:", error);
      setError("Error fetching session data."); // Set error state
    } finally {
      setLoading(false);
    }
  };
  // Function to fetch the total page views from PostHog API
  const fetchPageViews = async () => {
    let totalPageViews = 0;
    let nextUrl =
      "https://app.posthog.com/api/projects/95663/events/?event=$pageview&limit=10000";
    const headers = {
      Authorization: `Bearer ${process.env.REACT_APP_PERSONAL_API_KEY_NEW}`,
    };

    try {
      while (nextUrl) {
        const response = await axios.get(nextUrl, { headers });
        console.log("Response:", response.data);
        totalPageViews += response.data.results.length;
        nextUrl = response.data.next; // If `next` exists, there's another page
      }

      setTotalPageViews(totalPageViews);
      console.log("Total Page Views:", totalPageViews);
    } catch (error) {
      console.error("Error fetching total page views:", error);
    }
  };

  // Function to fetch total unique visitors
  const fetchUniqueVisitors = async () => {
    let visitorSet = new Set();
    let nextUrl =
      "https://app.posthog.com/api/projects/95663/events/?event=$pageview&limit=10000";
    const headers = {
      Authorization: `Bearer ${process.env.REACT_APP_PERSONAL_API_KEY_NEW}`,
    };

    try {
      while (nextUrl) {
        const response = await axios.get(nextUrl, { headers });
        console.log("Response:", response.data);

        response.data.results.forEach((event) => {
          if (event.properties && event.properties.distinct_id) {
            visitorSet.add(event.properties.distinct_id);
          }
        });

        nextUrl = response.data.next; // If `next` exists, there's another page
      }

      setTotalVisitors(visitorSet.size);
      console.log("Total Unique Visitors:", visitorSet.size);
    } catch (error) {
      console.error("Error fetching total unique visitors:", error);
    }
  };

  // Function to fetch path data
  const fetchPathData = async () => {
    let pathDataObj = {};
    let nextUrl =
      "https://app.posthog.com/api/projects/95663/events/?event=$pageview&limit=10000";
    const headers = {
      Authorization: `Bearer ${process.env.REACT_APP_PERSONAL_API_KEY_NEW}`,
    };

    try {
      while (nextUrl) {
        const response = await axios.get(nextUrl, { headers });
        console.log("Response:", response.data);

        response.data.results.forEach((event) => {
          if (event.properties) {
            const path =
              event.properties.$current_url ||
              event.properties.url ||
              event.properties.pathname;

            if (path) {
              if (!pathDataObj[path]) {
                pathDataObj[path] = { visitors: new Set(), views: 0 };
              }

              pathDataObj[path].views += 1;

              if (event.properties.distinct_id) {
                pathDataObj[path].visitors.add(event.properties.distinct_id);
              }
            }
          }
        });

        nextUrl = response.data.next; // If `next` exists, there's another page
      }

      const finalData = Object.keys(pathDataObj).map((path) => ({
        Path: path,
        Visitors: pathDataObj[path].visitors.size,
        Views: pathDataObj[path].views,
        "Bounce Rate":
          (
            ((pathDataObj[path].views - pathDataObj[path].visitors.size) /
              pathDataObj[path].views) *
            100
          ).toFixed(2) + "%",
      }));

      setPathData(finalData);
      console.log("Final Path Data:", finalData);
    } catch (error) {
      console.error("Error fetching path data:", error);
    }
  };

  // Function to fetch OS data
  const fetchOsData = async () => {
    let osDataObj = {};
    let totalVisitors = 0;
    let nextUrl =
      "https://app.posthog.com/api/projects/95663/events/?event=$pageview&limit=10000";
    const headers = {
      Authorization: `Bearer ${process.env.REACT_APP_PERSONAL_API_KEY_NEW}`,
    };

    try {
      while (nextUrl) {
        const response = await axios.get(nextUrl, { headers });
        console.log("Response:", response.data);

        response.data.results.forEach((event) => {
          const os = event.properties?.$os; // Get OS type
          const distinctId = event.properties?.distinct_id; // Get distinct ID

          if (os) {
            if (!osDataObj[os]) {
              osDataObj[os] = { visitors: new Set(), views: 0 };
            }
            osDataObj[os].views += 1; // Increment views count

            if (distinctId) {
              osDataObj[os].visitors.add(distinctId); // Track unique visitors
            }
          }
        });

        nextUrl = response.data.next; // If `next` exists, there's another page
      }

      const finalOsData = Object.keys(osDataObj).map((os) => ({
        OS: os,
        Visitors: osDataObj[os].visitors.size,
        Views: osDataObj[os].views,
      }));

      setOsData(finalOsData);
      console.log("Final OS Data:", finalOsData);
    } catch (error) {
      console.error("Error fetching OS data:", error);
    }
  };

  const fetchCityData = async () => {
    let cityDataObj = {};
    let nextUrl =
      "https://app.posthog.com/api/projects/95663/events/?event=$pageview&limit=10000";
    const headers = {
      Authorization: `Bearer ${process.env.REACT_APP_PERSONAL_API_KEY_NEW}`,
    };

    try {
      while (nextUrl) {
        const response = await axios.get(nextUrl, { headers });
        response.data.results.forEach((event) => {
          const city = event.properties?.$geoip_city_name; // City name
          const country = event.properties?.$geoip_country_name; // Country name
          const distinctId = event.properties?.distinct_id; // Unique user ID

          if (city && country) {
            const location = `🇮🇳 ${country} - ${city}`; // Format as Country - City
            if (!cityDataObj[location]) {
              cityDataObj[location] = { visitors: new Set(), views: 0 };
            }
            cityDataObj[location].views += 1;
            cityDataObj[location].visitors.add(distinctId);
          }
        });
        nextUrl = response.data.next; // If `next` exists, there's another page
      }
      const finalCityData = Object.keys(cityDataObj).map((location) => ({
        City: location,
        Visitors: cityDataObj[location].visitors.size,
        Views: cityDataObj[location].views,
      }));
      setCityData(finalCityData);
    } catch (error) {
      console.error("Error fetching city data:", error);
    }
  };

  // Function to fetch channel data
  const fetchChannelData = async () => {
    let channelDataObj = {};
    let nextUrl =
      "https://app.posthog.com/api/projects/95663/events/?event=$pageview&limit=10000";
    const headers = {
      Authorization: `Bearer ${process.env.REACT_APP_PERSONAL_API_KEY_NEW}`,
    };

    try {
      while (nextUrl) {
        const response = await axios.get(nextUrl, { headers });

        response.data.results.forEach((event) => {
          const channelType = event.properties?.$initial_referrer || "Direct"; // Default to 'Direct' if undefined
          if (!channelDataObj[channelType]) {
            channelDataObj[channelType] = { visitors: new Set(), views: 0 };
          }
          channelDataObj[channelType].views += 1;
          if (event.properties.distinct_id) {
            channelDataObj[channelType].visitors.add(
              event.properties.distinct_id
            );
          }
        });

        nextUrl = response.data.next; // If `next` exists, there's another page
      }

      const finalData = Object.keys(channelDataObj).map((channel) => ({
        Channel: channel,
        Visitors: channelDataObj[channel].visitors.size,
        Views: channelDataObj[channel].views,
      }));

      setChannelData(finalData);
    } catch (error) {
      console.error("Error fetching channel data:", error);
    }
  };

  useEffect(() => {
    fetchPageViews();
    fetchUniqueVisitors();
    fetchPathData();
    fetchOsData();
    fetchCityData();
    fetchChannelData();
    fetchSessionData();
    // Fetch OS data
    fetchPageViewsForGraph();
  }, [filter]);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  lineGraphData.sort((a, b) => new Date(a.time) - new Date(b.time));
  console.log("Sorted Data: ", lineGraphData); // Debugging line

  // Reversing the data to render correctly
  const reversedData = lineGraphData.slice().reverse();
  return (
    <div className="app">
      <div className="main-content">
        <div className="analytics-section">
          <div className="analytics-partition">
            <h2>Website Analytics</h2>
          </div>
          <div className="analytics-container">
            <div className="analytics-card">
              <div className="card-content">
                <h3>Page Views</h3>
                <p>{totalPageViews}</p>
              </div>
            </div>
            <div className="analytics-card">
              <div className="card-content">
                <h3>Total Unique Visitors</h3>
                <p>{totalVisitors}</p>
              </div>
            </div>
            <div className="analytics-card">
              <div className="card-content">
                <h3>Bounce Rate (%)</h3>
                <p>
                  {(totalVisitors > 0
                    ? ((totalVisitors / totalPageViews) * 100).toFixed(2)
                    : 0) + "%"}
                </p>
              </div>
            </div>
            <div className="analytics-card">
              <div className="card-content">
                <h3>Total Processed Sessions</h3>
                <p>{totalSessions}</p>
              </div>
            </div>
            <div className="analytics-card">
              <div className="card-content">
                <h3>Unique Sessions </h3>
                <p>{uniqueSessions}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="filter-dropdown">
          <label htmlFor="filter-select">Select Time Filter:</label>
          <select
            id="filter-select"
            value={filter}
            onChange={(e) => handleFilterChange(e.target.value)}
          >
            <option value="hour">Hour</option>
            <option value="day">Day</option>
            <option value="week">Week</option>
            <option value="month">Month</option>
            <option value="year">Year</option>
          </select>
        </div>

        {/* Line graph section */}
        <div className="line-chart-container">
          <h3 className="line-chart-title">Live Page Views</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={reversedData}>
              <XAxis dataKey="time" stroke="#8884d8" />
              <YAxis stroke="#8884d8" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  border: "1px solid #888",
                  borderRadius: "4px",
                  padding: "10px",
                }}
                cursor={false}
              />
              <CartesianGrid strokeDasharray="5 5" stroke="#e0e0e0" />
              <Line
                type="monotone"
                dataKey="views"
                stroke="#4caf50"
                strokeWidth={2}
                dot={{ fill: "#4caf50", stroke: "#fff", strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        {/* Path Data Table */}
        <div className="path-data-section">
          <h3>Path Data</h3>
          <table>
            <thead>
            <tr>
            <th>Path</th>
            <th><button onClick={() => handleSort('Visitors')} className="sort-button">
                {sortConfig.key === 'Visitors' && sortConfig.direction === 'asc' ? '↑' : '↓'}
              </button>Visitors</th>
            <th><button onClick={() => handleSort('Views')} className="sort-button">
                {sortConfig.key === 'Views' && sortConfig.direction === 'asc' ? '↑' : '↓'}
              </button>
              Views
              
            </th>
            <th>Bounce Rate</th>
          </tr>
            </thead>
            <tbody>
              {pathData.map((data, index) => (
                <tr key={index}>
                  <td>{data.Path}</td>
                  <td>{data.Visitors}</td>
                  <td>{data.Views}</td>
                  <td>{data["Bounce Rate"]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* OS Data Table */}
        <div className="os-data-section">
          <h3>OS Data</h3>
          <table>
            <thead>
              <tr>
                <th>OS</th>
                <th>Visitors</th>
                <th>Views</th>
              </tr>
            </thead>
            <tbody>
              {osData.map((data, index) => (
                <tr key={index}>
                  <td>{data.OS}</td>
                  <td>{data.Visitors}</td>
                  <td>{data.Views}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* City Data Table */}
        <div className="city-data-section">
          <h3>City Data</h3>
          <table>
            <thead>
              <tr>
                <th>City</th>
                <th>Visitors</th>
                <th>Views</th>
              </tr>
            </thead>
            <tbody>
              {cityData.map((data, index) => (
                <tr key={index}>
                  <td>{data.City}</td>
                  <td>{data.Visitors}</td>
                  <td>{data.Views}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Channel Data Table */}
        <div className="channel-data-section">
          <h3>Channel Data</h3>
          <table>
            <thead>
              <tr>
                <th>Channel</th>
                <th>Visitors</th>
                <th>Views</th>
              </tr>
            </thead>
            <tbody>
              {channelData.map((data, index) => (
                <tr key={index}>
                  <td>{data.Channel}</td>
                  <td>{data.Visitors}</td>
                  <td>{data.Views}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="button-container" style={{ margin: "20px" }}>
          <button
            onClick={() =>
              (window.location.href =
                "https://us.posthog.com/project/95663/replay/home")
            } // Replace with your target URL
            style={{
              padding: "10px 20px",
              backgroundColor: "orange",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            Preview Session Recordings
          </button>
          {/* </div>
      <div className="button-container" style={{ marginTop: '20px' }}> */}
          <button
            onClick={() =>
              (window.location.href =
                "https://us.posthog.com/project/95663/web")
            } // Replace with your target URL
            style={{
              padding: "10px 20px",
              backgroundColor: "orange",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "16px",
              marginLeft: "20px",
            }}
          >
            Visit Posthog
          </button>
        </div>

        <div className="analytics-section">
          <div className="analytics-partition">
            <h2>Email Compaign Analytics</h2>
          </div>
          <div className="analytics-container">
            <div className="analytics-card">
              {/* <div className="card-icon">📈</div> */}
              <div className="card-content">
                <h3>Total Campaigns</h3>
                <p>50</p>
              </div>
            </div>
            <div className="analytics-card">
              {/* <div className="card-icon">📈</div> */}
              <div className="card-content">
                <h3>Click-Through-Rate</h3>
                <p>50</p>
              </div>
            </div>
            <div className="analytics-card">
              {/* <div className="card-icon"></div> */}
              <div className="card-content">
                <h3>New Contacts</h3>
                <p>1,200</p>
              </div>
            </div>
            <div className="analytics-card">
              {/* <div className="card-icon">💵</div> */}
              <div className="card-content">
                <h3>Revenue</h3>
                <p>$3,500</p>
              </div>
            </div>
            <div className="analytics-card">
              {/* <div className="card-icon">👁️</div> */}
              <div className="card-content">
                <h3>Analytics Views</h3>
                <p>8,300</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bar-chart-widget">
          <h3>Email Campaigns</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sent" fill="#82ca9d" />
              <Bar dataKey="opened" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="analytics-section">
          <div className="analytics-partition">
            <h2>Lead Engagement</h2>
          </div>
          <div className="analytics-container">
            <div className="analytics-card">
              {/* <div className="card-icon">📈</div> */}
              <div className="card-content">
                <h3>Engagement Score</h3>
                <p>50</p>
              </div>
            </div>
            <div className="analytics-card">
              {/* <div className="card-icon"></div> */}
              <div className="card-content">
                <h3>Leads Generated</h3>
                <p>1,200</p>
              </div>
            </div>
            <div className="analytics-card">
              {/* <div className="card-icon">💵</div> */}
              <div className="card-content">
                <h3>Total Leads </h3>
                <p>500</p>
              </div>
            </div>
            <div className="analytics-card">
              {/* <div className="card-icon">💵</div> */}
              <div className="card-content">
                <h3>Lead Activity </h3>
                <p>50%</p>
              </div>
            </div>
          </div>
        </div>
        <div class="lead-engagement-widget">
          {/* <!-- Top Performing Leads Table --> */}
          <div class="top-leads-table">
            <h4>Top Performing Leads</h4>
            <table>
              <thead>
                <tr>
                  <th>Lead Name</th>
                  <th>Company</th>
                  <th>Engagement Score</th>
                  <th>Activity Level</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>John Doe</td>
                  <td>ABC Corp</td>
                  <td>95%</td>
                  <td>High</td>
                </tr>
                <tr>
                  <td>Jane Smith</td>
                  <td>XYZ Inc.</td>
                  <td>92%</td>
                  <td>Medium</td>
                </tr>
                <tr>
                  <td>Michael Lee</td>
                  <td>GlobalTech</td>
                  <td>89%</td>
                  <td>High</td>
                </tr>
                <tr>
                  <td>Emily Davis</td>
                  <td>MarketEdge</td>
                  <td>87%</td>
                  <td>Low</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Layout;
