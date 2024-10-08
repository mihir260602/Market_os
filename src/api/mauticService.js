import axios from 'axios';

// Define the base URL for your API
const BASE_URL = 'http://127.0.0.1:8000/mautic'; // Update this if necessary

// Function to fetch campaigns from the backend
export const getCampaigns = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/campaigns`);
    // Convert response object with keys to an array of campaigns
    const campaigns = Object.values(response.data);
    return campaigns; // Return the campaigns array
  } catch (error) {
    console.error('Error fetching campaigns:', error);
    throw error;
  }
};
