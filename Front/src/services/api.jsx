import axios from 'axios';

// Smart API URL selection to work in all environments
function getApiUrl() {
  // First check environment variables
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  
  
  // For production: use same hostname but backend port
  return `${window.location.protocol}//${window.location.hostname}:5454`;
}

const API_URL = getApiUrl();
console.log('🔧 API Service initialized with URL:', API_URL);

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 second timeout
});

// Request interceptor for logging
apiClient.interceptors.request.use(config => {
  console.log(`📤 ${config.method.toUpperCase()} request to: ${config.url}`);
  return config;
});

// Response interceptor for logging
apiClient.interceptors.response.use(
  response => {
    console.log(`📥 Response from ${response.config.url}:`, response.status);
    return response;
  },
  error => {
    console.error('❌ API Error:', error.message);
    if (error.response) {
      console.error(`Status: ${error.response.status}`);
      console.error('Data:', error.response.data);
    }
    return Promise.reject(error);
  }
);

export const apiService = {
  // Return just response.data instead of the full response
  async get(endpoint) {
    try {
      const response = await apiClient.get(endpoint);
      return response.data; // Only return the data part
    } catch (error) {
      console.error(`Error fetching ${endpoint}:`, error);
      throw error;
    }
  },
  
  // Return just response.data for post requests too
  async post(endpoint, data = {}) {
    try {
      const response = await apiClient.post(endpoint, data);
      return response.data; // Only return the data part
    } catch (error) {
      console.error(`Error posting to ${endpoint}:`, error);
      throw error;
    }
  }
};