import axios from 'axios';

// Show what URL is being used (for debugging)
console.log('🔧 Environment Variables:', {
  VITE_API_URL: import.meta.env.VITE_API_URL,
  runtimeEnv: window.ENV?.VITE_API_URL,
  hostname: window.location.hostname
});

// Function to determine the API URL
function getApiUrl() {
  // Check runtime environment variables first (from env-config.js)
  if (window.ENV && window.ENV.VITE_API_URL) {
    console.log('🔍 Using runtime ENV variable:', window.ENV.VITE_API_URL);
    return window.ENV.VITE_API_URL;
  }
  
  // Then check build-time variables
  if (import.meta.env.VITE_API_URL) {
    console.log('🔍 Using build-time ENV variable:', import.meta.env.VITE_API_URL);
    return import.meta.env.VITE_API_URL;
  }
  
  // Last resort fallback
  const fallbackUrl = `${window.location.protocol}//${window.location.hostname}:5454`;
  console.log('⚠️ No ENV variable found, using fallback URL:', fallbackUrl);
  return fallbackUrl;
}

// Add this line to show where the app is running from
console.log('🌐 App running at:', window.location.href);

// Get API URL using the function
//const API_URL = getApiUrl();
const API_URL = `10.10.76.241:5454`;

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