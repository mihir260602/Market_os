// src/services/contentService.js

import axios from "axios";
import { getBaseUrl } from "./api";

const cloudinary_url = "https://res.cloudinary.com/dqr4afmb7";

const getAuthToken = () => {
  return localStorage.getItem("auth_token");
};

export const saveDraft = async (draftData) => {
  console.log("d data", draftData)
  try {
    // Retrieve the JWT token from localStorage
    const token = localStorage.getItem("auth_token"); // Ensure this is the correct token retrieval method

    // Create a new FormData object
    const formData = new FormData();
    
    // Append all fields to the formData, including the file
    formData.append("title", draftData.title);
    formData.append("category", draftData.category);
    formData.append("tags", JSON.stringify(draftData.tags)); // If tags is an array, stringify it
    formData.append("content_body", draftData.content_body);
    formData.append("banner_image", draftData.banner_image); // File object
    formData.append("meta_title", draftData.meta_title); // File object
    formData.append("meta_description", draftData.meta_description); // File object
    formData.append("meta_keywords", draftData.meta_keywords); // File object
    formData.append("content_type_id", draftData.content_type_id);

    // Set the headers for the request, specifically 'multipart/form-data'
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Include the JWT token
        "Content-Type": "multipart/form-data", // Multipart form data for file upload
      },
      withCredentials: true, // Include credentials if required
    };
    console.log("fdata", formData)
    // Send the POST request using axios
    const response = await axios.post(
      `${getBaseUrl()}/content/create/`,
      formData,
      config
    );

    console.log(response.data);
    return response.data; // Return the response data
  } catch (error) {
    console.error("Error saving draft:", error);
    throw error; // Rethrow the error for further handling if needed
  }
};

// export const saveDraft = async (draftData) => {
//   try {
//     const token = getAuthToken();
//     const formData = new FormData();
//     formData.append("title", draftData.title);
//     formData.append("category", draftData.category);
//     formData.append("tags", JSON.stringify(draftData.tags));
//     formData.append("content_body", draftData.content_body);
//     formData.append("banner_image", draftData.banner_image);
//     formData.append("meta_title", draftData.meta_title);
//     formData.append("meta_description", draftData.meta_description);
//     formData.append("meta_keywords", draftData.meta_keywords);

//     const response = await axios.post(`${getBaseUrl()}/content`, formData, {
//       headers: {
//         "Authorization": `Bearer ${token}`,
//         "Content-Type": "multipart/form-data",
//       },
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Error saving draft:", error);
//     throw error;
//   }
// };

