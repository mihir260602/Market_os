// src/api/authService.js
import axios from "axios";
import { getBaseUrl } from "./api";

// Function to fetch the CSRF token
export const fetchCsrfToken = async () => {
  try {
    const response = await axios.get(`${getBaseUrl()}/auth/get-csrf-token/`, {
      withCredentials: true, // Ensure that cookies (including csrf token) are included
    });
    return response.data.csrfToken; // Adjust based on your backend response structure
  } catch (error) {
    throw error.response.data; // Handle errors appropriately
  }
};

// Function for user login
export const login = async (credentials) => {
  const csrfToken = await fetchCsrfToken(); // Fetch CSRF token first

  try {
    const response = await axios.post(
      `${getBaseUrl()}/auth/login/`, // Update login route if needed
      new URLSearchParams(credentials), // Send credentials as form data
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "X-CSRFToken": csrfToken, // Include CSRF token in headers
        },
        withCredentials: true, // Ensure cookies are sent with the request
      }
    );

    // Store JWT token in localStorage
    const token = response.data.access; // Assuming the token is in `response.data.token`
    localStorage.setItem("auth_token", token); // Store token in localStorage

    return response.data; // Return user data or token
  } catch (error) {
    throw error.response ? error.response.data : "Login failed"; // Handle errors
  }
};

// Logout
// Function for user logout
export const logout = async () => {
  try {
    // Clear the token from localStorage
    localStorage.removeItem("auth_token");

    // Optional: Call the logout endpoint if your backend requires it
    await axios.post(`${getBaseUrl()}/auth/logout/`, {}, { withCredentials: true });

    // Optionally redirect the user to the login page or home page
    window.location.href = "/home"; // Adjust the redirection as needed
  } catch (error) {
    console.error("Logout failed", error);
  }
};
