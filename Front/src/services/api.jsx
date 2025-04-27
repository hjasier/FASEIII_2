import axios from 'axios';

// Show what URL is being used (for debugging)
console.log('🔧 Environment Variables:', {
  VITE_API_URL: import.meta.env.VITE_API_URL,
  runtimeEnv: window.ENV?.VITE_API_URL,
  hostname: window.location.hostname
});

// Get API URL (without any hostname detection logic)
const API_URL = import.meta.env.VITE_API_URL || window.ENV?.VITE_API_URL || 'http://10.10.76.241:5454';

// IMPORTANT: Log the final API URL for debugging
console.log('🔧 Using API URL:', API_URL);

// Create axios instance with the correct baseURL
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000
});

// Export the service
export const apiService = {
  async get(endpoint) {
    try {
      // Log the full URL being requested (for debugging)
      console.log(`🔍 Making GET request to: ${API_URL}${endpoint}`);
      
      const response = await apiClient.get(endpoint);
      return response.data;
    } catch (error) {
      console.error(`Error fetching ${endpoint}:`, error);
      throw error;
    }
  },
  
  async post(endpoint, data = {}) {
    try {
      const response = await apiClient.post(endpoint, data);
      return response.data;
    } catch (error) {
      console.error(`Error posting to ${endpoint}:`, error);
      throw error;
    }
  }
};