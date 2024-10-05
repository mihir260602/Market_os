import axios from "axios";

import { getBaseUrl } from "./api";

// Function to raise a content ticket
export const raiseContentTicket = async (contentId, ticketData) => {
  const token = localStorage.getItem("auth_token");

  try {
    const response = await axios.post(
      `${getBaseUrl()}/content/create-ticket/${contentId}`,
      ticketData,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token for authentication
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to get all tickets assigned to the current user (Author)
export const getAuthorTickets = async () => {
  try {
    const token = localStorage.getItem("auth_token"); // Retrieve token from local storage
    if (!token) {
      throw new Error("No authentication token found. Please log in.");
    }

    const response = await axios.get(`${getBaseUrl()}/content/tickets/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching author tickets", error.response?.data || error.message);
    throw error;
  }
};

// Function to mark a ticket as resolved
export const markTicketResolved = async (ticketId) => {
  try {
    const token = localStorage.getItem("auth_token"); // Retrieve token from local storage
    if (!token) {
      throw new Error("No authentication token found. Please log in.");
    }

    const response = await axios.patch(
      `${getBaseUrl()}/content/tickets/${ticketId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error resolving ticket", error.response?.data || error.message);
    throw error;
  }
};

// Function to list and filter content tickets (for Admin/Content Manager)
export const getFilteredTickets = async (filters = {}) => {
  try {
    const token = localStorage.getItem("auth_token"); // Retrieve token from local storage
    if (!token) {
      throw new Error("No authentication token found. Please log in.");
    }

    const response = await axios.get(`${getBaseUrl()}/content/tickets-list/`, {
      params: filters,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching filtered tickets", error.response?.data || error.message);
    throw error;
  }
};