export const deleteContent = async (contentId) => {
  try {
    const token = getAuthToken();
    const response = await axios.delete(
      `${getBaseUrl()}/content/${contentId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data; // Return any data from delete response
  } catch (error) {
    console.error("Error deleting content:", error);
    throw error;
  }
};

// export const deleteContent = async (contentId) => {
//   try {
//     // Retrieve the auth_token from local storage (or wherever it's stored)
//     const authToken = localStorage.getItem("auth_token");

//     // Set up the authorization headers
//     const config = {
//       headers: {
//         Authorization: `Bearer ${authToken}`,
//       },
//       withCredentials: true,
//     };

//     // Make the DELETE request
//     const response = await axios.delete(
//       `${getBaseUrl()}/content/${contentId}/`,
//       config
//     );

//     // Check the response status or return the response data if needed
//     if (response.status === 204) {
//       // 204 No Content indicates success
//       return true; // Successfully deleted
//     } else {
//       throw new Error("Failed to delete content. Please try again.");
//     }
//   } catch (error) {
//     console.error("Error deleting content:", error);
//     throw error; // Re-throw the error for further handling
//   }
// };

export const saveDraftAndSendForReview = async (draftData) => {
  console.log("d data",draftData)
  try {
    // Retrieve the JWT token from localStorage
    const token = localStorage.getItem("auth_token"); // Ensure this is the correct token retrieval method

    // Create a new FormData object
    const formData = new FormData();

    // Append all fields to the formData, including the file
    formData.append("title", draftData.title);
    formData.append("category", draftData.category);
    formData.append("tags", JSON.stringify(draftData.tags)); // If tags is an array, stringify it
    formData.append("content_body", draftData.content_body);
    formData.append("banner_image", draftData.banner_image); // File object
    formData.append("meta_title", draftData.meta_title); // File object
    formData.append("meta_description", draftData.meta_description); // File object
    formData.append("meta_keywords", draftData.meta_keywords); // File object
    formData.append("review_status", draftData.review_status); // File object
    formData.append("content_type_id", draftData.content_type_id);

    // Set the headers for the request, specifically 'multipart/form-data'
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Include the JWT token
        "Content-Type": "multipart/form-data", // Multipart form data for file upload
      },
      withCredentials: true, // Include credentials if required
    };

    console.log("f data",formData)

    // Send the POST request using axios
    const response = await axios.post(
      `${getBaseUrl()}/content/create/`,
      formData,
      config
    );

    console.log(response.data);
    return response.data; // Return the response data
  } catch (error) {
    console.error("Error saving draft:", error);
    throw error; // Rethrow the error for further handling if needed
  }
};

export const fetchDrafts = async () => {
  try {
    const token = getAuthToken();
    const response = await axios.get(`${getBaseUrl()}/content/draft`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Return the response data directly
  } catch (error) {
    console.error("Error fetching drafts:", error);
    throw error;
  }
};

// Get image
// Base URL for Cloudinary

// Function to return the complete image URL
export const getPostImageUrl = (post) => {
  if (post && post.banner_image) {
    return `${cloudinary_url}/${post.banner_image}`;
  }
  // return `${cloudinary_url}/image/upload/default_image.jpg`; // Fallback to a default image
  return "https://upload.wikimedia.org/wikipedia/commons/5/59/Empty.png"; // Fallback to a default image
};

export const fetchContentList = async (options = {}) => {
  try {
    const params = new URLSearchParams({
      page: options.page || 1,
      limit: options.limit || 10,
      sort_by: options.sortBy || "created_at",
      order: options.order || "asc",
      ...(options.author && { author: options.author }),
      ...(options.title && { title: options.title }),
      ...(options.createdAtStart && {
        created_at_start: options.createdAtStart,
      }),
      ...(options.createdAtEnd && { created_at_end: options.createdAtEnd }),
      ...(options.tags && { tags: options.tags }),
      ...(options.updatedAtStart && {
        updated_at_start: options.updatedAtStart,
      }),
      ...(options.updatedAtEnd && { updated_at_end: options.updatedAtEnd }),
      ...(options.search && { search: options.search }),
    });

    const response = await fetch(
      `${getBaseUrl()}/content/list/?${params.toString()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const text = await response.text();
      console.error("Response Error Text:", text);
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching content list:", error);
    throw error;
  }
};

// Update
export const updateDraft = async (id, updatedContent) => {
  try {
    const token = localStorage.getItem("auth_token");

    // Create a new FormData object for multipart form data
    const formData = new FormData();

    // Conditionally append fields to the formData
    if (updatedContent.title) {
      formData.append("title", updatedContent.title);
    }
    if (updatedContent.category) {
      formData.append("category", updatedContent.category);
    }
    if (updatedContent.tags) {
      formData.append("tags", JSON.stringify(updatedContent.tags)); // Stringify tags if it's an array
    }
    if (updatedContent.content_body) {
      formData.append("content_body", updatedContent.content_body);
    }
    if (updatedContent.status) {
      formData.append("status", updatedContent.status);
    }
    if (updatedContent.review_status) {
      formData.append("review_status", updatedContent.review_status);
    }

    // Append files only if they are updated
    if (updatedContent.banner_image) {
      formData.append("banner_image", updatedContent.banner_image); // Banner image file
    }

    if (updatedContent.meta_title) {
      formData.append("meta_title", updatedContent.meta_title);
    }
    if (updatedContent.meta_description) {
      formData.append("meta_description", updatedContent.meta_description);
    }
    if (updatedContent.meta_keywords) {
      formData.append("meta_keywords", updatedContent.meta_keywords);
    }

    // Configure request headers with JWT token
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        // Remove Content-Type; axios will set it automatically for FormData
      },
      withCredentials: true,
    };

    // Send PUT request to update the draft
    const response = await axios.put(
      `${getBaseUrl()}/content/${id}/`,
      formData,
      config
    );

    console.log(response.data);
    return response.data; // Return the updated content data
  } catch (error) {
    console.error("Error updating draft:", error);
    throw error; // Rethrow the error to handle it in the component
  }
};

export const fetchDraftById = async (draftId) => {
  try {
    const token = getAuthToken();
    const response = await axios.get(`${getBaseUrl()}/content/${draftId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Return the draft data directly
  } catch (error) {
    console.error("Error fetching draft by ID:", error);
    throw error;
  }
};

// Fetch by Id
// export const fetchDraftById = async (postId) => {
//   try {
//     // Retrieve the JWT token from localStorage
//     const token = localStorage.getItem("auth_token"); // Ensure this is the correct way to get your token

//     // Set up the config for the axios request with the Authorization header
//     const config = {
//       headers: {
//         Authorization: `Bearer ${token}`, // Include the JWT token
//         "Content-Type": "application/json", // Ensure correct content type
//       },
//     };

//     // Make the API call to fetch the post by ID
//     const response = await axios.get(
//       `${getBaseUrl()}/content/${postId}/`,
//       config
//     );

//     // Return the data received from the API
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching post:", error);
//     throw error; // Handle the error
//   }
// };
