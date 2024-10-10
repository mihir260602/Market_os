import axios from "axios";

// Define the base URL for your API
const BASE_URL = "http://165.22.11.185:8000/mautic"; // Update this if necessary

// Function to fetch campaigns from the backend
// export const getCampaigns = async () => {
//   try {
//     const response = await axios.get(`${BASE_URL}/campaigns`);
//     // Convert response object with keys to an array of campaigns
//     const campaigns = Object.values(response.data);
//     // console.log("Campaigns-->>> ", campaigns);
//     return campaigns; // Return the campaigns array
//   } catch (error) {
//     console.error("Error fetching campaigns:", error);
//     throw error;
//   }
// };

export const fetchCampaigns = async () => {
  try {
    const response = await axios.get('http://165.22.11.185:8000/mautic/campaigns');
    console.log('Campaigns fetched:', response.data);
  } catch (error) {
    console.error('Error fetching campaigns:', error);
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
      console.error('Response headers:', error.response.headers);
    }
  }
};
