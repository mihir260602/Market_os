// // src/api/authService.js
// import axios from "axios";
// import { getBaseUrl } from "./api";

// // Function to fetch the CSRF token
// export const fetchCsrfToken = async () => {
//   try {
//     const response = await axios.get(`${getBaseUrl()}/auth/get-csrf-token/`, {
//       withCredentials: true, // Ensure that cookies (including csrf token) are included
//     });
//     return response.data.csrfToken; // Adjust based on your backend response structure
//   } catch (error) {
//     throw error.response.data; // Handle errors appropriately
//   }
// };

// // Function for user login
// export const login = async (credentials) => {
//   const csrfToken = await fetchCsrfToken(); // Fetch CSRF token first

//   try {
//     const response = await axios.post(
//       `${getBaseUrl()}/auth/login/`, // Update login route if needed
//       new URLSearchParams(credentials), // Send credentials as form data
//       {
//         headers: {
//           "Content-Type": "application/x-www-form-urlencoded",
//           "X-CSRFToken": csrfToken, // Include CSRF token in headers
//         },
//         withCredentials: true, // Ensure cookies are sent with the request
//       }
//     );

//     // Store JWT token in localStorage
//     const token = response.data.access; // Assuming the token is in `response.data.token`
//     localStorage.setItem("auth_token", token); // Store token in localStorage

//     return response.data; // Return user data or token
//   } catch (error) {
//     throw error.response ? error.response.data : "Login failed"; // Handle errors
//   }
// };

// // Logout
// // Function for user logout
// export const logout = async () => {
//   try {
//     // Clear the token from localStorage
//     localStorage.removeItem("auth_token");

//     // Optional: Call the logout endpoint if your backend requires it
//     await axios.post(`${getBaseUrl()}/auth/logout/`, {}, { withCredentials: true });

//     // Optionally redirect the user to the login page or home page
//     window.location.href = "/home"; // Adjust the redirection as needed
//   } catch (error) {
//     console.error("Logout failed", error);
//   }
// };


// -----------------new added code-----------------
// src/api/authService.js
import axios from "axios";
import { getBaseUrl } from "./api";

export const fetchCsrfToken = async () => {
  try {
    const response = await axios.get(`${getBaseUrl()}/auth/get-csrf-token/`, {
      withCredentials: true, 
    });
    return response.data.csrfToken; 
  } catch (error) {
    throw error.response.data; 
  }
};

export const login = async (credentials) => {
  const csrfToken = await fetchCsrfToken();

  try {
    const response = await axios.post(
      `${getBaseUrl()}/auth/login/`,
      new URLSearchParams(credentials),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "X-CSRFToken": csrfToken,
        },
        withCredentials: true,
      }
    );

    const token = response.data.access;
    const expiresIn = 360;

    localStorage.setItem("auth_token", token);
    localStorage.setItem("refresh_token", response.data.refresh);
    scheduleTokenRefresh(expiresIn, csrfToken);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : "Login failed";
  }
};

async function refreshAccessToken(csrfToken) {
  const refreshToken = localStorage.getItem("refresh_token");

  try {
    const response = await axios.post(
      `${getBaseUrl()}/auth/refresh-token/`,
      { refresh: refreshToken },
      {
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken,
        },
        withCredentials: true,
      }
    );
    localStorage.setItem("auth_token", response.data.access);
  } catch (error) {
    if (error.response) {
      console.error("Failed to refresh access token:", error.response.data);
    } else {
      console.error("Error refreshing access token:", error.message);
    }

    localStorage.removeItem("auth_token");
    localStorage.removeItem("refresh_token");
  }
}

function scheduleTokenRefresh(expiresIn, csrfToken) {
  if (window.refreshInterval) {
    clearInterval(window.refreshInterval);
  }

  // Calculate the initial delay before the first refresh
  const initialDelay = (expiresIn - 60) * 1000; // Time until the first refresh in milliseconds

  setTimeout(() => {
    refreshAccessToken(csrfToken);

    window.refreshInterval = setInterval(() => {
      refreshAccessToken(csrfToken);
    }, 300000); // Refresh every minute
  }, initialDelay);
}

// Logout
// Function for user logout
export const logout = async () => {
  try {
    // Clear the token from localStorage
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_token");
    localStorage.removeItem("refresh_token");
    if (window.refreshTimeout) {
      clearTimeout(window.refreshTimeout);
    }

    // Optional: Call the logout endpoint if your backend requires it
    await axios.post(
      `${getBaseUrl()}/auth/logout/`,
      {},
      { withCredentials: true }
    );

    // Optionally redirect the user to the login page or home page
    window.location.href = "/home"; // Adjust the redirection as needed
  } catch (error) {
    console.error("Logout failed", error);
  }
};

