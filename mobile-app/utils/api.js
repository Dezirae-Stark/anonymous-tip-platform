import axios from 'axios';

// Configure your backend URL here
// For local testing: http://10.0.2.2:3000 (Android emulator)
// For production: https://your-domain.com
const API_BASE_URL = 'http://10.0.2.2:3000';

const API = {
  // Create a new tip page
  createTipPage: async (data) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/create-tip-page`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 10000,
      });
      return response.data;
    } catch (error) {
      console.error('Create tip page error:', error);
      throw error;
    }
  },

  // Get tip page data by token
  getTipPage: async (token) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/tip/${token}`, {
        timeout: 10000,
      });
      return response.data;
    } catch (error) {
      console.error('Get tip page error:', error);
      throw error;
    }
  },

  // Get full tip page URL
  getTipPageUrl: (token) => {
    return `${API_BASE_URL}/tip/${token}`;
  },

  // Configure API base URL (for settings)
  setBaseUrl: (url) => {
    API_BASE_URL = url;
  },

  getBaseUrl: () => {
    return API_BASE_URL;
  },
};

export default API;
